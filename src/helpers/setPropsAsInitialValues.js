import React, { Component } from 'react';

// Define Higher Order Component.
export const setPropsAsInitialValues = WrappedComponent => (
    class extends Component {
        render() {
            return <WrappedComponent
                {...this.props}
                initialValues={
                    (() => {
                        var initialValuesObj = {};

                        this.props.matchDayScores.forEach(scoreObj => {
                                initialValuesObj['home-'+scoreObj.homeTeamID+'_'+scoreObj.awayTeamID] = scoreObj.homeTeamScore;
                                initialValuesObj['away-'+scoreObj.homeTeamID+'_'+scoreObj.awayTeamID] = scoreObj.awayTeamScore;
                            }
                        );

                        return initialValuesObj;
                    })()
                }></WrappedComponent>
        }
    }
);