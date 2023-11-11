import {
  ActionIcon,
  Box,
  Button,
  Card,
  Checkbox,
  Group,
  List,
  Stack,
  Text,
} from '@mantine/core';
import { IconContext } from 'react-icons';
import { PiNotePencil, PiPencilSimple } from 'react-icons/pi';
import { tasks } from '../../mock/Tasks';
import classes from './Tracker.module.css';
export const Tracker = () => {
  return (
    <Card className={classes.card}>
      <Stack className={classes.wrapper}>
        <Box>
          <Group justify='space-between'>
            <Group>
              <Box>
                <IconContext.Provider value={{ className: classes.icon }}>
                  <PiNotePencil />
                </IconContext.Provider>
              </Box>
              <Text fz={30}>Трекер задач</Text>
            </Group>
            <ActionIcon radius='xl'>
              <PiPencilSimple />
            </ActionIcon>
          </Group>
          <Box>
            <List type='ordered'>
              <Stack>
                {tasks.map((item) => (
                  <List.Item
                    key={item.id}
                    classNames={{
                      itemWrapper: classes.itemWrapper,
                      itemLabel: classes.itemLabel,
                    }}
                    className={!item.completed ? `${classes.uncompleted}` : ''}
                  >
                    <Group justify='space-between'>
                      <Box>
                        <Text>{item.title}</Text>
                        <List type='ordered'>
                          {item.subtitles?.map((subItem, subIndex) => (
                            <List.Item key={subIndex}>
                              <Text className={classes.text}>{subItem}</Text>
                            </List.Item>
                          ))}
                        </List>
                      </Box>
                      <Checkbox defaultChecked={item.completed} />
                    </Group>
                  </List.Item>
                ))}
              </Stack>
            </List>
          </Box>
        </Box>
      </Stack>

      <Box>
        <Button fullWidth mt='lg' radius='xl' variant='light'>
          Все статьи
        </Button>
      </Box>
    </Card>
  );
};
