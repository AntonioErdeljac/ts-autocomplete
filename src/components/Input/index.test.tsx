import React from 'react';
import { render } from '@testing-library/react';

import Input from './index';

describe('Input', () => {
  it('Renders correct value', () => {
    const { container } = render(
      <Input
        value="Lorem"
        onKeyDown={() => {}}
        onChange={() => {}}
        disabled={false}
        loading={false}
      />,
    );

    const input = container.querySelector('input');

    expect(input?.value).toEqual('Lorem');
  });
});
