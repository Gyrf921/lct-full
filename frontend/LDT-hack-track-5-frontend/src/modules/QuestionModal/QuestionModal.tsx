import { QuestionDeleteModal } from '../../components/QuestionDeleteModal/QuestionDeleteModal';
import { QuestionEdit } from '../../components/QuestionEditModal/QuestionEdit';

export interface QuestionModalProps {
  id: number;
}

export const QuestionModal = ({ id }: QuestionModalProps) => {
  return (
    <>
      <QuestionEdit id={id} />
      <QuestionDeleteModal id={id} />
    </>
  );
};
