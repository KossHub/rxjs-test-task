import {Observable} from 'rxjs';
import {bufferTime} from 'rxjs/operators';

// get random number from 1 to max
function getRndNum(max) {
  return Math.floor(1 + Math.random() * max);
}

function getNumber() {
  return Observable.create(observer=>{
    setInterval(()=>observer.next(getRndNum(100)), 500);
  });
}

getNumber()
  .pipe(bufferTime(2000))
  .subscribe(numbers=>console.log(numbers.join(' ')));
