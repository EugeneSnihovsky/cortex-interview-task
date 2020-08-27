import React from 'react';
import { render } from '@testing-library/react';
import { App } from './app.component';

describe('app: test-task', function () {

  it('should render whole app without errors', () => {
    const result = render(<App />);
    expect(result).toBeTruthy();
  });

});
