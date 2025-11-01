/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredient(ingredientType: string): Chainable<void>;
      
      createOrder(): Chainable<void>;
      
      waitForIngredients(): Chainable<void>;

      checkConstructorState(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('addIngredient', (ingredientType: string) => {
  cy.get(`[data-testid=ingredient-${ingredientType}]`).first().within(() => {
    cy.get('button').contains('Добавить').click();
  });
});

Cypress.Commands.add('createOrder', () => {
  cy.window().then(($win) => {
    $win.localStorage.setItem('refreshToken', 'test-refresh-token');
  });
  cy.setCookie('accessToken', 'test-access-token');

  cy.addIngredient('bun');
  cy.addIngredient('main');

  cy.get('[data-testid=order-button]').should('not.be.disabled');
  cy.get('[data-testid=order-button]').click();
  
  cy.wait('@createOrder');
});

Cypress.Commands.add('waitForIngredients', () => {
  cy.wait('@getIngredients');
});

Cypress.Commands.add('checkConstructorState', () => {
  cy.get('body').then(($body) => {
    const hasBunTop = $body.find('[data-testid=constructor-bun-top]').length > 0;
    const hasBunBottom = $body.find('[data-testid=constructor-bun-bottom]').length > 0;
    const hasIngredients = $body.find('[data-testid=constructor-ingredient]').length > 0;
    
    cy.log(`Состояние конструктора - Булки (верх): ${hasBunTop}, Булки (низ): ${hasBunBottom}, Ингредиенты: ${hasIngredients}`);
    
    return cy.wrap({ hasBunTop, hasBunBottom, hasIngredients });
  });
});

export {};
