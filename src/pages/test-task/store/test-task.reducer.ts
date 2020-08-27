import { CONSTANTS } from '../../../shared/constants';
import { TableItem } from '../test-api.service';
import {
    TestTaskState,
    testTaskStateInitial,
    TestTaskActions,
    TestTaskActionsTypes as Types,
    RemoveCellCoordinates
} from './test-task.model';

/**
 * Redux reducer for test-task feature
 */
export function testTaskReducer(
    state: TestTaskState = testTaskStateInitial,
    action: TestTaskActions
): TestTaskState {

    switch (action.type) {

        case (Types.CELL_CLICKED): {
            const cell: TableItem = action.payload;
            const isCellAlreadyClicked: boolean = state.clickedCells
                .reduce((isClicked: boolean, item: TableItem) => {
                    return isClicked || ((item.x === cell.x) && (item.y === cell.y));
                }, false);

            return (isCellAlreadyClicked) ? state : {
                ...state,
                clickedCells: [
                    ...state.clickedCells,
                    action.payload
                ]
            };
        }

        case (Types.REMOVE_TABLE_CELL): {
            const cord: RemoveCellCoordinates = action.payload
            return {
                ...state,
                clickedCells: state.clickedCells
                    .filter((cell: TableItem) => !((cell.x === cord.x) && (cell.y === cord.y))),
                testTable: state.testTable
                    .map((row: Array<number>, i: number) => row
                        .map((cell: number, j: number) => ((cord.x === i) && (cord.y === j)) ? null : cell))
            };
        }

        case (Types.TABLE_DATA_UPDATED): {
            const cell: TableItem = action.payload;
            return {
                ...state,
                clickedCells: state.clickedCells
                    .map((item: TableItem) => ((cell.x === item.x) && (cell.y === item.y)) ? cell : item),
                testTable: state.testTable
                    .map((row: Array<number>, i: number) => row
                        .map((item: number, j: number) => ((cell.x === i) && (cell.y === j)) ? cell.n : item))
            };
        }

        case (Types.TEST_TASK_PAGE_LEFT): {
            return {
                ...state,
                isPageOpened: false
            };
        }

        case (Types.TEST_TASK_PAGE_OPENED): {
            return {
                ...state,
                isPageOpened: true,
                testTable: Array(CONSTANTS.TABLE_LENGTH.X).fill(Array(CONSTANTS.TABLE_LENGTH.Y).fill(null))
            };
        }

        default: {
            return state;
        }

    }

}
