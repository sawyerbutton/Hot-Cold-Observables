import { Pipe, PipeTransform } from '@angular/core';
import {TestService} from './test.service';

@Pipe({
  name: 'testPipe'
})
export class TestPipe implements PipeTransform {
  constructor(
    private testService: TestService
  ) {}
  transform(value: any, args?: any): any {
    return value + ' awesome!';
  }

}
