import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroesComponent} from './heroes.component';
import {Component, Directive, Input, NO_ERRORS_SCHEMA} from '@angular/core';
import {HeroService} from '../hero.service';
import {of} from 'rxjs/observable/of';
import {By} from '@angular/platform-browser';
import {HeroComponent} from '../hero/hero.component';

@Directive({
  selector: '[routerLink]',
  host: {'(click)':'onClick()'}
})
export class RouterLinkDireciveStub {
  @Input('routerLink') linkParams: any;
  navigateTo: any = null;
  onClick() {
    this.navigateTo = this.linkParams;
  }

}

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
        HeroComponent,
        RouterLinkDireciveStub
      ],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ],
      //schemas: [NO_ERRORS_SCHEMA]
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

  it('should delete element with hero service with click event', () => {


    spyOn(fixture.componentInstance, 'delete');

    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    const heroComponentDe = fixture.debugElement.queryAll(By.directive(HeroComponent));

    heroComponentDe[0].query(By.css('button')).triggerEventHandler('click', {
      stopPropagation: () => {}
    });

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[0]);

  });


  it('should delete element with hero service with emit event', () => {


    spyOn(fixture.componentInstance, 'delete');

    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    const heroComponentDe = fixture.debugElement.queryAll(By.directive(HeroComponent));

    (<HeroComponent>heroComponentDe[0].componentInstance).delete.emit(undefined);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[0]);

  });

  it('should delete element with hero service with debug element', () => {


    spyOn(fixture.componentInstance, 'delete');

    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    const heroComponentDe = fixture.debugElement.queryAll(By.directive(HeroComponent));

    heroComponentDe[0].triggerEventHandler('delete', 'null');

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[0]);

  });


  it('should add hero to the hero list when add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    const name = 'Mr. Ice';

    mockHeroService.addHero.and.returnValue(of({id:5, name: name, strength: 1}));

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addBtn = fixture.debugElement.queryAll(By.css('button'))[0];

    inputElement.value = name;
    addBtn.triggerEventHandler('click', null);

    fixture.detectChanges();

    const heroesList = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

    expect(heroesList).toContain(name);


  });

  it('should have the correct route for the first hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    let routerLink = heroComponents[0].query(By.directive(RouterLinkDireciveStub)).injector.get(RouterLinkDireciveStub);

    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigateTo).toBe('/detail/1');

  });

});
