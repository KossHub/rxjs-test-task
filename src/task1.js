/**
 * #1: Create a long polling with Rxjs.
 *     Detect when online will start polling, when offline stop polling.
 *     (Subscribe change online/offline using rxjs.
 *     Write a function called getOnlineStatus(): Observable<boolean>)
 */

import {ajax} from 'rxjs/ajax';
import {fromEvent, of, timer} from 'rxjs';
import {pluck} from 'rxjs/operators';

const URL = 'https://httpbin.org/delay/2';
let switcher = document.getElementById('switcher');

function getOnlineStatus() {
  return of(switcher.checked);
}

function createLongPolling() {
  switcher.checked && ajax(URL).subscribe(
    data=>{
      console.log('Data:', data);
      createLongPolling();
    },
    err=>{
      console.log('Error', err);
      timer(500).subscribe(()=>createLongPolling());
    }
  );
}

fromEvent(switcher, 'change')
  .pipe(pluck('target', 'checked'))
  .subscribe(val=>val && createLongPolling());

getOnlineStatus().subscribe(val=>val && createLongPolling());
