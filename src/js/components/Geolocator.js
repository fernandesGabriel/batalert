"use strict";

import Utilities from './Utilities.js';
import Http      from './Http.js';

export default class Geolocator {

    constructor(
        lat = null,
        lng = null
    ) {

        this.lat  = lat;
        this.lng = lng;

    }

    /*
     * Retrieves user geo position
     */
    getPosition() {

        // creates copy of the current this value to be used inside promise
        let that = this;

        return new Promise(function (resolve) {

            // checks current lat/lng are valid
            if (typeof that.lat !== "number" || typeof that.lng !== "number") {

                // requests area limits to randomise a location
                // yeap, batman moves too fast and the GPS can't get him
                let cityLimitsDataUrl = 'https://gist.githubusercontent.com/pitteri/d56780d610cb8e0a43bfa94fc54b71cd/raw/dcdd965c84cd05d856ae32646be69868d4a80afa/gotham_bbox.json';
                Http.transporter(cityLimitsDataUrl).then((response) => {
                    // calculates random location
                    let position = Utilities.randomLatLng(response['bottom_left'], response['top_right']);
                    // set position to be used globally
                    that.setPosition(position);
                    // return resolved values
                    resolve(position);
                });

            } else {

                // return resolved values
                resolve([that.lat, that.lng]);

            }

        });
    }

    /*
     * Set user geo position to future use
     */
    setPosition(position) {

        this.lat = position.lat;
        this.lng = position.lng;

    }


}