import React from 'react';
import { render } from '@testing-library/react';

import Autocomplete from './index';

describe('Autocomplete', () => {
  it('Renders correct value', () => {
    const { container } = render(
      <Autocomplete
        options={[]}
        value="Lorem"
        onChange={() => {}}
        disabled={false}
        loading={false}
      />,
    );

    const input = container.querySelector('input');

    expect(input?.value).toEqual('Lorem');
  });
});
