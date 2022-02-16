const { Section2 } = require('../objects/section-2')

describe('Problem 2', () => {
  /**
   * Example:
   * To access assertSampleApiResponse() from Section2, you can do: Section2.actions.assertSampleApiResponse();
   *
   * Test away!
   */

  beforeEach('Visit section2', () => {
    cy.visit('/section-2')
  })

  it('assert long network call', () => {
    Section2.actions.assertNetworkCall();
  })

  it('assert opening a new tab', () => {
    Section2.actions.assertOpeningNewTab();
  })

  // This Fails because the click is not happening . I have tried with {Force:true} no luck
  it('assert download file', () => {
    Section2.actions.assertDownloadFile();
  })
})
