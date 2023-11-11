import { Button, Flex, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ArticlesName } from '../../../API/knowledge-base/interfaces.ts';
import { TextLarge } from '../../../theme/AdaptiveConts.ts';
import classes from './ArticleList.module.css';

interface ArticleList {
  article: ArticlesName;
  question?: boolean;
}

export const ArticleList = ({ article, question = false }: ArticleList) => {
  return (
    <Button
      variant='white'
      color='#252525'
      classNames={{
        root: classes.articleList,
        label: classes.articleList__inner,
      }}
      component={Link}
      to={`/knowledge/${question ? 'question' : 'article'}/${article.id}`}
    >
      <Flex direction={'column'} align='flex-start'>
        <Text fz={TextLarge}>{article.name}</Text>
      </Flex>
    </Button>
  );
};
