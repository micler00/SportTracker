import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWorkout, Workout } from 'app/shared/model/workout.model';
import { WorkoutService } from './workout.service';
import { WorkoutComponent } from './workout.component';
import { WorkoutDetailComponent } from './workout-detail.component';
import { WorkoutUpdateComponent } from './workout-update.component';

@Injectable({ providedIn: 'root' })
export class WorkoutResolve implements Resolve<IWorkout> {
  constructor(private service: WorkoutService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWorkout> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((workout: HttpResponse<Workout>) => {
          if (workout.body) {
            return of(workout.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Workout());
  }
}

export const workoutRoute: Routes = [
  {
    path: '',
    component: WorkoutComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sportTrackerApp.workout.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: WorkoutDetailComponent,
    resolve: {
      workout: WorkoutResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sportTrackerApp.workout.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: WorkoutUpdateComponent,
    resolve: {
      workout: WorkoutResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sportTrackerApp.workout.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: WorkoutUpdateComponent,
    resolve: {
      workout: WorkoutResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sportTrackerApp.workout.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
