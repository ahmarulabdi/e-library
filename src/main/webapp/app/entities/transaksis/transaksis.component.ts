import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ITransaksis } from 'app/shared/model/transaksis.model';
import { AccountService } from 'app/core/auth/account.service';
import { TransaksisService } from './transaksis.service';

@Component({
  selector: 'jhi-transaksis',
  templateUrl: './transaksis.component.html'
})
export class TransaksisComponent implements OnInit, OnDestroy {
  transakses: ITransaksis[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected transaksisService: TransaksisService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.transaksisService
      .query()
      .pipe(
        filter((res: HttpResponse<ITransaksis[]>) => res.ok),
        map((res: HttpResponse<ITransaksis[]>) => res.body)
      )
      .subscribe((res: ITransaksis[]) => {
        this.transakses = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTransakses();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITransaksis) {
    return item.id;
  }

  registerChangeInTransakses() {
    this.eventSubscriber = this.eventManager.subscribe('transaksisListModification', response => this.loadAll());
  }
}
