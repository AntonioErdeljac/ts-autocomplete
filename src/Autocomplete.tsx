import React, { useCallback, useState, ChangeEvent, useMemo } from 'react'

function App() {
  const [results, setResults] = useState(['test', 'testing', 'testable', 'testv']);
  const [value, setValue] = useState('');

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setValue(event.target.value);
  }, []);

  const searchedResults = useMemo(() => {
    const reg = new RegExp(value);

    if (value === '') {
      return [];
    }

    return results.filter((result) => {
      const foundMatch = result.match(reg);

      console.log(foundMatch)

      if (foundMatch) {
        return foundMatch;
      }
    });
  }, [value, results]);

  return (
    <div className="input">
      <input className={`input__search ${searchedResults.length > 0 ? 'input__search--active' : ''}`} onChange={handleChange} placeholder="Autocomplete" />
      <div className={`input__results__wrapper ${searchedResults.length === 0 ? 'input__results__wrapper--disabled' : ''}`}>
        {searchedResults.map((result) => (<div className="input__results__element">{result}</div>))}
      </div>
    </div>
  )
}

export default App
