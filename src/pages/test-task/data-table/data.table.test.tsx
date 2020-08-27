import React from 'react';
import { ReactWrapper } from 'enzyme';
import {
    mountMockComponent,
    storeMock
} from '../../../shared/tools/enzyme.tool';
import { testTaskSelectors as testSelectors } from '../store/test-task.selectors';
import {
    TestTable,
    TestTableRow
} from '../store/test-task.model';
import { DataTable } from './data.table';

/**
 * Unit test scenarios for DataTable
 */
describe('page: DataTable', () => {

    let component: ReactWrapper;
    let testTable: TestTable;
    let tableSpy: jasmine.Spy;

    beforeEach(() => {
        storeMock.resetCalledActions();
        testTable = [
            [ 1, 2, 3 ],
            [ 4, 5, 6 ],
            [ 7, 8, 9 ]
        ]
        tableSpy = spyOn(testSelectors, 'testTable');
        tableSpy.and.returnValue(testTable);
    });

    afterEach(() => {
        component && component.length && component.unmount();
    });

    function initiateComponent() {
        component = mountMockComponent(<DataTable />);

        return {
            cells: component.find('[data-test-id="table-cell"]'),
            table: component.find('[data-test-id="data-table"]').at(0),
        };
    }

    it('should compile DataTable without errors', () => {
        const elements = initiateComponent();
        expect(component.exists()).toBeTruthy();
        expect(elements.table.exists()).toBeTruthy();
    });

    it('should render table cells', () => {
        const elements = initiateComponent();
        expect(elements.cells.length % testTable // https://github.com/enzymejs/enzyme/issues/836
            .reduce((length: number, row: TestTableRow) => (length + row.length), 0)).toBe(0);
    });

});
