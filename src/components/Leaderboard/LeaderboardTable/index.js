import React from 'react';
import Cell from './LeaderboardCell';
import './styles.css';

const LeaderboardTable = (props) => {
    const renderHeadingCell = (_cell, cellIndex) => {
        const { headings } = props;

        return (
            <Cell
                key = {`heading-${cellIndex}`}
                content = {headings[cellIndex]}
                header = {true}
            />
        )
    }
        
    const renderRow = (_row, rowIndex) => {
        const {rows} = props;

        return (
            <tr key={`row-${rowIndex}`}>
            {
                rows[rowIndex].map((_cell, cellIndex) => {
                    return (
                        <Cell
                            key={`${rowIndex}-${cellIndex}`}
                            content={rows[rowIndex][cellIndex]}
                        />
                    )
                })
            }
            </tr>
        )
    }

    const { headings, rows } = props;
    
    const theadMarkup = (
        <tr key="heading">
            { headings.map(renderHeadingCell) }
        </tr>
    );

    const tbodyMarkup = rows.map(renderRow);

    return (
        <table className="Table">
        <thead>{theadMarkup}</thead>
        <tbody>{tbodyMarkup}</tbody>
        </table>
    );
}

export default LeaderboardTable;