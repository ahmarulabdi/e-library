import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PustakaTestModule } from '../../../test.module';
import { BukusComponent } from 'app/entities/bukus/bukus.component';
import { BukusService } from 'app/entities/bukus/bukus.service';
import { Bukus } from 'app/shared/model/bukus.model';

describe('Component Tests', () => {
  describe('Bukus Management Component', () => {
    let comp: BukusComponent;
    let fixture: ComponentFixture<BukusComponent>;
    let service: BukusService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PustakaTestModule],
        declarations: [BukusComponent],
        providers: []
      })
        .overrideTemplate(BukusComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BukusComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BukusService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Bukus(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.bukuses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
