import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ITransaksis, Transaksis } from 'app/shared/model/transaksis.model';
import { TransaksisService } from './transaksis.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IAnggotas } from 'app/shared/model/anggotas.model';
import { AnggotasService } from 'app/entities/anggotas/anggotas.service';
import { IBukus } from 'app/shared/model/bukus.model';
import { BukusService } from 'app/entities/bukus/bukus.service';

@Component({
  selector: 'jhi-transaksis-update',
  templateUrl: './transaksis-update.component.html'
})
export class TransaksisUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  anggotas: IAnggotas[];

  bukuses: IBukus[];
  tanggalPinjamDp: any;
  tanggalKembaliDp: any;

  editForm = this.fb.group({
    id: [],
    tanggalPinjam: [],
    tanggalKembali: [],
    user: [],
    anggotas: [],
    bukus: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected transaksisService: TransaksisService,
    protected userService: UserService,
    protected anggotasService: AnggotasService,
    protected bukusService: BukusService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ transaksis }) => {
      this.updateForm(transaksis);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.anggotasService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAnggotas[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAnggotas[]>) => response.body)
      )
      .subscribe((res: IAnggotas[]) => (this.anggotas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.bukusService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IBukus[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBukus[]>) => response.body)
      )
      .subscribe((res: IBukus[]) => (this.bukuses = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(transaksis: ITransaksis) {
    this.editForm.patchValue({
      id: transaksis.id,
      tanggalPinjam: transaksis.tanggalPinjam,
      tanggalKembali: transaksis.tanggalKembali,
      user: transaksis.user,
      anggotas: transaksis.anggotas,
      bukus: transaksis.bukus
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const transaksis = this.createFromForm();
    if (transaksis.id !== undefined) {
      this.subscribeToSaveResponse(this.transaksisService.update(transaksis));
    } else {
      this.subscribeToSaveResponse(this.transaksisService.create(transaksis));
    }
  }

  private createFromForm(): ITransaksis {
    return {
      ...new Transaksis(),
      id: this.editForm.get(['id']).value,
      tanggalPinjam: this.editForm.get(['tanggalPinjam']).value,
      tanggalKembali: this.editForm.get(['tanggalKembali']).value,
      user: this.editForm.get(['user']).value,
      anggotas: this.editForm.get(['anggotas']).value,
      bukus: this.editForm.get(['bukus']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransaksis>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackAnggotasById(index: number, item: IAnggotas) {
    return item.id;
  }

  trackBukusById(index: number, item: IBukus) {
    return item.id;
  }
}
