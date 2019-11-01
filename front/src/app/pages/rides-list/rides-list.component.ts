import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {ApiService} from '../../services/api/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rides-list',
  templateUrl: './rides-list.component.html',
  styleUrls: ['./rides-list.component.scss']
})
export class RidesListComponent implements OnInit {
map: L.Map;
  control: L.Routing.Control;
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
    ],
    zoom: 6,
    center: L.latLng(49.000000, 30.000000)
  };
  clients: any[] = [];
  now = new Date();
  ride = {
    client: null,
    start: [],
    end: [],
    route: null,
    date: this.now,
    time: `${this.now.getHours()}:${this.now.getMinutes()}`,
  };
  ridesLayer = [];

  constructor(private api: ApiService, private router: Router, private changesDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.api.getClients().subscribe((clients: any[]) => this.clients = clients);
    this.api.getRides().subscribe((rides: []) => this.fillRides(rides));
  }

  onMapReady(map: L.Map) {
    this.map = map;
  }

  select(client: any) {
    this.ride.client = client;
    this.api.getRidesForClient(client.id).subscribe((rides: []) => this.fillRides(rides));
  }

  private fillRides(rides: any[]) {
    this.ridesLayer = [];
    rides.forEach((ride: any) => {
      this.ridesLayer.push(L.geoJSON(ride.actual_route));
    });
  }
}
