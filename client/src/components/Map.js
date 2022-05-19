import React, { useState, useEffect } from "react";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet/Marker';
import { Popup } from 'react-leaflet/Popup';
import  coord from '../config/coordinates.json';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function Map(props){

    return (
        <div style={{ margin: '20px', border: '5px solid black', height: '90%' }}>
        <MapContainer center={[ 20.593683, 78.962883 ]} zoom={5} style={{ height: "100%" }}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                coord.map(el => {
                    return (
                        <Marker position={el.coordinates} key={el.state_code} >
                            <Popup>
                                <div>
                                    <h3>{el.state_name}</h3>
                                    <p>Confirmed: {props.data.filter(e => e.state_code === el.state_code)[0].new_positive}</p>
                                    <p>Active: {props.data.filter(e => e.state_code === el.state_code)[0].new_active}</p>
                                    <p>Recovered: {props.data.filter(e => e.state_code === el.state_code)[0].new_cured}</p>
                                    <p>Deaths: {props.data.filter(e => e.state_code === el.state_code)[0].new_death}</p>
                                </div>
                            </Popup>
                        </Marker>
                    )
                }
                )
            }
        </MapContainer>
        </div>
)
}

export default Map;