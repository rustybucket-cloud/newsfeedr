import React from 'react';
import { useLoaderData } from '@remix-run/react';
import { Main, Articles } from '~/components';
import type { Article } from '~/types';
import { prisma } from '~/utils/db.server';

export const loader = async () => {
  try {
    const allArticles = await prisma.request.findMany();
    const mostRecentArticle = allArticles?.[allArticles.length - 1];

    // if the most recent request was less than 6 hours ago, use the most recent request
    if (mostRecentArticle != null) {
      const now = new Date(new Date().toUTCString());
      const mostRecentDate = new Date(mostRecentArticle.createdAt);
      if (now.getTime() - mostRecentDate.getTime() < 1000 * 60 * 60 * 6) {
        const article = JSON.parse(mostRecentArticle.data);
        return article;
      }
    }
  } catch (error) {
    console.error(error);
  }
  const req = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
  const data = await req.json();
  try {
    await prisma.request.create({ data: { data: JSON.stringify(data), type: 'trending' } });
  } catch (error) {
    console.error(error);
  }
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
