const { Section1 } = require('../objects/section-1')

describe('DOM TABLES ASSERTION', () => {
  /**
   * Example:
   * To access assertSampleApiResponse() from Section1, you can do: Section1.actions.assertSampleApiResponse();
   *
   * Test away!
   */

  before('load section-1', () => {
    cy.visit('/section-1');
  })

  it('assert Table is not Visible', () => {
    Section1.actions.assertTableisNotVisible();
  })

  it('assert Table is visible', () => {
    Section1.actions.assertTableisVisible();
  })

  it('assert Table Width is 5', () => {
    Section1.actions.assertTablewidth(5);
  })

  it('assert Table Row is 10', () => {
    Section1.actions.assertTableRow(10);
  })

  it('assert Role User Entry is atleast 5', () => {
    Section1.actions.assertRoleUserEntries();
  })

  it('assert DOB is 60 for 3 users', () => {
    Section1.actions.assertDOB();
  })
})

describe('FORM ASSERTION', () => {

  before('load section-1', () => {
    cy.visit('/section-1');
  })

  it('assert Form is not visible', () => {
    Section1.actions.assertFormisNotVisible();
  })

  it('assert Form is Visible', () => {
    Section1.actions.assertFormisVisible();
  })

  it('assert Name and age is entered', () => {
    Section1.actions.assertNameandAge();
  })

  it('assert gender selected is female', () => {
    Section1.actions.assertFemaleGenderisSelected('female');
  })

  it('assert Nurse CheckBox is checked', () => {
    Section1.actions.assertNurseCheckBoxisTicked();
  })

  it('assert window alert after the submit', () => {
    Section1.actions.assertalert();
  })
})
