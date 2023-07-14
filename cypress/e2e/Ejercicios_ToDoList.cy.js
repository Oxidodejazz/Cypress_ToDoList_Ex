describe('Ejercicios ToDo List -- Pushing IT', () => {
  let datosFixture;

  before("Before", () => {
    cy.fixture('miFixture').then(data => {
        datosFixture = data;
    });
  });

  beforeEach('Before each', () => {
    cy.visit('');
    cy.get('#registertoggle').dblclick();
    cy.get('#user').type(datosFixture.login.usuario);
    cy.get('#pass').type(datosFixture.login.contrasena);
    cy.get('#submitForm').click();
    cy.get('#todolistlink').click();
  });
  
  it('Ingresar 5 tareas desde un set de datos', () => {
    
    cy.xpath('html/body/div[1]/div/div[2]/form/div/div/input').type(datosFixture.tareas.t1);
    cy.xpath('html/body/div[1]/div/div[2]/form/div/div/button').click();
    cy.xpath("//input[@id='task']").type(datosFixture.tareas.t2);
    cy.xpath("//button[@id='sendTask']").click();
    cy.get('input[id="task"]').type(datosFixture.tareas.t3);
    cy.get('button[id="sendTask"]').click();
    cy.get('#task').type(datosFixture.tareas.t4);
    cy.get('#sendTask').click();
    cy.get('[role="group"]').find('input').type(datosFixture.tareas.t5);
    cy.get('#task').siblings().click();
  });

  it('Verificar que existan los botones All, Completed, Active y Remove all', () => {
    
    cy.xpath("//button[contains(text(),'Completed')]").should('exist');
    cy.xpath("//button[contains(text(),'Completed')]//preceding-sibling::button").should('exist');
    cy.xpath("//button[contains(text(),'Completed')]//following-sibling::button").should('exist');
    cy.xpath("//button[contains(@id,'removeAll')]").should('exist');
  });

  it('Agregar 2 tareas, completarlas y eliminar la segunda tarea completada', () => {
  
    cy.get('#task').type(datosFixture.tareas.t1);
    cy.get('#sendTask').click();
    cy.get('#task').type(datosFixture.tareas.t2);
    cy.get('#sendTask').click();
    cy.contains(datosFixture.tareas.t1).click();
    cy.contains(datosFixture.tareas.t2).click();
    cy.contains(datosFixture.tareas.t2).siblings().click();
  });

  it('Agregar 2 tareas y eliminar la primera tarea', () => {
  
    cy.xpath("//input[@id='task']").type(datosFixture.tareas.t1);
    cy.xpath("//button[@id='sendTask']").click();
    cy.xpath("//input[@id='task']").type(datosFixture.tareas.t2);
    cy.xpath("//button[@id='sendTask']").click();
    cy.xpath(`//p[contains(text(),'${datosFixture.tareas.t1}')]`).siblings().click();
    //Tuve que usar `` en la ultima linea para que funcione.
  });


})