import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPhysicalAppearance } from 'app/shared/model/physical-appearance.model';

type EntityResponseType = HttpResponse<IPhysicalAppearance>;
type EntityArrayResponseType = HttpResponse<IPhysicalAppearance[]>;

@Injectable({ providedIn: 'root' })
export class PhysicalAppearanceService {
  public resourceUrl = SERVER_API_URL + 'api/physical-appearances';

  constructor(protected http: HttpClient) {}

  create(physicalAppearance: IPhysicalAppearance): Observable<EntityResponseType> {
    return this.http.post<IPhysicalAppearance>(this.resourceUrl, physicalAppearance, { observe: 'response' });
  }

  update(physicalAppearance: IPhysicalAppearance): Observable<EntityResponseType> {
    return this.http.put<IPhysicalAppearance>(this.resourceUrl, physicalAppearance, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPhysicalAppearance>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPhysicalAppearance[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
