import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAnggotas } from 'app/shared/model/anggotas.model';

@Component({
  selector: 'jhi-anggotas-detail',
  templateUrl: './anggotas-detail.component.html'
})
export class AnggotasDetailComponent implements OnInit {
  anggotas: IAnggotas;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ anggotas }) => {
      this.anggotas = anggotas;
    });
  }

  previousState() {
    window.history.back();
  }
}
