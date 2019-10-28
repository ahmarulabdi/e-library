import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PustakaTestModule } from '../../../test.module';
import { AnggotasComponent } from 'app/entities/anggotas/anggotas.component';
import { AnggotasService } from 'app/entities/anggotas/anggotas.service';
import { Anggotas } from 'app/shared/model/anggotas.model';

describe('Component Tests', () => {
  describe('Anggotas Management Component', () => {
    let comp: AnggotasComponent;
    let fixture: ComponentFixture<AnggotasComponent>;
    let service: AnggotasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PustakaTestModule],
        declarations: [AnggotasComponent],
        providers: []
      })
        .overrideTemplate(AnggotasComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AnggotasComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AnggotasService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Anggotas(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.anggotas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
