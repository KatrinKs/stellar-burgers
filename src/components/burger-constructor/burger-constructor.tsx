import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { clearConstructor } from '../../services/reducers/constructor/constructor';
import { createOrder, clearOrder } from '../../services/reducers/order/order';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { orderRequest, orderModalData } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  const constructorBun = bun ? { ...bun, id: `${bun._id}-bun` } : null;

  const constructorItems = {
    bun: constructorBun,
    ingredients
  };

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!bun || orderRequest) return;

    const ingredientsIds = [
      bun._id,
      ...ingredients.map((item: TConstructorIngredient) => item._id),
      bun._id
    ];

    dispatch(createOrder(ingredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
