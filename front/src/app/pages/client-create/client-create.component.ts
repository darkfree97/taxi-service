import * as L from 'leaflet';
import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit {
  submitBtnText = 'Create';
  spinnerToggle = false;
  map: L.Map;
  locationArea: L.LayerGroup;
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
    ],
    zoom: 6,
    center: L.latLng(49.000000, 30.000000)
  };

  client = {
    first_name: '',
    last_name: '',
    mobile_phone: '',
    password: '',
    home: null,
    place: ''
  };
  foundedPlaces: any[] = [];

  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit() {
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.locationArea = L.layerGroup().addTo(map);
  }

  placeChanged() {
    this.spinnerToggle = true;
    this.api.getMarkersOfPlace(this.client.place).subscribe((places: any[]) => {
      this.foundedPlaces = places;
      this.spinnerToggle = false;
    });
  }

  selectLocation(region: any) {
    this.locationArea.clearLayers();
    this.client.home = region.geojson;
    L.geoJSON(region.geojson, {
      pointToLayer: (feature, latlng) => {
        return L.marker(latlng, {draggable: true}).on('dragend', (event) => {
          this.client.home = event.target.toGeoJSON().geometry;
        });
      }}).addTo(this.locationArea);
  }

  isValid() {
    return (
      this.client.first_name &&
      this.client.last_name &&
      this.client.mobile_phone &&
      this.client.password &&
      this.client.home
    );
  }

  create() {
    this.api.createClient(this.client).subscribe((client: any) => {
      this.router.navigate(['home']).then();
    }, (error: HttpErrorResponse) => alert(JSON.stringify(error.error)));
  }
}
