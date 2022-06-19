import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  login = new BehaviorSubject(true); // to move data between components in login control operation
  url = new BehaviorSubject(false); // to move data between components in url control operation
  isAdmin = new Subject<boolean>(); // to move data between components in admin control operation
  language = new BehaviorSubject(false); // to move data between components in language control operation

  constructor(private httpClient: HttpClient) {}

  //Observable method created to register
  postData(user) {
    const userUrl = 'http://localhost:3000/users';
    return this.httpClient.post(userUrl, { user });
  }

  //Observable method created to login
  getData() {
    return this.httpClient.get('http://localhost:3000/users/').pipe(
      map((responseData) => {
        let newArray = [];
        for (let key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            newArray.push(responseData[key]);
          }
        }
        return newArray;
      })
    );
  }
}
