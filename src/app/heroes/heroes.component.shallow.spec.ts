import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroesComponent} from './heroes.component';
import {Component, Input} from '@angular/core';
import {HeroService} from '../hero.service';
import {of} from 'rxjs/observable/of';
import {Hero} from '../hero';
import {By} from '@angular/platform-browser';

describe('HeroesComponent (shalow)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let heroes;

  @Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
    //@Output() delete = new EventEmitter();
  }

  beforeEach(() => {

    heroes = [
      {id: 1, name: 'Spider', strength: 8},
      {id: 2, name: 'Woman', strength: 24},
      {id: 3, name: 'Super', strength: 55}
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        FakeHeroComponent
      ],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });


  it('should set heroes correctly', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
    expect(fixture.componentInstance.heroes.length).toBe(heroes.length);
  });

  it('should have 3 li elements', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);

  });

});
