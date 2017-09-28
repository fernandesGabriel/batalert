"use strict";

import React from 'react';

export default class SearchBox extends React.Component {

    constructor(props) {

        // initializes states
        super(props);
        this.state = {lat: '', lng: ''};

        // initializes methods
        this.searchAction = this.searchAction.bind(this);
        this.bindAction = this.bindAction.bind(this);

    }

    /*
    * Auto bind input status to class vars
    */
    bindAction(event) {

        this.setState({
            [event.target.name]: event.target.value
        });

    }

    /*
    * Submit search
    */
    searchAction(event) {

        if (this.state.lat != '' && this.state.lng != '') {
            window.batalert.searchVillains({lat: this.state.lat, lng: this.state.lng});
        }

    }

    /*
    * Renders left navigation with alerts
    */
    render() {

        return (
            <div className="navbar-item">
                <div className="field has-addons">
                    <div className="control">
                        <input id="search-lat" name="lat" className="input" type="text" placeholder="Latitude" value={this.state.lat} onChange={this.bindAction} />
                    </div>
                    <div className="control">
                        <input id="search-lng" name="lng" className="input" type="text" placeholder="Longitude" value={this.state.lng} onChange={this.bindAction} />
                    </div>
                    <div className="control">
                        <button type="button" className="button is-warning"  onClick={this.searchAction}>
                            <span className="is-hidden-mobile">
                                Find Villain
                            </span>
                            <span className="icon">
                                <i className="fa fa-location-arrow" aria-hidden="true"></i>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        );

    }

}
