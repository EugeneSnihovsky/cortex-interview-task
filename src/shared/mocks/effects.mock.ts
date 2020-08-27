import { Reducer } from 'redux';
import EffectsTesterOrigin from 'redux-saga-tester';
import {
    rootReducer,
    RootState,
    rootStateMock
} from '../../bootstrap/root.store';

/**
 * General type for effects tester helper
 */
export type EffectsTester = EffectsTesterExtended;

/**
 * Extended effects tester info
 */
interface EffectsTesterExtended extends EffectsTesterOrigin<RootState> {

    /**
     * Method to get action called in current effect by action type
     */
    getCalledAction?: (type: string) => { payload?: any; type: string; }; // eslint-disable-line

}

/**
 * Helper function to create effects tester with saga-tester for unit tests
 */
export const createEffectsTester: (effects: any) => EffectsTester = (effects: any) => { // eslint-disable-line

        const _effectsTester: EffectsTester = new EffectsTesterOrigin({
            initialState: {
                ...rootStateMock,
            },
            reducers: rootReducer as Reducer
        });
        _effectsTester.start(effects);
        _effectsTester.getCalledAction = (type: string) => {
            let actions = _effectsTester.getCalledActions()
                .filter((action) => (action.type === type));
            return actions[ actions.length -1 ];
        };
        return _effectsTester;
    };
