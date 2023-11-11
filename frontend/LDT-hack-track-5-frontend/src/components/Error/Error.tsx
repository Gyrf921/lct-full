import { Notification } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setError } from '../../store/userSlice';

export const Error = () => {
  const error = useSelector((state: RootState) => state.error);
  const dispatch = useDispatch();
  return (
    <>
      {error && (
        <Notification
          onClose={() => dispatch(setError(''))}
          color='red'
          pos='fixed'
          bottom='0'
          right='0'
        >
          {error}
        </Notification>
      )}
    </>
  );
};
