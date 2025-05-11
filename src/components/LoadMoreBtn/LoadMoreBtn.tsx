import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn = ({ onClick }: LoadMoreBtnProps) => (
  <div className={css.wrapper}>
    <button className={css.button} onClick={onClick}>
      Load more
    </button>
  </div>
);

export default LoadMoreBtn;

