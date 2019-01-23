/// <reference types="Cypress" />


// visit page
context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8100/login')
    });


    it('.type() - type into a DOM element', () => {

        // test if correct location
        cy.location().should((loc) => {

            expect(loc.host).to.eq('localhost:8100');
            expect(loc.pathname).to.eq('/login');

        });

        // check inputfields
        cy.get('#email')
            .type('raspberry@bartender.nl').should('have.value', 'raspberry@bartender.nl');


        cy.get('#password')
        // like whether the input is visible or disabled
            .type('Test1Test!').should('have.value', 'Test1Test!');

        // Check if login works
        cy.get('.login-form')
            .submit()   // Submit a form
            .location().should((loc) => {

            expect(loc.host).to.eq('localhost:8100');
            expect(loc.pathname).to.eq('/bar');
        });

        //click on a beverage
        cy.get('mat-grid-tile')
            .contains('Beer')
            .click('center');

        // click on a + sign of the beverage
        cy.get('.ng-star-inserted > :nth-child(3) > .mat-button > .mat-button-wrapper > .material-icons')
            .click('center');

        // click on a - sign of the beverage
        cy.get('.ng-star-inserted > :nth-child(4) > .mat-button > .mat-button-wrapper > .material-icons')
            .click('center');

        cy.get('mat-grid-tile')
            .contains('Wijn')
            .click('center');

        cy.get('mat-grid-tile')
            .contains('Baco')
            .click('center');

        //give it a little time to undisable the confirm order button
        cy.wait(100);
        // confirm order to make a transaction
        cy.get('[_ngcontent-c9=""][ng-reflect-disabled="false"] > .mat-button-wrapper')
            .contains('Confirm Order')
            .click('center', {multiple: true});

        //wait for transaction to complete
        cy.wait(10000) //in case it loads slowly due to higher traffic
            .get('#transaction')
            .should('be', true);

        cy.get('button')
            .contains('Close')
            .click('center', {multiple: true});
    });
});
