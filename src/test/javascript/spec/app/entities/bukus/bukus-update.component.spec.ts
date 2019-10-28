import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PustakaTestModule } from '../../../test.module';
import { BukusUpdateComponent } from 'app/entities/bukus/bukus-update.component';
import { BukusService } from 'app/entities/bukus/bukus.service';
import { Bukus } from 'app/shared/model/bukus.model';

describe('Component Tests', () => {
  describe('Bukus Management Update Component', () => {
    let comp: BukusUpdateComponent;
    let fixture: ComponentFixture<BukusUpdateComponent>;
    let service: BukusService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PustakaTestModule],
        declarations: [BukusUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BukusUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BukusUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BukusService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Bukus(123);
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
        const entity = new Bukus();
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
