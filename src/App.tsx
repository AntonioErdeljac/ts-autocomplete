import React, { useCallback, useMemo, useState } from 'react';

import { Autocomplete } from './fragments';
import { getLabel, getValue } from './utils';
import data from './data.json';

/**
 * Modify the line below to an API that returns Record<string, any>[] type of data, default TS text matching function using regex.
 * Modify valueExtractor, default (option) => option.value.
 * Modify labelExtractor, default (option) => option.label.
 */
const MOCK_API_URL = ''; 

const getRemoteData = (): Promise<Record<string, any>[]> => {
  return fetch(MOCK_API_URL).then((response) => {
    return response.json().then((data) => {
      return data;
    });
  });
};

const App = () => {
  const [value, setValue] = useState('');

  const handleChange = useCallback((text: string) => {
    setValue(text)
  }, []);

  return (
    <Autocomplete
      value={value}
      onChange={handleChange}
      dataFilter={MOCK_API_URL ? getRemoteData : undefined}
      valueExtractor={getValue}
      labelExtractor={getLabel}
      options={data}
    />
  );
};

export default App;
