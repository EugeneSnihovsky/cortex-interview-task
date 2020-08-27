import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { TestTaskPage } from '../pages/test-task/test-task.page';
import { rootStore } from './root.store';

/**
 * Represents general application component
 */
export const App:FC<{}> = () => {

    return (
        <Provider store={ rootStore }>
            <TestTaskPage />
        </Provider>
    );

}
