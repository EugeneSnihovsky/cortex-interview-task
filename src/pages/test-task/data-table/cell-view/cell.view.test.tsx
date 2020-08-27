import React from 'react';
import { ReactWrapper } from 'enzyme';
import {
    mountMockComponent,
    storeMock
} from '../../../../shared/tools/enzyme.tool';
import { TestTaskActionsTypes as TestTypes } from '../../store/test-task.model';
import { testTaskServiceActions as testServiceActions } from '../../store/test-task.service.actions';
import { tableItemMock } from '../../store/test-task.mock';
import { CellView } from './cell.view';
import { TableItem } from '../../test-api.service';

/**
 * Unit test scenarios for CellView
 */
describe('page: CellView', () => {

    let component: ReactWrapper;
    let cell: TableItem;

    beforeEach(() => {
        storeMock.resetCalledActions();
        cell = { ...tableItemMock };
    });

    afterEach(() => {
        component && component.length && component.unmount();
    });

    function initiateComponent(cellData?: TableItem) {
        cellData = cellData || cell;
        component = mountMockComponent(
            <CellView className='xxx'
                      x={ cellData.x }
                      y={ cellData.y }
                      data={ cellData.n } />
        );

        return {
            cell: component.find('[data-test-id="cell-item"]').at(0),
        };
    }

    it('should compile CellView without errors', () => {
        const elements = initiateComponent();
        expect(component.exists()).toBeTruthy();
        expect(elements.cell.exists()).toBeTruthy();
    });

    it('should not render CellView if cell data is not exist', () => {
        const elements = initiateComponent({ ...cell, n: null });
        expect(elements.cell.exists()).toBeFalsy();
    });

    it('should dispatch action to remove cell info after timeout exceeded if cell data exists', () => {
        jest.useFakeTimers();
        initiateComponent(cell);
        expect(storeMock.getCalledActionByType(TestTypes.REMOVE_TABLE_CELL)).toEqual(undefined);
        jest.runAllTimers();
        expect(storeMock.getCalledActionByType(TestTypes.REMOVE_TABLE_CELL))
            .toEqual(testServiceActions.removeTableCell({ x: cell.x, y: cell.y }));
        jest.useRealTimers();
    });

    it('should not dispatch action to remove cell info after timeout exceeded if cell data not exists', () => {
        jest.useFakeTimers();
        initiateComponent({ ...cell, n: null });
        jest.runAllTimers();
        expect(storeMock.getCalledActionByType(TestTypes.REMOVE_TABLE_CELL)).toEqual(undefined);
        jest.useRealTimers();
    });

});
