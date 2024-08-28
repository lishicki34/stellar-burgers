import { RequestStatus, TIngredient } from '@utils-types';
import ingredientsReducer, {
  getIngredients,
  initialState
} from '../ingredientsSlice';

global.fetch = jest.fn();
const mockUrl = 'https://example.com/api/ingredients';
process.env.REACT_APP_API_URL = mockUrl;

describe('ingredientsSlice reducer', () => {
  test('должен обрабатывать начальное состояние', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  test('должен обрабатывать getIngredients.pending', () => {
    const action = getIngredients.pending('', undefined, {});
    const actual = ingredientsReducer(initialState, action);
    expect(actual.status).toBe(RequestStatus.Loading);
  });

  test('должен обрабатывать getIngredients.fulfilled', async () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 200,
        price: 10,
        image: 'image1.jpg',
        image_large: 'image1_large.jpg',
        image_mobile: 'image1_mobile.jpg'
      },
      {
        _id: '2',
        name: 'Ingredient 2',
        type: 'sauce',
        proteins: 2,
        fat: 1,
        carbohydrates: 5,
        calories: 50,
        price: 5,
        image: 'image2.jpg',
        image_large: 'image2_large.jpg',
        image_mobile: 'image2_mobile.jpg'
      }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: mockIngredients })
    });

    const action = getIngredients.fulfilled(mockIngredients, '', undefined);

    const actual = await ingredientsReducer(initialState, action);

    expect(actual.status).toBe(RequestStatus.Success);
    expect(actual.data).toEqual(mockIngredients);
  });

  test('должен обрабатывать getIngredients.rejected', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Ошибка'));

    const action = getIngredients.rejected(null, '');

    const actual = await ingredientsReducer(initialState, action);

    expect(actual.status).toBe(RequestStatus.Failed);
  });
});
