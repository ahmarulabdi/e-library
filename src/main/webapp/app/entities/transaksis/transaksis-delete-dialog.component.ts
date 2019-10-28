import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransaksis } from 'app/shared/model/transaksis.model';
import { TransaksisService } from './transaksis.service';

@Component({
  selector: 'jhi-transaksis-delete-dialog',
  templateUrl: './transaksis-delete-dialog.component.html'
})
export class TransaksisDeleteDialogComponent {
  transaksis: ITransaksis;

  constructor(
    protected transaksisService: TransaksisService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.transaksisService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'transaksisListModification',
        content: 'Deleted an transaksis'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-transaksis-delete-popup',
  template: ''
})
export class TransaksisDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ transaksis }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TransaksisDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.transaksis = transaksis;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/transaksis', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/transaksis', { outlets: { popup: null } }]);
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
