// Created by Nathaniel DeVol

function getHeartbeat(assetId, elementId) {
    // last message
    var url = "https://uu93rouaad.execute-api.us-east-1.amazonaws.com/v1/messages-proxy";
    url += "?assetId="+assetId+"&limit=1";
    httpGetAsync(url).then((data)=>{
        let last_message = new Date(JSON.parse(JSON.parse(data)[0].payload).dateTime);
        let now = new Date();
        let diff = ((now-last_message) / 1000).toFixed(0); // seconds

        // set color
        let color = 'red';
        let text = 'Device Offline';
        if (diff < 2*60) {
            color = 'green';
            text = 'Device Online';
        }

        document.getElementById(elementId+"-heartbeat").style.backgroundColor = color;
        document.getElementById(elementId+"-heartbeat-time").innerHTML = text;
    });

    // last data received
    url = "https://uu93rouaad.execute-api.us-east-1.amazonaws.com/v1/messages-proxy";
    url += "?assetId="+assetId+"&dataItemId=MeanVals&limit=1";
    httpGetAsync(url).then((data)=>{
        let last_message = new Date(JSON.parse(JSON.parse(data)[0].payload).dateTime);
        let now = new Date();
        let diff = ((now-last_message) / 1000).toFixed(0); // seconds

        // set color
        let color = 'gray';
        let text = 'Not collecting';
        if (diff < 2*60) {
            color = 'green';
            text = 'Collecting';
        }

        document.getElementById(elementId+"-data").style.backgroundColor = color;
        document.getElementById(elementId+"-data-time").innerHTML = text;
    });
};