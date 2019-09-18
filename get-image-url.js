module.exports = {
    getText: function (image) {
        return new Promise(resolve => {

            const request = require('request');

            let subscriptionKey = '8aceeb2bc48c4f2888708a3a67e836bd';
            let endpoint = 'https://westeurope.api.cognitive.microsoft.com/';
            if (!subscriptionKey) { throw new Error('Set your environment variables for your subscription key and endpoint.'); }

            var uriBase = endpoint + 'vision/v2.0/read/core/asyncBatchAnalyze';

            const imageUrl = image;

// Request parameters.
            const params = {
                'language': 'unk',
                'detectOrientation': 'true',
            };

            const options = {
                uri: uriBase,
                qs: params,
                body: '{"url": ' + '"' + imageUrl + '"}',
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key' : subscriptionKey
                }
            };

            request.post(options, (error, response, body) => {
                if (error) {
                    console.log('Error: ', error);
                    return;
                }
                console.log(response.headers['operation-location']);
                const optionsGet = {
                    uri: response.headers['operation-location'],
                    qs: params,
                    headers: {
                        'Content-Type': 'application/json',
                        'Ocp-Apim-Subscription-Key' : subscriptionKey
                    }
                };
                console.log('Wait while we get you file....');
                setTimeout(function(){
                    request.get(optionsGet, (error, response, body) => {
                        if (error) {
                            console.log('Error: ', error);
                            return;
                        }
                        if (body) {
                            console.log(body);
                            resolve(body);
                        }
                    });
                }, 10000);
            });
        })
    }
};