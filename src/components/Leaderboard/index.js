import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardTable from './LeaderboardTable';
import PositionColorMarker from './PositionColorMarker';
import './styles.css';

const Leaderboard = ({ headings, teamsData, rows }) => {
    teamsData.forEach((row, index) => {
        let teamInfoCell = (
            <React.Fragment>
                <div className="cell-item-container position-marker"><PositionColorMarker key={`positionColorMarker-${row.id}`} positionIndex={index} /></div>
                <div className="cell-item-container position-number"><span key={`positionNum-${row.id}`}>{index+1}</span></div>
                <div className="cell-item-container crest"><img key={`teamCrest-${row.id}`} src={row.crest} className="table-crest" /></div>
                <div className="cell-item-container team-name"><span key={`teamName-${row.id}`}>{row.name}</span></div>
    
            </React.Fragment>
        );

        rows[index].unshift(teamInfoCell);
    });

    return (
        <div className="leaderboard-container">
            <LeaderboardTable
                headings={headings}
                rows={rows}
            />
        </div>
    );
};

Leaderboard.propTypes = {
    // TODO !!!
};

export default Leaderboard;