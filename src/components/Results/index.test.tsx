import React from 'react';
import { render } from '@testing-library/react';

import Results from './index';

describe('Results', () => {
  it('Renders correct number of items', () => {
    const { container } = render(
      <Results
        visible
        onItemClick={() => {}}
        labelExtractor={(option) => option.label}
        valueExtractor={(option) => option.value}
        maxHeight={500}
        selectIndex={0}
        value="Lorem"
        options={[
          { value: 'l', label: 'Lorem' },
          { value: 'i', label: 'Ipsum' },
        ]}
      />,
    );

    const items = container.getElementsByClassName('input__results__element');

    expect(items.length).toEqual(2);
  });
});
