import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SportTrackerSharedModule } from 'app/shared/shared.module';
import { WorkoutComponent } from './workout.component';
import { WorkoutDetailComponent } from './workout-detail.component';
import { WorkoutUpdateComponent } from './workout-update.component';
import { WorkoutDeleteDialogComponent } from './workout-delete-dialog.component';
import { workoutRoute } from './workout.route';

@NgModule({
  imports: [SportTrackerSharedModule, RouterModule.forChild(workoutRoute)],
  declarations: [WorkoutComponent, WorkoutDetailComponent, WorkoutUpdateComponent, WorkoutDeleteDialogComponent],
  entryComponents: [WorkoutDeleteDialogComponent]
})
export class SportTrackerWorkoutModule {}
