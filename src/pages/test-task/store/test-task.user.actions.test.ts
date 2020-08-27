import { TestTaskActionsTypes as Types } from './test-task.model';
import {
    TestTaskUserActionsTypes,
    testTaskUserActions
} from './test-task.user.actions';
import { TableItem } from '../test-api.service';
import { tableItemMock } from './test-task.mock';

/**
 * Unit test scenarios for test-task user actions
 */
describe('actions: testTaskUserActions', () => {

    let action: TestTaskUserActionsTypes;
    let cell: TableItem;

    beforeEach(() => {
        cell = { ...tableItemMock };
    });

    it('should create cellClicked action', () => {
        action = testTaskUserActions.cellClicked(cell);
        expect(action.type).toBe(Types.CELL_CLICKED);
        expect(action.payload).toBe(cell);
    });

    it('should create pageLeft action', () => {
        action = testTaskUserActions.pageLeft();
        expect(action.type).toBe(Types.TEST_TASK_PAGE_LEFT);
        expect(action.payload).toBe(undefined);
    });

    it('should create pageOpened action', () => {
        action = testTaskUserActions.pageOpened();
        expect(action.type).toBe(Types.TEST_TASK_PAGE_OPENED);
        expect(action.payload).toBe(undefined);
    });

});
