import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, group, query, animateChild } from '@angular/animations';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  animations: [
    trigger('sideBarAnimation', [
      state('compact', style({width: '50px'})),
      state('expand', style({width: '200px'})),
      transition('compact <=> expand', [
        group([
          query('@linkAnimation', animateChild()),
          animate('.2s')
        ]),
        query('@titleAnimation', animateChild())
      ])
    ]),
    trigger('linkAnimation', [
      state('compact', style({width: '35px', paddingLeft: '15px'})),
      state('expand', style({width: '180px', paddingLeft: '20px'})),
      transition('compact <=> expand', [animate('.2s')])
    ]),
    trigger('titleAnimation', [
      state('compact', style({ opacity: 0, fontSize: '0px'})),
      state('expand', style({ opacity: 1, fontSize: '15px'})),
      transition('* => expand', [animate('.2s')])
    ]),
  ]
})
export class SideBarComponent implements OnInit {
  visibleState = 'compact';

  constructor() { }

  ngOnInit() {
    var navButton = document.querySelector('.nav-click');
    navButton.addEventListener('click', () => {
      this.visibleState = this.visibleState == 'compact' ? 'expand' : 'compact';
    });
  }

}
