import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../bootstrap/root.store';
import {
    TestTable,
    TestTableCell,
    TestTableRow,
    testTaskSelectors as testSelectors
} from '../store';
import { CellView } from './cell-view/cell.view';
import './data.table.scss';

const mapStateToProps = (root: RootState) => ({
    testTable: testSelectors.testTable(root),
});

const ConnectedDataTable: FC<{
    testTable: TestTable;
}> = ({
    testTable,
}) => {

    return (
        <table className='data-table' data-test-id='data-table'>
            <tbody>
            { testTable.map((row: TestTableRow, i: number) => (
                <tr className='data-table-row' key={ i }>
                    { row.map((cell: TestTableCell, j: number) => (
                        <td className='data-table-row-cell' key={ j }>
                            <CellView className='data-table-row-cell-view'
                                      data={ cell }
                                      x={ i }
                                      y={ j }
                                      data-test-id='table-cell' />
                        </td>
                    )) }
                </tr>
            )) }
            </tbody>
        </table>
    );

};

/**
 * Represents test task data table
 */
export const DataTable = connect(mapStateToProps)(ConnectedDataTable);
