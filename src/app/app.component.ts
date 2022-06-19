import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from './services/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  urlStatus: boolean = false;
  constructor(private router: Router, private userService: UserDataService) {}
  title = 'ecommerce-app';

  ngOnInit(): void {
    this.userService.url.subscribe((url) => {
      this.urlStatus = url;
    });
  }
}
