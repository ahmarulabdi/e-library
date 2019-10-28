import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IBukus } from 'app/shared/model/bukus.model';
import { AccountService } from 'app/core/auth/account.service';
import { BukusService } from './bukus.service';

@Component({
  selector: 'jhi-bukus',
  templateUrl: './bukus.component.html'
})
export class BukusComponent implements OnInit, OnDestroy {
  bukuses: IBukus[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected bukusService: BukusService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.bukusService
      .query()
      .pipe(
        filter((res: HttpResponse<IBukus[]>) => res.ok),
        map((res: HttpResponse<IBukus[]>) => res.body)
      )
      .subscribe((res: IBukus[]) => {
        this.bukuses = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInBukuses();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBukus) {
    return item.id;
  }

  registerChangeInBukuses() {
    this.eventSubscriber = this.eventManager.subscribe('bukusListModification', response => this.loadAll());
  }
}
