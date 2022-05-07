import React, { memo, useCallback } from 'react';

type Props = {
  value: string,
  highlight: string,
  onClick: (id: string) => void;
};

const Result: React.FC<Props> = ({ value, highlight, onClick }) => {
  const generateText = useCallback((value: string) => {
    const reg = new RegExp(new RegExp(`(${highlight})`, 'gi'));

    const parts = value.split(reg);
    return <span>{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part)}</span>;
  }, [highlight, value]);

  const handleResultClick = useCallback(() => {
    onClick(value);
  }, [value, onClick]);

  return (
    <div onClick={handleResultClick} className="input__results__element">
      {generateText(value)}
    </div>
  );
}

export default memo(Result);
