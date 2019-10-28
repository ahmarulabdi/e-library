import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IBukus, Bukus } from 'app/shared/model/bukus.model';
import { BukusService } from './bukus.service';

@Component({
  selector: 'jhi-bukus-update',
  templateUrl: './bukus-update.component.html'
})
export class BukusUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nama: [null, [Validators.required]],
    pengarang: [null, [Validators.required]]
  });

  constructor(protected bukusService: BukusService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ bukus }) => {
      this.updateForm(bukus);
    });
  }

  updateForm(bukus: IBukus) {
    this.editForm.patchValue({
      id: bukus.id,
      nama: bukus.nama,
      pengarang: bukus.pengarang
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const bukus = this.createFromForm();
    if (bukus.id !== undefined) {
      this.subscribeToSaveResponse(this.bukusService.update(bukus));
    } else {
      this.subscribeToSaveResponse(this.bukusService.create(bukus));
    }
  }

  private createFromForm(): IBukus {
    return {
      ...new Bukus(),
      id: this.editForm.get(['id']).value,
      nama: this.editForm.get(['nama']).value,
      pengarang: this.editForm.get(['pengarang']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBukus>>) {
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
