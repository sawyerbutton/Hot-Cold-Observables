import {Component, OnInit, Self} from '@angular/core';
import {TestService} from '../test.service';

@Component({
  selector: 'app-service-test',
  templateUrl: './service-test.component.html',
  styleUrls: ['./service-test.component.css'],
  providers: [TestService]
})
export class ServiceTestComponent implements OnInit {
  // @Self decorator will limit the service in component itself
  constructor(
    @Self() private testService: TestService
  ) { }

  ngOnInit() {
  }
}
