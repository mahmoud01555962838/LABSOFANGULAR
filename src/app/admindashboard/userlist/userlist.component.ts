import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {
  userList: any;
  constructor(private userService: UserDataService) {}

  ngOnInit(): void {
    //call observable method to list users
    this.userService.getData().subscribe((data) => {
      this.userList = data;
      console.log(data);
    });
  }
}
