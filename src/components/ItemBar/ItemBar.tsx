import Link from 'next/link';
import React from 'react';
import { Props } from './ItemBar.models';
import cns from 'classnames';

const ItemBar = (props: Props) => {
  const { className = '', url = '', text = '', onClick, onMouseLeave, onMouseOver } = props;

  return (
    <Link
      onClick={onClick}
      href={url}
      className={cns('cursor-pointer hover:text-gray-400 transition-colors duration-200 p-3', className)}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {text}
    </Link>
  );
};

export default ItemBar;
