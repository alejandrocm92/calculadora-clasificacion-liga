import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button } from '@material-ui/core';
import { setPropsAsInitialValues } from '../../helpers/setPropsAsInitialValues';
import './styles.css';

const fieldIsPositiveNumber = value => (
    (isNaN(Number(value)) || Number(value) < 0) && "Field must be a number above zero"
);

const MatchDayBody = ({matches, teamsData, onScoreFieldChange}) => {
    return (
        <div className="match-day-container">
            <form>
                {
                    matches.map(match => (
                        <div className="match-container">
                            <div className="input-container-left">
                                <div><label>{teamsData[match.homeTeamID].name}</label></div>
                                <div className="match-input-container">
                                    <Field
                                        key={`home-${match.homeTeamID}_${match.awayTeamID}`}
                                        name={`home-${match.homeTeamID}_${match.awayTeamID}`}
                                        component="input"
                                        type="number"
                                        className="match-input"
                                        validate={fieldIsPositiveNumber}
                                        onChange={onScoreFieldChange}
                                        defaultValue="0"
                                    >
                                    </Field>
                                </div>
                            </div>
                            <div className="input-container-right">
                                <div className="match-input-container">
                                    <Field
                                        key={`away-${match.homeTeamID}_${match.awayTeamID}`}
                                        name={`away-${match.homeTeamID}_${match.awayTeamID}`}
                                        component="input"
                                        type="number"
                                        className="match-input"
                                        validate={fieldIsPositiveNumber}
                                        onChange={onScoreFieldChange}
                                        defaultValue="0"
                                    >
                                    </Field>
                                </div>
                                <div><label>{teamsData[match.awayTeamID].name}</label></div>
                            </div>
                        </div>
                    ))  
                }
            </form>
        </div>
    );
};

export default setPropsAsInitialValues(reduxForm({ form: "matchDayEdit", enableReinitialize: true })(MatchDayBody));