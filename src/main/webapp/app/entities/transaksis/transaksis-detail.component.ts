import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransaksis } from 'app/shared/model/transaksis.model';

@Component({
  selector: 'jhi-transaksis-detail',
  templateUrl: './transaksis-detail.component.html'
})
export class TransaksisDetailComponent implements OnInit {
  transaksis: ITransaksis;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ transaksis }) => {
      this.transaksis = transaksis;
    });
  }

  previousState() {
    window.history.back();
  }
}
