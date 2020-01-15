import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWorkout } from 'app/shared/model/workout.model';
import { WorkoutService } from './workout.service';
import { WorkoutDeleteDialogComponent } from './workout-delete-dialog.component';

@Component({
  selector: 'jhi-workout',
  templateUrl: './workout.component.html'
})
export class WorkoutComponent implements OnInit, OnDestroy {
  workouts?: IWorkout[];
  eventSubscriber?: Subscription;

  constructor(protected workoutService: WorkoutService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.workoutService.query().subscribe((res: HttpResponse<IWorkout[]>) => {
      this.workouts = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInWorkouts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IWorkout): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInWorkouts(): void {
    this.eventSubscriber = this.eventManager.subscribe('workoutListModification', () => this.loadAll());
  }

  delete(workout: IWorkout): void {
    const modalRef = this.modalService.open(WorkoutDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.workout = workout;
  }
}
