import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useLoaderData } from '@remix-run/react';
import { Main, Articles } from '~/components';
import type { Article } from '~/types';
import { prisma } from '~/utils/db.server';
import { useAuth0 } from '@auth0/auth0-react';

export const loader = async () => {
  try {
    const allArticles = await prisma.request.findMany();
    const mostRecentArticle = allArticles?.[allArticles.length - 1];

    // if the most recent request was less than 6 hours ago, use the most recent request
    if (mostRecentArticle != null) {
      const now = new Date(new Date().toUTCString());
      const mostRecentDate = new Date(mostRecentArticle.createdAt);
      if (now.getTime() - mostRecentDate.getTime() < 1000 * 60 * 60) {
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
  const [page, setPage] = useState(0);
  const { isAuthenticated } = useAuth0();

  return (
    <Main>
      {!isAuthenticated && <h1>Trending</h1>}
      {isAuthenticated && (
        <Box sx={{ bgcolor: 'background.paper' }}>
          <Tabs sx={{ borderBottom: '1px solid black' }} indicatorColor="secondary" textColor="secondary" value={page} onChange={(e: React.SyntheticEvent, newValue: number) => setPage(newValue)}>
            <Tab label="Trending" />
            <Tab label="For You" />
          </Tabs>
        </Box>
      )}
      <Articles articles={articles} />
    </Main>
  );
}
