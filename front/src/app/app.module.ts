import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './pages/home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {HttpClientModule} from '@angular/common/http';
import {DriverCreateComponent} from './pages/driver-create/driver-create.component';
import {ClientCreateComponent} from './pages/client-create/client-create.component';
import {RideCreateComponent} from './pages/ride-create/ride-create.component';
import {MatListModule} from '@angular/material/list';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { RidesListComponent } from './pages/rides-list/rides-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DriverCreateComponent,
    ClientCreateComponent,
    RideCreateComponent,
    RidesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    HttpClientModule,
    LeafletModule.forRoot(),
    MatListModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'uk-UA'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
