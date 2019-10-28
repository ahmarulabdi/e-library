import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBukus } from 'app/shared/model/bukus.model';
import { BukusService } from './bukus.service';

@Component({
  selector: 'jhi-bukus-delete-dialog',
  templateUrl: './bukus-delete-dialog.component.html'
})
export class BukusDeleteDialogComponent {
  bukus: IBukus;

  constructor(protected bukusService: BukusService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.bukusService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'bukusListModification',
        content: 'Deleted an bukus'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-bukus-delete-popup',
  template: ''
})
export class BukusDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ bukus }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BukusDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.bukus = bukus;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/bukus', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/bukus', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
