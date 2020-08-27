import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../bootstrap/root.store';
import { TableItem } from '../test-api.service';
import { testTaskSelectors as testSelectors } from '../store';
import './clicked-cells.component.scss';

const mapStateToProps = (root: RootState) => ({
    clickedCells: testSelectors.clickedCells(root),
});

const ConnectedClickedCellsComponent: FC<{
    clickedCells: Array<TableItem>;
}> = ({
    clickedCells,
}) => {

    return (
        <div className='clicked-cells'
             data-test-id='clicked-cells'>
            <h5 className='clicked-cells-title'>
                Clicked cells
            </h5>

            { clickedCells.map((clickedCell: TableItem, i: number) => (
                <div className='clicked-cells-item'
                     key={ i }
                     data-test-id='cell-item'> { clickedCell.n } </div>
            )) }
        </div>
    );

};

/**
 * Represents component with clicked table cells list
 */
export const ClickedCellsComponent = connect(mapStateToProps)(ConnectedClickedCellsComponent);
