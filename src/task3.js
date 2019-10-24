/**
 * #3: You have a function getNumber(): Observable<number>,
 *     It use a Subject myNumber$ that adds a random number every 500ms.
 *     Please write a code to get list of number from that function
 *     when there is change each 2s (Please use rxjs)
 */

import {Observable} from 'rxjs';
import {bufferTime, map} from 'rxjs/operators';

let result = document.getElementById('task-3-result');

function getRndNum(max) {
  return Math.floor(1 + Math.random() * max);
}

function getNumber() {
  return Observable.create(observer=>{
    setInterval(()=>observer.next(getRndNum(100)), 500);
  });
}

getNumber()
  .pipe(
    map(val=>`<h3><b>${val}</b></h3>`),
    bufferTime(2000)
  )
  .subscribe(numbers=>result.innerHTML = numbers.join(''));
