import React, { memo, useCallback, Children } from 'react';

import './index.css';

import { classNames } from '../../utils';

type Props = {
  value: string;
  highlight: string;
  onClick: (id: string) => void;
  selected: boolean;
};

const Result: React.FC<Props> = ({ value, highlight, onClick, selected }) => {
  const generateText = useCallback(() => {
    const reg = new RegExp(new RegExp(`(${highlight})`, 'gi'));

    const parts = value.split(reg);
    return (
      <span>
        {Children.toArray(
          parts.map((part) =>
            part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part,
          ),
        )}
      </span>
    );
  }, [highlight, value]);

  const handleResultClick = useCallback(() => {
    onClick(value);
  }, [value, onClick]);

  return (
    <div
      onClick={handleResultClick}
      className={classNames({
        input__results__element: true,
        'input__results__element--selected': selected,
      })}
    >
      {generateText()}
    </div>
  );
};

export default memo(Result);
