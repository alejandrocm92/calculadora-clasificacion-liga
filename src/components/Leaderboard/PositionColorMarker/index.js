import React from 'react';
import { POSITIONCOLORS } from '../../../constants/index.js';
import './styles.css';

const PositionColorMarker = ({ positionIndex }) => {
    return (
        <div className="position-color-marker" style={{display: "inline-block", background: POSITIONCOLORS[positionIndex]}} />
    );
}

export default PositionColorMarker;