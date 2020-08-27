import React from 'react';
import { ReactWrapper } from 'enzyme';
import {
    mountMockComponent,
    storeMock
} from '../../shared/tools/enzyme.tool';
import { TestTaskActionsTypes as TestTypes } from './store/test-task.model';
import { testTaskUserActions as testUserActions } from './store/test-task.user.actions';
import { TestTaskPage } from './test-task.page';

/**
 * Unit test scenarios for TestTaskPage
 */
describe('page: TestTaskPage', () => {

    let component: ReactWrapper;

    beforeEach(() => {
        storeMock.resetCalledActions();
    });

    afterEach(() => {
        component && component.length && component.unmount();
    });

    function initiateComponent() {
        component = mountMockComponent(<TestTaskPage />);

        return {
            page: component.find('[data-test-id="test-task-page"]').at(0),
        };
    }

    it('should compile TestTaskPage without errors', () => {
        const elements = initiateComponent();
        expect(component.exists()).toBeTruthy();
        expect(elements.page.exists()).toBeTruthy();
    });

    it('should dispatch action to indicate that user opened page', () => {
        expect(storeMock.getCalledActionByType(TestTypes.TEST_TASK_PAGE_OPENED)).toEqual(undefined);
        initiateComponent();
        expect(storeMock.getCalledActionByType(TestTypes.TEST_TASK_PAGE_OPENED))
            .toEqual(testUserActions.pageOpened());
    });

    it('should dispatch action to indicate that user left page', () => {
        expect(storeMock.getCalledActionByType(TestTypes.TEST_TASK_PAGE_LEFT)).toEqual(undefined);
        initiateComponent();
        component.unmount();
        expect(storeMock.getCalledActionByType(TestTypes.TEST_TASK_PAGE_LEFT))
            .toEqual(testUserActions.pageLeft());
    });

});
