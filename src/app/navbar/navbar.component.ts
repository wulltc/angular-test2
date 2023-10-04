import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void
  {
      if(screen.width<768)
      {
        document.getElementById('exchange_btnXs').click();
      }
      else
      {
        document.getElementById('exchange_btn').click();
      }

      if(screen.width>=1440)
      {
        document.getElementById('changeContainer1').classList.remove('container-fluid');
        document.getElementById('changeContainer1').classList.add('container');
      }
  }


  _chooseNav(element)
  {
    console.log(element)
    element.classList.add('hoverNavBtn')
  }
}
