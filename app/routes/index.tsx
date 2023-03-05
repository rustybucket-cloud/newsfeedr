import React from 'react';
import { useLoaderData } from '@remix-run/react';
import { Main, Articles } from '~/components';
import type { Article } from '~/types';

export const loader = async () => {
  const req = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
  const data = await req.json();
  return data;
};

export default function Index() {
  const { articles }: { articles: Article[] } = useLoaderData();

  return (
    <Main>
      <h1>Trending</h1>
      <Articles articles={articles} />
    </Main>
  );
}
