import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MatchDayHeader from '../components/MatchDayHeader';
import MatchDayBody from '../components/MatchDayBody/index.js';
import { setScore, setMatchDay } from '../actions/updateMatchDay.js';
import { getMatchDayScores, getSelectedMatchDay } from '../reducers' // Necessary selectors

class MatchdayEditContainer extends Component {

    getFixturesByMatchDay = () => (
        this.props.matchesLoadedFromServer.filter(match => match.matchDay === this.props.selectedMatchDay) || []
    );

    onScoreFieldChange = (event, newScore, previousValue, elementName) => {

        const elementNameParts = elementName.split('-');
        const isHomeAwayUpdated = elementNameParts[0];
        const fixtureKey = elementNameParts[1];

        const homeTeamID = Number(fixtureKey.split('_')[0]);
        const awayTeamID = Number(fixtureKey.split('_')[1]);

        // Trigger action.
        this.props.setScore({homeTeamID, awayTeamID, isHomeAwayUpdated, newScore});
    }

    onPrevMatchDayClicked = () => {
        if (this.props.selectedMatchDay === 1) {
            return;
        }

        this.props.setMatchDay(-1);
    }

    onNextMatchDayClicked = () => {
        this.props.setMatchDay(1);
    }

    render() {
        const { teamsData } = this.props;

        return (
            <div>
                <MatchDayHeader
                    selectedMatchDay={this.props.selectedMatchDay}
                    onPrevMatchDayClicked={this.onPrevMatchDayClicked}
                    onNextMatchDayClicked={this.onNextMatchDayClicked}
                ></MatchDayHeader>

                <MatchDayBody
                    matches={this.getFixturesByMatchDay()}
                    teamsData={teamsData || []}
                    matchDayScores={this.props.matchDayScores}
                    onScoreFieldChange={this.onScoreFieldChange}
                ></MatchDayBody>
            </div>
        );
    }
}

MatchdayEditContainer.propTypes = {
    // TODO!!!
};

const mapDispatchToProps = dispatch => ({
    setScore: value => dispatch(setScore(value)),
    setMatchDay: value => dispatch(setMatchDay(value))
});

const mapStateToProps = state => {
    return {
        selectedMatchDay: getSelectedMatchDay(state),
        matchDayScores: getMatchDayScores(state)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchdayEditContainer);