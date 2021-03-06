"use strict";

import React from 'react';

export default class AlertBox extends React.Component {

    /*
     * Toggle AlertBox
     */
    togglesAlertBox() {

        document.querySelectorAll('#alert-box .left-navigationn')[0].classList.toggle("hidden-box");

    }

    /*
    * Renders left navigation with alerts
    */
    render() {

        let targetsRow = this.props.targets.map(function(item, i) {
            return (
                <AlertBoxContentTargetItem item={item} key={i}/>
            );
        });

        return (
            <div className="left-navigationn panel has-shadow hidden-box">
                <button className="button navbar-burger has-shadow" onClick={this.togglesAlertBox}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <AlertBoxHeader/>
                <AlertBoxContentDivider title="Villain:"/>
                <div id="villain-list">
                    <AlertBoxContentVillainItem item={this.props.villain}/>
                </div>
                <AlertBoxContentDivider title="Targets:"/>
                <div id="targets-list">
                    { targetsRow }
                </div>
            </div>
        );
    }

}


class AlertBoxHeader extends React.Component {

    /*
     * Renders left navigation header
     */
    render() {

        return (
            <div className="panel-heading">
                <h2> Alert <i className="fa fa-exclamation-triangle" aria-hidden="true"></i> </h2>
                <p> A villain was found </p>
            </div>
        );

    }

}

class AlertBoxContentDivider extends React.Component {

    /*
     * Renders left navigation list dividers
     */
    render() {

        return (
            <div className="panel-block is-divider">
                <h3> {this.props.title} </h3>
            </div>
        );

    }

}

class AlertBoxContentVillainItem extends React.Component {

    /*
     * Renders alert box villain item
     */
    render() {

        return (
            <div className="panel-block">
                <span> {this.props.item.name} </span>
                <AlertBoxTargetButton lat={this.props.item.location.lat} lng={this.props.item.location.lng} title={this.props.item.name}/>
            </div>
        );

    }
}

class AlertBoxContentTargetItem extends React.Component {

    /*
    * Renders alert box targets item
    */
    render() {

        return (
            <div className="panel-block">
                <span> {this.props.item.place} </span>
                <AlertBoxTargetButton lat={this.props.item.location.lat} lng={this.props.item.location.lng} title={this.props.item.place} />
            </div>
        );

    }

}

class AlertBoxTargetButton extends React.Component {

    /*
    * Fire button actions
    */
    buttonActions() {

        // hides alertbox
        document.querySelectorAll('#alert-box .left-navigationn')[0].classList.add("hidden-box");

        // displays direction on map
        window.batalert.displayDirection(this.props.lat, this.props.lng, this.props.title)
    }

    /*
    * Renders alert box targets item
    */
    render() {

        return (
            <button type="button" className="button is-danger is-outlined" onClick={() => this.buttonActions() }>
                <i className="fa fa-crosshairs" aria-hidden="true"></i>
            </button>
        );

    }

}


