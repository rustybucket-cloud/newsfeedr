import React from 'react';
import { TextField, Button } from '@mui/material';
import { useLoaderData } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/node';
import { Main, Articles } from '~/components';
import type { Article } from '~/types';

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search');
  if (!search) return { search };
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 10);
  const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&from=${fromDate.toISOString()}&apiKey=${process.env.NEWS_API_KEY}`);
  const data = await response.json();
  return { ...data, search };
}

export default function Index() {
  const data: { articles?: Article[], search?: string } = useLoaderData();

  return (
    <Main>
      <h1>Search</h1>
      <form method="get" action="/search">
        <TextField label="Search" name="search" color="secondary" variant="outlined" sx={{ width: '100%' }} defaultValue={data.search} />
        <Button variant="contained" color="secondary" type="submit" sx={{ marginTop: '16px', width: '100%', maxWidth: '200px' }}>Find Articles</Button>
      </form>
      {data.articles && <Articles articles={data.articles} />}
    </Main>
  );
}
