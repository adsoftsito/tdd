import { VoterComponent } from './voter.component';

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core/src/metadata/directives';
import { Testability } from '@angular/core/src/testability/testability';

describe('Integration tests - VoterComponent', () => {
  let component : VoterComponent;
  let fixture : ComponentFixture<VoterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations : [ VoterComponent ]
    });

    
    fixture = TestBed.createComponent(VoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render total votes', () => {
   component.othersVote = 20;
   component.myVote = 1;
   fixture.detectChanges();

   let de = fixture.debugElement.query(By.css('.vote-count'));
   let el : HTMLElement = de.nativeElement;
   expect(el.innerText).toContain('21');

  });


  it('should highligth the upvote button if i have upvoted', () => {
    component.myVote = 1;
    fixture.detectChanges();
 
    let de = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
    expect(de.classes['highlighted']).toBeTruthy();
 
   });


   it('should increase total votes when i click the upvote ', () => {
    let button = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
    
    button.triggerEventHandler('click', null);
    expect(component.totalVotes).toBe(1);
 
   });



  });
