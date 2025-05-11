import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className={css.error}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;

