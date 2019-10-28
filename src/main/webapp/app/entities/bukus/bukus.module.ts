import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PustakaSharedModule } from 'app/shared/shared.module';
import { BukusComponent } from './bukus.component';
import { BukusDetailComponent } from './bukus-detail.component';
import { BukusUpdateComponent } from './bukus-update.component';
import { BukusDeletePopupComponent, BukusDeleteDialogComponent } from './bukus-delete-dialog.component';
import { bukusRoute, bukusPopupRoute } from './bukus.route';

const ENTITY_STATES = [...bukusRoute, ...bukusPopupRoute];

@NgModule({
  imports: [PustakaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [BukusComponent, BukusDetailComponent, BukusUpdateComponent, BukusDeleteDialogComponent, BukusDeletePopupComponent],
  entryComponents: [BukusDeleteDialogComponent]
})
export class PustakaBukusModule {}
