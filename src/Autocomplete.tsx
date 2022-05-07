import React, { useCallback, useState, ChangeEvent, useMemo } from 'react'

import { Results, Input } from './components';

const results = [{ value: 'test', label: 'Test' }, { value: 'testing', label: 'Testing' }, { value: 'testable', label: 'Testable' }, { value: 'testv', label: 'Testv'}];

const getLabel = (option: Record<string, any>) => option.label;
const getValue = (option: Record<string, any>) => option.value;

type GetMatchesProps = {
  value: string, 
  options: Record<string, any>[],  
  valueExtractor: (option: Record<string, any>) => string,
};

const getMatches = ({ value, options, valueExtractor }: GetMatchesProps) => {
  const reg = new RegExp(value);

    if (value === '') {
      return [];
    }

    return options.filter((result) => {
      const foundMatch = valueExtractor(result).match(reg);

      if (foundMatch) {
        return foundMatch;
      }
    });
}

type Props = {
  options: Record<string, any>[],
  labelExtractor?: (option: Record<string, any>) => string,
  valueExtractor?: (option: Record<string, any>) => string,
  disabled?: boolean;
}

const App:React.FC<Props> = ({ options = results, labelExtractor = getLabel, valueExtractor = getValue, disabled = false }) => {
  const [value, setValue] = useState('');
  const [matches, setMatches] = useState<Record<string, any>[]>([]);

  const handleChange = useCallback((value: string) => {
    setValue(value);
    setMatches(getMatches({
      value,
      options,
      valueExtractor,
    }));
  }, []);

  const handleItemClick = useCallback((id: string) => {
    setValue(id);
    setMatches([]);
  }, []);

  return (
    <div className="input">
      <Input disabled={disabled} value={value} onChange={handleChange} />
      <Results 
        labelExtractor={labelExtractor} 
        valueExtractor={valueExtractor} 
        options={matches} 
        value={value} 
        onItemClick={handleItemClick} 
      />
    </div>
  )
}

export default App
