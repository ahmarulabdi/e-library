import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITransaksis } from 'app/shared/model/transaksis.model';

type EntityResponseType = HttpResponse<ITransaksis>;
type EntityArrayResponseType = HttpResponse<ITransaksis[]>;

@Injectable({ providedIn: 'root' })
export class TransaksisService {
  public resourceUrl = SERVER_API_URL + 'api/transaksis';

  constructor(protected http: HttpClient) {}

  create(transaksis: ITransaksis): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transaksis);
    return this.http
      .post<ITransaksis>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(transaksis: ITransaksis): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transaksis);
    return this.http
      .put<ITransaksis>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITransaksis>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITransaksis[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(transaksis: ITransaksis): ITransaksis {
    const copy: ITransaksis = Object.assign({}, transaksis, {
      tanggalPinjam:
        transaksis.tanggalPinjam != null && transaksis.tanggalPinjam.isValid() ? transaksis.tanggalPinjam.format(DATE_FORMAT) : null,
      tanggalKembali:
        transaksis.tanggalKembali != null && transaksis.tanggalKembali.isValid() ? transaksis.tanggalKembali.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.tanggalPinjam = res.body.tanggalPinjam != null ? moment(res.body.tanggalPinjam) : null;
      res.body.tanggalKembali = res.body.tanggalKembali != null ? moment(res.body.tanggalKembali) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((transaksis: ITransaksis) => {
        transaksis.tanggalPinjam = transaksis.tanggalPinjam != null ? moment(transaksis.tanggalPinjam) : null;
        transaksis.tanggalKembali = transaksis.tanggalKembali != null ? moment(transaksis.tanggalKembali) : null;
      });
    }
    return res;
  }
}
