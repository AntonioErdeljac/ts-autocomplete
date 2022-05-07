import React, { memo } from 'react';

import Result from '../Result';

type Props = {
  options: Record<string, any>[],
  value: string,
  onItemClick: (id: string) => void, 
  labelExtractor: (option: Record<string, any>) => string,
  valueExtractor: (option: Record<string, any>) => string,
};

const Results: React.FC<Props> = ({ options, value, onItemClick, valueExtractor, labelExtractor }) => {
  return (
    <div className={`input__results__wrapper ${options.length === 0 ? 'input__results__wrapper--disabled' : ''}`}>
      {options.map((item) => <Result key={valueExtractor(item)} onClick={(id: string) => onItemClick(id)} value={valueExtractor(item)} highlight={value} />)}
    </div>
  )
}

export default memo(Results);