import 'cypress-localstorage-commands';

describe('Todo App', () => {
  context('Create Todo Functionality', () => {
    beforeEach(() => {
      localStorage.setItem(
        'theme',
        JSON.stringify({ isDarkMode: true, theme: 'dark' })
      );

      cy.visit('/');
    });

    it('Creates Todo', () => {
      // Submits form using enter
      cy.get('[data-cy="cy-todo-input"]').type('Test Todo{enter}');
      cy.get('[data-cy="cy-todos"] li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Test Todo');

      // Submits form using button
      cy.get('[data-cy="cy-todo-input"]').type('Test Todo 2');
      cy.get('[data-cy="cy-submit-button"]').click();
      cy.get('[data-cy="cy-todos"] li')
        .should('have.length', 2)
        .last()
        .should('have.text', 'Test Todo 2');

      // Submits an empty todo
      cy.get('[data-cy="cy-todo-form"]').submit();
      cy.get('[data-cy="todo-input-error"]')
        .contains('Please Input a Valid Todo')
        .should('be.visible');

      // Submits a todo that the error is gone
      cy.get('[data-cy="cy-todo-input"]').type('Test Todo 3{enter}');
      cy.get('[data-cy="todo-input-error"]').should('not.exist');
      cy.get('[data-cy="cy-todos"] li')
        .should('have.length', 3)
        .last()
        .should('have.text', 'Test Todo 3');
    });
  });

  context('Check,Edit and Delete Functionality', () => {
    beforeEach(() => {
      localStorage.setItem(
        'theme',
        JSON.stringify({ isDarkMode: true, theme: 'dark' })
      );

      localStorage.setItem(
        'todo',
        JSON.stringify([
          { todo: 'test', id: '1', done: false },
          { todo: 'test2', id: '2', done: false },
          { todo: 'test3', id: '3', done: false },
          { todo: 'test4', id: '4', done: true },
          { todo: 'test5', id: '5', done: true },
        ])
      );
      cy.visit('/');
    });

    it('Delete Todo', () => {
      // Delete First Todo
      cy.get(
        '[data-cy="cy-actions-1"] > [aria-label="Delete Todo"] > .h-5'
      ).click();
      cy.get('[data-cy="cy-todos"] li')
        .should('have.length', 4)
        .first()
        .should('not.have.text', 'test');

      // Deletes Third Todo
      cy.get('[data-cy="cy-actions-3"] > [aria-label="Delete Todo"]').click();
      cy.get('[data-cy="cy-todos"] li').should('have.length', 3);
      cy.get('[data-cy="cy-2"]').next().should('not.have.text', 'test3');
    });

    it('Check Todo', () => {
      cy.wait(1000);
      cy.get(
        '[data-cy="cy-actions-1"] > [aria-label="Cross-out Todo"]'
      ).click();
      cy.get('[data-cy="cy-1"] > .todoCheck').should('have.class', 'todoCheck');

      cy.get(
        '[data-cy="cy-actions-1"] > [aria-label="Cross-out Todo"]'
      ).click();
      cy.get('[data-cy="cy-1"] > .todoUncheck').should(
        'have.class',
        'todoUncheck'
      );
    });

    it('Edit Todo', () => {
      cy.wait(1000);
      cy.get(
        '[data-cy="cy-actions-1"] > [aria-label="Open Edit Todo Form"]'
      ).click();
      cy.get('[data-cy="cy-edit-todo-input"]')
        .should('be.visible')
        .should('have.value', 'test');
      cy.get('[data-cy="c-ymobile-edit-submit-icon-button"]').should(
        'be.visible'
      );

      cy.get('[data-cy="cy-edit-todo-input"]')
        .clear()
        .type('I edited this todo!');
      cy.get(
        '[data-cy="cy-actions-1"] > [aria-label="Open Edit Todo Form"]'
      ).click();
      cy.get('[data-cy="cy-todos"] li')
        .first()
        .should('have.text', 'I edited this todo!');
    });
  });
});
