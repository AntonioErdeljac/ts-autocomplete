import React, { useCallback, useState, memo, KeyboardEvent } from 'react';

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

type Props = {
  loading: boolean;
  value: string;
  onChange: (value: string) => void;
  options: Record<string, any>[];
  labelExtractor?: (option: Record<string, any>) => string;
  valueExtractor?: (option: Record<string, any>) => string;
  disabled?: boolean;
  dataFilter?: () => Promise<Record<string, any>[]>;
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
  const [selectIndex, setSelectIndex] = useState(0);

  const handleChange = useCallback(async (newValue: string) => {
    onChange(newValue);

    const newMatches = await dataFilter({
      value: newValue,
      options,
      valueExtractor,
    });

    setMatches(newMatches);
  }, []);

  const handleItemClick = useCallback((id: string) => {
    onChange(id);
    setMatches([]);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const shouldGoDown = event.keyCode === KEY_MAP.DOWN && selectIndex > 0;
      const shouldGoUp = event.keyCode === KEY_MAP.UP && selectIndex < matches.length - 1;
      const shouldSelect =
        event.keyCode === KEY_MAP.ENTER && matches.length > 0 && selectIndex >= 0;

      if (shouldGoDown) {
        setSelectIndex((currentSelectIndex) => currentSelectIndex - 1);
      } else if (shouldGoUp) {
        setSelectIndex((currentSelectIndex) => currentSelectIndex + 1);
      } else if (shouldSelect) {
        handleItemClick(labelExtractor(matches[selectIndex]));
        setSelectIndex(0);
      }
    },
    [selectIndex, matches],
  );

  return (
    <div className="input">
      <Input
        onKeyDown={handleKeyDown}
        loading={loading}
        disabled={disabled}
        value={value}
        onChange={handleChange}
      />
      <Results
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
