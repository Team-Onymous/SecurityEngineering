/// <reference types="Cypress" />

//Generate Random String
function generateString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

//Generate Random String
function generateLowerCaseString() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

// visit page
context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8100/register')
    });


    it('.type() - type into a DOM element', () => {

        // test if correct location
        cy.location().should((loc) => {

            expect(loc.host).to.eq('localhost:8100');
            expect(loc.pathname).to.eq('/register');

        });

        // check inputfields
        cy.get('input[name="FirstName"]')
            .type('Sjaak').should('have.value', 'Sjaak')

        // .type() with special character sequences
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')

            // .type() with key modifiers
            .type('{alt}{option}') //these are equivalent
            .type('{ctrl}{control}') //these are equivalent
            .type('{meta}{command}{cmd}') //these are equivalent
            .type('{shift}')

            // Delay each keypress by 0.1 sec
            .type('Sjaak', {delay: 100})
            .should('have.value', 'Sjaak');

        cy.get('input[name="LastName"]')
            .type('Testgraag').should('have.value', 'Testgraag')

        // .type() with special character sequences
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')

            // .type() with key modifiers
            .type('{alt}{option}') //these are equivalent
            .type('{ctrl}{control}') //these are equivalent
            .type('{meta}{command}{cmd}') //these are equivalent
            .type('{shift}')

            // Delay each keypress by 0.1 sec
            .type('Testgraag', {delay: 100})
            .should('have.value', 'Testgraag');

        cy.get('input[name="Email"]')
            .type(generateLowerCaseString() + '@testmail.com')

            // .type() with special character sequences
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')

            // .type() with key modifiers
            .type('{alt}{option}') //these are equivalent
            .type('{ctrl}{control}') //these are equivalent
            .type('{meta}{command}{cmd}') //these are equivalent
            .type('{shift}')

            // Delay each keypress by 0.1 sec
            .type(generateLowerCaseString() + '@testmail.com', {delay: 100});

        cy.get('input[name="DateOfBirth"]')
            .type('01/01/1900').should('be', '01/01/1900')

        // .type() with special character sequences
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')

            // .type() with key modifiers
            .type('{alt}{option}') //these are equivalent
            .type('{ctrl}{control}') //these are equivalent
            .type('{meta}{command}{cmd}') //these are equivalent
            .type('{shift}')

            // Delay each keypress by 0.1 sec
            .type('01/01/1900', {delay: 100}).should('be', '01/01/1900');

        cy.get('input[name="password"]')
            .type(generateString())

            // .type() with special character sequences
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')

            // .type() with key modifiers
            .type('{alt}{option}') //these are equivalent
            .type('{ctrl}{control}') //these are equivalent
            .type('{meta}{command}{cmd}') //these are equivalent
            .type('{shift}')

            // Delay each keypress by 0.1 sec
            .type(generateString(), {delay: 100});


        cy.get('input[name="RepeatPassword"]')
            .type(generateString())

            // .type() with special character sequences
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')

            // .type() with key modifiers
            .type('{alt}{option}') //these are equivalent
            .type('{ctrl}{control}') //these are equivalent
            .type('{meta}{command}{cmd}') //these are equivalent
            .type('{shift}')

            // Delay each keypress by 0.1 sec
            .type(generateString(), {delay: 100});

        // Check if registration works
        cy.get('.register-form')
            .submit()   // Submit a form
            .location().should((loc) => {

            expect(loc.host).to.eq('localhost:8100');
            expect(loc.pathname).to.eq('/addcard');
        });


        cy.get('input[name="StreetName"]')
            .type('teststraat').should('have.value', 'teststraat')

        // .type() with special character sequences
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')

            // .type() with key modifiers
            .type('{alt}{option}') //these are equivalent
            .type('{ctrl}{control}') //these are equivalent
            .type('{meta}{command}{cmd}') //these are equivalent
            .type('{shift}')

            // Delay each keypress by 0.1 sec
            .type('teststraat', {delay: 100});

        cy.get('input[name="HouseNumber"]')
            .type('42').should('have.value', '42')

        // .type() with special character sequences
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')

            // .type() with key modifiers
            .type('{alt}{option}') //these are equivalent
            .type('{ctrl}{control}') //these are equivalent
            .type('{meta}{command}{cmd}') //these are equivalent
            .type('{shift}')

            // Delay each keypress by 0.1 sec
            .type('42', {delay: 100});

        cy.get('input[name="PostalCode"]')
            .type('1234AB').should('have.value', '1234AB')

        // .type() with special character sequences
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')

            // .type() with key modifiers
            .type('{alt}{option}') //these are equivalent
            .type('{ctrl}{control}') //these are equivalent
            .type('{meta}{command}{cmd}') //these are equivalent
            .type('{shift}')

            // Delay each keypress by 0.1 sec
            .type('1234AB', {delay: 100});

        cy.get('input[name="City"]')
            .type('Rotterdam').should('have.value', 'Rotterdam')

        // .type() with special character sequences
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')

            // .type() with key modifiers
            .type('{alt}{option}') //these are equivalent
            .type('{ctrl}{control}') //these are equivalent
            .type('{meta}{command}{cmd}') //these are equivalent
            .type('{shift}')

            // Delay each keypress by 0.1 sec
            .type('Rotterdam', {delay: 100});


        // Check if addcard works
        cy.get('.addCard-button')
            .click('center')
            .location().should((loc) => {

            expect(loc.host).to.eq('localhost:8100');
            expect(loc.pathname).to.eq('/home');
        });

        // check if blockchain balance loads correctly
        cy.get('.balance')
            .should('be', true)
    })
});
