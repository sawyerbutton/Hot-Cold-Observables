///<reference path="../../node_modules/rxjs/internal/operators/share.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {ConnectableObservable, interval, Observable, of} from 'rxjs';
import {map, publish, publishLast, refCount, share, shareReplay, take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  contacts$: any;
  contacts2$: any;
  configUrl = 'assets/contacts.json';
  loading = true;
  show = false;
  show2 = false;
  content = 'hello is me';
  constructor (private http: HttpClient) {
    // too hot observable, second subscriber can not get data from Observable
    // this.contacts$ = http.get(this.configUrl).pipe(publish(), refCount());
    // 生成的Observable以第一个订阅者的数据为基准
    // this.contacts$ = http.get(this.configUrl).pipe(publishLast(), refCount());
    // publish() + refCount() = share()
    // this.contacts$ = http.get(this.configUrl).pipe(share());
    this.contacts$ = http.get(this.configUrl).pipe(shareReplay(1));
    // publishReplay(1) + refCount() = shareReplay(1)
    setTimeout(() => this.contacts2$ = this.contacts$, 1000);
    this.loading = false;
  }
  ngOnInit() {
    const obs = Observable.create(observer => observer.next(1));
    obs.subscribe(value => {
      console.log('1st subscriber:' + value);
    });
    obs.subscribe(value => {
      console.log('2nd subscriber:' + value);
    });
    // Observable emit dynamic time to demonstrate this is a cold observable
    //
    const obs2 = Observable.create(observer => observer.next(Date.now()));
    // if you use of(Date.now()) to fulfill the same function you will not get the expected answer
    // which means of operator's under source is different with create operator
    obs2.subscribe(value => {
      console.log('3rd subscriber:' + value);
    });
    obs2.subscribe(value => {
      console.log('4th subscriber:' + value);
    });
    // use publish operator to transfer cold one to half cold half hot
    const obs3 = Observable.create(observer => observer.next(Date.now())).pipe(publish());
    obs3.subscribe(value => {
      console.log('5th subscriber:' + value);
    });
    obs3.subscribe(value => {
      console.log('6th subscriber:' + value);
    });
    obs3.connect();
    // what if put the connect as a operator before subscribe, there will be no response
    // since obs4 is a totally hot observable no matter anyone listen to it
    const obs4 = Observable.create(observer => observer.next(Date.now())).pipe(publish())
    obs4.connect();
    obs4.subscribe(value => {
      console.log('7th subscriber:' + value);
    });
    obs4.subscribe(value => {
      console.log('8th subscriber:' + value);
    });
    console.log('==========================');
    // const obs5 = interval(1000).pipe(publish(), refCount());
    const obs5 = interval(1000).pipe(take(10), publish()) as ConnectableObservable<number>;
    obs5.connect();
    // obs5.subscribe(v => console.log('1st subscriber:' + v));
    // // delay for a little more than a second and then add second subscriber
    // setTimeout(() => obs5.subscribe(v => console.log('2nd subscriber:' + v)), 1100);
    setTimeout(() => {
      // delay both subscriptions by 2 seconds
      obs5.subscribe(v => console.log('1st subscriber:' + v));
      setTimeout(
        // delay for a little more than a second and then add second subscriber
        () => obs5.subscribe(
          v => console.log('2nd subscriber:' + v)), 1100);

    }, 2000);
  }
}
