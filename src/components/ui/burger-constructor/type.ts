import { TConstructorIngredient, TOrder, TIngredient } from '@utils-types';

export type BurgerConstructorUIProps = {
  price: number;
  orderRequest: boolean;
  constructorItems: {
    bun: (TConstructorIngredient & { id: string }) | null;
    ingredients: TConstructorIngredient[];
  };
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
