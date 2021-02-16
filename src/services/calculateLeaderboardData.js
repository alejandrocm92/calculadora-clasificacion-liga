export const calculateLeaderboardData = (scores, teamsData) => {
    //var t0 = performance.now()

    let matchesStats = getTeamsStats(scores, null, teamsData);

    let leaderboardArr = getTeamsSortedByField(matchesStats); // Get leaderboard sorted by points.

    // In case of points draw...
    let subsetsPointsDraw = getSubsetsDraw(leaderboardArr, 'points', true); // Get IDs of any teams that have matching points in leaderboard.

    // Check first criteria: points of crossed matches of teams in subset.
    // Iterate through each subset found.
    subsetsPointsDraw.forEach(subset => {
        // Get stats for specific subset and sort by criteria.
        let subsetStats = getTeamsStats(scores, subset, teamsData, true);
        let subsetLeaderboardArr = getTeamsSortedByField(subsetStats, 'points'); // Get leaderboard for group of teams in subset.

        let leaderboardArrAlt = [...leaderboardArr];
        let subsetLeaderboardArrAlt = [...subsetLeaderboardArr];
        leaderboardArr = leaderboardArr.map(lbItem => {
            if (subsetLeaderboardArr.find(slbItem => slbItem.teamID === lbItem.teamID) !== undefined) {
                leaderboardArrAlt.shift();
                let subsetPopped = subsetLeaderboardArrAlt.shift();
                return leaderboardArr.find(team => team.teamID == subsetPopped.teamID);
            } else {
                return leaderboardArrAlt.shift();
            }
        });

        let innerSubsetsPointsDraw = getSubsetsDraw(subsetLeaderboardArr); // Get any teams that have matching points in subset.


        // Check second criteria: difference of goals for/against
        innerSubsetsPointsDraw.forEach(innerSubset => {
            let subsetStats = getTeamsStats(scores, innerSubset, teamsData);
            let subsetLeaderboardArr = getTeamsSortedByField(subsetStats, 'goalsDiff'); // Get leaderboard for group of teams in subset by goals difference criteria.
            let leaderboardArrAlt = [...leaderboardArr];
            let subsetLeaderboardArrAlt = [...subsetLeaderboardArr];
            leaderboardArr = leaderboardArr.map(lbItem => {
                // Check whether leaderboard team is in subset.
                if (subsetLeaderboardArr.find(slbItem => slbItem.teamID === lbItem.teamID) !== undefined) {
                    leaderboardArrAlt.shift();
                    let subsetPopped = subsetLeaderboardArrAlt.shift();
                    return leaderboardArr.find(team => team.teamID == subsetPopped.teamID);
                } else {
                    return leaderboardArrAlt.shift();
                }
            });

            let innerSubsetsGoalsDiffDraw = getSubsetsDraw(subsetLeaderboardArr, 'goalsDiff'); // Get any teams that have matching goalsDiff in subset.

            innerSubsetsGoalsDiffDraw.forEach(innerSubset => {
                let subsetLeaderboardArr = getTeamsSortedByField(matchesStats, 'goalsDiff', innerSubset);

                let leaderboardArrAlt = [...leaderboardArr];
                let subsetLeaderboardArrAlt = [...subsetLeaderboardArr];
                leaderboardArr = leaderboardArr.map(lbItem => {
                    if (subsetLeaderboardArr.find(slbItem => slbItem.teamID === lbItem.teamID) !== undefined) {
                        leaderboardArrAlt.shift();
                        let subsetPopped = subsetLeaderboardArrAlt.shift();
                        return leaderboardArr.find(team => team.teamID == subsetPopped.teamID);
                    } else {
                        return leaderboardArrAlt.shift();
                    }
                });

            });
            
        });
    });

    return leaderboardArr;
}

// Some auxiliary functions...

/*
 * Get leaderboard sorted by criteria as an array.
 */
const getTeamsSortedByField = (matchesStats, sortField='points', teamsFilter=null) => {
    let leaderboardArr = [];

    matchesStats.forEach((teamData, teamID) => {
        if (teamsFilter !== null) {
            if (teamsFilter.includes(teamID) === false) {
                return;
            }
        }
        
        leaderboardArr.push({teamID, ...teamData});
    });

    leaderboardArr.sort((itemA, itemB) => itemB[sortField] - itemA[sortField]);

    return leaderboardArr;
}

/*
 * Get stats for each team according to provided match scores object and team filter.
 */
