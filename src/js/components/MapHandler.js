"use strict";

export default class MapHandler {

    constructor() {

        // instance google maps objects
        this.map = null;
        this.marker = null;
        this.directionService = null;
        this.directionDisplay = null;
        this.directionMarker = null;

        // control vars
        this.lat = null;
        this.lng = null;
        this.activeMap = false;
        this.pendingLoad = false;

        // initialize some settings
        this.defaultLat = 40.7421726;
        this.defaultLng = -73.9731004;
        this.defaultZoom = 14;
        this.mapStyle = [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": -40
                    },
                    {
                        "lightness": -7
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": -100
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 10
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#bdffbc"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 100
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            }
        ];

    }

    /*
     * Initializes map services
     */
    init() {

        if (this.activeMap) {

            // chooses default lat/lng or users location to center map
            let lat = (this.lat != null) ? this.lat : this.defaultLat;
            let lng = (this.lng != null) ? this.lng : this.defaultLng;

            let positionObj = new google.maps.LatLng(lat, lng);

            // sets up google maps instance
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: positionObj,
                minZoom: 12,
                zoom: this.defaultZoom,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                },
                scrollwheel: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false
            });

            // stylize map
            this.map.mapTypes.set('styled_map',  new google.maps.StyledMapType(this.mapStyle, {name: 'Map'}));
            this.map.setMapTypeId('styled_map');

            // initialize some google maps services
            this.directionService = new google.maps.DirectionsService;
            this.directionDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

            // set map to receive directions
            this.directionDisplay.setMap(this.map);

            // sets up google maps marker instance
            this.marker = new google.maps.Marker({
                position: positionObj,
                map: this.map,
                icon: 'assets/img/batpin.png',
                title: 'Batman'
            });

        } else {

            this.pendingLoad = true;
        }
        
    }

    /*
    * Render directions on map
    */
    renderDirection(origin, destination, title = 'Danger') {

        if (this.directionService != null && this.directionDisplay != null) {

            // resets direction marker if any
            if (this.directionMarker != null) {
                this.directionMarker.setMap(null);
                delete this.directionMarker;
            }

            // creates copy of the current this value to be used inside promise
            let that = this;

            // requests Google Direction API a route resolution
            this.directionService.route({
                origin: new google.maps.LatLng(origin.lat, origin.lng),
                destination: new google.maps.LatLng(destination.lat, destination.lng),
                travelMode: 'WALKING'
            }, function(response, status) {
                if (status === 'OK') {

                    // render direction on map
                    that.directionDisplay.setDirections(response);

                    // creates
                    that.directionMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(destination.lat, destination.lng),
                        map: that.map,
                        icon: 'assets/img/alertpin.png',
                        title: title
                    });

                } else {

                    // through any error
                    console.log('Oh, geez! Google don´t know any direction');

                }
            });

        }

    }

    /*
     * Change map active status
     */
    setActive(active) {

        this.activeMap = active;

        if (this.activeMap) {
            if (this.pendingLoad) {
                this.init();
                this.pendingLoad = false;
            }   
        }

    }

    /*
     * Re-center map with a determined position
     */
    setPosition(position) {

        if (this.map != null && this.marker != null) {

            // sets up either map center position as well as user position
            let positionObj = new google.maps.LatLng(position.lat, position.lng);

            this.map.setCenter(positionObj);
            this.marker.setPosition(positionObj)

        } else {

            // if map still not loaded, saves position to future use
            this.lat = position.lat;
            this.lng = position.lng;

        }

    }

}