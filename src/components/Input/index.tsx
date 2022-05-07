import React, { memo, useCallback, ChangeEvent } from 'react';

type Props = {
  onChange: (value: string) => void,
  value: string,
};

const Input: React.FC<Props> = ({ onChange, value }) => {
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    onChange(event.target.value)
  }, [onChange]);

  return (
    <input 
        value={value}
        className="input__search" 
        onChange={handleChange} 
        placeholder="Autocomplete" 
      />
  );
}

export default memo(Input);
