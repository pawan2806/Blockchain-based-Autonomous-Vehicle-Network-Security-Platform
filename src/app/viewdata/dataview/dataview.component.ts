// import { Component, OnInit } from '@angular/core';
import { AfterViewInit, Component, Injectable, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import UsersJson from './csvjson.json';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AgmMap, GoogleMapsAPIWrapper } from '@agm/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCCNdTCUcyFWd0ENmQTHBx3IjXwfPs9u_g',
  authDomain: 'btp-backend-b1677.firebaseapp.com',
  projectId: 'btp-backend-b1677',
  storageBucket: 'btp-backend-b1677.appspot.com',
  messagingSenderId: '414071587370',
  appId: '1:414071587370:web:89e91874f75c598391f953',
  measurementId: 'G-WW53VVF14M',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { MapsAPILoader } from '@agm/core';
import { ApiService } from './api.service';
import Web3 from 'web3';
export interface USERS {
  id: String;
  dataId: number;
  timestamp: String;
  accx: number;
  accy: number;
  accz: number;
  rollx: number;
  yawy: number;
  pitchz: number;
  latitude: number;
  longitude: number;
  price: number;
  payable_owner: String;
}

interface Route {
  name: string;
  id: string;
}
interface marker {
  lat: number;
  lng: number;
  label?: number;
  draggable: boolean;
}

@Component({
  selector: 'app-dataview',
  templateUrl: './dataview.component.html',
  styleUrls: ['./dataview.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class DataviewComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'timestamp',
    'accx',
    'accy',
    'accz',
    'rollx',
    'yawy',
    'pitchz',
    'latitude',
    'longitude',
    'price',
    'payable_owner',
  ];
  mapShow: boolean;
  addDataShow: boolean;
 

  dataSource :any;
  routeControl = new FormControl(null, Validators.required);
  idControl = new FormControl(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  routes: Route[] = [
    { name: 'Route 1', id: '1' },
    { name: 'Route 2', id: '2' },
    { name: 'Route 3', id: '3' },
    { name: 'Route 4', id: '4' },
    { name: 'Route 5', id: '5' },
  ];
  markers: marker[] = [];
  showFiller = false;
  value = 'input here';
  constructor(
    private db: FormBuilder,
    private http: HttpClient,
    public form: FormBuilder
  ) {}

  public ClientForm: FormGroup;

  public onSubmit() {
    this.ClientForm.reset();
  }
  userinfo: any;
  url = 'http://localhost:8081/input/vehicles';
  showNewData() {
    const sub = this.http
      .get(this.url)
      .subscribe((res) => (this.userinfo = res));
      this.Users=this.userinfo;
    console.log(this.Users);
    this.dataSource =  new MatTableDataSource<USERS>(this.Users);
    this.dataSource.paginator = this.paginator;
  }

  addNewData(){
    const modal: USERS = {
      id: this.ClientForm.controls['id'].value,
      dataId: Math.floor((Math.random()*6)+1),
      timestamp: this.ClientForm.controls['timestamp'].value,
      accx:this.ClientForm.controls['accx'].value,
      accy: this.ClientForm.controls['accy'].value,
      accz: this.ClientForm.controls['accz'].value,
      rollx:this.ClientForm.controls['rollx'].value, 
      yawy: this.ClientForm.controls['yawy'].value,
      pitchz: this.ClientForm.controls['pitchz'].value,
      latitude: this.ClientForm.controls['latitude'].value,
      longitude: this.ClientForm.controls['longitude'].value,
      price: this.ClientForm.controls['price'].value,
      payable_owner:this.ClientForm.controls['payable_owner'].value, 
  };

  const url='http://localhost:8081/input/data/';

  this.http.post<any>(url, modal).subscribe({
        next: data => {
            console.log(data);
        },
        error: error => {
            console.error('There was an error!', error);
        }
    });
    this.showNewData();

  }

  public buildForm() {
    this.ClientForm = this.form.group({
      id: ['', [Validators.required]],
      dataId: ['', [Validators.required]],
      timestamp: ['', [Validators.required]],
      accx: ['', [Validators.required]],
      accy: ['', [Validators.required]],
      accz: ['', [Validators.required]],
      rollx: ['', [Validators.required]],
      yawy: ['', [Validators.required]],
      pitchz: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      price: ['', [Validators.required]],
      payable_owner: ['', [Validators.required]],
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 55.68282884;
  lng: number = 37.41621223;
  previous: any;

  clickedMarker(label: number | undefined, index: number, infowindow: any) {
    console.log(`clicked the marker: ${label || index}`);

    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }

  mapClicked($event: google.maps.MouseEvent) {
    this.markers.push({
      lat: $event.latLng.lat(),
      lng: $event.latLng.lng(),
      draggable: true,
    });
  }

  markerDragEnd(m: marker, $event: google.maps.MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  mapClick() {
    this.showNewData();
    this.mapShow = !this.mapShow;
    this.Users.forEach((element) => {
      this.markers.push({
        lat: element.latitude,
        lng: element.longitude,
        label: element.dataId,
        draggable: true,
      });
    });
  }

  hideAddData(){
    this.addDataShow = !this.addDataShow;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Users: USERS[] = UsersJson;
  Users: USERS[];

  ngOnInit(): void {
    //console.log(this.Users);
   
    this.buildForm();

    this.mapShow = false;
    this.addDataShow=false;
    this.Users.forEach((element) => {
      this.markers.push({
        lat: element.latitude,
        lng: element.longitude,
        label: element.dataId,
        draggable: true,
      });
    });

    console.log(this.markers);
  }
}
