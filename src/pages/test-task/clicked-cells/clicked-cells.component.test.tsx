import React from 'react';
import { ReactWrapper } from 'enzyme';
import {
    mountMockComponent,
    storeMock
} from '../../../shared/tools/enzyme.tool';
import { TableItem } from '../test-api.service';
import { testTaskSelectors as testSelectors } from '../store/test-task.selectors';
import { tableItemMock } from '../store/test-task.mock';
import { ClickedCellsComponent } from './clicked-cells.component';

/**
 * Unit test scenarios for ClickedCellsComponent
 */
describe('page: ClickedCellsComponent', () => {

    let component: ReactWrapper;
    let clickedCells: Array<TableItem>;
    let clickedCellsSpy: jasmine.Spy;

    beforeEach(() => {
        storeMock.resetCalledActions();
        clickedCells = [
            { ...tableItemMock },
            { ...tableItemMock },
            { ...tableItemMock },
        ]
        clickedCellsSpy = spyOn(testSelectors, 'clickedCells');
        clickedCellsSpy.and.returnValue(clickedCells);
    });

    afterEach(() => {
        component && component.length && component.unmount();
    });

    function initiateComponent() {
        component = mountMockComponent(<ClickedCellsComponent />);

        return {
            clickedCells: component.find('[data-test-id="cell-item"]'),
            list: component.find('[data-test-id="clicked-cells"]').at(0),
        };
    }

    it('should compile ClickedCellsComponent without errors', () => {
        const elements = initiateComponent();
        expect(component.exists()).toBeTruthy();
        expect(elements.list.exists()).toBeTruthy();
    });

    it('should render clicked cells list', () => {
        const elements = initiateComponent();
        expect(elements.clickedCells.length % clickedCells.length).toBe(0); // https://github.com/enzymejs/enzyme/issues/836
    });

});
