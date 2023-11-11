import { Flex, Title, Text, Image, Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import clock from '../../assets/icon/clock-eight.svg';
import editor from '../../assets/icon/edit.svg';
import gift from '../../assets/icon/gift.svg';

import {
  Heading,
  HeadingH2,
  Image50,
  TextSmall,
} from '../../theme/AdaptiveConts.ts';
import { getAllTasks, getTasksInner } from '../../API/curator';
import { RootState } from '../../store';
import { allTaskAndStage } from '../../API/hr/interfaces.ts';
import { getPersonalData } from '../../API/personal-account';
import { MissionAccordion } from './MissionAccordion/MissionAccordion.tsx';
import { MissionMap } from './MissionMap/MissionMap.tsx';

import classes from './Mission.module.css';

export const Mission = () => {
  const [stages, setStages] = useState<allTaskAndStage>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState(0);
  function getEmployeeId() {
    return getPersonalData().then((res) => res.employeeId);
  }
  useEffect(() => {
    getEmployeeId().then((id) => {
      setEmployeeId(id);
      Promise.all([getTasksInner(id)])
        .then(([res]) => {
          setStages(res);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    });
  }, []);

  return (
    <>
      {isLoading ? (
        'wait'
      ) : (
        <Container size='xl'>
          <Flex className={classes.mission} bg='#F8F8F8'>
            <Flex className={classes.mission__header}>
              <Title className={classes.mission__title} fz={Heading} p='0 10px'>
                Пройди увлекательный квест
              </Title>
              <Text className={classes.mission__text} fz={HeadingH2} p='0 10px'>
                Каждый день новые интересные задания для тебя
              </Text>
              <Flex gap='16px' direction={{ md: 'row', base: 'column' }}>
                <Flex className={classes.mission__box}>
                  <Image src={clock} w={Image50} h={Image50} />
                  <Text className={classes.mission__iconText} fz={TextSmall}>
                    3 месяца увлекательного погружения
                  </Text>
                </Flex>
                <Flex className={classes.mission__box}>
                  <Image src={editor} w={Image50} h={Image50} />
                  <Text className={classes.mission__iconText} fz={TextSmall}>
                    Тесты после каждого блока заданий
                  </Text>
                </Flex>
                <Flex className={classes.mission__box}>
                  <Image src={gift} w={Image50} h={Image50} />
                  <Text className={classes.mission__iconText} fz={TextSmall}>
                    Призы за успешное выполнение
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <MissionMap />
            <MissionAccordion stages={stages} idIntern={employeeId} />
          </Flex>
        </Container>
      )}
    </>
  );
};
