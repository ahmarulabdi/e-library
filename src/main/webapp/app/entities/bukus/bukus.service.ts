import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBukus } from 'app/shared/model/bukus.model';

type EntityResponseType = HttpResponse<IBukus>;
type EntityArrayResponseType = HttpResponse<IBukus[]>;

@Injectable({ providedIn: 'root' })
export class BukusService {
  public resourceUrl = SERVER_API_URL + 'api/bukuses';

  constructor(protected http: HttpClient) {}

  create(bukus: IBukus): Observable<EntityResponseType> {
    return this.http.post<IBukus>(this.resourceUrl, bukus, { observe: 'response' });
  }

  update(bukus: IBukus): Observable<EntityResponseType> {
    return this.http.put<IBukus>(this.resourceUrl, bukus, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBukus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBukus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
