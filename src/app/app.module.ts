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
import { MatIconModule } from '@angular/material/icon';
import {FormBuilder, FormGroup, FormArray, } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  MatSidenavModule,
} from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import { ApiService } from './viewdata/dataview/api.service';
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
    MatSidenavModule,
    ReactiveFormsModule ,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyC0PbutqNtO7H_aOhGzbhFrVRimXGaZkOA'
    })
   
   
  ],
  exports: [MatSidenavModule],
  providers: [HttpClient, ApiService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
