/**
 * #4: Writing a code that get value from one input on change
 *     and use that value for a function called
 *     searchMessages(keyword: string): Observable<Message[]>
 *     When we receive data from that function.
 *     Please display the messages list in the UI using change detection
 */

import {filter, map, pluck, tap} from 'rxjs/operators';
import {from, fromEvent} from 'rxjs';

let data = ['apple', 'pineapple', 'orange', 'banana', 'grapefruit', 'lemon'];
let input = document.getElementById('main-input');
let result = document.getElementById('task-4-result');

document.getElementById('task-4-data').innerHTML = data.join(', ');

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
    pluck('target', 'value'),
    tap(()=>{
      input.value = '';
      result.innerHTML = '';
    })
  )
  .subscribe(val=>displayResult(searchMessages(val)));
