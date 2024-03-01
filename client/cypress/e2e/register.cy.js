/* eslint-disable no-undef */
describe('Register Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('fills the form and submits', () => {
    cy.get('#form3Example2').type('John');
    cy.get('#form3Example5').type('Doe');
    cy.get('#form3Example3').type('john.doe@example.com');
    cy.get('#form3Example4').type('Password123!');
    cy.get('form').submit();
  });
});