import React, { useCallback, useState, ChangeEvent, useMemo } from 'react'

import { Results, Input } from './components';

const results = ['test', 'testing', 'testable', 'testv'];

const getMatches = (value: string, data: string[]) => {
  const reg = new RegExp(value);

    if (value === '') {
      return [];
    }

    return data.filter((result) => {
      const foundMatch = result.match(reg);

      if (foundMatch) {
        return foundMatch;
      }
    });
}

function App() {
  const [value, setValue] = useState('');
  const [matches, setMatches] = useState<string[]>([]);

  const handleChange = useCallback((value: string) => {
    setValue(value);
    setMatches(getMatches(value, results));
  }, []);

  const handleItemClick = useCallback((id: string) => {
    setValue(id);
    setMatches([]);
  }, []);

  return (
    <div className="input">
      <Input value={value} onChange={handleChange} />
      <Results data={matches} value={value} onItemClick={handleItemClick} />
    </div>
  )
}

export default App
