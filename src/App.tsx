import React, { useCallback, useState } from 'react';

import { Autocomplete } from './fragments';
import { getLabel, getValue } from './utils';
import mockData from './data.json';

const App = () => {
  const [value, setValue] = useState('');

  const handleChange = useCallback((text: string) => {
    setValue(text);
  }, []);

  return (
    <Autocomplete
      value={value}
      onChange={handleChange}
      valueExtractor={getValue}
      labelExtractor={getLabel}
      options={mockData}
      placeholder="Start typing to search movies..."
    />
  );
};

export default App;
