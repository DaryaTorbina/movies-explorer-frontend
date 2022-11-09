import classNames from 'classnames';
import './CardButton.css';

function CardButton({ className, type, onClick }) {
  const buttons = {
    save: {
      text: '',
      className: 'card-button_type_save',
      alt: 'выбрать',
    },
    done: {
      text: '',
      className: 'card-button_type_done',
      alt: 'отменить выбор',
    },
    delete: {
      text: '',
      className: 'card-button_type_delete',
      alt: 'удалить из сохраненных',
    },
  };

  return (
    <button
      className={classNames(
        className,
        buttons[type].className,
        'card-button',
      )}
      type="button"
      {...(buttons[type].alt
        ? { 'aria-label': buttons[type].alt }
        : {})}
      onClick={onClick}
    >
      {buttons[type].text}
    </button>
  );
}

export default CardButton;
