/**
 * #1: Create a long polling with Rxjs.
 *     Detect when online will start polling, when offline stop polling.
 *     (Subscribe change online/offline using rxjs.
 *     Write a function called getOnlineStatus(): Observable<boolean>)
 */

import {ajax} from 'rxjs/ajax';
import {fromEvent, of, timer} from 'rxjs';
import {pluck, tap} from 'rxjs/operators';

const URL = 'https://httpbin.org/delay/2';
let switcher = document.getElementById('switcher')
let isUserLoggedIn = switcher.checked;

function getOnlineStatus() {
  return of(isUserLoggedIn);
}

function createLongPolling() {
  isUserLoggedIn && ajax(URL).subscribe(
    data=>{
      isUserLoggedIn && console.log('Data:', data);
      createLongPolling();
    },
    err=>{
      isUserLoggedIn && console.log('Error', err);
      timer(500).subscribe(()=>createLongPolling());
    }
  );
}

fromEvent(switcher, 'change')
  .pipe(
    pluck('target', 'checked'),
    tap(val=>isUserLoggedIn = val)
  )
  .subscribe(val=>val && createLongPolling());

getOnlineStatus().subscribe(val=>val && createLongPolling());
