"use strict";

export default class Utilities {

    /*
     * Generates a random latitude and longitude from a area
     */
    static randomLatLng(
        bottomLeft = [0, 0],
        topRight = [0, 0]
    ) {

        // generates a random X position
        let randomX = Math.random() * (topRight[0] - bottomLeft[0]) + bottomLeft[0];
        // rounds position to 6 points
        randomX = Math.round( randomX * 1e6 ) / 1e6;

        // generates a random Y position
        let randomY = Math.random() * (topRight[1] - bottomLeft[1]) + bottomLeft[1];
        // rounds position to 6 points
        randomY = Math.round( randomY * 1e6 ) / 1e6;

        return {
            lat: randomX,
            lng: randomY
        }

    }

}