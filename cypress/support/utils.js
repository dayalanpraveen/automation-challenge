  export function calculateAge(birthYear) {
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var age = currentYear - birthYear;
        cy.log(age)
        return age;
      };

