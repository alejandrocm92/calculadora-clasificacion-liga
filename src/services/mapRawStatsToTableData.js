import { TABLE_CELLS_MAP } from "../constants/index.js";

const mapRawStatsToTableData = leaderboardData => {

    let table = {
        "stats": [],
        "columns": []
    };

    TABLE_CELLS_MAP.forEach(value =>
        table.columns.push(value.columnName)
    );


    leaderboardData.forEach(statsRow => {
        let tableStatsRow = [];
        
        TABLE_CELLS_MAP.forEach(value => {
            if (typeof value.rawKey === "undefined") {
                return;
            }
            
            let rawValue = statsRow[value.rawKey];
            tableStatsRow.push(rawValue);
        });

        
        table.stats.push(tableStatsRow);
    });

    return table;
}

export default mapRawStatsToTableData;