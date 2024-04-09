import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export class Fitness {
  constructor(
    public inr: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname: string,
    public lastname: string,
    public age: number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) {}
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html',
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {
  fitnessForm: FormGroup;
  weeksGroupVisible: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.fitnessForm = this.formBuilder.group({
      name: [''],
      age: [''],
      email: [''],
      phone: [''],
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
      country: [''],
      pincode: [''],
      trainerPreference: [''],
      physiotherapist: [''],
      package: [''],
      weeks: [''],
      amount: [''],
    });
    this.fitnessForm.get('package').valueChanges.subscribe((value) => {
      if (value === '2' || value === '3') {
        this.weeksGroupVisible = true;
      } else {
        this.weeksGroupVisible = false;
        this.fitnessForm.get('weeks').reset();
      }
    });
  }

  onSubmit() {
    if (this.fitnessForm.valid) {
      const formData = this.fitnessForm.value;
      let amount = 0;

      if (formData.package === '1') {
        amount = 1000;
      } else if (formData.package === '2') {
        amount = 1500 + (formData.weeks ? parseInt(formData.weeks) * 200 : 0);
      } else if (formData.package === '3') {
        amount = 2000;
      }

      if (formData.physiotherapist === 'yes') {
        amount += 200;
      }

      this.fitnessForm.patchValue({ amount: amount });
      console.log('Appointment details:', formData);

      this.http.post<any>('assets/health-club.json', formData).subscribe(
        (response) => {
          console.log('Appointment saved successfully:', response);
          // Reset the form
          this.fitnessForm.reset();
        },
        (error) => {
          console.error('Error saving appointment:', error);
        }
      );
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }
}
