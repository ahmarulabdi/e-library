import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Anggotas } from 'app/shared/model/anggotas.model';
import { AnggotasService } from './anggotas.service';
import { AnggotasComponent } from './anggotas.component';
import { AnggotasDetailComponent } from './anggotas-detail.component';
import { AnggotasUpdateComponent } from './anggotas-update.component';
import { AnggotasDeletePopupComponent } from './anggotas-delete-dialog.component';
import { IAnggotas } from 'app/shared/model/anggotas.model';

@Injectable({ providedIn: 'root' })
export class AnggotasResolve implements Resolve<IAnggotas> {
  constructor(private service: AnggotasService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAnggotas> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Anggotas>) => response.ok),
        map((anggotas: HttpResponse<Anggotas>) => anggotas.body)
      );
    }
    return of(new Anggotas());
  }
}

export const anggotasRoute: Routes = [
  {
    path: '',
    component: AnggotasComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pustakaApp.anggotas.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AnggotasDetailComponent,
    resolve: {
      anggotas: AnggotasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pustakaApp.anggotas.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AnggotasUpdateComponent,
    resolve: {
      anggotas: AnggotasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pustakaApp.anggotas.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AnggotasUpdateComponent,
    resolve: {
      anggotas: AnggotasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pustakaApp.anggotas.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const anggotasPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AnggotasDeletePopupComponent,
    resolve: {
      anggotas: AnggotasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pustakaApp.anggotas.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
