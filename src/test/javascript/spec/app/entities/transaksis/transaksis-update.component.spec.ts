import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PustakaTestModule } from '../../../test.module';
import { TransaksisUpdateComponent } from 'app/entities/transaksis/transaksis-update.component';
import { TransaksisService } from 'app/entities/transaksis/transaksis.service';
import { Transaksis } from 'app/shared/model/transaksis.model';

describe('Component Tests', () => {
  describe('Transaksis Management Update Component', () => {
    let comp: TransaksisUpdateComponent;
    let fixture: ComponentFixture<TransaksisUpdateComponent>;
    let service: TransaksisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PustakaTestModule],
        declarations: [TransaksisUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TransaksisUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransaksisUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransaksisService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Transaksis(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Transaksis();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
