import React, { memo, useCallback, ChangeEvent } from 'react';

type Props = {
  onChange: (value: string) => void,
  value: string,
  disabled: boolean,
};

const Input: React.FC<Props> = ({ onChange, value, disabled }) => {
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    onChange(event.target.value)
  }, [onChange]);

  return (
    <input
      disabled={disabled}
      value={value}
      className={`input__search ${disabled ? 'input__search--disabled' : ''}`} 
      onChange={handleChange} 
      placeholder="Autocomplete" 
    />
  );
}

export default memo(Input);
