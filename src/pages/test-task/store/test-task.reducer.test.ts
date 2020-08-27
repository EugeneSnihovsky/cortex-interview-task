import { CONSTANTS } from '../../../shared/constants';
import { TableItem } from '../test-api.service';
import {
    TestTaskActions,
    TestTaskState,
    testTaskStateInitial
} from './test-task.model';
import { tableItemMock } from './test-task.mock';
import { testTaskUserActions as testUserActions } from './test-task.user.actions';
import { testTaskServiceActions as testServiceActions } from './test-task.service.actions';
import { testTaskReducer } from './test-task.reducer';

/**
 * Unit test scenarios for testTaskReducer
 */
describe('reducer: testTaskReducer', () => {

    let action: TestTaskActions;
    let initialState: TestTaskState;
    let state: TestTaskState;
    let cell: TableItem;
    let cell2: TableItem;

    beforeEach(() => {
        initialState = { ...testTaskStateInitial };
        cell = { ...tableItemMock };
        cell2 = { x: 55, y: 55, n: 500 };
    });

    it('should return default state', () => {
        expect(testTaskReducer(initialState, {} as any)).toEqual<TestTaskState>(initialState);
    });

    describe('case: CELL_CLICKED', () => {

        it('should add clicked cell to state if cell is not in list', () => {
            action = testUserActions.cellClicked(cell);
            initialState.clickedCells = [];
            state = testTaskReducer(initialState, action);
            expect(state.clickedCells).toEqual([ cell ]);
        });

        it('should not add clicked cell to state if cell is already in list', () => {
            action = testUserActions.cellClicked(cell);
            initialState.clickedCells = [ cell2 ];
            state = testTaskReducer(initialState, action);
            state = testTaskReducer({ ...state }, action);
            state = testTaskReducer({ ...state }, action);
            expect(state.clickedCells).toEqual([ cell2, cell ]);
        });

    });

    describe('case: REMOVE_TABLE_CELL', () => {

        it('should remove destroyed cell from clicked list', () => {
            action = testServiceActions.removeTableCell({ x: cell.x, y: cell.y });
            initialState.clickedCells = [ cell, cell2 ];
            state = testTaskReducer(initialState, action);
            expect(state.clickedCells).toEqual([ cell2 ]);
        });

        it('should remove destroyed cell from table matrix', () => {
            action = testServiceActions.removeTableCell({ x: 1, y: 1 });
            initialState.testTable = [ [ 1, 2 ], [ 3, 4 ] ];
            state = testTaskReducer(initialState, action);
            expect(state.testTable).toEqual([ [ 1, 2 ], [ 3, null ] ]);
        });

    });

    describe('case: TABLE_DATA_UPDATED', () => {

        it('should update cell info in clicked list', () => {
            action = testServiceActions.tableDataUpdated({ x: cell.x, y: cell.y, n: 5542 });
            initialState.clickedCells = [ cell, cell2 ];
            state = testTaskReducer(initialState, action);
            expect(state.clickedCells).toEqual([ { x: cell.x, y: cell.y, n: 5542 }, cell2 ]);
        });

        it('should update cell info in table matrix', () => {
            action = testServiceActions.tableDataUpdated({ x: 1, y: 1, n: 55 });
            initialState.testTable = [ [ 1, 2 ], [ 3, 4 ] ];
            state = testTaskReducer(initialState, action);
            expect(state.testTable).toEqual([ [ 1, 2 ], [ 3, 55 ] ]);
        });

    });

    describe('case: TEST_TASK_PAGE_LEFT', () => {

        it('should remove current page flag when user left page', () => {
            action = testUserActions.pageLeft();
            initialState.isPageOpened = true;
            state = testTaskReducer(initialState, action);
            expect(state.isPageOpened).toEqual(false);
        });

    });

    describe('case: TEST_TASK_PAGE_OPENED', () => {

        it('should prepare initial table matrix data when user open page', () => {
            action = testUserActions.pageOpened();
            initialState.testTable = null;
            state = testTaskReducer(initialState, action);
            expect(state.testTable)
                .toEqual(Array(CONSTANTS.TABLE_LENGTH.X).fill(Array(CONSTANTS.TABLE_LENGTH.Y).fill(null)));
        });

        it('should add current page flag when user open page', () => {
            action = testUserActions.pageOpened();
            initialState.isPageOpened = false;
            state = testTaskReducer(initialState, action);
            expect(state.isPageOpened).toEqual(true);
        });

    });

});
