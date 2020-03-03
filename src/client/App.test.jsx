import React from 'react';
import { render } from '@testing-library/react';
import App from './App.jsx';


const host = 'http://localhost:3000';

describe('Client App', () => {
  test('should load app component', async () => {
    const { getByLabelText } = render(<App host={host} />);
    const label = getByLabelText(/app/i);

    expect(label).toBeInTheDocument();
  });
});
