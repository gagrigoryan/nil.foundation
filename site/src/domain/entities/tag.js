import { number, shape, string } from 'prop-types';

export const Tag = shape({
  id: number,
  name: string,
  slug: string,
  createdAt: string,
  publishedAt: string,
  updatedAt: string,
});
