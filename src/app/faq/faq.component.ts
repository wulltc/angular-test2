import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService
  )
  {

  }

  ngOnInit(): void
  {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

}
