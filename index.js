                                                                                                                                                                                                                                                 
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const createRequest = async (input,callback) => {
        let orderId = 'b0af4272-267a-4373-87c8-2051f3868bf0';
        
        if(input.data && input.data.endpoint){
                orderId = input.data.endpoint;
        }

        let authHeaderCreds = new Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');
        console.log(authHeaderCreds);

        try{
                let resp = await fetch(`${process.env.RUTTER_ORDER_URI}/${orderId}`, {
                        method: 'GET',
                        headers: {
                                'Authorization': `Basic ${authHeaderCreds}`,
                                'Content-Type': 'application/json'
                        }
                });

                if(resp.ok){
                        callback(resp.statusCode, {
                                jobRunID: orderId,
                                data: body,
                                statusCode: resp.statusCode
                        });
                } else {
                        console.log(resp);
                        callback(resp.status, {
                                jobRunID: orderId,
                                status: "errored",
                                error: resp.statusText,
                                statusCode: resp.status
                        });
                }

        } catch(e) {
                console.log(e);
                callback(500, {
                        jobRunID: orderId,
                        status: "errored",
                        error: {},
                        statusCode: 500
                });
        }


/*
        request(options, (error, response, body) => {
                // Add any API-specific failure case here to pass that error back to Chainlink
                if (error || response.statusCode >= 400) {

                } else {

                }
        });
*/
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
