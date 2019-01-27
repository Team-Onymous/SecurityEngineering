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
            .type('test@graag.nl').should('have.value', 'test@graag.nl');


        cy.get('#password')
        // like whether the input is visible or disabled
            .type('Test1Test!').should('have.value', 'Test1Test!');

        // Check if login works
        cy.get('.login-form')
            .submit()   // Submit a form
            .location().should((loc) => {

            expect(loc.host).to.eq('localhost:8100');
            expect(loc.pathname).to.eq('/home');
        });

        // check if bockchain balance loads correctly
        cy.wait(5000) //in case it loads slowly due to higher traffic
            .get('.balance')
            .should('be', true);


        // go to the block card section
        cy.get('button')
            .contains('Block Card')
            .click('center')
            .location().should((loc) => {

            expect(loc.host).to.eq('localhost:8100');
            expect(loc.pathname).to.eq('/block');
        });

        // try all options
        cy.get('mat-select[name="Options"]')
            .click('center');

        cy.get('.mat-option-text')
            .contains('Lost')
            .click('center');

        cy.get('.mat-select-value')
            .click('center');

        cy.get('.mat-option-text')
            .contains('Stolen')
            .click('center');

        cy.get('.mat-select-value')
            .click('center');

        cy.get('.mat-option-text')
            .contains('Not Used')
            .click('center');


        cy.get('.mat-select-value')
            .click('center');

        cy.get('.mat-option-text')
            .contains('Other')
            .click('center');

        cy.get('.mat-checkbox-inner-container')
            .click()

        cy.get('.addCard-button')
            .click('center', {multiple: true})

        cy.get('button')
            .contains('Close')
            .click('center', {multiple: true});
    });
    //
    //     // check inputfields
    //     cy.get('#email')
    //         .type('test@graag.nl').should('have.value', 'test@graag.nl')
    //
    //     // .type() with special character sequences
    //         .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
    //         .type('{del}{selectall}{backspace}')
    //
    //         // .type() with key modifiers
    //         .type('{alt}{option}') //these are equivalent
    //         .type('{ctrl}{control}') //these are equivalent
    //         .type('{meta}{command}{cmd}') //these are equivalent
    //         .type('{shift}')
    //
    //         // Delay each keypress by 0.1 sec
    //         .type('test@graag.nl', {delay: 100})
    //         .should('have.value', 'test@graag.nl');
    //
    //     cy.get('#password')
    //     // like whether the input is visible or disabled
    //         .type('Test1Test!').should('have.value', 'Test1Test!')
    //         .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
    //         .type('{del}{selectall}{backspace}')
    //
    //         // .type() with key modifiers
    //         .type('{alt}{option}') //these are equivalent
    //         .type('{ctrl}{control}') //these are equivalent
    //         .type('{meta}{command}{cmd}') //these are equivalent
    //         .type('{shift}')
    //         .type('Test1Test!', {delay: 100})
    //         .should('have.value', 'Test1Test!');
    //
    //     // Check if login works
    //     cy.get('.login-form')
    //         .submit()   // Submit a form
    //         .location().should((loc) => {
    //
    //         expect(loc.host).to.eq('localhost:8100');
    //         expect(loc.pathname).to.eq('/home');
    //     });
    //
    //     // check if bockchain balance loads correctly
    //     cy.wait(5000)
    //         .get('.balance')
    //         .should('be', true)
    // });
});
