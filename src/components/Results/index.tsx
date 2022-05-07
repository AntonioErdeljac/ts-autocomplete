import React, { memo } from 'react';

import Result from '../Result';

type Props = {
  data: string[],
  value: string,
  onItemClick: (id: string) => void,
};

const Results: React.FC<Props> = ({ data, value, onItemClick }) => {
  return (
    <div className={`input__results__wrapper ${data.length === 0 ? 'input__results__wrapper--disabled' : ''}`}>
      {data.map((item) => <Result onClick={(id: string) => onItemClick(id)} value={item} highlight={value} />)}
    </div>
  )
}

export default memo(Results);
