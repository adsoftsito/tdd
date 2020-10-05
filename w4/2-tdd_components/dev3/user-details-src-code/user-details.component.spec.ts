/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetailsComponent } from './user-details.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';

class RouterStub {
  navigate(params) {

  }
}

class ActivatedRouteStub {
  private subject = new Subject();

  push (value) {
    this.subject.next(value);
  }

  get params() {
    return this.subject.asObservable();
  } 
}

describe('Integration tests - UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      providers : [
        { provide : Router, useClass : RouterStub },
        { provide : ActivatedRoute, useClass : ActivatedRouteStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should redirect the user to the users page after save', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');

    component.save();

    expect(spy).toHaveBeenCalledWith(['users']);
  });

  it('should navigate the user to the not found page when ..', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');

    let route : ActivatedRouteStub = TestBed.get(ActivatedRoute);
    route.push({ id: 0});
    expect(spy).toHaveBeenCalledWith(['not-found']);
  });

});
