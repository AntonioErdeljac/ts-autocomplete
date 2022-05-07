import React, { useCallback, useState, ChangeEvent, useMemo } from 'react'

function App() {
  const [results, setResults] = useState(['test', 'testing', 'testable', 'testv']);
  const [value, setValue] = useState('');

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setValue(event.target.value);
  }, []);

  const handleResultClick = useCallback((result: string) => () => {
    setValue(result);
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

  const getHighlightText = useCallback((text: string) => {
    const reg = new RegExp(new RegExp(`(${value})`, 'gi'));
    const parts = text.split(reg);
    return <span>{parts.map(part => part.toLowerCase() === value.toLowerCase() ? <b>{part}</b> : part)}</span>;
  }, [value])

  return (
    <div className="input">
      <input 
        value={value}
        className={`input__search ${searchedResults.length > 0 ? 'input__search--active' : ''}`} 
        onChange={handleChange} 
        placeholder="Autocomplete" 
      />
      <div className={`input__results__wrapper ${searchedResults.length === 0 ? 'input__results__wrapper--disabled' : ''}`}>
        {searchedResults.map((result) => (
        <div onClick={handleResultClick(result)} className="input__results__element">
          {getHighlightText(result)}
        </div>))}
      </div>
    </div>
  )
}

export default App
