import * as utils from '../support/utils.js'
const Section1 = {
  /**
   * A literal is considered static, stable strings (eg. titles, form labels, ...)
   */
  literals: {
    SAMPLE_LITERAL: 'This is a sample literal. You can safely delete it.',
    INPUT_NAME: 'ALAYA',
    INPUT_AGE: 25,
    ALERT_TEXT: 'Form submitted!'
  },

  /**
   * An element is a selector for any DOM element (eg. [data-test="xxx"], #id, ...)
   */
  elements: {
    sampleElement: '[data-test=sample-element-to-be-safely-deleted]',
    ALAYA_TABLE: '#alaya-table',
    showTableBtn: '#table-toggle-button',
    getTableRow: 'tbody tr',
    getTableHeader: '[data-test="table-header"]',
    getForm: '#alaya-form',
    getFormBtn: '#form-toggle-button',
    getNameElement: '#fullName',
    getAgeElement: '#age',
    getGenderElement: 'select',
    getcheckBoxElement: '[type="checkbox"]',
    getSubmitButton: '#submit'
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

      cy.get(Section1.elements.sampleElement).click()
      // ... An api call to "/endpoint" performed on the app.
      cy.wait('@endpoint').should((request) => {
        expect(request.status).to.eq(200)
      })
    },

    assertTableisNotVisible() {
      cy.get(Section1.elements.ALAYA_TABLE).should('not.be.visible');
    },

    assertTableisVisible() {
      cy.get(Section1.elements.showTableBtn).should('be.visible').click().then(() => {
        cy.get(Section1.elements.ALAYA_TABLE).should('be.visible');
      })
    },

    assertTablewidth(expectedWidth) {
      cy.get(Section1.elements.getTableRow).eq(0).find('th').then(($th) => {
        cy.wrap($th).should('have.length', expectedWidth);
      })
    },

    assertTableRow(expectedRow) {
      cy.get(Section1.elements.getTableRow).not(Section1.elements.getTableHeader).should('have.length', expectedRow);
    },

    assertRoleUserEntries() {
      cy.get('tr > th:nth-of-type(5)').each(($el, index, list) => {
        const text = $el.text();
        if (text === 'user') {
          // cy.wrap(list).should('have.length.at.least', 5);
          cy.get(`tr:nth-of-type(${index})`).then(($row) => {
            const r = $row.length;
            cy.log(r)
          })
        }
      })
    },

    assertDOB() {
      cy.get('tr > th:nth-of-type(4)').each(($d, index, list) => {
        const date = $d.text();
        const year = date.split("/");
        if (utils.calculateAge(year[2]) > 60) {
          const entry = [index];
          const counts = {};

          for (const num of entry) {
            counts[num] = counts[num] ? counts[num] + 1 : 1;
           const row = counts[num];
          }

          cy.log(counts[index])

        }
      })
    },

    assertFormisNotVisible() {
      cy.get(Section1.elements.getForm).should('not.be.visible');
    },

    assertFormisVisible() {
      cy.get(Section1.elements.getFormBtn).should('be.visible').click().then(() => {
        cy.get(Section1.elements.getForm).should('be.visible');
      })
    },

    assertNameandAge() {
      cy.get(Section1.elements.getNameElement).clear().type(Section1.literals.INPUT_NAME)
        .should('have.value', Section1.literals.INPUT_NAME).then(() => {
          cy.get(Section1.elements.getAgeElement).clear().type(Section1.literals.INPUT_AGE)
            .should('have.value', Section1.literals.INPUT_AGE);
        })
    },

    assertFemaleGenderisSelected(gender) {
      cy.get(Section1.elements.getGenderElement).select(gender).should('have.value', gender)
    },

    assertNurseCheckBoxisTicked() {
      cy.get(Section1.elements.getcheckBoxElement).check().should('be.checked');
    },

    assertalert() {
      cy.window().then((win) => {
        cy.stub(win, 'alert').as('alert')
      })
      cy.get(Section1.elements.getSubmitButton).click().then(() => {
        cy.get('@alert').should('have.been.calledOnce', Section1.literals.ALERT_TEXT);
      })


    }

  },
}

module.exports = { Section1 }
