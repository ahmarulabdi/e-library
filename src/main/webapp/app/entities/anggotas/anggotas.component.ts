import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IAnggotas } from 'app/shared/model/anggotas.model';
import { AccountService } from 'app/core/auth/account.service';
import { AnggotasService } from './anggotas.service';

@Component({
  selector: 'jhi-anggotas',
  templateUrl: './anggotas.component.html'
})
export class AnggotasComponent implements OnInit, OnDestroy {
  anggotas: IAnggotas[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected anggotasService: AnggotasService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.anggotasService
      .query()
      .pipe(
        filter((res: HttpResponse<IAnggotas[]>) => res.ok),
        map((res: HttpResponse<IAnggotas[]>) => res.body)
      )
      .subscribe((res: IAnggotas[]) => {
        this.anggotas = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAnggotas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAnggotas) {
    return item.id;
  }

  registerChangeInAnggotas() {
    this.eventSubscriber = this.eventManager.subscribe('anggotasListModification', response => this.loadAll());
  }
}
