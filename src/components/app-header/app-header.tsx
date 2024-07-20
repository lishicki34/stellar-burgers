import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { AppHeaderUI } from '@ui';
import { RootState } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector((state: RootState) => state.user.data?.name);
  return <AppHeaderUI userName={userName} />;
};
