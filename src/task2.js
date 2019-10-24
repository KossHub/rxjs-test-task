/**
 * #2: Detect when user is online and logged in using rxjs.
 *     Write a log “User is online and logged in”
 *     (online/offline status is used from above test.
 *     There is an observable called isUserLoggedIn$ will return
 *     value user is online true/false)
 */

import {fromEvent, of} from 'rxjs';
import {pluck} from 'rxjs/operators';

let switcher = document.getElementById('switcher');

function writeLog() {
  console.log('User is online and logged in');
}

fromEvent(switcher, 'change')
  .pipe(pluck('target', 'checked'))
  .subscribe(val=>val && writeLog());

let isUserLoggedIn$ = of(switcher.checked);
isUserLoggedIn$.subscribe(val=>val && writeLog());
