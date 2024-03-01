/* eslint-disable no-undef */
describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.intercept('POST', 'http://localhost:3001/login').as('loginRequest');
  });
 
  it('shows error messages for invalid inputs', () => {
    cy.get('#form3Example3').type('invalid email');
    cy.get('#form3Example4').type('short');
    cy.get('form').submit();
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);
  });

  it('fills the form and submits', () => {
    cy.get('#form3Example3').type('john.doe@example.com');
    cy.get('#form3Example4').type('Password123!');
    cy.get('form').submit();
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    cy.url().should('not.include', '/login');
  }); 
});