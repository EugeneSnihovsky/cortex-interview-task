import { ReduxAction } from '../../../shared/tools/redux.helper';
import {
    RemoveCellCoordinates,
    TestTaskActionsTypes as Types
} from './test-task.model';
import { TableItem } from '../test-api.service';

/**
 * Redux action to indicate that connection to test-task server is started
 */
class ConnectToServerAction extends ReduxAction<Types.CONNECT_TO_SERVER, void> {
    public readonly type: Types.CONNECT_TO_SERVER = Types.CONNECT_TO_SERVER;
    public constructor(public payload: void) { super(payload); }
}

/**
 * Redux action to indicate that ws connection to test server is failed
 */
class OnServerErrorAction extends ReduxAction<Types.ON_SERVER_ERROR, Error> {
    public readonly type: Types.ON_SERVER_ERROR = Types.ON_SERVER_ERROR;
    public constructor(public payload: Error) { super(payload); }
}

/**
 * Redux action to delete table cell info when time is up
 */
class RemoveTableCellAction extends ReduxAction<Types.REMOVE_TABLE_CELL, RemoveCellCoordinates> {
    public readonly type: Types.REMOVE_TABLE_CELL = Types.REMOVE_TABLE_CELL;
    public constructor(public payload: RemoveCellCoordinates) { super(payload); }
}

/**
 * Redux action to indicate that test table data is updated from backend
 */
class TableDataUpdatedAction extends ReduxAction<Types.TABLE_DATA_UPDATED, TableItem> {
    public readonly type: Types.TABLE_DATA_UPDATED = Types.TABLE_DATA_UPDATED;
    public constructor(public payload: TableItem) { super(payload); }
}

/**
 * General export for test task service actions
 */
export const testTaskServiceActions = {
    connectToServer: () => new ConnectToServerAction().get(),
    onServerFail: (error: Error) => new OnServerErrorAction(error).get(),
    removeTableCell: (coordinates: RemoveCellCoordinates) => new RemoveTableCellAction(coordinates).get(),
    tableDataUpdated: (item: TableItem) => new TableDataUpdatedAction(item).get(),
};

/**
 * General export for test task service action types
 */
export type TestTaskServiceActionsTypes = ConnectToServerAction
    | OnServerErrorAction
    | RemoveTableCellAction
    | TableDataUpdatedAction;
