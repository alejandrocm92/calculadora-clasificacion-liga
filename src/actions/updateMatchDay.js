export const SET_SCORE = 'SET_SCORE';
export const SET_INITIAL_SCORES = 'SET_INITIAL_SCORES';
export const SET_MATCHDAY = 'SET_MATCHDAY';

export const setScore = payload => ({type: SET_SCORE, payload});
export const setMatchDay = payload => ({type: SET_MATCHDAY, payload});

export const setInitialData = payload => ({type: SET_INITIAL_SCORES, payload});