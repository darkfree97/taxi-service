import * as L from 'leaflet';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {Router} from '@angular/router';
import {osrmUrl} from "../../../environments/environment";


@Component({
  selector: 'app-ride-create',
  templateUrl: './ride-create.component.html',
  styleUrls: ['./ride-create.component.scss']
})
export class RideCreateComponent implements OnInit {
  map: L.Map;
  rideLayer: L.LayerGroup;
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

  constructor(private api: ApiService, private router: Router, private changesDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.api.getClients().subscribe((clients: any[]) => this.clients = clients);
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.rideLayer = L.layerGroup().addTo(map);
    this.map.on('click', (event: any) => {
      const container = L.DomUtil.create('div');
      const startBtn = this.renderButton('Start', container);
      const endBtn = this.renderButton('End', container);
      L.popup().setContent(container).setLatLng(event.latlng).openOn(this.map);
      L.DomEvent.on(startBtn, 'click', () => {
        this.control.spliceWaypoints(0, 1, event.latlng);
        this.updatePoint('start', event.latlng);
        this.map.closePopup();
      });
      L.DomEvent.on(endBtn, 'click', () => {
        this.control.spliceWaypoints(this.control.getWaypoints().length - 1, 1, event.latlng);
        this.updatePoint('end', event.latlng);
        this.map.closePopup();
      });
    });
    this.control = L.Routing.control({
      router: new L.Routing.OSRMv1({
        serviceUrl: osrmUrl,
      }),
    }).on('routeselected', (e) => {
      this.ride.route = e.route;
      this.updatePoint('start', e.route.waypoints[0].latLng);
      this.updatePoint('end', e.route.waypoints[1].latLng);
      console.log(this.ride.route);
    }).addTo(this.map);
  }

  isValid() {
    return this.ride.route && this.ride.client;
  }

  create() {
    const ride = {
      client: this.ride.client.id,
      source: L.marker(this.ride.route.waypoints[0].latLng).toGeoJSON().geometry,
      destination: L.marker(this.ride.route.waypoints[1].latLng).toGeoJSON().geometry,
      actual_route: L.polyline(this.ride.route.coordinates).toGeoJSON().geometry,
      distance: (this.ride.route.summary.totalDistance / 1000).toFixed(3),
      ordered_at: `${this.ride.date.getDate()}.${this.ride.date.getMonth()}.${this.ride.date.getFullYear()} ${this.ride.time}`,
    };
    this.rideLayer.clearLayers();
    this.api.createRide(ride).subscribe((responseRide: any) => {
      this.router.navigate(['ride', 'list']).then();
    });
  }

  select(client: any) {
    this.ride.client = client;
  }

  private renderButton(label, container) {
    const btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
  }

  private updatePoint(point, latlng) {
    this.ride[point] = [latlng.lat, latlng.lng];
    this.changesDetector.detectChanges();
  }
}
