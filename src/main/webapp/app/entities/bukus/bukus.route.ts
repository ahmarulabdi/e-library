import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Bukus } from 'app/shared/model/bukus.model';
import { BukusService } from './bukus.service';
import { BukusComponent } from './bukus.component';
import { BukusDetailComponent } from './bukus-detail.component';
import { BukusUpdateComponent } from './bukus-update.component';
import { BukusDeletePopupComponent } from './bukus-delete-dialog.component';
import { IBukus } from 'app/shared/model/bukus.model';

@Injectable({ providedIn: 'root' })
export class BukusResolve implements Resolve<IBukus> {
  constructor(private service: BukusService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBukus> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Bukus>) => response.ok),
        map((bukus: HttpResponse<Bukus>) => bukus.body)
      );
    }
    return of(new Bukus());
  }
}

export const bukusRoute: Routes = [
  {
    path: '',
    component: BukusComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pustakaApp.bukus.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BukusDetailComponent,
    resolve: {
      bukus: BukusResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pustakaApp.bukus.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BukusUpdateComponent,
    resolve: {
      bukus: BukusResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pustakaApp.bukus.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BukusUpdateComponent,
    resolve: {
      bukus: BukusResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pustakaApp.bukus.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const bukusPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: BukusDeletePopupComponent,
    resolve: {
      bukus: BukusResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pustakaApp.bukus.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
