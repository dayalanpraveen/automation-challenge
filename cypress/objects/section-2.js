const path = require('path')
const Section2 = {
  /**
   * A literal is considered static, stable strings (eg. titles, form labels, ...)
   */
  literals: {
    SAMPLE_LITERAL: 'This is a sample literal. You can safely delete it.',
    ALERT_TEXT: 'Abnormally long network call!',
    EXPECTED_HEADER_TEXT: 'AlayaCare Cypress - Automation Challenge 🚀'
  },

  /**
   * An element is a selector for any DOM element (eg. [data-test="xxx"], #id, ...)
   */
  elements: {
    sampleElement: '[data-test=sample-element-to-be-safely-deleted]',
    ntwrkCallButtonElement: '#network-call-button',
    newTabButton: '.row > div:nth-of-type(3) a',
    downloadFileButtonElement: 'a#file-download-button > button'
  },

  /**
   * An action should be pretty self explanatory! It consists of all the method performing
   * a particular action from clicking a simple button to doing complex assertions.
   */
  actions: {
    /**
     * Example of action.
     * In this example, we are grabbing a sample element, clicking on it and asserting the api answer.
     *
     * This is only used as an example and can be safely deleted.
     */
    assertSampleApiResponse() {
      cy.server()
      cy.wait('/endpoint').as('endpoint')

      cy.get(Section2.elements.sampleElement).click()
      // ... An api call to "/endpoint" performed on the app.
      cy.wait('@endpoint').should((request) => {
        expect(request.status).to.eq(200)
      })
    },

    assertNetworkCall() {
      cy.intercept('http://localhost:8889/todos/1').as('callUrl');
      cy.window().then((win) => {
        cy.stub(win, 'alert').as('alert')
      })
      cy.get(Section2.elements.ntwrkCallButtonElement).click();
      cy.wait('@callUrl').its('response.statusCode').should('eq', 200);
      cy.get('@callUrl')
        .its('response.body')
        .should('deep.equal', { id: 1, title: Section2.literals.ALERT_TEXT });
      cy.get('@alert').should('have.been.calledOnce', Section2.literals.ALERT_TEXT);
    },

    assertOpeningNewTab() {
      cy.get(Section2.elements.newTabButton).invoke('removeAttr', 'target').click().then(() => {
        cy.url().should('contain', '/');
        cy.get('h1').should('include.text', Section2.literals.EXPECTED_HEADER_TEXT);
      })
    },

    assertDownloadFile() {
      cy.get(Section2.elements.downloadFileButtonElement).contains('Click me!').should('be.visible').click({ force: true });

      cy.verifyDownload('javascript-logo.png');

      // const downloadsFolder = Cypress.config('downloadsFolder');
      // const downloadedFilename = path.join(downloadsFolder, 'javascript-logo.png')

      // cy.readFile(downloadedFilename, 'binary', { timeout: 15000 })
      //   .should(buffer => expect(buffer.length).to.be.gt(100));
    }
  },
}

export default { Section2 }
