import React from 'react';
import {
  Card, CardActions, CardContent, CardHeader, CardMedia, Button, Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import type { Article } from '~/types';

const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Wrapper>
      <CardMedia sx={{ height: '150px', width: '100%' }} image={article.urlToImage} />
      <CardHeader title={article.title} />
      <CardContent>
        <Typography variant="body1" component="p">
          {`Source: ${article.source.name}`}
        </Typography>
        <Typography variant="body1" component="p">{article.description}</Typography>
      </CardContent>
      <div>
        <CardActions>
          <Button variant="contained" color="primary" href={article.url} target="_blank" sx={{ marginTop: '8px' }}>View Full Article</Button>
        </CardActions>
      </div>
    </Wrapper>
  );
}
