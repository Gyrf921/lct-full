import { ActionIcon, ActionIconProps } from '@mantine/core';
import { PiPencilSimple } from 'react-icons/pi';

export const EditButton = ({ ...props }: ActionIconProps) => {
  return (
    <ActionIcon radius='xl' {...props}>
      <PiPencilSimple />
    </ActionIcon>
  );
};
