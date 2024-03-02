//  Created by Mahmoud Parto
//  Copyright 2017. All rights reserved.
// https://www.w3schools.com/js/js_json_http.asp

// read an url and call it back
// function httpGetAsync(theUrl, callback) {
//     // console.log("Get the API: " + theUrl);
//     //Access-Control-Allow-Origin
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function () {
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
//             // console.log("Received the API: " + theUrl);
//             callback(xmlHttp.responseText);
//         }
//     }
//     xmlHttp.open("GET", theUrl, true); // true for asynchronous
//     xmlHttp.send(null);
// }

// Created by Nathaniel DeVol
function httpGetAsync(theUrl) {
    return new Promise((resolve, reject) => {
        // Access-Control-Allow-Origin
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                resolve(xmlHttp.responseText)
            }
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    });
}