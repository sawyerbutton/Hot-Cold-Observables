import {Injectable, OnDestroy} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService implements OnDestroy{

  constructor() {
    console.log('test service is construct');
  }

  ngOnDestroy() {
    console.log('test service is destroy');
  }

}
