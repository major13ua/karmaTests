import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroesComponent} from './heroes.component';
import {Component, Input, NO_ERRORS_SCHEMA} from '@angular/core';
import {HeroService} from '../hero.service';
import {of} from 'rxjs/observable/of';
import {By} from '@angular/platform-browser';
import {HeroComponent} from '../hero/hero.component';

describe('HeroesComponent (deep)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let heroes;

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
        HeroComponent
      ],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });


  it('should render each hero as component', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    const heroComponentDe = fixture.debugElement.queryAll(By.directive(HeroComponent));

    expect(heroComponentDe.length).toBe(heroes.length);
    expect(heroComponentDe[0].componentInstance.hero.name).toEqual(heroes[0].name);
  });

  it('should have 3 li elements', () => {

  });

});
