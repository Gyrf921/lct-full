import {
  Box,
  Group,
  Loader,
  RingProgress,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCompanyDep } from '../../API/company';
import { getAnalyticByDepartment } from '../../API/curator';
import { departmentAnalytitcs } from '../../API/curator/interfaces';
import { RootState } from '../../store';
import classes from './Diagram.module.css';
import { getPersonalAnalytics } from '../../API/personal-account';

export const Diagram = () => {
  const roles = useSelector((state: RootState) => state.roles);
  const superRoles = ['ROLE_ADMIN', 'ROLE_HR', 'ROLE_CURATOR'];
  const isSuper = superRoles.some((item) => roles.includes(item));
  const [departments, setDepartments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<departmentAnalytitcs[]>([]);
  useEffect(() => {
    if (isSuper) {
      setLoading(true);
      getCompanyDep()
        .then((values) => values.map((item) => item.name))
        .then((values) => {
          setDepartments(values);
          return getAnalyticByDepartment(values[0]);
        })
        .then((values) => {
          setAnalytics(values);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      setLoading(true);
      getPersonalAnalytics()
        .then((values) => {
          setAnalytics(values);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, []);

  const max = analytics.reduce((sum, item) => {
    return sum + item.countDone;
  }, 0);
  const sections = analytics.map((item) => {
    let color;
    switch (item.name) {
      case 'TEST':
        color = 'green.6';
        break;
      case 'STAGE':
        color = 'lime.7';
        break;
      case 'DEADLINE':
        color = 'red.8';
        break;
      case 'VIDEO':
        color = 'teal.8';

        break;
      case 'AUDIO':
        color = 'orange.8';
        break;
      case 'ARTICLE':
        color = 'blue.8';
        break;
      case 'TASK':
        color = 'indigo.8';

        break;
      default:
        color = 'violet.8';
        break;
    }
    return {
      title: item.name,
      value: (item.countDone * 100) / max,
      color: color,
    };
  });

  if (loading) {
    return (
      <Group style={{ flexGrow: 2 }}>
        <Loader />
      </Group>
    );
  }

  return (
    <Stack className={classes.wrapper}>
      <Group justify='center'>
        <RingProgress size={350} thickness={30} sections={sections} />

        <Stack>
          {sections.map((item) => (
            <Group key={item.title}>
              <Box bg={item.color} className={classes.colorValue}>
                <Text>{Math.floor((item.value * max) / 100)}</Text>
              </Box>
              <Text>{item.title}</Text>
            </Group>
          ))}
        </Stack>
      </Group>
      <Select
        display={isSuper ? 'block' : 'none'}
        allowDeselect={false}
        defaultValue={departments[0]}
        data={departments}
        onChange={(value) => {
          getAnalyticByDepartment(value).then((values) => setAnalytics(values));
        }}
      />
    </Stack>
  );
};
