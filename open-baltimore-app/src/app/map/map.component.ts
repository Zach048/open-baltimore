import {Component, AfterViewInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  public restaurants: any = [];
    api = 'http://localhost:8080/';
    public restaurant: any = {};
    mapForm = new FormGroup({
      name: new FormControl(''),
    });
    mymap;


  constructor(private http: HttpClient) {
    this.http.get(this.api + 'restaurant/all').subscribe((data: any) => {
      this.restaurants = data;
    });
  }

  ngAfterViewInit(): void {
    this.mymap = L.map('mapid').setView([39.2904, -76.6122], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiemVhcmw0OCIsImEiOiJja2g5d2RheWUwd2hnMnhtN2Q4d2VmdjdkIn0.X_xj_4nh6VBZw7eVfUpimg'
}).addTo(this.mymap);
  }

  searchMap(v): void {
    let restaurantQuery = v.address.replace('Baltimore, MD', '');
    restaurantQuery = restaurantQuery.split(' ').join('+');
    restaurantQuery = restaurantQuery.substring(0, restaurantQuery.length - 1);
    this.http.get('http://open.mapquestapi.com/geocoding/v1/address?key=mSWcBIL6kFlMRFUTnjoF40fRzGthbrY5&location=' +
    restaurantQuery + ',Baltimore,MD,' + v.zipCode).subscribe((data: any) => {
      this.mymap.panTo(new L.LatLng(data.results[0].locations[0].latLng.lat, data.results[0].locations[0].latLng.lng));
    });
  }

}
