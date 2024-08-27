describe('Страница конструктора бургера', () => {
  const testUrl = 'http://localhost:4000';
  const modalSelector = '[data-cy="modal"]';

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json',
    }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    });
    cy.intercept('POST', 'api/orders', { 
      fixture: 'order.json'
    }).as('postOrder');
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit(testUrl);
  });
  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
  it('показывать прелоадер во время загрузки ингредиентов', () => {
    cy.visit(testUrl);
    cy.wait('@getIngredients');
    cy.get('main').should('contain', 'Соберите бургер');
    cy.get('h1').should('contain', 'Соберите бургер');
  });
  it('показывать ошибку при неудачном получении ингредиентов', () => {
    cy.visit(testUrl);
    cy.wait('@getIngredients');
  });

  it('тестировать добавление булок и начинок в конструктор', () => {
    cy.visit(testUrl);
    cy.wait('@getIngredients');
    cy.get('[data-ing="ingredient-item-bun"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-bun-1"]').should('exist');
    cy.get('[data-cy="constructor-bun-2"]').should('exist');
    cy.get('[data-ing="ingredient-item-main"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-topping"]').should('exist');
    cy.get('[data-ing="ingredient-item-sauce"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-topping"]').should('exist');
  });

  it('открывать и закрывать модальное окно ингредиента', () => {
    cy.visit(testUrl);
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-item-1"]').click();
    cy.get(modalSelector).should('be.visible');
    cy.get('[data-cy="modal-close-btn"]').click();
    cy.get(modalSelector).should('not.exist');
  });

  it('закрывать модальное окно ингредиента по клику на оверлей', () => {
    cy.visit(testUrl);
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-item-2"]').click();
    cy.get(modalSelector).should('be.visible');
    cy.get('[data-cy="modal-overlay"]').click('topRight', { force: true });
    cy.get(modalSelector).should('not.exist');
  });

  it('создание заказа', () => {
    cy.visit(testUrl);
    cy.wait('@getIngredients');
    cy.get('[data-ing="ingredient-item-bun"]').contains('Добавить').click();
    cy.get('[data-ing="ingredient-item-main"]').contains('Добавить').click();
    cy.get('[data-ing="ingredient-item-sauce"]').contains('Добавить').click();
    cy.get('[data-cy=order-summ] button').click();
    cy.get(modalSelector).contains('44330').should('exist');
    cy.get('[data-cy="modal-close-btn"]').click();
    cy.get(modalSelector).should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Ингредиент 1')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Ингредиент 3')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Ингредиент 4')
      .should('not.exist');
  });
});
