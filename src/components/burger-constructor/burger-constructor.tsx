import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { userSelectors } from '../../services/userSlice';
import { useDispatch } from '../../services/store';
import {
  BurgerConstructorActions,
  orderBurger
} from '../../services/burgerConstructorSlice';
import { RequestStatus } from '@utils-types';

export const BurgerConstructor: FC = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);

  const constructorItems = useSelector(
    (state: RootState) => state.burgerConstructor
  );

  const orderRequest =
    useSelector((state: RootState) => state.burgerConstructor.requestStatus) ===
    RequestStatus.Loading;

  const orderModalData = useSelector(
    (state: RootState) => state.burgerConstructor.order
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigation('/login');
    } else {
      const ingredientIds = [
        ...constructorItems.ingredients.map(
          (ingredient: { _id: any }) => ingredient._id
        ),
        constructorItems.bun._id
      ];
      dispatch(orderBurger(ingredientIds));
    }
  };

  const closeOrderModal = () => {
    dispatch(BurgerConstructorActions.resetBurgerConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
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
