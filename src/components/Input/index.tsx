import React, { memo, useCallback, ChangeEvent, KeyboardEventHandler, KeyboardEvent } from 'react';

import './index.css';

import { classNames } from '../../utils';

type Props = {
  onChange: (value: string) => void;
  value: string;
  disabled: boolean;
  loading: boolean;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
};

const Input: React.FC<Props> = ({ onChange, onKeyDown, value, disabled, loading }) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();

      onChange(event.target.value);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown(event);
    },
    [onKeyDown],
  );

  return (
    <input
      onKeyDown={handleKeyDown}
      disabled={disabled}
      value={value}
      className={classNames({
        input__search: true,
        'input__search--disabled': disabled,
        'input__search--loading': loading,
      })}
      onChange={handleChange}
      placeholder="Autocomplete"
    />
  );
};

export default memo(Input);
