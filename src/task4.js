/**
 * #4: Writing a code that get value from one input on change
 *     and use that value for a function called
 *     searchMessages(keyword: string): Observable<Message[]>
 *     When we receive data from that function.
 *     Please display the messages list in the UI using change detection
 */

import {from, fromEvent} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';

let data = ['apple', 'pineapple', 'orange', 'banana', 'grapefruit'];
let input = document.getElementById('main-input');
let result = document.getElementById('task-4-result');

function searchMessages(message) {
  return from(data).pipe(filter(item=>~item.indexOf(message)));
}

function displayResult(data) {
  from(data)
  .pipe(map(val=>`<h4>${val}</h4>`))
  .subscribe(html=>result.insertAdjacentHTML('beforeend', html));
}

fromEvent(input, 'change')
  .pipe(
    map(e=>e.target.value),
    tap(()=>{
      input.value = '';
      result.innerHTML = '';
    })
  )
  .subscribe(val=>displayResult(searchMessages(val)));
