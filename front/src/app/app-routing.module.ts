import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {DriverCreateComponent} from './pages/driver-create/driver-create.component';
import {ClientCreateComponent} from './pages/client-create/client-create.component';
import {RideCreateComponent} from './pages/ride-create/ride-create.component';
import {RidesListComponent} from './pages/rides-list/rides-list.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', component: HomeComponent},
  {path: 'driver/create', component: DriverCreateComponent},
  {path: 'client/create', component: ClientCreateComponent},
  {path: 'ride/create', component: RideCreateComponent},
  {path: 'ride/list', component: RidesListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
