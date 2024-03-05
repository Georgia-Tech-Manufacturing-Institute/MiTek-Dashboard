// Created by Nathaniel DeVol
async function generatePlots(assetId, idx=false){
    // dataItemIds, elementIds are global variables 
    // idx should be a list [1], [1,4], ...
    if (idx){
        idx.forEach(i => generatePlot(dataItemIds[i], elementIds[i], assetId));
    } else {
        // generate all plots
        for(var i = 0; i < dataItemIds.length; i++) {
            generatePlot(dataItemIds[i], elementIds[i], assetId);
        }
    }

    // // dataItemIds.length must equal elementIds.length
    // for(var i = 0; i < dataItemIds.length; i++) {
    //     await generatePlot(dataItemIds[i], elementIds[i], startTime, endTime, assetId);
    // }
}


async function generatePlot(dataItemId, elementId, assetId, itemInstanceId) { //
    // startTime, endTime are global variables 
    var base_url = "https://uu93rouaad.execute-api.us-east-1.amazonaws.com/v1/messages-proxy?";
    base_url += "assetId=" + assetId; 

    var data = await httpGetAsync(base_url + "&dataItemId=ChannelLabels&limit=1");
    const columnNames = JSON.parse(JSON.parse(data)[0].value);
    const startTime = JSON.parse(data)[0].dateTime.replace('.','+').replace('Z','');
    console.log(itemInstanceId, startTime, columnNames);

    var url = base_url + "&dataItemId=" + dataItemId;
    url += "&startDateTime=" + startTime;  // 2024-02-29T19:00:55+783
    // url += "&endDateTime=2024-02-29T19:15:55+783";
    url += "&limit=200"
    // console.log(url);
    var data = await getDataArray(url, 'value', itemInstanceId);

    var plotdata = []
    // var x = data.map(function(value,index) { return value[0]; });
    var x = data.map(function(value,index) { return new Date(value[0].getTime() + 300*60000); }); // UTC correction
    var y = data.map(function(value,index) { return value[1]; });
    var y_plot
    for(var i = 0; i < columnNames.length; i++) {
        y_plot = y.map(function(value,index) { return value[i]; });
        plotdata.push({
            x: x,
            y: y_plot,
            mode: 'lines+markers',
            type: 'scatter',
            // marker : {
            //     color: '#B3A369'
            // },
            // line: {
            //     color: '#B3A369'
            // },
            name: columnNames[i]
        });
    }
    var layout = {
        // title: {
        //     text: dataItemId,
        //     font: {
        //         color: 'white'
        //     }
        // },
        uirevision:'true',
        margin: {
            b: "auto",
            l: 40,
            r: 10,
            t: 10
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        xaxis: {
            color: 'white',
            linecolor: 'white',
            linewidth: 1,
            mirror: true
        },
        yaxis: {
            color: 'white',
            linecolor: 'white',
            linewidth: 1,
            mirror: true
        },
        legend: {
            font: {
                color: 'white'
            }
        }
    };
    var config = {responsive: true};
    Plotly.react(document.getElementById(elementId), plotdata, layout, config);
}
