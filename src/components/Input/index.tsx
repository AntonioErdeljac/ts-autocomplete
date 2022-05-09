import React, {
  memo,
  useCallback,
  ChangeEvent,
  KeyboardEventHandler,
  KeyboardEvent,
  FocusEvent,
} from 'react';

import './index.css';

import { CloseIcon, LoadingIcon } from '../../assets';
import { classNames } from '../../utils';

type Props = {
  onChange: (value: string) => void;
  value: string;
  disabled: boolean;
  loading: boolean;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
};

const Input: React.FC<Props> = ({
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  value,
  disabled,
  loading,
  placeholder,
}) => {
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

  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  return (
    <div className="input__search__wrapper">
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        value={value}
        className={classNames({
          input__search: true,
          'input__search--disabled': disabled,
          'input__search--loading': loading,
        })}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {loading ? (
        <div className="input__search__action">
          <LoadingIcon />
        </div>
      ) : null}
      {value && !loading ? (
        <div
          onClick={handleClear}
          className="input__search__action input__search__action--clickable"
        >
          <CloseIcon />
        </div>
      ) : null}
    </div>
  );
};

export default memo(Input);
