import React from 'react';
import { Button } from '@material-ui/core';
import './styles.css'; 

const MatchDayHeader = ({ selectedMatchDay, onPrevMatchDayClicked, onNextMatchDayClicked }) => {

    return (
        <div className='header-container'>
            <div><Button onClick={onPrevMatchDayClicked} variant="outlined" color="primary">&lt;</Button></div>
            <div><h3>{`Jornada ${selectedMatchDay}`}</h3></div>
            <div><Button onClick={onNextMatchDayClicked} variant="outlined" color="primary">&gt;</Button></div>
        </div>
    );
}

export default MatchDayHeader;