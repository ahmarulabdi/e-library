import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBukus } from 'app/shared/model/bukus.model';

@Component({
  selector: 'jhi-bukus-detail',
  templateUrl: './bukus-detail.component.html'
})
export class BukusDetailComponent implements OnInit {
  bukus: IBukus;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ bukus }) => {
      this.bukus = bukus;
    });
  }

  previousState() {
    window.history.back();
  }
}
