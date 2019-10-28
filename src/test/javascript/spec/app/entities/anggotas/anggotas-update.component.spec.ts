import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PustakaTestModule } from '../../../test.module';
import { AnggotasUpdateComponent } from 'app/entities/anggotas/anggotas-update.component';
import { AnggotasService } from 'app/entities/anggotas/anggotas.service';
import { Anggotas } from 'app/shared/model/anggotas.model';

describe('Component Tests', () => {
  describe('Anggotas Management Update Component', () => {
    let comp: AnggotasUpdateComponent;
    let fixture: ComponentFixture<AnggotasUpdateComponent>;
    let service: AnggotasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PustakaTestModule],
        declarations: [AnggotasUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AnggotasUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AnggotasUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AnggotasService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Anggotas(123);
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
        const entity = new Anggotas();
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
