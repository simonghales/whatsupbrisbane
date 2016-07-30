import React from 'react'
import GoogleMapElem from '../GoogleMapElem'
import classes from './Map.scss'

export const Map = () => (
    <div className={classes.root}>
        <GoogleMapElem />
    </div>
)

export default Map
