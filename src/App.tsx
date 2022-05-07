import React from 'react';

import { Autocomplete } from './fragments';
import data from './data.json';

const App = () => {
  return (
    <Autocomplete options={data} />
  );
};

export default App;
