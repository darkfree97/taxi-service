import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getDrivers() {
    return this.http.get(`${baseUrl}/drivers/`);
  }

  getClients() {
    return this.http.get(`${baseUrl}/clients/`);
  }

  getClientsInArea(area: any) {
    return this.http
      .get(`${baseUrl}/clients/?contained=${JSON.stringify(area)}`)
      .pipe(catchError((error) => of([])));
  }

  getClientsInDriversArea(driverId: number) {
    return this.http
      .get(`${baseUrl}/clients/?contained_by_area_of_driver=${driverId}`)
      .pipe(catchError((error) => of([])));
  }

  getPolygonOfPlace(place: string) {
    return this.http
      .get(`https://nominatim.openstreetmap.org/search.php?q=${place}&polygon_geojson=1&format=json`)
      .pipe(map((listOfGeoObjects: any[]) => listOfGeoObjects.filter(obj => {
        return obj.geojson.type === 'Polygon' || obj.geojson.type === 'MultiPolygon';
      })));
  }

  getMarkersOfPlace(place: string) {
    return this.http
      .get(`https://nominatim.openstreetmap.org/search.php?q=${place}&polygon_geojson=1&format=json`)
      .pipe(map((listOfGeoObjects: any[]) => listOfGeoObjects.filter(obj => {
        return obj.geojson.type === 'Point';
      })));
  }

  createDriver(driver: any) {
    return this.http.post(`${baseUrl}/drivers/`, driver);
  }

  createClient(client: any) {
    return this.http.post(`${baseUrl}/clients/`, client);
  }

  createRide(ride: any) {
    return this.http.post(`${baseUrl}/rides/`, ride);
  }

  getRides() {
    return this.http.get(`${baseUrl}/rides/`);
  }

  getRidesForClient(clientId: number) {
    return this.http.get(`${baseUrl}/rides/?client=${clientId}`);
  }
}
