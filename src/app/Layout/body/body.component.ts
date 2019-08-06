import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, group, query, animateChild } from '@angular/animations';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  animations: [
    trigger('bodyAnimation', [
      state('compact', style({paddingLeft: '75px'})),
      state('expand', style({paddingLeft: '225px'})),
      transition('compact <=> expand', [
          animate('.2s')
      ])
    ]),
  ]
})
export class BodyComponent implements OnInit {
  visibleState = 'compact';

  constructor() { }

  ngOnInit() {
    var navButton = document.querySelector('.nav-click');
    navButton.addEventListener('click', () => {
      this.visibleState = this.visibleState == 'compact' ? 'expand' : 'compact';
    });
  }

}
