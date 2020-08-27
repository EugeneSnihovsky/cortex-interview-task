import { TableItem } from '../test-api.service';
import {
    RemoveCellCoordinates,
    TestTaskActionsTypes as Types
} from './test-task.model';
import {
    coordinatesMock,
    tableItemMock
} from './test-task.mock';
import {
    TestTaskServiceActionsTypes,
    testTaskServiceActions
} from './test-task.service.actions';

/**
 * Unit test scenarios for test-task service actions
 */
describe('actions: testTaskServiceActions', () => {

    let action: TestTaskServiceActionsTypes;
    let tableItem: TableItem;
    let coordinates: RemoveCellCoordinates;
    let error: Error;

    beforeEach(() => {
        tableItem = { ...tableItemMock };
        coordinates = { ...coordinatesMock }
        error = new Error('error message');
    });

    it('should create connectToServer action', () => {
        action = testTaskServiceActions.connectToServer();
        expect(action.type).toBe(Types.CONNECT_TO_SERVER);
        expect(action.payload).toBe(undefined);
    });

    it('should create onServerFail action', () => {
        action = testTaskServiceActions.onServerFail(error);
        expect(action.type).toBe(Types.ON_SERVER_ERROR);
        expect(action.payload).toBe(error);
    });

    it('should create removeTableCell action', () => {
        action = testTaskServiceActions.removeTableCell(coordinates);
        expect(action.type).toBe(Types.REMOVE_TABLE_CELL);
        expect(action.payload).toBe(coordinates);
    });

    it('should create tableDataUpdated action', () => {
        action = testTaskServiceActions.tableDataUpdated(tableItem);
        expect(action.type).toBe(Types.TABLE_DATA_UPDATED);
        expect(action.payload).toBe(tableItem);
    });

});
