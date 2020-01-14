import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription;

  constructor() { }

  ngOnInit() {
    /* this.subscription = interval(1000).subscribe((count) => {
      console.log(count);
    }); */
    let customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count++);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(
            new Error('Count is greater than 3!')
          );
        }
      }, 1000);
    });

    customIntervalObservable = customIntervalObservable.pipe(map((data: number) => {
      return 'Round: ' + (data + 1);
    }));

    this.subscription = customIntervalObservable.subscribe(data => {
      console.log(data);
    }, error => {
      alert(error.message);
    }, () => {
      console.log('Completed!')
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
