import React, { FC } from 'react';
import {
  Button,
  CurrencyIcon,
  ConstructorElement
} from '@zlden/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import { BurgerConstructorUIProps } from './type';
import { BurgerConstructorElement, Modal } from '@components';
import { OrderDetailsUI } from '@ui';

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  price,
  orderRequest,
  constructorItems,
  orderModalData,
  onOrderClick,
  closeOrderModal
}) => (
  <section className={styles.burger_constructor}>
    <div className={`${styles.elements} mt-25 mb-10`}>
      <div className='pl-8 pr-4'>
        {constructorItems.bun ? (
          <ConstructorElement
            type='top'
            isLocked
            text={`${constructorItems.bun.name} (верх)`}
            price={constructorItems.bun.price}
            thumbnail={constructorItems.bun.image}
          />
        ) : (
          <div className={`${styles.noBuns} ${styles.noBunsTop}`}>
            Выберите булку
          </div>
        )}
      </div>

      <div className='mt-4 mb-4 pr-2'>
        {constructorItems.ingredients.length > 0 ? (
          constructorItems.ingredients.map((item, index) => (
            <BurgerConstructorElement
              ingredient={item}
              index={index}
              totalItems={constructorItems.ingredients.length}
              key={item.id}
            />
          ))
        ) : (
          <div className={styles.noBuns}>Добавьте ингредиенты</div>
        )}
      </div>

      <div className='pl-8 pr-4'>
        {constructorItems.bun ? (
          <ConstructorElement
            type='bottom'
            isLocked
            text={`${constructorItems.bun.name} (низ)`}
            price={constructorItems.bun.price}
            thumbnail={constructorItems.bun.image}
          />
        ) : (
          <div className={`${styles.noBuns} ${styles.noBunsBottom}`}>
            Выберите булку
          </div>
        )}
      </div>
    </div>

    <div className={`${styles.total} mt-10 mr-4`}>
      <p className={`${styles.cost} text text_type_digits-medium mr-10`}>
        {price} <CurrencyIcon type='primary' />
      </p>
      <Button
        htmlType='button'
        type='primary'
        size='large'
        onClick={onOrderClick}
        disabled={orderRequest || !constructorItems.bun}
      >
        {orderRequest ? 'Заказ оформляется...' : 'Оформить заказ'}
      </Button>
    </div>

    {orderModalData && (
      <Modal title='' onClose={closeOrderModal}>
        <OrderDetailsUI orderNumber={orderModalData.number} />
      </Modal>
    )}
  </section>
);
