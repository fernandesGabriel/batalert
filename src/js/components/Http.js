"use strict";

export default class Http {

    /*
     * Abstract Http request thought fetch method
     */
    static transporter(
        url = '',
        method = 'GET',
        type = 'json'
    ) {

        // opens new promise to wait request response
        return new Promise(function(resolve)  {

            // makes request and parse JSON if set
            fetch(url, { method: method }).then((response) => {

                if (type == 'json') {
                    return response.json();
                } else {
                    return response;
                }

            }).then((data) => {

                // resolves opened promise
                resolve(data)

            }).catch((error) => {

                // catches any error
                console.log(error);

            });

        });

    }

}