/* global it cy describe */
describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/login')
    cy.contains('button', 'Entrar com o Google')
  })
})
