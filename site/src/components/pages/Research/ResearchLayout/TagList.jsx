import React from 'react';
import s from './ResearchLayout.module.scss';
import TagButton from 'components/TagButton';
import { arrayOf, func, string } from 'prop-types';
import { Tag } from 'entities/tag';
import cx from 'classnames';

const TagList = ({ tags, activeTagSlug, onTagClick, className }) => {
  return (
    <ul className={cx(s.tagList, className)}>
      {tags.map(tagItem => (
        <li key={tagItem.id}>
          <TagButton
            className={s.tabItem}
            tag={tagItem.name}
            isActive={activeTagSlug === tagItem.slug.toString()}
            onClick={() => onTagClick?.(tagItem)}
          />
        </li>
      ))}
    </ul>
  );
};

TagList.propTypes = {
  tags: arrayOf(Tag).isRequired,
  activeTagSlug: string,
  className: string,
  onTagClick: func,
};

export default TagList;
