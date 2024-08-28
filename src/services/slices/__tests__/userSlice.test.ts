import userReducer, {
  registerUser,
  loginUser,
  checkUserAuth,
  updateUser,
  logoutUser,
  userActions,
  initialState
} from '../userSlice';
import { RequestStatus, TUser } from '@utils-types';

jest.mock('@api', () => ({
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  getUserApi: jest.fn(),
  logoutApi: jest.fn(),
  updateUserApi: jest.fn()
}));

describe('userSlice reducer', () => {
  const testUser = {
    name: 'Ксения',
    email: 'ksusha2993@gmail.com',
    password: 'password'
  };
  const updatedUser = {
    name: 'Updated User',
    email: 'updated@example.com',
    password: 'updated-password'
  };
  const userData = {
    name: 'Test',
    email: 'test@example.com',
    password: 'password123'
  };
  const loginData = { email: 'test@example.com', password: 'password123' };
  const updateNameUserData = { name: 'Updated Name' };

  test('начальное состояние', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('обработка authCheck', () => {
    const actual = userReducer(initialState, userActions.authCheck());
    expect(actual.isAuthChecked).toEqual(true);
  });

  test('обработка userLogout', () => {
    const stateWithData = { ...initialState, testUser };
    const actual = userReducer(stateWithData, userActions.userLogout());
    expect(actual.data).toEqual(null);
  });

  describe('Асинхронные действия', () => {
    test('обработка registerUser.fulfilled', () => {
      const actual = userReducer(
        initialState,
        registerUser.fulfilled(testUser, '', testUser)
      );
      expect(actual.data).toEqual(testUser);
      expect(actual.requestStatus).toBe(RequestStatus.Success);
    });

    test('обработка registerUser.pending', () => {
      const actual = userReducer(
        initialState,
        registerUser.pending('', userData)
      );
      expect(actual.requestStatus).toBe(RequestStatus.Loading);
    });

    test('обработка registerUser.rejected', () => {
      const actual = userReducer(
        initialState,
        registerUser.rejected(new Error('Ошибка регистрации'), '', userData)
      );
      expect(actual.requestStatus).toBe(RequestStatus.Failed);
    });

    test('обработка loginUser.fulfilled', () => {
      const actual = userReducer(
        initialState,
        loginUser.fulfilled(testUser, '', {
          email: 'ksusha2993@gmail.com',
          password: 'password'
        })
      );
      expect(actual.data).toEqual(testUser);
      expect(actual.requestStatus).toBe(RequestStatus.Success);
    });

    test('обработка loginUser.pending', () => {
      const actual = userReducer(
        initialState,
        loginUser.pending('', loginData)
      );
      expect(actual.requestStatus).toBe(RequestStatus.Loading);
    });

    test('обработка loginUser.rejected', () => {
      const actual = userReducer(
        initialState,
        loginUser.rejected(new Error('Ошибка входа'), '', loginData)
      );
      expect(actual.requestStatus).toBe(RequestStatus.Failed);
    });

    test('обработка checkUserAuth.fulfilled', () => {
      const actual = userReducer(
        initialState,
        checkUserAuth.fulfilled(testUser, '')
      );
      expect(actual.data).toEqual(testUser);
      expect(actual.requestStatus).toBe(RequestStatus.Success);
    });

    test('обработка checkUserAuth.pending', () => {
      const actual = userReducer(
        initialState,
        checkUserAuth.pending('', undefined)
      );
      expect(actual.requestStatus).toBe(RequestStatus.Loading);
    });

    test('обработка checkUserAuth.rejected', () => {
      const actual = userReducer(
        initialState,
        checkUserAuth.rejected(
          new Error('Ошибка проверки аутентификации'),
          '',
          undefined
        )
      );
      expect(actual.requestStatus).toBe(RequestStatus.Failed);
    });

    test('обработка updateUser.fulfilled', () => {
      const stateWithData = { ...initialState, data: testUser };
      const actual = userReducer(
        stateWithData,
        updateUser.fulfilled(updatedUser, '', userData)
      );
      expect(actual.data).toEqual(updatedUser);
      expect(actual.requestStatus).toBe(RequestStatus.Success);
    });

    test('обработка updateUser.pending', () => {
      const actual = userReducer(
        initialState,
        updateUser.pending('', updateNameUserData)
      );
      expect(actual.requestStatus).toBe(RequestStatus.Loading);
    });

    test('обработка updateUser.rejected', () => {
      const actual = userReducer(
        initialState,
        updateUser.rejected(
          new Error('Ошибка обновления пользователя'),
          '',
          updateNameUserData
        )
      );
      expect(actual.requestStatus).toBe(RequestStatus.Failed);
    });

    test('обработка logoutUser.fulfilled', () => {
      const stateWithData = { ...initialState, data: testUser };
      const actual = userReducer(stateWithData, userActions.userLogout());
      expect(actual.data).toBeNull();
      expect(actual.requestStatus).toBe(RequestStatus.Idle);
    });

    test('обработка logoutUser.pending', () => {
      const actual = userReducer(
        initialState,
        logoutUser.pending('', undefined)
      );
      expect(actual.requestStatus).toBe(RequestStatus.Loading);
    });

    test('обработка logoutUser.rejected', () => {
      const actual = userReducer(
        initialState,
        logoutUser.rejected(new Error('Ошибка выхода'), '', undefined)
      );
      expect(actual.requestStatus).toBe(RequestStatus.Failed);
    });
  });
});
