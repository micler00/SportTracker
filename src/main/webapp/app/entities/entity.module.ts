import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'patient',
        loadChildren: () => import('./patient/patient.module').then(m => m.SportTrackerPatientModule)
      },
      {
        path: 'activity',
        loadChildren: () => import('./activity/activity.module').then(m => m.SportTrackerActivityModule)
      },
      {
        path: 'workout',
        loadChildren: () => import('./workout/workout.module').then(m => m.SportTrackerWorkoutModule)
      },
      {
        path: 'physical-appearance',
        loadChildren: () => import('./physical-appearance/physical-appearance.module').then(m => m.SportTrackerPhysicalAppearanceModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class SportTrackerEntityModule {}
