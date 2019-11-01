import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {ApiService} from '../../services/api/api.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-driver-create',
  templateUrl: './driver-create.component.html',
  styleUrls: ['./driver-create.component.scss']
})
export class DriverCreateComponent implements OnInit {
  submitBtnText = 'Create';
  spinnerToggle = false;
  map: L.Map;
  driverAreas: L.LayerGroup;
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
    ],
    zoom: 6,
    center: L.latLng(49.000000, 30.000000)
  };

  driver = {
    first_name: '',
    last_name: '',
    mobile_phone: '',
    password: '',
    home_area: null,
    region: ''
  };
  foundedRegions: any[] = [];

  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit() {
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.driverAreas = L.layerGroup().addTo(map);
  }

  create() {
    this.api.createDriver(this.driver).subscribe((driver: any) => {
      this.router.navigate(['home']).then();
    }, (error: HttpErrorResponse) => alert(JSON.stringify(error.error)));
  }

  selectRegion(region: any) {
    this.driver.home_area = region.geojson;
    this.driverAreas.clearLayers();
    const area = L.geoJSON(region.geojson).addTo(this.driverAreas);
    this.map.fitBounds(area.getBounds());
  }

  areaChanged() {
    this.driverAreas.clearLayers();
    this.foundedRegions = [];
    this.api.getPolygonOfPlace(this.driver.region).subscribe((regions: any[]) => {
      this.foundedRegions = regions;
      this.spinnerToggle = false;
    });
    this.spinnerToggle = true;
    this.driver.home_area = null;
  }

  isValid() {
    return (
      this.driver.first_name &&
      this.driver.last_name &&
      this.driver.mobile_phone &&
      this.driver.password &&
      this.driver.home_area
    );
  }
}
