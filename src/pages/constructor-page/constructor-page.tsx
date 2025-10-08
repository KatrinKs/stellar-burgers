import { FC, useEffect, useState } from 'react';
import { useSelector } from '../../services/store';
import styles from './constructor-page.module.css';
import { BurgerIngredients, BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';

export const ConstructorPage: FC = () => {
  const { isLoading, ingredients } = useSelector((state) => state.ingredients);
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Force showing interface after timeout');
      setForceShow(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  console.log('ConstructorPage state:', {
    isLoading,
    ingredientsCount: ingredients.length,
    forceShow
  });

  if (isLoading && !forceShow) {
    console.log('Showing Preloader');
    return <Preloader />;
  }

  console.log(
    'Rendering main interface - isLoading:',
    isLoading,
    'forceShow:',
    forceShow
  );
  return (
    <main className={styles.containerMain}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
