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
            .type('test@graag.nl').should('have.value', 'test@graag.nl')


        cy.get('#password')
        // like whether the input is visible or disabled
            .type('Test1Test!').should('have.value', 'Test1Test!')

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


        // go to the addcoins section
        cy.get('button')
            .contains('Add OnyCoins')
            .click('center')
            .location().should((loc) => {

            expect(loc.host).to.eq('localhost:8100');
            expect(loc.pathname).to.eq('/addcoins');
        });

        cy.get('input[name="Coins"]')
            .type('10').should('have.value', '10')

        cy.get('.addCard-form')
            .submit()   // Submit a form

        //wait for transaction to complete
        cy.wait(10000) //in case it loads slowly due to higher traffic
            .get('#transaction')
            .should('be', true);

        cy.get('button')
            .contains('Close')
            .click('center', {multiple: true})

        cy.get('button')
            .contains('Home')
            .click('center', {multiple: true})
            .location().should((loc) => {

            expect(loc.host).to.eq('localhost:8100');
            expect(loc.pathname).to.eq('/home');
        });

        //go to refund page
        cy.get('button')
            .contains('Refund')
            .click('center', {multiple: true})
            .location().should((loc) => {

            expect(loc.host).to.eq('localhost:8100');
            expect(loc.pathname).to.eq('/refund');
        });

        //input amount of coins
        cy.get('input[name="Coins"]')
            .type('10').should('have.value', '10')

        //input amount of coins
        cy.get('input[name="IbanNumber"]')
            .type('nl92ingb0008567344').should('have.value', 'nl92ingb0008567344')

        cy.get('button')
            .contains('Refund Coins')
            .click();

        //wait for transaction to complete
        cy.wait(10000) //in case it loads slowly due to higher traffic
            .get('#transaction')
            .should('be', true);

        cy.get('button')
            .contains('Close')
            .click('center', {multiple: true})

        // back to home
        cy.get('button')
            .contains('Home')
            .click('center', {multiple: true})
            .location().should((loc) => {

            expect(loc.host).to.eq('localhost:8100');
            expect(loc.pathname).to.eq('/home');
        });

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
