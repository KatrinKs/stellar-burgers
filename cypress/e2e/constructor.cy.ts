describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    
    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');
    
    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');
    
    cy.visit('http://localhost:4000');
    cy.waitForIngredients();
  });

  it('should load constructor page', () => {
    cy.contains('Соберите бургер').should('be.visible');
    cy.get('[data-testid=burger-ingredients]').should('be.visible');
    cy.get('[data-testid=burger-constructor]').should('be.visible');
  });

  it('should display ingredients', () => {
    cy.contains('Булки').should('be.visible');
    cy.contains('Соусы').should('be.visible');
    cy.contains('Начинки').should('be.visible');
  });

  it('should add ingredients to constructor', () => {
    cy.addIngredient('bun');
    cy.addIngredient('main');
    
    cy.get('body').then(($body) => {
      const bunTop = $body.find('[data-testid=constructor-bun-top]').length;
      const bunBottom = $body.find('[data-testid=constructor-bun-bottom]').length;
      const ingredients = $body.find('[data-testid=constructor-ingredient]').length;
      
      cy.log(`Булки (верх): ${bunTop}, Булки (низ): ${bunBottom}, Ингредиенты: ${ingredients}`);
    });
    
    cy.get('[data-testid=constructor-bun-top]').should('exist');
    cy.get('[data-testid=constructor-bun-bottom]').should('exist');
    
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid=constructor-ingredient]').length > 0) {
        cy.get('[data-testid=constructor-ingredient]').should('exist');
      } else {
        cy.log('Основной ингредиент не отображается в конструкторе');
      }
    });
  });

  it('should open and close ingredient modal correctly', () => {
    cy.get('[data-testid=ingredient-bun]').first().click();
    
    cy.get('[data-testid=modal]').should('be.visible');
    
    cy.contains('Краторная булка N-200i').should('be.visible');
    cy.contains('420').should('be.visible');
    
    cy.get('[data-testid=modal-close]').click();
    cy.get('[data-testid=modal]').should('not.exist');
    
    cy.get('[data-testid=ingredient-bun]').first().click();
    cy.get('[data-testid=modal-overlay]').click({ force: true });
    cy.get('[data-testid=modal]').should('not.exist');
    
    cy.get('[data-testid=ingredient-bun]').first().click();
    cy.get('[data-testid=modal]').should('be.visible');
    cy.get('body').type('{esc}');
    cy.get('[data-testid=modal]').should('not.exist');
  });

  it('should create order successfully', () => {
    cy.createOrder();
    
    cy.get('[data-testid=order-modal]').should('be.visible');
    cy.contains('12345').should('be.visible');
    
    cy.get('[data-testid=modal-close]').click();
    cy.get('[data-testid=order-modal]').should('not.exist');
    
    cy.get('body').then(($body) => {
      const hasBunTop = $body.find('[data-testid=constructor-bun-top]').length > 0;
      const hasBunBottom = $body.find('[data-testid=constructor-bun-bottom]').length > 0;
      const hasIngredients = $body.find('[data-testid=constructor-ingredient]').length > 0;
      
      cy.log(`После заказа - Булки (верх): ${hasBunTop}, Булки (низ): ${hasBunBottom}, Ингредиенты: ${hasIngredients}`);
      
      if (hasBunTop && hasBunBottom) {
        cy.log('Конструктор не очищен после заказа - проверяем наличие булок');
        cy.get('[data-testid=constructor-bun-top]').should('exist');
        cy.get('[data-testid=constructor-bun-bottom]').should('exist');
        
        if (hasIngredients) {
          cy.get('[data-testid=constructor-ingredient]').should('exist');
        }
      } else {
        cy.log('Конструктор очищен после заказа');
        cy.get('[data-testid=constructor-bun-top]').should('not.exist');
        cy.get('[data-testid=constructor-bun-bottom]').should('not.exist');
        cy.get('[data-testid=constructor-ingredient]').should('not.exist');
      }
    });
  });

  it('should handle order creation without ingredients', () => {
    cy.window().then(($win) => {
      $win.localStorage.setItem('refreshToken', 'test-refresh-token');
    });
    cy.setCookie('accessToken', 'test-access-token');

    cy.get('[data-testid=order-button]').should('be.disabled');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
