import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PustakaSharedModule } from 'app/shared/shared.module';
import { TransaksisComponent } from './transaksis.component';
import { TransaksisDetailComponent } from './transaksis-detail.component';
import { TransaksisUpdateComponent } from './transaksis-update.component';
import { TransaksisDeletePopupComponent, TransaksisDeleteDialogComponent } from './transaksis-delete-dialog.component';
import { transaksisRoute, transaksisPopupRoute } from './transaksis.route';

const ENTITY_STATES = [...transaksisRoute, ...transaksisPopupRoute];

@NgModule({
  imports: [PustakaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TransaksisComponent,
    TransaksisDetailComponent,
    TransaksisUpdateComponent,
    TransaksisDeleteDialogComponent,
    TransaksisDeletePopupComponent
  ],
  entryComponents: [TransaksisDeleteDialogComponent]
})
export class PustakaTransaksisModule {}
