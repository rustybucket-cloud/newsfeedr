import React, { useState, useCallback } from 'react';
import {
  Card, CardActions, CardContent, CardHeader, CardMedia, Button, Typography, Modal, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import styled from '@emotion/styled';
import type { Article } from '~/types';

const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  width: 100%;  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingIcon = styled(RotateRightIcon)`
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  animation-name: rotate;
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

export default function ArticleCard({ article }: { article: Article }) {
  const [summary, setSummary] = useState();
  const [showSummary, setShowSummary] = useState(false);

  const getSummary = useCallback(async () => {
    setShowSummary(true);
    const req = await fetch(`api/getSummary?url=${article.url}`);
    const res = await req.json();
    setSummary(res?.summary);
  }, [article.url]);

  return (
    <Wrapper>
      <CardMedia sx={{ height: '150px', width: '100%' }} image={article.urlToImage} />
      <CardHeader title={article.title} />
      <CardContent>
        <Typography variant="body1" component="p">
          {`Source: ${article.source.name}`}
        </Typography>
        {article.author && <Typography variant="body1" component="p">{`Author: ${article.author}`}</Typography>}
        {article.description && <Typography variant="body1" component="p">{article.description}</Typography>}
      </CardContent>
      <div>
        <CardActions>
          <Button variant="contained" color="primary" href={article.url} target="_blank" sx={{ marginTop: '8px' }}>View Full Article</Button>
          <Button variant="contained" color="primary" onClick={getSummary} sx={{ marginTop: '8px' }}>Summarize This for Me</Button>
        </CardActions>
      </div>
      <Modal
        open={showSummary}
        onClose={() => setShowSummary(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContent>
          <Card sx={{ width: '100%', maxWidth: '500px' }}>
            <HeaderWrapper>
              <CardHeader title="Summary" />
              <IconButton onClick={() => setShowSummary(false)}><CloseIcon /></IconButton>
            </HeaderWrapper>

            <CardContent>
              {summary ? <Typography variant="body1" component="p">{summary}</Typography> : <Loader><LoadingIcon sx={{ fontSize: 58 }} /></Loader>}
            </CardContent>
          </Card>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
}
