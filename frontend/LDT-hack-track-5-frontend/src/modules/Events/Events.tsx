import { Box, Group, Indicator, List, Text } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { events } from '../../mock/Events';

export const Events = () => {
  return (
    <Group mt={50} justify='space-between'>
      <Calendar
        size={'md'}
        renderDay={(date) => {
          const day = date.getDate();

          return (
            <Indicator
              size={6}
              color='red'
              offset={-5}
              disabled={events.every((item) => {
                return item.date.toISOString() !== date.toISOString();
              })}
            >
              <div>{day}</div>
            </Indicator>
          );
        }}
      />
      <Box>
        <Text>Ближайшие события</Text>
        <List type='ordered'>
          {events.map((item) => (
            <List.Item key={item.id}>
              <Group>
                <Text>{item.title}</Text>
                <Text>{item.date.toISOString().slice(0, 10)}</Text>
              </Group>
            </List.Item>
          ))}
        </List>
      </Box>
    </Group>
  );
};
