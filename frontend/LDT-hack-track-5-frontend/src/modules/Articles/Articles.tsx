import { Button, Card, Group, Popover, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlinePlus } from 'react-icons/ai';
import { LuFilter } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyDep, getPosts } from '../../API/company';
import {
  getAllArticles,
  getArticlesByDepartments,
  getArticlesByPost,
} from '../../API/knowledge-base';
import { ArticlesName } from '../../API/knowledge-base/interfaces';
import { AddArticleModal } from '../../components/AddArticleModal/AddArticleModal';
import { ScrollAreaArticles } from '../../components/ScrollAreaArticles/ScrollAreaArticles';
import { RootState } from '../../store';
import { setError } from '../../store/userSlice';
import classes from './Articles.module.css';

export const Articles = () => {
  useEffect(() => {
    getAllArticles().then((value) => setArticles(value));
    getPosts().then((value) =>
      setPosts(
        value.filter((item) => item.name !== 'none').map((item) => item.name)
      )
    );
    getCompanyDep().then((value) =>
      setDepartments(
        value.filter((item) => item.name !== 'none').map((item) => item.name)
      )
    );
  }, []);
  const [posts, setPosts] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [articles, setArticles] = useState<ArticlesName[]>([]);
  const roles = useSelector((state: RootState) => state.roles);
  const isAdmin = roles.includes('ROLE_ADMIN');
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();
  const handleFilter = async (filterValue: string) => {
    try {
      setFilter(filterValue);
      if (filterValue == null) {
        const values = await getAllArticles();
        setArticles(values);
      } else if (posts.includes(filterValue)) {
        const values = await getArticlesByPost(filterValue);
        setArticles(values);
      } else {
        const values = await getArticlesByDepartments(filterValue);
        setArticles(values);
      }
    } catch (error) {
      const err = error as AxiosError;
      dispatch(setError(err.response?.data.message));
    }
  };

  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Card className={classes.card}>
      <Group
        mb={20}
        justify='space-between'
        display={isAdmin ? 'flex' : 'none'}
      >
        <IconContext.Provider value={{ className: classes.icon }}>
          <Button
            variant='white'
            rightSection={<AiOutlinePlus />}
            onClick={open}
          >
            Добавить статью
          </Button>
          <Popover>
            <Popover.Target>
              <Button
                variant='white'
                rightSection={<LuFilter />}
                onClick={open}
              >
                Фильтр
              </Button>
            </Popover.Target>

            <Popover.Dropdown>
              <Select
                onChange={handleFilter}
                value={filter}
                placeholder='Фильтр по'
                data={[
                  { group: 'Должности', items: posts },
                  { group: 'Отделы', items: departments },
                ]}
              />
            </Popover.Dropdown>
          </Popover>
        </IconContext.Provider>
        <AddArticleModal
          updateArticles={(articles) => setArticles(articles)}
          opened={opened}
          close={close}
        />
      </Group>
      <ScrollAreaArticles
        articlesMain={articles}
        mah={{ base: 500, md: 900 }}
      />
    </Card>
  );
};
