import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Leaderboard from '../components/Leaderboard';
import { getAllScores } from '../reducers';

// Import auxiliary functions for calculation and transformations of data.
import { calculateLeaderboardData } from '../services/calculateLeaderboardData.js';
import mapRawStatsToTableData from '../services/mapRawStatsToTableData.js';

class LeaderboardContainer extends Component {
    render() {
        const rawLeaderboardData = calculateLeaderboardData(this.props.scores, this.props.teamsData);
        const leaderboardData = mapRawStatsToTableData(rawLeaderboardData);

        // Get teams data for column containing team info.
        const teamsData = [];

        rawLeaderboardData.forEach(row => {
            let teamsDataObj = this.props.teamsData.find(teamObj => teamObj.id === row.teamID);
            teamsData.push(teamsDataObj);
        });

        return (
            <div>
                <Leaderboard
                    headings={leaderboardData.columns}
                    rows={leaderboardData.stats}
                    teamsData={teamsData}
                />
            </div>
        );
    }
}

LeaderboardContainer.propTypes = {
    // TODO!!!
};

const mapStateToProps = state => (
    {
        scores: getAllScores(state)
    }
);

export default connect(mapStateToProps)(LeaderboardContainer);