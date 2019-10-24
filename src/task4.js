import {fromEvent, from} from 'rxjs';
import {map, tap} from 'rxjs/operators';

let data = ['abc', 'bc2', 'c', 'abcd', 'ea'];
let input = document.getElementById('main-input');
let result = document.getElementById('result');

function searchMessages(message) {
  return data.filter(item=>~item.indexOf(message));
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
  ).subscribe(val=>displayResult(searchMessages(val)));
