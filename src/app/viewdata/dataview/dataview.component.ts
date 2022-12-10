// import { Component, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import UsersJson from './csvjson.json';
import {FormBuilder, FormGroup, FormArray, } from '@angular/forms';
import { AgmMap, GoogleMapsAPIWrapper } from '@agm/core';
import {
  MapsAPILoader
} from '@agm/core';

export interface USERS {
  id: number,
  timestamp: String,
  accx: number,
  accy: number,
  accz: number,
  rollx:  number,
  yawy: number,
  pitchz: number,
  latitude: number,
  longitude: number,
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
  styleUrls: ['./dataview.component.css']
})
export class DataviewComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'timestamp', 'accx', 'accy', 'accz','rollx','yawy','pitchz','latitude','longitude'];
  mapShow: boolean;
  formGroup: FormGroup;
  dataSource = new MatTableDataSource<USERS>(UsersJson);
  routeControl = new FormControl(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  routes: Route[] = [
    {name: 'Route 1', id: '1'},
    {name: 'Route 2', id: '2'},
    {name: 'Route 3', id: '3'},
    {name: 'Route 4', id: '4'},
    {name: 'Route 5', id: '5'},
 
  ];
  markers: marker[] = [
  ]
  showFiller = false;
  value = '';


  @ViewChild(MatPaginator) paginator: MatPaginator;

  // google maps zoom level
  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 55.68282884;
  lng: number = 37.41621223;
  previous:any;

  clickedMarker(label: number|undefined, index: number, infowindow:any) {
    console.log(`clicked the marker: ${label || index}`)

    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }
  
  mapClicked($event: google.maps.MouseEvent) {
    this.markers.push({
      lat: $event.latLng.lat(),
      lng : $event.latLng.lng(),
      draggable: true
    });
  }
  
  markerDragEnd(m: marker, $event:  google.maps.MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  mapClick(){
    this.mapShow=!this.mapShow;
  }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
   
  }

  Users: USERS[] = UsersJson;

  constructor(private fb: FormBuilder){
    
  }

  ngOnInit(): void {
    //console.log(this.Users);
    this.formGroup = this.fb.group({
      id: ['', Validators.required],
      timestamp: ['', Validators.required],
      accx: ['', Validators.required],
      accy: ['', Validators.required],
      accz: ['', Validators.required],
      rollx: ['', Validators.required],
      yawy: ['', Validators.required],
      pitchz: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    });
    this.mapShow=false;
    this.Users.forEach( (element) => {
      this.markers.push(
        {
          lat:element.latitude,
          lng:element.longitude,
          label:element.id,
          draggable:true
        }
      )
  });

  console.log(this.markers);
  }

}
