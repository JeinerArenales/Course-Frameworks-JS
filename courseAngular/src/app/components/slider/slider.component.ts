import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() name: string = '';
  @Input() size: string = 'big';

  constructor() { }

  ngOnInit(): void {
  }

}
