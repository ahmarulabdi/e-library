import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PustakaSharedModule } from 'app/shared/shared.module';
import { AnggotasComponent } from './anggotas.component';
import { AnggotasDetailComponent } from './anggotas-detail.component';
import { AnggotasUpdateComponent } from './anggotas-update.component';
import { AnggotasDeletePopupComponent, AnggotasDeleteDialogComponent } from './anggotas-delete-dialog.component';
import { anggotasRoute, anggotasPopupRoute } from './anggotas.route';

const ENTITY_STATES = [...anggotasRoute, ...anggotasPopupRoute];

@NgModule({
  imports: [PustakaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AnggotasComponent,
    AnggotasDetailComponent,
    AnggotasUpdateComponent,
    AnggotasDeleteDialogComponent,
    AnggotasDeletePopupComponent
  ],
  entryComponents: [AnggotasDeleteDialogComponent]
})
export class PustakaAnggotasModule {}
