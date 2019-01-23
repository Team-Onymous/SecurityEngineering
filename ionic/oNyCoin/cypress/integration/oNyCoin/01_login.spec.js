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

        // .type() with special character sequences
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')

            // .type() with key modifiers
            .type('{alt}{option}') //these are equivalent
            .type('{ctrl}{control}') //these are equivalent
            .type('{meta}{command}{cmd}') //these are equivalent
            .type('{shift}')

            // Delay each keypress by 0.1 sec
            .type('test@graag.nl', {delay: 100})
            .should('have.value', 'test@graag.nl');

        cy.get('#password')
        // like whether the input is visible or disabled
            .type('Test1Test!').should('have.value', 'Test1Test!')
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')

            // .type() with key modifiers
            .type('{alt}{option}') //these are equivalent
            .type('{ctrl}{control}') //these are equivalent
            .type('{meta}{command}{cmd}') //these are equivalent
            .type('{shift}')
            .type('Test1Test!', {delay: 100})
            .should('have.value', 'Test1Test!');

        // Check if login works
        cy.get('.login-form')
            .submit()   // Submit a form
            .location().should((loc) => {

            expect(loc.host).to.eq('localhost:8100');
            expect(loc.pathname).to.eq('/home');
        });

        // check if bockchain balance loads correctly
        cy.wait(5000)
            .get('.balance')
            .should('be', true)
    });
});
