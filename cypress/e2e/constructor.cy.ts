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
    cy.wait('@getIngredients');
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
    cy.get('[data-testid=ingredient-bun]').first().within(() => {
      cy.get('button').contains('Добавить').click();
    });
    
    cy.get('[data-testid=ingredient-main]').first().within(() => {
      cy.get('button').contains('Добавить').click();
    });
    
    cy.get('[data-testid=constructor-bun-top]').should('exist');
    cy.get('[data-testid=constructor-bun-bottom]').should('exist');
    cy.get('[data-testid=constructor-ingredient]').should('exist');
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
  });

  it('should create order successfully', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'test-refresh-token');
    });
    cy.setCookie('accessToken', 'test-access-token');

    cy.get('[data-testid=ingredient-bun]').first().within(() => {
      cy.get('button').contains('Добавить').click();
    });
    
    cy.get('[data-testid=ingredient-main]').first().within(() => {
      cy.get('button').contains('Добавить').click();
    });

    cy.get('[data-testid=order-button]').should('not.be.disabled');
    cy.get('[data-testid=order-button]').click();
    
    cy.get('[data-testid=order-modal]').should('be.visible');
    cy.contains('12345').should('be.visible'); 
    
    cy.get('[data-testid=modal-close]').click();
    cy.get('[data-testid=order-modal]').should('not.exist');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
