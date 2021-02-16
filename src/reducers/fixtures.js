import { SET_SCORE, SET_MATCHDAY, SET_INITIAL_SCORES } from '../actions/updateMatchDay.js';

const initialState = {
    selectedMatchDay: 1
};

export const fixtures = (state = initialState, action) => {
    switch (action.type) {
        case SET_SCORE:
            const scoreObj = state.scores ?
                state.scores.find(scoreObj => scoreObj.homeTeamID === action.payload.homeTeamID &&
                scoreObj.awayTeamID === action.payload.awayTeamID) : undefined;

            const currentHomeTeamScore = scoreObj ? Number(scoreObj.homeTeamScore) : 0;
            const currentAwayTeamScore = scoreObj ? Number(scoreObj.awayTeamScore) : 0;

            const homeTeamScore = action.payload.isHomeAwayUpdated === 'home' ? Number(action.payload.newScore) : currentHomeTeamScore;
            const awayTeamScore = action.payload.isHomeAwayUpdated === 'away' ? Number(action.payload.newScore) : currentAwayTeamScore;

            const updatedScoreObj = {
                matchDay: state.selectedMatchDay,
                homeTeamID: action.payload.homeTeamID,
                awayTeamID: action.payload.awayTeamID,
                homeTeamScore,
                awayTeamScore
            };


            const scoreFoundInState = state.scores ?
                state.scores.findIndex(scoreObj => scoreObj.homeTeamID === action.payload.homeTeamID &&
                scoreObj.awayTeamID === action.payload.awayTeamID) : undefined;

            return {
                ...state,
                scores: state.scores ?
                    (scoreFoundInState >= 0 ?
                        state.scores.map(
                            currentScoreObj => (
                                currentScoreObj.homeTeamID === action.payload.homeTeamID &&
                                    currentScoreObj.awayTeamID === action.payload.awayTeamID ?
                                    updatedScoreObj : currentScoreObj
                                )
                        ) : [...state.scores, updatedScoreObj])
                    : []
            };

        case SET_INITIAL_SCORES:
            return {
                ...state,
                scores: action.payload
            };

        case SET_MATCHDAY:
            return {
                ...state,
                selectedMatchDay: state.selectedMatchDay + action.payload
            };
            
        default:
            return state;
    }
}

/* Slice selectors */
export const _getSelectedMatchDay = state => state.selectedMatchDay;
export const _getAllScores = state => state.scores || [];