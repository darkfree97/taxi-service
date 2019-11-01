import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';


interface Driver {
  id: number;
  first_name: string;
  last_name: string;
  mobile_phone: string;
  dest_range: number;
  home_area: any;
}

interface Client {
  id: number;
  first_name: string;
  last_name: string;
  mobile_phone: string;
  dest_range: number;
  home: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  map: L.Map;
  markers = null;
  driverAreas = [];
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
    ],
    zoom: 6,
    center: L.latLng(49.000000, 30.000000)
  };

  drivers: Driver[] = [];
  clients: Client[] = [];

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getDrivers().subscribe((drivers: Driver[]) => this.fillDrivers(drivers));
    this.api.getClients().subscribe((clients: Client[]) => {
      this.clients = clients;
      this.clients.forEach(client => {
        L.geoJSON(client.home).addTo(this.markers);
      });
    });
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.markers = L.layerGroup().addTo(map);
  }

  driverClicked(driver: Driver) {
    this.driverAreas = [L.geoJSON(driver.home_area).on('click', (event: any) => this.driverClicked(driver))];
    this.api.getClientsInDriversArea(driver.id).subscribe((clients: Client[]) => {
      this.markers.clearLayers();
      this.clients = clients;
      this.clients.forEach(client => {
        L.geoJSON(client.home).addTo(this.markers);
      });
    });
  }

  displayAllDrivers() {
    this.fillDrivers(this.drivers);
    this.api.getClients().subscribe((clients: Client[]) => {
      this.markers.clearLayers();
      this.clients = clients;
      this.clients.forEach(client => {
        L.geoJSON(client.home).addTo(this.markers);
      });
    });
  }

  private fillDrivers(drivers: Driver[]) {
    const context = this;
    this.drivers = drivers;
    this.driverAreas = [];
    this.drivers.forEach((item: any) => {
      context.driverAreas.push(L.geoJSON(item.home_area).on('click', (event: any) => {
        context.driverClicked(item);
      }));
    });
  }
}
