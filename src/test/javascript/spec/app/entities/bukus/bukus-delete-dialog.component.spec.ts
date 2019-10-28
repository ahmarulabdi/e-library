import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PustakaTestModule } from '../../../test.module';
import { BukusDeleteDialogComponent } from 'app/entities/bukus/bukus-delete-dialog.component';
import { BukusService } from 'app/entities/bukus/bukus.service';

describe('Component Tests', () => {
  describe('Bukus Management Delete Component', () => {
    let comp: BukusDeleteDialogComponent;
    let fixture: ComponentFixture<BukusDeleteDialogComponent>;
    let service: BukusService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PustakaTestModule],
        declarations: [BukusDeleteDialogComponent]
      })
        .overrideTemplate(BukusDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BukusDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BukusService);
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
