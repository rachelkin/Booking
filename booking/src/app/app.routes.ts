import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Home } from './components/home/home';
import { AllTrips } from './components/all-trips/all-trips';
import { MyTrips } from './components/my-trips/my-trips';
import { Trip } from './components/trip/trip';
import { App } from './app';
import { Error } from './components/error/error';
import { Add_and_edit } from './components/add_and_edit/add_and_edit';

export const routes: Routes = [
    {path:'', component : App},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    
    {
        path: 'home',
        component: Home,
        children:[        
            {
                path: 'allTrips',
                component: AllTrips,
            },
            {
                path: 'trip/:id',
                component: Trip,
            },
            {
                path: 'myTrips',
                component: MyTrips
            },
            {
                path: 'trip/:id',
                component: Trip
            } ,
            {
                path:'add_and_edit',
                component:Add_and_edit 
            }          
        ]
    },
    {path: '**', component: Error}
];
