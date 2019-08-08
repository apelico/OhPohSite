import { Component } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OhPoh';

  constructor(private router: Router) {

    this.router.events.subscribe((event: Event) => {
        var body = document.querySelector('.main');
        body.scrollTop = 0;
    });

}
}
