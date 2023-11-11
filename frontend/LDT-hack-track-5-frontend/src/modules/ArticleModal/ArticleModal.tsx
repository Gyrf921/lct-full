import { ArticleDeleteModal } from '../../components/ArticleDeleteModal/ArticleDeleteModal';
import { ArticleEdit } from '../../components/ArticleEdit/ArticleEdit';

export interface ArticleModalProps {
  id: number;
}

export const ArticleModal = ({ id }: ArticleModalProps) => {
  return (
    <>
      <ArticleEdit id={id} />
      <ArticleDeleteModal id={id} />
    </>
  );
};
