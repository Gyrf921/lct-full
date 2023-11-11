import { ActionIcon, Button, Container, Group, Text } from '@mantine/core';
import { BsTrash3 } from 'react-icons/bs';
import { VscTriangleRight } from 'react-icons/vsc';
export const AudioItem = () => {
  return (
    <>
      <Group justify='space-between'>
        <Text>История в цифрах</Text>
        <Group>
          <Button variant='white'>Изменить</Button>
          <Text>1 мин</Text>
          <ActionIcon variant='unstyled'>
            <VscTriangleRight />
          </ActionIcon>
          <ActionIcon variant='unstyled' c='red'>
            <BsTrash3 />
          </ActionIcon>
        </Group>
      </Group>
    </>
  );
};
