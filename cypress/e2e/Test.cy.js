beforeEach(() => {
  cy.intercept('POST', 'https://events.backtrace.io/**', {
    statusCode: 200,
    body: {}, // empty response
  });
});
 it('should login, add to cart, test continue shopping, test cancel in checkout', () => {
  cy.visit('https://www.saucedemo.com/');
  cy.wait(5000); // Wait for site to load

  // Login
  cy.get('[data-test="username"]').type('standard_user');
  cy.wait(5000);
  cy.get('[data-test="password"]').type('secret_sauce');
  cy.wait(5000);
  cy.get('[data-test="login-button"]').click();
  cy.wait(5000); // Wait for dashboard to load

  // Apply filter
  cy.get('[data-test="product_sort_container"]').select('lohi');
  cy.wait(1000);

  // Add 3 products
  cy.contains('.inventory_item', 'Sauce Labs Backpack').find('button').click();
  cy.wait(5000);
  cy.contains('.inventory_item', 'Sauce Labs Bike Light').find('button').click();
  cy.wait(5000);
  cy.contains('.inventory_item', 'Sauce Labs Bolt T-Shirt').find('button').click();
  cy.wait(5000);

  // Go to cart
  cy.get('.shopping_cart_link').click();
  cy.wait(1000);
  cy.url().should('include', '/cart.html');
  cy.wait(5000);

  //  Test: Continue Shopping
  cy.get('[data-test="continue-shopping"]').click();
  cy.wait(5000);
  cy.url().should('include', '/inventory.html');
  cy.wait(5000);

  // Back to cart again
  cy.get('.shopping_cart_link').click();
  cy.wait(5000);
  cy.url().should('include', '/cart.html');
  cy.wait(5000);

  //  Remove 1 product
  cy.contains('.cart_item', 'Sauce Labs Bike Light').find('button').click();
  cy.wait(5000);
  cy.get('.cart_item').should('have.length', 2);
  cy.wait(5000);

  //  Checkout Step One
  cy.get('[data-test="checkout"]').click();
  cy.wait(5000);
  cy.url().should('include', '/checkout-step-one.html');
  cy.wait(5000);

  //  Test: Cancel Button on Step One
  cy.get('[data-test="cancel"]').click();
  cy.wait(5000);
  cy.url().should('include', '/cart.html');
  cy.wait(5000);

  //  Go to checkout again and complete it
  cy.get('[data-test="checkout"]').click();
  cy.wait(5000);
  cy.get('[data-test="firstName"]').type('Muhammad');
  cy.wait(5000);
  cy.get('[data-test="lastName"]').type('Sajawal');
  cy.wait(5000);
  cy.get('[data-test="postalCode"]').type('12345');
  cy.wait(5000);
  cy.get('[data-test="continue"]').click();
  cy.wait(5000);
  cy.url().should('include', '/checkout-step-two.html');
  cy.wait(5000);

  // Finish checkout
  cy.get('[data-test="finish"]').click();
  cy.wait(5000);

  //  Order confirmation
  cy.contains('THANK YOU FOR YOUR ORDER').should('exist');
  cy.wait(5000);
});