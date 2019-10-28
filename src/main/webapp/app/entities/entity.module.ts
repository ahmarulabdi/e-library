import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'anggotas',
        loadChildren: () => import('./anggotas/anggotas.module').then(m => m.PustakaAnggotasModule)
      },
      {
        path: 'bukus',
        loadChildren: () => import('./bukus/bukus.module').then(m => m.PustakaBukusModule)
      },
      {
        path: 'transaksis',
        loadChildren: () => import('./transaksis/transaksis.module').then(m => m.PustakaTransaksisModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class PustakaEntityModule {}
