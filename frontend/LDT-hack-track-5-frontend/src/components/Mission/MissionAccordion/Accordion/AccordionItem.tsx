import { Accordion, Button, Flex, Image, Progress, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import classes from '../MissionAccordion.module.css';
import Lock from '../../../../assets/icon/Lock.png';
import { AddTask } from '../AddTask/AddTask.tsx';
import { ButtonsEditing } from '../../../ButtonsEditing/ButtonsEditing.tsx';
import {
  EditButton,
  TextForInput,
  TextMiddle,
} from '../../../../theme/AdaptiveConts.ts';
import { allTaskAndStage } from '../../../../API/hr/interfaces.ts';
import { getAllTasks } from '../../../../API/curator';
import { Accordiontask } from './Accordiontask.tsx';

import { AccordionLabel } from './AccordionLabel.tsx';

interface IAccordionItem {
  stage: allTaskAndStage;
  role: string;
  idIntern: number;
}
export const AccordionItem = ({ idIntern, stage, role }: IAccordionItem) => {
  const [isEditing, setIsEditing] = useState(false);

  const [allTasks, setAllTask] = useState([]);

  useEffect(() => {
    Promise.all([getAllTasks()])
      .then(([res]) => {
        setAllTask(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Accordion.Item value={stage.stage.name} key={stage.stage.stageId}>
      <Accordion.Control>
        <AccordionLabel stage={stage.stage} />
      </Accordion.Control>
      <Accordion.Panel>
        {stage.stage.status === 'OPENED' ? (
          <Flex direction='column'>
            <Progress
              color='#EEFF87'
              radius='xs'
              size='sm'
              mb='16px'
              value={100}
            />
            <Text
              className={classes.missionAccordion__progress}
              fz={TextForInput}
              m={{
                md: '30px 0 66px',
                xs: '20px 0 30px',
                base: '20px 0 15px',
              }}
            >
              Прогресс {100} %
            </Text>
            <Flex direction='column' gap='30px'>
              {stage.tasks !== undefined ? (
                <>
                  {stage.tasks.map((task) => (
                    <Accordiontask
                      task={task}
                      key={task.taskId}
                      isEditing={isEditing}
                    />
                  ))}
                </>
              ) : (
                ''
              )}
            </Flex>
            {role === 'ROLE_ADMIN' ||
            role === 'ROLE_HR' ||
            role === 'ROLE_CURATOR' ? (
              <>
                {isEditing ? (
                  <AddTask
                    allTasks={allTasks}
                    internId={idIntern}
                    stage={stage}
                  />
                ) : (
                  ''
                )}
                <ButtonsEditing
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                />
              </>
            ) : (
              <Button
                fz={TextMiddle}
                classNames={{
                  root: classes.buttonTest,
                  inner: classes.buttonTestInner,
                }}
                m={{
                  md: '60px 0 90px',
                  xs: '40px 0 50px',
                  base: '40px 0 30px',
                }}
                h={EditButton}
              >
                Пройти тест еще раз
              </Button>
            )}
          </Flex>
        ) : (
          <Image
            src={Lock}
            w={{ lg: '160px', sm: '120px', base: '100px' }}
            h={{ lg: '165px', sm: '125px', base: '105px' }}
            m={{ lg: '60px auto', sm: '30px auto', base: '0 auto 20px' }}
          />
        )}
      </Accordion.Panel>
    </Accordion.Item>
  );
};
