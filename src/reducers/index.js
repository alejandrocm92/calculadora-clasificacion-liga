import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import { fixtures, _getSelectedMatchDay, _getAllScores } from './fixtures.js';
import { createSelector } from 'reselect';

// TODO: additional reducers will be added on future modifications.
export default combineReducers({
    fixtures,
    form: reduxForm
});

/* General selectors */

// Do not pass on to the selector the whole state, just the state slice it manages. Further state slices will be managed on future changes.
export const getAllScores = state => (
    _getAllScores(state.fixtures)
);

// Do not pass on to the selector the whole state, just the state slice it manages. Further state slices will be managed on future changes.
export const getSelectedMatchDay = (state) => (
    _getSelectedMatchDay(state.fixtures)
);

export const getMatchDayScores = createSelector(
    state => _getAllScores(state.fixtures),
    getSelectedMatchDay,
    (scores, selectedMatchDay) => {
        return scores.filter(score => score.matchDay === selectedMatchDay) || [];
    }
)