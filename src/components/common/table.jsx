import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = ({ columns, onSort, sortColumn, data }) => {
    return (
        <table className="table">
            <TableHeader columns={columns}
                onSort={onSort}
                sortColumn={sortColumn} />
            
            <TableBody data={data}
                columns={columns} />
                </table>
     );
}
 
export default Table;