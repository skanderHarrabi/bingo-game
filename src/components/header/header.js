import * as React from 'react';
import classNames from 'classnames';

import './header.scss';

export const Header = ({isBingo}) => {
    const bingoClass = classNames('tracking-tightest text-4xl py-0 px-6 md:text-6xl md:px-8 lg:text-8xl xl:text-9xl -mr-8',{ 'neon-text': isBingo, 'regular-text': !isBingo })
    return (
        <div className="mt-4 md:mt-0 md:flex md:items-center md:justify-center lg:h-1/6">
            <span className={bingoClass}>BINGO</span>
        </div>
    );
};