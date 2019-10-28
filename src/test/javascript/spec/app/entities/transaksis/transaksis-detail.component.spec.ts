import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PustakaTestModule } from '../../../test.module';
import { TransaksisDetailComponent } from 'app/entities/transaksis/transaksis-detail.component';
import { Transaksis } from 'app/shared/model/transaksis.model';

describe('Component Tests', () => {
  describe('Transaksis Management Detail Component', () => {
    let comp: TransaksisDetailComponent;
    let fixture: ComponentFixture<TransaksisDetailComponent>;
    const route = ({ data: of({ transaksis: new Transaksis(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PustakaTestModule],
        declarations: [TransaksisDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TransaksisDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TransaksisDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.transaksis).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
