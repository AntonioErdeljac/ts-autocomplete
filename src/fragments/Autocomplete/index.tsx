import React, { useCallback, useState, memo, KeyboardEvent, useEffect, FocusEvent } from 'react';

import './index.css';

import { Results, Input } from '../../components';
import { getFilteredData, getLabel, getValue } from '../../utils';

/**
 * Eslint no shadow bug (See: https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope)
 */
// eslint-disable-next-line no-shadow
enum KEY_MAP {
  ENTER = 13,
  UP = 40,
  DOWN = 38,
}

const MAX_RESULTS_HEIGHT = 500;

type Props = {
  loading?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: Record<string, any>[];
  labelExtractor?: (option: Record<string, any>) => string;
  valueExtractor?: (option: Record<string, any>) => string;
  disabled?: boolean;
  getData?: (value: string) => Promise<Record<string, any>[]>;
  placeholder?: string;
  maxResultsHeight?: number;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onItemClick?: (id: string) => void;
};

const Autocomplete: React.FC<Props> = ({
  loading,
  value,
  onChange,
  options = [],
  labelExtractor = getLabel,
  valueExtractor = getValue,
  disabled = false,
  getData = getFilteredData,
  placeholder,
  maxResultsHeight = MAX_RESULTS_HEIGHT,
  onFocus,
  onBlur,
  onItemClick,
}) => {
  const [_loading, setLoading] = useState(!!loading);
  const [matches, setMatches] = useState<Record<string, any>[]>([]);
  const [selectIndex, setSelectIndex] = useState(0);

  useEffect(() => {
    setLoading(!!loading);
  }, [loading]);

  const handleChange = useCallback(
    async (newValue: string) => {
      onChange(newValue);

      if (newValue === '') {
        setSelectIndex(0);
      }

      setLoading(true);
      const newMatches = await getData(newValue, options, labelExtractor);
      setLoading(false);

      if (selectIndex > newMatches.length - 1) {
        setSelectIndex(newMatches.length - 1);
      }

      setMatches(newMatches);
    },
    [options, labelExtractor, getData, onChange, selectIndex],
  );

  const handleItemClick = useCallback(
    (id: string) => {
      if (onItemClick) {
        onItemClick(id);
      }

      onChange(id);
      setMatches([]);
    },
    [onItemClick, onChange],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const shouldGoDown = event.keyCode === KEY_MAP.DOWN && selectIndex > 0;
      const shouldGoUp = event.keyCode === KEY_MAP.UP && selectIndex < matches.length - 1;
      const shouldSelect = event.keyCode === KEY_MAP.ENTER && matches.length > 0;

      if (shouldGoDown) {
        setSelectIndex((currentSelectIndex) => currentSelectIndex - 1);
      } else if (shouldGoUp) {
        setSelectIndex((currentSelectIndex) => currentSelectIndex + 1);
      } else if (shouldSelect) {
        const selectedItem = matches[selectIndex];

        handleItemClick(labelExtractor(selectedItem || matches[0]));
        setSelectIndex(0);
      }
    },
    [selectIndex, matches, handleItemClick, labelExtractor],
  );

  const handleFocus = useCallback(
    (event: FocusEvent) => {
      if (onFocus) {
        onFocus(event);
      }
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (event: FocusEvent) => {
      if (onBlur) {
        onBlur(event);
      }
    },
    [onBlur],
  );

  return (
    <div className="input">
      <Input
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        loading={_loading}
        disabled={disabled}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <Results
        maxHeight={maxResultsHeight}
        selectIndex={selectIndex}
        labelExtractor={labelExtractor}
        valueExtractor={valueExtractor}
        options={matches}
        value={value}
        onItemClick={handleItemClick}
      />
    </div>
  );
};

export default memo(Autocomplete);
