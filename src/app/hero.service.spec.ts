import {inject, TestBed} from '@angular/core/testing';
import {HeroService} from './hero.service';
import {MessageService} from './message.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Test} from 'tslint/lib/lint';

describe('HeroService', () => {

  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {

    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        {provide: MessageService, useValue: mockMessageService}
      ]
    });


    //httpTestingController = TestBed.get(HttpTestingController);
    //service  = TestBed.get(HeroService);

  });

  describe('getHero', () => {

    it('should call get with correct URK',
      inject([HeroService, HttpTestingController], (srv: HeroService, crl: HttpTestingController) => {

        srv.getHero(4).subscribe(
        (data) => {
          console.log(`fulfilled`, data);
        }
      );

      let req = crl.expectOne('api/heroes/4');
      req.flush({id: 4, name: 'Super', strength: 100});

      crl.verify();

    }));

  });

});
