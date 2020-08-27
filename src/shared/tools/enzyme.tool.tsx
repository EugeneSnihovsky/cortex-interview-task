import React, {
    FC,
    Fragment,
    PropsWithChildren,
    useEffect
} from 'react';
import {
    applyMiddleware,
    createStore
} from 'redux';
import { mount } from 'enzyme';
import {
    connect,
    Provider
} from 'react-redux';
import {
    rootReducer,
    RootState,
    rootState
} from '../../bootstrap/root.store';

/**
 * Helper method to get current state. Note this method can be used only with mountComponent or mountMockComponent
 */
export const getState: () => RootState = () => (window as any)._reduxState; // eslint-disable-line

/**
 * Helper to handle redux store flow
 */
export const storeMock: {
    calledActions?: Array<ActionMock>;
    getCalledActionByType?: (type: string) => ActionMock;
    resetCalledActions?: () => void;
    state?: RootState;
} = {};
Object.defineProperty(storeMock, 'calledActions', { get: () => (window as any)._reduxActions }); // eslint-disable-line
Object.defineProperty(storeMock, 'state', { get: () => (window as any)._reduxState }); // eslint-disable-line
storeMock.getCalledActionByType = (type: string) => storeMock.calledActions
    .filter((action: ActionMock) => (action.type === type))[ 0 ];
storeMock.resetCalledActions = () => {
    (window as any)._reduxActions = [];
};

interface ActionMock {
    payload: any; // eslint-disable-line
    type: string;
}

const mapStateToProps = (state: RootState) => ({ state: state });

const ConnectedStateWrapper: FC<PropsWithChildren<{ state: RootState }>> = ({ state, children }) => {

    useEffect(() => {
        (window as any)._reduxState = state; // eslint-disable-line
    });

    return (<Fragment>{ children }</Fragment>);
};

const StateWrapper = connect(mapStateToProps)(ConnectedStateWrapper);

const saveCalledActions = (store: any) => (next: any) => (action: ActionMock) => { // eslint-disable-line
    let actions: Array<ActionMock> = (window as any)._reduxActions || [];
    actions.unshift(action); // with unshift latest action always will be the first
    (window as any)._reduxActions = actions; // eslint-disable-line
    return next(action);
};

/**
 * Helper function to mount component with enzyme with whole store and without effects
 */
export function mountMockComponent(component: any) { // eslint-disable-line
    const store = createStore(
        rootReducer,
        { ...rootState },
        applyMiddleware(saveCalledActions)
    );
    return createMountComponent(component, store);
}

function createMountComponent(component: any,store: any) { // eslint-disable-line
    return mount(
        <Provider store={ store }>
            <StateWrapper>
                { component }
            </StateWrapper>
        </Provider>
    );
}
