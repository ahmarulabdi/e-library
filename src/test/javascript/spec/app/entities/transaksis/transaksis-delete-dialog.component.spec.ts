import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PustakaTestModule } from '../../../test.module';
import { TransaksisDeleteDialogComponent } from 'app/entities/transaksis/transaksis-delete-dialog.component';
import { TransaksisService } from 'app/entities/transaksis/transaksis.service';

describe('Component Tests', () => {
  describe('Transaksis Management Delete Component', () => {
    let comp: TransaksisDeleteDialogComponent;
    let fixture: ComponentFixture<TransaksisDeleteDialogComponent>;
    let service: TransaksisService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PustakaTestModule],
        declarations: [TransaksisDeleteDialogComponent]
      })
        .overrideTemplate(TransaksisDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TransaksisDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransaksisService);
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
