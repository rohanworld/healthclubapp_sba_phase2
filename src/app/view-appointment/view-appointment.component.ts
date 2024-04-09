// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-view-appointment',
//   templateUrl: './view-appointment.component.html'
// })
// export class ViewAppointmentComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {

//   }

//   getfitness() {

//   }

//   deleteAppointment(){}

//   editAppointment(){}
// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
})
export class ViewAppointmentComponent implements OnInit {
  appointments: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getFitness();
  }
  getFitness() {
    this.http.get<any>('assets/health-club.json').subscribe(
      (data) => {
        console.log('Data fetched:', data);
        this.appointments = data.appointment || data; // Handle nested data
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  deleteAppointment() {}

  editAppointment() {}
}
