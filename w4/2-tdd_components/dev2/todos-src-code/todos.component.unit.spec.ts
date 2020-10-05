import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 
//import { TodoFormComponent } from '../04-forms/todo-form.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('Unit test - TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todos property with the items returned from the server', () => {
    let todos = [1, 2 , 3];
    spyOn(service, 'getTodos').and.callFake(() => {
      return Observable.from( [ todos ]);
    });

    component.ngOnInit();
    expect(component.todos.length).toBe(3);
    //expect(component.todos).toBe(todos);
  });

  it('should call the server to save the changes', () => {
    
    let spy = spyOn(service, 'add').and.callFake(() => {
      return Observable.empty();
    });

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo returned from the server', () => {
    let todo = { id : 1};
    let spy = spyOn(service, 'add').and.returnValue(
      Observable.from( [ todo ]));

    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });


  it('should set the message property if server returns and error', () => {
    let error = "error from the server";
    let spy = spyOn(service, 'add').and.returnValue(
      Observable.throw(  error ));

    component.add();

    expect(component.message).toBe(error);
  });

  it('should call the server to delete a todo item', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(service, 'delete').and.returnValue(Observable.empty());
    component.delete(1);

    expect(spy).toHaveBeenCalledWith(1);
  });


  it('should call the server to delete a todo item if the user confirm', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(service, 'delete').and.returnValue(Observable.empty());
    component.delete(1);

    expect(spy).toHaveBeenCalledWith(1);
  });


  it('should NOT call the server to delete a todo item if the user cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'delete').and.returnValue(Observable.empty());
    component.delete(1);

    expect(spy).not.toHaveBeenCalled();
  });
});