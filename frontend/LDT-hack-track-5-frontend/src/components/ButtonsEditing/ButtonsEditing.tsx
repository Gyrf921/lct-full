import { AddTask } from '../Mission/MissionAccordion/AddTask/AddTask.tsx';
import { Button } from '@mantine/core';
import classes from '../Mission/MissionAccordion/MissionAccordion.module.css';
import { EditButton, TextMiddle } from '../../theme/AdaptiveConts.ts';

export const ButtonsEditing = ({ isEditing, setIsEditing }) => {
  return (
    <>
      {isEditing ? (
        <Button
          onClick={() => setIsEditing(false)}
          h={EditButton}
          bg='#5277F6'
          color='#FFF'
          fz={TextMiddle}
          classNames={{
            root: classes.buttonTest,
            inner: classes.buttonEditorInner,
          }}
        >
          Сохранить
        </Button>
      ) : (
        <Button
          onClick={() => setIsEditing(true)}
          h={EditButton}
          fz={TextMiddle}
          classNames={{
            root: classes.buttonTest,
            inner: classes.buttonTestInner,
          }}
        >
          Редактировать
        </Button>
      )}
    </>
  );
};
