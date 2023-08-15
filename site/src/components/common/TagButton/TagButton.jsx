import { bool, func, string } from 'prop-types';
import cx from 'classnames';

import Button from 'components/Button';

import s from './TagButton.module.scss';

const TagButton = ({ tag, className, onClick, href, isActive }) => {
  return (
    <Button
      cbData={tag}
      onClick={onClick}
      className={cx(s.root, isActive && s.rootActive, className)}
      href={href}
    >
      {tag}
    </Button>
  );
};

TagButton.propTypes = {
  className: string,
  tag: string,
  href: string,
  onClick: func,
  isActive: bool,
};

export default TagButton;
