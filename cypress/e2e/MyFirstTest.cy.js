describe('My First Test', () => {
    it('Test1- verify title +ve', () => {
      cy.visit("https://secure-stg.easyknock.com/getoffer")
      cy.contains('Accept and close').click()
      //document.querySelector("#root > section > button")

      cy.get('#WelcomeHeader').should('have.text', "Welcome to EasyKnock!")
    })

    //it('Test1- verify title -ve', () => {
       // cy.visit("https://secure-stg.easyknock.com/getoffer")
        //cy.get('button').should('have.text', 'Accept and close').click()
       // cy.get('button').click()
       // cy.get('[id="WelcomHeader"]').should('eq', "Welcome to EasyKnock!!")
     // })
  })