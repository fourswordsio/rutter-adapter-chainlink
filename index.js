                                                                                                                                                                                                                                                 
 require('dotenv').config();
const request = require("request");
const username = '96ff6b2b-63f5-4e0a-8e11-1d55fe31842b';
const password = '18af1c27-2ddf-488f-945f-fdffc6cbc58d';
const createRequest = (input,callback) => {
        // Create the URL for the request
        let url = 'https://production.rutterapi.com/orders/';
        let endpoint = input.data.endpoint || "b0af4272-267a-4373-87c8-2051f3868bf0"  //order id number
url = url + endpoint
        // Query Object is api key data:
let queryObj = {
                access_token: process.env.accessToken
        }
const headers = {
 'Content-Type': 'application/json',
 'Authorization': 'Basic OTZmZjZiMmItNjNmNS00ZTBhLThlMTEtMWQ1NWZlMzE4NDJiOjE4YWYxYzI3LTJkZGYtNDg4Zi05NDVmLWZkZmZjNmNiYzU4ZA=='
}
        // Use this to clean up unused input parameters
        for (let key in queryObj) {
                if (queryObj[key] === "") {
                        delete queryObj[key];
                }
        }
        const options = {
                url: url,
                qs: queryObj,
                json: true
        }
        request(options, (error, response, body) => {
                // Add any API-specific failure case here to pass that error back to Chainlink
                if (error || response.statusCode >= 400) {
                        callback(response.statusCode, {
                                jobRunID: input.order_,
                                status: "errored",
                                error: body,
                                statusCode: response.statusCode
                        });
                } else {
                        callback(response.statusCode, {
                                jobRunID: input.order_number,
                                data: body,
                                statusCode: response.statusCode
                        });
                }
        });
};
// This is a wrapper to allow the function to work with
// GCP Functions
exports.gcpservice = (req, res) => {
        createRequest(req.body, (statusCode, data) => {
                res.status(statusCode).send(data);
        });
};
// This is a wrapper to allow the function to work with
// AWS Lambda
exports.handler = (event, context, callback) => {
        createRequest(event, (statusCode, data) => {
                callback(null, data);
        });
};
// This is a wrapper to allow the function to work with
// newer AWS Lambda implementations
exports.handlerv2 = (event, context, callback) => {
        createRequest(JSON.parse(event.body), (statusCode, data) => {
                callback(null, {
                        statusCode: statusCode,
                        body: JSON.stringify(data),
                        isBase64Encoded: false
                });
        });
};
// This allows the function to be exported for testing
// or for running in express
module.exports.createRequest = createRequest;
