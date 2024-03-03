import { Component } from '@angular/core';
import { ApiService } from 'src/app/_api/api.service';

@Component({
  selector: 'app-product-widget',
  templateUrl: './product-widget.component.html',
  styleUrls: ['./product-widget.component.scss']
})
export class ProductWidgetComponent {

  products!:any[];
  constructor(private apiService: ApiService){}

  ngOnInit(){}
}
