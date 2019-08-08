import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition, group, query, animateChild } from '@angular/animations';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  animations: [
    trigger('bodyAnimation', [
      state('compact', style({marginLeft: '75px'})),
      state('expand', style({marginLeft: '225px'})),
      state('mobileCompact', style({marginLeft: '50px'})),
      state('mobileExpand', style({marginLeft: '200px'})),
      transition('* <=> *', [
          animate('.2s')
      ]),
    ]),
  ]
})
export class BodyComponent implements OnInit {
  visibleState = 'compact';
  innerWidth: any;

  constructor() { }

  ngOnInit() {

    this.innerWidth = window.innerWidth;
    if(this.innerWidth >= 767){
      this.visibleState = 'compact'
    }else{
      this.visibleState = 'mobileCompact'
    }

    var navButton = document.querySelector('.nav-click');
    navButton.addEventListener('click', () => {
      if(innerWidth > 767){
        this.visibleState = this.visibleState == 'compact' ? 'expand' : 'compact';
      }else{
        this.visibleState = this.visibleState == 'mobileCompact' ? 'mobileExpand' : 'mobileCompact';
      }
    });

    document.querySelector('.main').addEventListener('touchstart', function(event){
    if( this.scrollTop === 0 ) {
        this.scrollTop += 1;
    } else if( this.scrollTop + this.offsetHeight >= this.scrollHeight ) {
        this.scrollTop -= 1;
    }
  });

  }

}
