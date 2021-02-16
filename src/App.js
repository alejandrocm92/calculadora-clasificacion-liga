import React from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Row } from 'react-flexbox-grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import './App.css';
import { setInitialData } from './actions/updateMatchDay.js';
import MatchdayEditContainer from './containers/MatchDayEditContainer.js';
import LeaderboardContainer from './containers/LeaderboardContainer';

let matchesLoadedFromServer = null;
let teamsData = null;

class App extends React.Component {

  componentDidMount() {
    const matches = 'http://localhost/scrapper';

    // Fetch data from API. This data does not live in the state since it is immutable during the execution of the app, hence we just need to pass it around as props.
    fetch(matches)
      .then((response) => response.json())
      .then((response) => {
        matchesLoadedFromServer = response.fixturesData;
        teamsData = response.teamsData;
        
        // We want to store in state only those matches with a score.
        const filteredMatches = matchesLoadedFromServer.filter(matchData =>
          matchData.homeTeamScore !== null && matchData.awayTeamScore !== null
        );

        // DEV NOTE: not using Thunk to dispatch action asynchronously because we want matches data object (along with teams data object) to be passed around as props as mentioned previously, as it is immutable data and therefore it makes no sense for it to be kept in state, so we want to have data loaded at this stage so we can pass it as props. The only purpose of this action is to set in state those scores that have a non-null value).
        this.props.setInitialData(filteredMatches);

        this.forceUpdate();
      });
  }

  render() {
    return (
      <Grid>
        <Row>
          <AppBar position='relative'>
            <Toolbar>
              League Table Calculator
            </Toolbar>
          </AppBar>
        </Row>
        <Row>
        <Col xs={0} md={2}></Col>
        <Col xs={12} md={8}>
  
        {
          matchesLoadedFromServer === null || teamsData === null ?
            "LOADING" :
            <MatchdayEditContainer
              matchesLoadedFromServer={matchesLoadedFromServer}
              teamsData={teamsData}
            />
        }
          
        </Col>
        <Col xs={0} md={2}></Col>
        </Row>
        <Row>
          <Col xs={0} md={2}></Col>
          <Col xs={12} md={8}>

          {
            matchesLoadedFromServer === null || teamsData === null ?
              "" :
              <LeaderboardContainer teamsData={teamsData} />
          }
          </Col>
          <Col xs={0} md={2}></Col>
        </Row>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setInitialData: value => dispatch(setInitialData(value))
});

export default connect(null, mapDispatchToProps)(App);
