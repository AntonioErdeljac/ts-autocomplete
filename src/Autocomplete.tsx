import React, { useCallback, useState } from 'react'

import { Results, Input } from './components';
import { DataFilterOptions } from './typings';
import { getFilteredData, getLabel, getValue } from './utils';

const results = [{ value: 'test', label: 'Test' }, { value: 'testing', label: 'Testing' }, { value: 'testable', label: 'Testable' }, { value: 'testv', label: 'Testv'}];

type Props = {
  options: Record<string, any>[],
  labelExtractor?: (option: Record<string, any>) => string,
  valueExtractor?: (option: Record<string, any>) => string,
  disabled?: boolean;
  defaultValue?: '';
  dataFilter?: (options: DataFilterOptions) => Record<string, any>[],
};

const App: React.FC<Props> = ({ 
  options = results, 
  labelExtractor = getLabel, 
  valueExtractor = getValue, 
  disabled = false,
  defaultValue = '',
  dataFilter = getFilteredData,
}) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<string>(defaultValue);
  const [matches, setMatches] = useState<Record<string, any>[]>([]);

  const handleChange = useCallback(async (value: string) => {
    setValue(value);
    setLoading(true);

    const matches = await dataFilter({
      value,
      options,
      valueExtractor,
    });

    setLoading(false);
    setMatches(matches);
  }, []);

  const handleItemClick = useCallback((id: string) => {
    setValue(id);
    setMatches([]);
  }, []);

  return (
    <div className="input">
      <Input loading={loading} disabled={disabled} value={value} onChange={handleChange} />
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
