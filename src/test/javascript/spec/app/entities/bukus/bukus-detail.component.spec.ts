import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PustakaTestModule } from '../../../test.module';
import { BukusDetailComponent } from 'app/entities/bukus/bukus-detail.component';
import { Bukus } from 'app/shared/model/bukus.model';

describe('Component Tests', () => {
  describe('Bukus Management Detail Component', () => {
    let comp: BukusDetailComponent;
    let fixture: ComponentFixture<BukusDetailComponent>;
    const route = ({ data: of({ bukus: new Bukus(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PustakaTestModule],
        declarations: [BukusDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BukusDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BukusDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bukus).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
