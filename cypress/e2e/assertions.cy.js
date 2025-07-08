beforeEach(() => {
  cy.intercept('POST', 'https://events.backtrace.io/**', {
    statusCode: 200,
    body: {}, // block unnecessary error reporting
  });
});

it('Assertions Demo with Price Check and Waits', () => {
  // Visit the site
  cy.visit('https://www.saucedemo.com/');
  cy.wait(5000); // Wait for page to fully load

  // Login
  cy.get('[data-test="username"]').should('be.visible').type('standard_user');
  cy.wait(5000);

  cy.get('[data-test="password"]').should('be.visible').type('secret_sauce');
  cy.wait(5000);

  cy.get('[data-test="login-button"]').should('be.visible').click();
  cy.wait(5000); // Wait for redirection to inventory page

  // Assert URL is correct after login
  cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
  cy.wait(5000);

  // Check product list is visible
  cy.get('.inventory_list').should('be.visible');
  cy.wait(5000);

  // Check product count is exactly 6
  cy.get('.inventory_item').should('have.length', 6);
  cy.wait(5000);

  // Check product titles are not empty
  cy.get('.inventory_item_name').each(($el) => {
    cy.wrap($el).should('not.be.empty');
  });
  cy.wait(5000);

  // Check “Add to cart” button for Sauce Labs Backpack
  cy.contains('.inventory_item', 'Sauce Labs Backpack')
    .find('button')
    .should('have.text', 'Add to cart')
    .and('be.visible');
  cy.wait(5000);

  //  Check price of Sauce Labs Backpack
  cy.contains('.inventory_item', 'Sauce Labs Backpack')
    .find('.inventory_item_price')
    .should('be.visible')
    .and('contain.text', '$29.99');
  cy.wait(5000);

  // Assert app logo is visible and has correct class
  cy.get('.app_logo')
    .should('be.visible')
    .and('have.class', 'app_logo')
    .and('contain.text', 'Swag Labs');
  cy.wait(5000);

  // Click Add to cart → assert cart badge appears
  cy.contains('.inventory_item', 'Sauce Labs Backpack')
    .find('button')
    .click();
  cy.wait(5000);

  cy.get('.shopping_cart_badge')
    .should('be.visible')
    .and('contain', '1');
  cy.wait(5000);

  // Navigate to cart and validate item presence
  cy.get('.shopping_cart_link').click();
  cy.wait(5000);
  cy.url().should('include', '/cart.html');

  cy.get('.cart_item')
    .should('have.length', 1)
    .and('contain.text', 'Sauce Labs Backpack');
  cy.wait(5000);

  // Check quantity is 1
  cy.get('.cart_quantity').should('contain.text', '1');
  cy.wait(55000);

  // Go back to inventory page
  cy.get('[data-test="continue-shopping"]').click();
  cy.wait(5000);
  cy.url().should('include', '/inventory.html');

  // Final direct assertion using assert
  cy.url().then((url) => {
    assert.equal(url, 'https://www.saucedemo.com/inventory.html', 'Returned to inventory page');
  });
  cy.wait(5000);
});
