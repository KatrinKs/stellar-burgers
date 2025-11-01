import { FC, memo, useEffect } from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => {
    useEffect(() => {
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscapeKey);

      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }, [onClose]);

    return (
      <>
        <div className={styles.modal} data-testid='modal'>
          <div className={styles.header}>
            <h3 className={`${styles.title} text text_type_main-large`}>
              {title}
            </h3>
            <button
              className={styles.button}
              type='button'
              data-testid='modal-close'
              onClick={onClose}
            >
              <CloseIcon type='primary' />
            </button>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
        <div
          className={styles.overlay}
          onClick={onClose}
          data-testid='modal-overlay'
        />
      </>
    );
  }
);