const getTeamsStats = (scores, teamsFilter=null, teamsData=null) => {

    if (teamsFilter !== null) {
        scores = scores.filter(item => {
            return teamsFilter.includes(item.homeTeamID) && teamsFilter.includes(item.awayTeamID);
        });

        teamsData = teamsData.filter(team => (
            teamsFilter.includes(team.id)
        ));
    }

    let leaderboardTeamStats = [];

   // Initialize stats initial object.
    let initialLeaderboardTeamStats = {
        matchesPlayed: 0,
        points: 0,
        goalsDiff: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        matchesWon: 0,
        matchesDrawn: 0,
        matchesLost: 0
    };

    // Initialize teams stats array.
    teamsData.forEach(team => {
        leaderboardTeamStats[team.id] = initialLeaderboardTeamStats;
    });

    scores.forEach(scoreObj => {
        let matchHomePoints = 0;
        let matchAwayPoints = 0;

        if (scoreObj.homeTeamScore > scoreObj.awayTeamScore) {
            matchHomePoints = 3;
        } else if (scoreObj.homeTeamScore < scoreObj.awayTeamScore) {
            matchAwayPoints = 3;
        } else {
            matchHomePoints = 1;
            matchAwayPoints = 1;
        }

        if (leaderboardTeamStats[scoreObj.homeTeamID] === undefined) {
            leaderboardTeamStats[scoreObj.homeTeamID] = initialLeaderboardTeamStats;
        }

        if (leaderboardTeamStats[scoreObj.awayTeamID] === undefined) {
            leaderboardTeamStats[scoreObj.awayTeamID] = initialLeaderboardTeamStats;
        }

        leaderboardTeamStats[scoreObj.homeTeamID] = {
            matchesPlayed: leaderboardTeamStats[scoreObj.homeTeamID].matchesPlayed+1,
            points: leaderboardTeamStats[scoreObj.homeTeamID].points + matchHomePoints,
            goalsFor: leaderboardTeamStats[scoreObj.homeTeamID].goalsFor + Number(scoreObj.homeTeamScore),
            goalsAgainst: leaderboardTeamStats[scoreObj.homeTeamID].goalsAgainst + Number(scoreObj.awayTeamScore),
            matchesWon: leaderboardTeamStats[scoreObj.homeTeamID].matchesWon + (scoreObj.homeTeamScore > scoreObj.awayTeamScore ? 1 : 0),
            matchesDrawn: leaderboardTeamStats[scoreObj.homeTeamID].matchesDrawn + (scoreObj.homeTeamScore === scoreObj.awayTeamScore ? 1 : 0),
            matchesLost: leaderboardTeamStats[scoreObj.homeTeamID].matchesLost + (scoreObj.homeTeamScore < scoreObj.awayTeamScore ? 1 : 0),
        }

        // Derived fields...
        leaderboardTeamStats[scoreObj.homeTeamID].goalsDiff = leaderboardTeamStats[scoreObj.homeTeamID].goalsFor - leaderboardTeamStats[scoreObj.homeTeamID].goalsAgainst;

        leaderboardTeamStats[scoreObj.awayTeamID] = {
            matchesPlayed: leaderboardTeamStats[scoreObj.awayTeamID].matchesPlayed+1,
            points: leaderboardTeamStats[scoreObj.awayTeamID].points + matchAwayPoints,
            goalsFor: leaderboardTeamStats[scoreObj.awayTeamID].goalsFor + Number(scoreObj.awayTeamScore),
            goalsAgainst: leaderboardTeamStats[scoreObj.awayTeamID].goalsAgainst + Number(scoreObj.homeTeamScore),
            matchesWon: leaderboardTeamStats[scoreObj.awayTeamID].matchesWon + (scoreObj.homeTeamScore < scoreObj.awayTeamScore ? 1 : 0),
            matchesDrawn: leaderboardTeamStats[scoreObj.awayTeamID].matchesDrawn + (scoreObj.homeTeamScore === scoreObj.awayTeamScore ? 1 : 0),
            matchesLost: leaderboardTeamStats[scoreObj.awayTeamID].matchesLost + (scoreObj.homeTeamScore > scoreObj.awayTeamScore ? 1 : 0),
        }

        // Derived fields...
        leaderboardTeamStats[scoreObj.awayTeamID].goalsDiff = leaderboardTeamStats[scoreObj.awayTeamID].goalsFor - leaderboardTeamStats[scoreObj.awayTeamID].goalsAgainst;
    });

    return leaderboardTeamStats;
}

/*
 * Get subset of teams with matching points given a leaderboard array.
 */
const getSubsetsDraw = (leaderboardArr, criteria='points', ignoreNoMatchesPlayed=false) => {
    let subset = [];
    let skipCounter=0;

    // Get subset of teams with a draw.
    leaderboardArr.forEach((item, index) => {

        if (item['matchesPlayed'] === 0 && ignoreNoMatchesPlayed === true) {
            return;
        }

        if (skipCounter > 0) {
            skipCounter--;
            return;
        }

        if (leaderboardArr[index+1] !== undefined && item[criteria] === leaderboardArr[index+1][criteria]) {
            let subsetIDs = leaderboardArr.filter(itemFilter => (
                (itemFilter['matchesPlayed'] > 0 || (itemFilter['matchesPlayed'] === 0 &&
                ignoreNoMatchesPlayed === false)) &&
                itemFilter[criteria] === item[criteria])
            ).map(itemMap => itemMap.teamID);
            skipCounter = subsetIDs.length;
            subset.push(subsetIDs);
        }
    });

    return subset;
}