import React, { ReactNode } from 'react';
import { string, any } from 'prop-types';
import cx from 'classnames';

import s from './Container.module.scss';

type ContainerProps = {
  className?: string;
  children?: ReactNode;
};

const Container = ({ className, children }: ContainerProps) => (
  <main className={cx(s.root, className)}>{children}</main>
);

Container.propTypes = {
  className: string,
  children: any,
};

export default Container;
