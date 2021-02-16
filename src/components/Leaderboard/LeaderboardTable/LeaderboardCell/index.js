import React from 'react';
import './styles.css';

const Cell = ({header, content}) => {
    const cellMarkup = header ? (
        <th className="cell cell-header-x">
            { content }
        </th>
    ) :
    (
        <td className="cell">
            { content }
        </td>
    );
    
    return (
        cellMarkup
    );
}

export default Cell;