import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PustakaTestModule } from '../../../test.module';
import { AnggotasDeleteDialogComponent } from 'app/entities/anggotas/anggotas-delete-dialog.component';
import { AnggotasService } from 'app/entities/anggotas/anggotas.service';

describe('Component Tests', () => {
  describe('Anggotas Management Delete Component', () => {
    let comp: AnggotasDeleteDialogComponent;
    let fixture: ComponentFixture<AnggotasDeleteDialogComponent>;
    let service: AnggotasService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PustakaTestModule],
        declarations: [AnggotasDeleteDialogComponent]
      })
        .overrideTemplate(AnggotasDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AnggotasDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AnggotasService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
