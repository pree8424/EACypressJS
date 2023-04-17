
import Form from "../e2e/PageObjects/EAQPageClass.js";

describe('EAQFormasSmokeTests', () => {

    beforeEach(() => {   
        cy.visit("https://secure-stg.easyknock.com/getoffer")
        cy.contains('Accept and close').click()
      })

    it('Verify Qualification Forms is opened and verify the title' , () => {
        cy.get('#WelcomeHeader').should('have.text', "Welcome to EasyKnock!")
    })

    it('Verify each controls and its expected properties' , () => {
        cy.get('input[name=streetAddress]')
            .should('be.visible')
            .should('have.text','')
        cy.get('#City')
            .should('be.visible')
            .should('have.text', '')
        cy.get('div[role="select"]')
            .should('be.visible')
            .find('#State').should('be.visible')
        cy.get('div[role="select"]').then(dropdown =>{
            cy.wrap(dropdown).click()          

            cy.get('li[role="listboxitem"]').each((statename, i) => {
                const name = statename.text().trim()
                cy.wrap(statename).click()
                cy.wrap(dropdown).should('contain',name)
                cy.wrap(dropdown).click()})

                cy.wrap(dropdown).click()
        })
        cy.get('input[name=zipCode]')
            .should('be.visible')
            .should('have.text','')
    })

   it('Verify happy path - Test 1' , () =>{
        const ln=new Form();
        ln.setStreetAddress("123 abc street")
        ln.setCity("Dallas")
        ln.setState("California")
        ln.setZipCode("12345")
        ln.clickContinue();
   })

   it('Test Case - To fill up the form using test data' , () =>{
    //Fill form with test data and submit
    cy.fixture('testdata').then((formdata) => {
        const form=new Form();
        form.setStreetAddress(formdata.streetaddress)
        form.setCity(formdata.city)
        form.setState(formdata.state)
        form.setZipCode(formdata.zipcode)
        form.clickContinue()

        form.setHomeType(formdata.hometype)
        form.setEstimatedHomeValue(formdata.estvalue)
        form.setMorgageBalance(formdata.morgagebalance)
        form.setEstimatedcashNeeded(formdata.estcashneeded)
        form.clickContinue()

        form.setPlanToMove("yes")

        form.setTimeline(formdata.inmonths)
        form.clickContinue()

        form.setFirstName(formdata.fname)
        form.setLastName(formdata.lname)
        form.setEmail(formdata.email)
        form.clickContinue()

        form.setPhoneNumber(formdata.phone)
        form.clickSubmit()
    })   

    })

    it('Verify Street Address - edge cases', () =>{
        const form = new Form()
        //special chars
        form.setStreetAddress("%%")
        form.verifyErrorMessage("Street Address Required")
        form.clearTextbox()
        //
        form.setStreetAddress("#*")
        form.verifyErrorMessage("Street Address Required")
        form.clearTextbox()
        //numeric values
        form.setStreetAddress("123")
        form.verifyErrorMessage("Street Address Required")
        form.clearTextbox()
        //Random        
        form.setStreetAddress("x r")
        form.verifyErrorMessage("Street Address Required")
        form.clearTextbox()
        //whitespaces
        form.setStreetAddress("    ")
        form.verifyErrorMessage("Street Address Required")
        form.clearTextbox()
    })

})
