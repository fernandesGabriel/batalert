"use strict";

import React    from 'react';
import ReactDOM from 'react-dom';

import Batalert  from './components/Batalert.js';
import SearchBox from './components/SearchBox.js';

// globals vars and instances
window.batalert = new Batalert();

/*
 * Bootstrap workflow
 */
window.bootstrap = function() {

    // render interface that does not depend on map
    window.appRender();

    // starts system
    window.batalert.init();

    // check if map was loaded
    if (window.mapLoaded) {

        // sets map as active
        window.batalert.activeMap();

    }

}

/*
 * Renders base interfaces created using React
 */
window.appRender = function () {

    ReactDOM.render(
        <SearchBox/>,
        document.getElementById('search-box')
    );

}

// bootstraps app
window.bootstrap();

