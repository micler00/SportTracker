import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWorkout } from 'app/shared/model/workout.model';

type EntityResponseType = HttpResponse<IWorkout>;
type EntityArrayResponseType = HttpResponse<IWorkout[]>;

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  public resourceUrl = SERVER_API_URL + 'api/workouts';

  constructor(protected http: HttpClient) {}

  create(workout: IWorkout): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(workout);
    return this.http
      .post<IWorkout>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(workout: IWorkout): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(workout);
    return this.http
      .put<IWorkout>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IWorkout>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IWorkout[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(workout: IWorkout): IWorkout {
    const copy: IWorkout = Object.assign({}, workout, {
      date: workout.date && workout.date.isValid() ? workout.date.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((workout: IWorkout) => {
        workout.date = workout.date ? moment(workout.date) : undefined;
      });
    }
    return res;
  }
}
