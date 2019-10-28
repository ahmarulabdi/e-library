import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PustakaTestModule } from '../../../test.module';
import { AnggotasDetailComponent } from 'app/entities/anggotas/anggotas-detail.component';
import { Anggotas } from 'app/shared/model/anggotas.model';

describe('Component Tests', () => {
  describe('Anggotas Management Detail Component', () => {
    let comp: AnggotasDetailComponent;
    let fixture: ComponentFixture<AnggotasDetailComponent>;
    const route = ({ data: of({ anggotas: new Anggotas(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PustakaTestModule],
        declarations: [AnggotasDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AnggotasDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AnggotasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.anggotas).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
