import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService
  )
  {

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  ngOnInit(): void {
  }

}
