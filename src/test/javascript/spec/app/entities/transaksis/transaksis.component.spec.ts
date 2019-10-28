import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PustakaTestModule } from '../../../test.module';
import { TransaksisComponent } from 'app/entities/transaksis/transaksis.component';
import { TransaksisService } from 'app/entities/transaksis/transaksis.service';
import { Transaksis } from 'app/shared/model/transaksis.model';

describe('Component Tests', () => {
  describe('Transaksis Management Component', () => {
    let comp: TransaksisComponent;
    let fixture: ComponentFixture<TransaksisComponent>;
    let service: TransaksisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PustakaTestModule],
        declarations: [TransaksisComponent],
        providers: []
      })
        .overrideTemplate(TransaksisComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransaksisComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransaksisService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Transaksis(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.transakses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
