import React, {
    FC,
    useEffect
} from 'react';
import { connect } from 'react-redux';
import { testTaskUserActions as testUserActions } from './store';
import { DataTable } from './data-table/data.table';
import { ClickedCellsComponent } from './clicked-cells/clicked-cells.component';
import './test-task.page.scss';

const mapDispatchToProps = (dispatch: Function) => ({
    pageLeft: () => dispatch(testUserActions.pageLeft()),
    pageOpened: () => dispatch(testUserActions.pageOpened()),
});

const ConnectedTestTaskPage: FC<{
    pageLeft: () => void;
    pageOpened: () => void;
}> = ({
    pageLeft,
    pageOpened,
}) => {

    useEffect(() => {
        pageOpened();
        return () => pageLeft();
    }, []); // eslint-disable-line

    return (
        <div className='test-task-page'
             data-test-id='test-task-page'>
            <div className='test-task-page-clicked-view'>
                <ClickedCellsComponent />
            </div>

            <div className='test-task-page-table-view'>
                <DataTable />
            </div>
        </div>
    );

};

/**
 * Represents test task page
 */
export const TestTaskPage = connect(null, mapDispatchToProps)(ConnectedTestTaskPage);
