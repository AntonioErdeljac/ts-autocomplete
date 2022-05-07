import React, { useCallback, useState } from 'react';

import { Autocomplete } from './fragments';
import { getLabel, getValue } from './utils';
import mockData from './data.json';

/**
 * [NOT PRODUCTION CODE, JUST FOR EASE OF REVIEWING AND TESTING]
 * Modify the line below to an API that returns Record<string, any>[] type of data, default TS text matching function using regex.
 * Modify valueExtractor, default (option) => option.value.
 * Modify labelExtractor, default (option) => option.label.
 */
const MOCK_API_URL = '';

/**
 * [NOT PRODUCTION CODE, JUST FOR EASE OF REVIEWING AND TESTING]
 * @param value value to be sent to public API, modify to go into params or query accordingly
 * @returns Record<string, any>[]
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getRemoteData = (value: string): Promise<Record<string, any>[]> => fetch(MOCK_API_URL).then((response) => response.json().then((data) => data));

const App = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((text: string) => {
    setValue(text);
  }, []);

  const handleRemoteData = useCallback(async () => {
    setLoading(true);
    const remoteData = await getRemoteData(value);
    setLoading(false);

    return remoteData;
  }, [value]);

  return (
    <Autocomplete
      loading={loading}
      value={value}
      onChange={handleChange}
      dataFilter={MOCK_API_URL ? handleRemoteData : undefined}
      valueExtractor={getValue}
      labelExtractor={getLabel}
      options={mockData}
    />
  );
};

export default App;
