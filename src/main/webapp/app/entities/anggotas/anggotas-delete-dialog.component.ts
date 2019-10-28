import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAnggotas } from 'app/shared/model/anggotas.model';
import { AnggotasService } from './anggotas.service';

@Component({
  selector: 'jhi-anggotas-delete-dialog',
  templateUrl: './anggotas-delete-dialog.component.html'
})
export class AnggotasDeleteDialogComponent {
  anggotas: IAnggotas;

  constructor(protected anggotasService: AnggotasService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.anggotasService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'anggotasListModification',
        content: 'Deleted an anggotas'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-anggotas-delete-popup',
  template: ''
})
export class AnggotasDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ anggotas }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AnggotasDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.anggotas = anggotas;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/anggotas', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/anggotas', { outlets: { popup: null } }]);
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
