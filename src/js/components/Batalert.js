"use strict";

import Geolocator from './Geolocator.js';
import MapHandler from './MapHandler.js';
import AlertBox   from './AlertBox.js';
import Http       from './Http.js';
import React      from 'react';
import ReactDOM   from 'react-dom';

export default class Batalert {

    constructor(
        geo = new Geolocator(),
        map = new MapHandler()
    ) {

        this.geo = geo;
        this.map = map;
        this.villain = null;
        this.targets = null;

        this.startListeners();

    }

    /*
     * Starts Batalert system
     */
    init() {

        // starts Batalert system map
        this.map.init();

        // gets Batman position
        this.geo.getPosition().then((position) => {

            this.map.setPosition(position);

        });

    }

    /*
     * Requests infos from Batcave's supercomputer
     */
    searchVillains(position) {

        // sanitizes values
        position.lat = parseFloat(position.lat.trim());
        position.lng = parseFloat(position.lng.trim());

        // checks if position has just digits and in a valid format
        if (/^(-)?\d+(.\d+)*$/.test(position.lat) && /^(-)?\d+(.\d+)*$/.test(position.lng)) {

            // converts to numbers
            position.lat = parseFloat(position.lat);
            position.lng = parseFloat(position.lng);

            if (typeof position.lat === "number" || typeof position.lng === "number") {

                // requests to Batcave's API
                let batcaveApiUrl = 'http://code-challenge.maplink.com.br/coordinate?q=' + position.lat + ',' + position.lng;
                Http.transporter(batcaveApiUrl).then((alerts) => {

                    // if any alert find, fires all system alerts
                    if (Object.keys(alerts).length !== 0){
                        this.activeAlert(alerts);
                    }

                });

            }

        }

    }

    /*
     * Starts all process when a alert is fired
     */
    activeAlert(info) {

        console.log('Run, Forrest, Run! ');

        // sets up villain info
        if ('villain' in info) {
            this.setVillain(info.villain);
        }

        // sets up
        if ('targets' in info) {
            this.setTargets(info.targets);
        }

        // populate alert box and render content with React
        ReactDOM.render(
            <AlertBox villain={this.villain} targets={this.targets}/>,
            document.getElementById('alert-box')
        );

    }

    /*
    * Display directions to any target or villain
    */
    displayDirection(toLat, toLng, title = '') {

        // renders direction
        if (title != '') {
            this.map.renderDirection({'lat': this.geo.lat, 'lng': this.geo.lng}, {'lat': toLat, 'lng': toLng}, title);
        } else {
            this.map.renderDirection({'lat': this.geo.lat, 'lng': this.geo.lng}, {'lat': toLat, 'lng': toLng});
        }
    }

    /*
     * Handles setting the alert villain
     */
    setVillain(villain) {

        this.villain = villain;
    }

    /*
     * Handles setting the alert targets
     */
    setTargets(targets) {

        targets.sort(this.compareProbability);
        this.targets = targets;

    }

    /*
     * Helper method to sync the map initialization using the same map instance
     */
    activeMap() {

        // set map as loaded
        this.map.setActive(true);

    }

    /*
     * Helper method to compare two targets probabilities and add first which with
     * biggest one. Used together with sort array method
     */
    compareProbability(a,b) {

        if (a.probability > b.probability) {
            return -1;
        }
        if (a.probability < b.probability) {
            return 1;
        }
        return 0;

    }

    /*
     * Listens DOM events
     */
    startListeners() {}
}