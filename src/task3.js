/**
 * #3: You have a function getNumber(): Observable<number>,
 *     It use a Subject myNumber$ that adds a random number every 500ms.
 *     Please write a code to get list of number from that function
 *     when there is change each 2s (Please use rxjs)
 */

import {bufferTime, map} from 'rxjs/operators';
import {interval} from 'rxjs';

let result = document.getElementById('task-3-result');

function getRndNum(max) {
  return Math.floor(1 + Math.random() * max);
}

function getNumber() {
  return interval(500).pipe(map(()=>getRndNum(100)));
}

getNumber()
  .pipe(
    map(val=>`<h3>${val}</h3>`),
    bufferTime(2000)
  )
  .subscribe(numbers=>result.innerHTML = numbers.join(''));
