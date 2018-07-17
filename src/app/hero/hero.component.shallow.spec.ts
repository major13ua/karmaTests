import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroComponent} from './hero.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('HeroComponent (shallow test)', () => {

  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroComponent);

  });

  it('should have the correct hero', () => {
    fixture.componentInstance.hero = {id: 1, name: 'Spider', strength: 8};
    expect(fixture.componentInstance.hero.name).toEqual('Spider');
  });

  it('should render hero name in anckor tag', () => {
    fixture.componentInstance.hero = {id: 1, name: 'Spider', strength: 8};
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a').textContent).toContain('Spider');
  });

});
