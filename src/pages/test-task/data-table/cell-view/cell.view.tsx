import React, {
    FC,
    useEffect
} from 'react';
import { connect } from 'react-redux';
import { CONSTANTS } from '../../../../shared/constants';
import { TableItem } from '../../test-api.service';
import {
    RemoveCellCoordinates,
    TestTableCell,
    testTaskServiceActions as testServiceActions,
    testTaskUserActions as testUserActions
} from '../../store';
import './cell.view.scss';

const mapDispatchToProps = (dispatch: Function) => ({
    onCellClicked: (cell: TableItem) => dispatch(testUserActions.cellClicked(cell)),
    removeCell: (coordinates: RemoveCellCoordinates) => dispatch(testServiceActions.removeTableCell(coordinates)),
});

const ConnectedCellView: FC<{
    className: string;
    data: TestTableCell;
    onCellClicked: (cell: TableItem) => void;
    removeCell: (coordinates: RemoveCellCoordinates) => void;
    x: number;
    y: number;
}> = ({
    className,
    data,
    onCellClicked,
    removeCell,
    x,
    y
}) => {

    const colorClass: string = (data) && ((data > 0) ? 'cell-positive' : 'cell-negative');

    useEffect(() => {
        let timerId;
        if (data) {
            timerId= setTimeout(() => removeCell({ x: x, y: y }), CONSTANTS.TABLE_CELL_DESTROY_TIMEOUT);
        }
        return () => timerId && clearInterval(timerId)
    }, [ data ]); // eslint-disable-line

    return (!data) ? null : (
        <div className={ `${ className } ${ colorClass } cell-view` }
             onClick={ () => onCellClicked({ n: data, x: x, y: y }) }
             data-test-id='cell-item'>
            { data }
        </div>
    );

};

/**
 * Represents test task table cell
 */
export const CellView = connect(null, mapDispatchToProps)(ConnectedCellView);
