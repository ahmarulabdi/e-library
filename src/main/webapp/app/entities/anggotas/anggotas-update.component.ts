import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IAnggotas, Anggotas } from 'app/shared/model/anggotas.model';
import { AnggotasService } from './anggotas.service';

@Component({
  selector: 'jhi-anggotas-update',
  templateUrl: './anggotas-update.component.html'
})
export class AnggotasUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nama: [null, [Validators.required]]
  });

  constructor(protected anggotasService: AnggotasService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ anggotas }) => {
      this.updateForm(anggotas);
    });
  }

  updateForm(anggotas: IAnggotas) {
    this.editForm.patchValue({
      id: anggotas.id,
      nama: anggotas.nama
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const anggotas = this.createFromForm();
    if (anggotas.id !== undefined) {
      this.subscribeToSaveResponse(this.anggotasService.update(anggotas));
    } else {
      this.subscribeToSaveResponse(this.anggotasService.create(anggotas));
    }
  }

  private createFromForm(): IAnggotas {
    return {
      ...new Anggotas(),
      id: this.editForm.get(['id']).value,
      nama: this.editForm.get(['nama']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnggotas>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
