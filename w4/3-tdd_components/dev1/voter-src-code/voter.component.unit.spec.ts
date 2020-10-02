import { VoterComponent } from './voter.component'; 
//import { exec } from 'child_process';

describe('Unit test - VoterComponent', () => {
  let component : VoterComponent;
  
  beforeEach(() => {
    // arrange
    component = new VoterComponent();
   });

  it('should increment totalVotes when upvoted', () => {
    // act
    component.upVote();
  
    // assert
    expect(component.totalVotes).toBe(1);
  });

  it('should decrement totalVotes when downvoted', () => {
    
    // act
    component.downVote();
  
    // assert
    expect(component.totalVotes).toBe(-1);
  });
  
  it('should raise voteChanged event when upvoted', () => {
    let totalV = null;
    component.vote.subscribe(tv => totalV = tv);
    component.upVote();
    expect(totalV).toBe(1);
  });
});