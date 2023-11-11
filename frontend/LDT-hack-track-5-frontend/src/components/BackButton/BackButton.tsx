import { Button, ButtonProps } from '@mantine/core';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export const BackButton = ({ children, ...props }: ButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button
      leftSection={<AiOutlineArrowLeft />}
      onClick={() => navigate(-1)}
      {...props}
      variant='unstyled'
    >
      {children}
    </Button>
  );
};
