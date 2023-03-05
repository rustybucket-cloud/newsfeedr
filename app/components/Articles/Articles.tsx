import React from 'react';
import type { Article } from '~/types';
import styled from '@emotion/styled';
import ArticleCard from './ArticleCard';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  margin-top: 2rem;
  @media only screen and (min-width: 650px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default function Articles({ articles }: { articles: Article[]}) {
  return (
    <Wrapper>
      {articles.map((article) => <ArticleCard key={article.title} article={article} />)}
    </Wrapper>
  );
}
