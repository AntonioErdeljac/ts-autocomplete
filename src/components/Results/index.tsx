import React, { memo } from 'react';

import './index.css';

import Result from '../Result';

import { classNames } from '../../utils';

type Props = {
  options: Record<string, any>[];
  value: string;
  onItemClick: (id: string) => void;
  labelExtractor: (option: Record<string, any>) => string;
  valueExtractor: (option: Record<string, any>) => string;
  selectIndex: number;
  maxHeight: number;
  visible: boolean;
};

const Results: React.FC<Props> = ({
  options,
  value,
  onItemClick,
  valueExtractor,
  labelExtractor,
  selectIndex,
  maxHeight,
  visible,
}) => (
  <div
    style={{ maxHeight }}
    className={classNames({
      input__results__wrapper: true,
      'input__results__wrapper--disabled': !visible || options.length === 0,
    })}
  >
    {options.map((item, index) => (
      <Result
        selected={index === selectIndex}
        key={valueExtractor(item)}
        onClick={(id: string) => onItemClick(id)}
        value={labelExtractor(item)}
        highlight={value}
      />
    ))}
  </div>
);

export default memo(Results);
