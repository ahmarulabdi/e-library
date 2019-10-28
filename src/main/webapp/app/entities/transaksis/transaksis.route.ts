import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Transaksis } from 'app/shared/model/transaksis.model';
import { TransaksisService } from './transaksis.service';
import { TransaksisComponent } from './transaksis.component';
import { TransaksisDetailComponent } from './transaksis-detail.component';
import { TransaksisUpdateComponent } from './transaksis-update.component';
import { TransaksisDeletePopupComponent } from './transaksis-delete-dialog.component';
import { ITransaksis } from 'app/shared/model/transaksis.model';

@Injectable({ providedIn: 'root' })
export class TransaksisResolve implements Resolve<ITransaksis> {
  constructor(private service: TransaksisService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITransaksis> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Transaksis>) => response.ok),
        map((transaksis: HttpResponse<Transaksis>) => transaksis.body)
      );
    }
    return of(new Transaksis());
  }
}

export const transaksisRoute: Routes = [
  {
    path: '',
    component: TransaksisComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pustakaApp.transaksis.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TransaksisDetailComponent,
    resolve: {
      transaksis: TransaksisResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pustakaApp.transaksis.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TransaksisUpdateComponent,
    resolve: {
      transaksis: TransaksisResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pustakaApp.transaksis.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TransaksisUpdateComponent,
    resolve: {
      transaksis: TransaksisResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pustakaApp.transaksis.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const transaksisPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TransaksisDeletePopupComponent,
    resolve: {
      transaksis: TransaksisResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pustakaApp.transaksis.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
