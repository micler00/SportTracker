import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SportTrackerSharedModule } from 'app/shared/shared.module';
import { PhysicalAppearanceComponent } from './physical-appearance.component';
import { PhysicalAppearanceDetailComponent } from './physical-appearance-detail.component';
import { PhysicalAppearanceUpdateComponent } from './physical-appearance-update.component';
import { PhysicalAppearanceDeleteDialogComponent } from './physical-appearance-delete-dialog.component';
import { physicalAppearanceRoute } from './physical-appearance.route';

@NgModule({
  imports: [SportTrackerSharedModule, RouterModule.forChild(physicalAppearanceRoute)],
  declarations: [
    PhysicalAppearanceComponent,
    PhysicalAppearanceDetailComponent,
    PhysicalAppearanceUpdateComponent,
    PhysicalAppearanceDeleteDialogComponent
  ],
  entryComponents: [PhysicalAppearanceDeleteDialogComponent]
})
export class SportTrackerPhysicalAppearanceModule {}
