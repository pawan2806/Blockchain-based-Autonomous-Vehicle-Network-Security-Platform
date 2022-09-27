import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataviewComponent } from './viewdata/dataview/dataview.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { AgmCoreModule } from '@agm/core';

// import {ViewdataModule} from './viewdata/viewdata.module';
// import {DataviewComponent} from './viewdata/da';
@NgModule({
  declarations: [
    AppComponent,
    DataviewComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserModule, 
    ReactiveFormsModule ,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyC0PbutqNtO7H_aOhGzbhFrVRimXGaZkOA'
    })
   
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
