import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-apparel-discount',
  templateUrl: './apparel-discount.component.html',
  styleUrls: ['./apparel-discount.component.scss']
})
export class ApparelDiscountComponent {

  @Input() type!:string;
  @Input() color!:string;

  constructor(){}
}
