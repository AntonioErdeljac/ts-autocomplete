import React from 'react';
import { render, screen } from '@testing-library/react';

import Result from './index';

describe('Result', () => {
  it('Renders proper value', () => {
    render(<Result value="Lorem" highlight="Lorem" onClick={() => {}} selected={false} />);

    expect(screen.getByText('Lorem')).toBeInTheDocument();
  });
});
