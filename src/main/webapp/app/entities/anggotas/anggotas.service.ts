import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAnggotas } from 'app/shared/model/anggotas.model';

type EntityResponseType = HttpResponse<IAnggotas>;
type EntityArrayResponseType = HttpResponse<IAnggotas[]>;

@Injectable({ providedIn: 'root' })
export class AnggotasService {
  public resourceUrl = SERVER_API_URL + 'api/anggotas';

  constructor(protected http: HttpClient) {}

  create(anggotas: IAnggotas): Observable<EntityResponseType> {
    return this.http.post<IAnggotas>(this.resourceUrl, anggotas, { observe: 'response' });
  }

  update(anggotas: IAnggotas): Observable<EntityResponseType> {
    return this.http.put<IAnggotas>(this.resourceUrl, anggotas, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAnggotas>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAnggotas[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
