import { Autocomplete, Box, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllArticles } from '../../API/knowledge-base';
import { ArticlesName } from '../../API/knowledge-base/interfaces';
import classes from './InputKnowledge.module.css';

export const InputKnowledge = () => {
  useEffect(() => {
    getAllArticles().then((values) => setArticles(values));
  }, []);
  const [articles, setArticles] = useState<ArticlesName[]>([]);
  const navigate = useNavigate();

  return (
    <Group gap={25}>
      <Box className={classes.wrapperInput}>
        <Autocomplete
          onOptionSubmit={(optionValue) => {
            const option = articles.find((item) => item.name === optionValue);
            navigate(`/knowledge/article/${option?.id}`);
          }}
          limit={10}
          placeholder='Найти статью'
          variant='primary'
          data={[...articles.map((item) => item.name)]}
        />
      </Box>
    </Group>
  );
};
