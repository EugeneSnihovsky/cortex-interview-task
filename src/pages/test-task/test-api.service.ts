import {
    webSocket,
    WebSocketSubject
} from 'rxjs/webSocket';
import { CONSTANTS } from '../../shared/constants';

/**
 * Service to handle backend data for test task
 */
export class TestApiService {

    public static get serverEvents$(): WebSocketSubject<TableItem> {
        return this._serverSubject$;
    };

    private static _serverSubject$: WebSocketSubject<TableItem>;

    /**
     * Schedules to create websocket connection
     */
    public static connect(onConnected: Function): void {
        this._serverSubject$ = webSocket({
            url: CONSTANTS.TEST_TASK_WS_API,
            openObserver: {
                next: () => onConnected()
            }
        });
    }

}

/**
 * Response data from websockets to update table info
 */
export interface TableItem {
    n: number
    x: number;
    y: number;
}
