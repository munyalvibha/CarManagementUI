import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface CarModel {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarModelService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCarModels(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/CarModel/getAllCarModel");
  }

  getCarModel(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl + "/CarModel/GetById"}/${id}`);
  }

  addCarModel(carModel: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/CarModel/insertCar", carModel);
  }

  updateCarModel(carModel: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + `/CarModel/Update`, carModel);
  }

  deleteCarModel(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl + "/CarModel/Delete"}/${id}`);
  }

  getSalesDetails(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/CarModel/getAllCarModel");
  }
}
