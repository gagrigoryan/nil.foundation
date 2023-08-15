import { arrayOf, number, shape, string } from 'prop-types';
import ResearchCard from 'components/ResearchCard';
import s from './Research.module.scss';

const Research = ({ data }) => {
  return (
    <section className={s.container}>
      <ul className={s.cardList}>
        {data?.posts.map(el => (
          <li key={el.id}>
            <ResearchCard
              className={s.card}
              content={el}
              withTags
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

Research.propTypes = {
  data: shape({
    posts: arrayOf(
      shape({
        id: number,
        date: string,
        author: string,
        link: string,
        title: string,
        tags: arrayOf(
          shape({
            id: number,
            name: string,
            slug: string,
            creataAt: string,
            publishedAt: string,
            updatedAt: string,
          })
        ),
      })
    ),
  }),
};

export default Research;
