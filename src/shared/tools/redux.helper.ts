/**
 * Represents redux action base class
 */
export class ReduxAction<T, P = void> {

    public payload: P;

    public readonly type: T;

    public constructor(payload: P) {
        this.payload = payload;
    }

    // this need to convert class to object, but we still can use class as interface
    public get?(): ReduxAction<T, P> {
        return ({
            payload: this.payload,
            type: this.type
        } as any); // eslint-disable-line
    }

}
