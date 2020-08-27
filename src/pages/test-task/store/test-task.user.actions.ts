import { ReduxAction } from '../../../shared/tools/redux.helper';
import { TableItem } from '../test-api.service';
import { TestTaskActionsTypes as Types } from './test-task.model';

/**
 * Redux action to indicate that user clicked on table cell
 */
class CellClickedAction extends ReduxAction<Types.CELL_CLICKED, TableItem> {
    public readonly type: Types.CELL_CLICKED = Types.CELL_CLICKED;
    public constructor(public payload: TableItem) { super(payload); }
}

/**
 * Redux action to indicate that user has left test task page
 */
class PageLeftAction extends ReduxAction<Types.TEST_TASK_PAGE_LEFT, void> {
    public readonly type: Types.TEST_TASK_PAGE_LEFT = Types.TEST_TASK_PAGE_LEFT;
    public constructor(public payload: void) { super(payload); }
}

/**
 * Redux action to indicate that user has opened test task page
 */
class PageOpenedAction extends ReduxAction<Types.TEST_TASK_PAGE_OPENED, void> {
    public readonly type: Types.TEST_TASK_PAGE_OPENED = Types.TEST_TASK_PAGE_OPENED;
    public constructor(public payload: void) { super(payload); }
}

/**
 * General export for test task user actions
 */
export const testTaskUserActions: {
    cellClicked: (cell: TableItem) => CellClickedAction;
    pageLeft: () => PageLeftAction;
    pageOpened: () => PageOpenedAction;
} = {
    cellClicked: (cell: TableItem) => new CellClickedAction(cell).get(),
    pageLeft: () => new PageLeftAction().get(),
    pageOpened: () => new PageOpenedAction().get(),
};

/**
 * General export for test task user action types
 */
export type TestTaskUserActionsTypes = CellClickedAction
    | PageLeftAction
    | PageOpenedAction;
