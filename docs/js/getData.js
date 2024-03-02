// Created by Nathaniel DeVol

async function getData(messagesUrl, key) {
    const data = await httpGetAsync(messagesUrl);
    
    var data_parsed = [];
    // parse data
    var arr = JSON.parse(data);
    for(var i = 0; i < arr.length; i++) {
        // data_parsed.push([new Date(arr[i].dateTime), Number(arr[i][key])]);
        data_parsed.push([new Date(arr[i].dateTime), Number(JSON.parse(arr[i][key]))]);
    }
    return data_parsed
}

async function getDataArray(messagesUrl, key, itemInstanceId) {
    const data = await httpGetAsync(messagesUrl);

    var data_parsed = [];
    // parse data
    var arr = JSON.parse(data);
    for(var i = 0; i < arr.length; i++) {
        // data_parsed.push([new Date(arr[i].dateTime), Number(arr[i][key])]);
        if (JSON.parse(arr[i].payload).itemInstanceId==itemInstanceId) {
            data_parsed.push([new Date(arr[i].dateTime), JSON.parse(arr[i][key])]);
        }
    }
    return data_parsed
}


async function getDataString(messagesUrl, key) {
    const data = await httpGetAsync(messagesUrl);
    var data_parsed = [];
    // parse data
    var arr = JSON.parse(data);
    for(var i = 0; i < arr.length; i++) {
        data_parsed.push([new Date(arr[i].dateTime), arr[i][key]]);
    }
    return data_parsed
}


async function getDataPayload(messagesUrl, key) {
    const data = await httpGetAsync(messagesUrl);

    var data_parsed = [];
    // parse data
    var arr = JSON.parse(data);
    for(var i = 0; i < arr.length; i++) {
        payload = JSON.parse(arr[i].payload)
        data_parsed.push([new Date(payload.dateTime), Number(payload[key])]);
    }
    return data_parsed
}
