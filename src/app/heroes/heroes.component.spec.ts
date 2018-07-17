import {HeroesComponent} from './heroes.component';
import {of} from 'rxjs/observable/of';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES;

  let mockHeloService;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'Spider', strength: 8},
      {id: 2, name: 'Woman', strength: 24},
      {id: 3, name: 'Super', strength: 55}
    ];

    mockHeloService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    component = new HeroesComponent(mockHeloService);
  })

  describe('delete', () => {

    it('should remove hro from list', () => {
      mockHeloService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      component.delete(HEROES[2]);
      expect(component.heroes.length).toBe(2);
    });

    it ('should call delete hero', () => {
      mockHeloService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      component.delete(HEROES[2]);
      expect(mockHeloService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    })

  });


});
