/* eslint-disable id-blacklist */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RoadmapService {
  baseUri = 'http://localhost:3000/api/roadmaps';
  headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('mean-token')!}`,
  }).set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  // Get all roadmaps with all foreign info
  getRoadmaps(
    driverId?: any,
    isFinished?: any,
    noLimit?: any,
    limit?: any,
    page?: any,
    sortBy?: any,
    sort?: any,
    search?: any,
    startDate?: any,
    endDate?: any,
    driver?: any
  ): Observable<any> {
    const url = `${this.baseUri}`;
    var queryParams = new HttpParams();

    queryParams = queryParams.append('limit', limit);
    queryParams = queryParams.append('page', page);
    if (sortBy) {
      queryParams = queryParams.append('sortBy', sortBy);
    }
    if (sort) {
      queryParams = queryParams.append('sort', sort);
    }
    if (search) {
      queryParams = queryParams.append('search', search);
    }
    if (startDate) {
      queryParams = queryParams.append('startDate', startDate);
    }
    if (endDate) {
      queryParams = queryParams.append('endDate', endDate);
    }
    if (driver) {
      queryParams = queryParams.append('driver', driver);
    }
    if (driverId) {
      queryParams = queryParams.append('driverId', driverId);
    }
    if (isFinished) {
      queryParams = queryParams.append('isFinished', isFinished);
    }
    if (noLimit) {
      queryParams = queryParams.append('noLimit', noLimit);
    }
    return this.http.get(url, { headers: this.headers, params: queryParams }); //if error try removing/adding header
  }

  // Update roadmap
  updateRoadmap(id: any, data: any): Observable<any> {
    const url = `${this.baseUri}/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
