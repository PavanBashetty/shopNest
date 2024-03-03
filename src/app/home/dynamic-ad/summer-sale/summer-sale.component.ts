import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summer-sale',
  templateUrl: './summer-sale.component.html',
  styleUrls: ['./summer-sale.component.scss']
})
export class SummerSaleComponent {

  @Input() item!:string;
  @Input() color!:string;

  constructor(){}
}
