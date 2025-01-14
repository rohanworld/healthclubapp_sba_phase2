import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  // navpage() {
  //   this.router.navigateByUrl('place-gift-card-order-page');
  // }

  navpage() {
    this.router.navigateByUrl('place-fitness-trainer-appointment');
  }

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }
}
