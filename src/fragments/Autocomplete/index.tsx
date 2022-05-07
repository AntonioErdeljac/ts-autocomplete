import React, { useCallback, useState, memo } from 'react'

import { Results, Input } from '../../components';
import { getFilteredData, getLabel, getValue } from '../../utils';

type Props = {
  loading: boolean,
  value: string,
  onChange: (value: string) => void,
  options: Record<string, any>[],
  labelExtractor?: (option: Record<string, any>) => string,
  valueExtractor?: (option: Record<string, any>) => string,
  disabled?: boolean;
  defaultValue?: '';
  dataFilter?: () => Promise<Record<string, any>[]>,
};

const Autocomplete: React.FC<Props> = ({
  loading,
  value,
  onChange,
  options = [], 
  labelExtractor = getLabel, 
  valueExtractor = getValue, 
  disabled = false,
  dataFilter = getFilteredData,
}) => {
  const [matches, setMatches] = useState<Record<string, any>[]>([]);

  const handleChange = useCallback(async (value: string) => {
    onChange(value);

    const matches = await dataFilter({
      value,
      options,
      valueExtractor,
    });

    setMatches(matches);
  }, []);

  const handleItemClick = useCallback((id: string) => {
    onChange(id);
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

export default memo(Autocomplete);

