import { Component, TemplateRef, ViewChild } from '@angular/core';
import { product } from '../_interfaces/addProductData';
import { ApiService } from '../_api/api.service';
import { SellerServices } from '../_services/seller.service';
import { Router } from '@angular/router';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent {

  deleteSuccessMsg!:string;
  productList!: product[];
  sellerID!:string;
  trashIcon = faTrash;
  editIcon = faEdit;

  scrollTimer!:any;

  //TO EDIT A PRODUCT'S DETAIL
  @ViewChild('updateProductDetails', {static:true}) updateProductDetails!:TemplateRef<any>;
  private updateProductModalRef!:NgbModalRef;
  selectedProductId!:string;
  productName!:string;
  currentPrice!:number;
  currentDescription!:string;

  tempData!:any;

  constructor(private http:HttpClient, private apiService:ApiService,private sellerServices: SellerServices, private router:Router, private modalService:NgbModal){}

  ngOnInit(){
    this.sellerServices.sellerId$.subscribe({
      next:(data)=>{this.sellerID = data},
      error:()=>this.sellerID = ''
    });
    this.displayProducts();
  }

  displayProducts(){

    this.tempData = this.http.get(`http://localhost:3000/products?sellerId=${this.sellerID}`);
    console.log(this.tempData)

    this.apiService.getProductList(this.sellerID).subscribe({
      next:(data)=>{
        this.productList = data        
      },
      error:(error)=>{console.log(error)}
    })
  }

  deleteProduct(id:string){
    this.apiService.deleteProductAPI(id).subscribe({
      next:()=>{
        this.deleteSuccessMsg = 'Product deleted successfully!!';
        this.displayProducts();
        setTimeout(()=>{
          this.deleteSuccessMsg = '';
        },2000)
      },
      error:(error)=>{console.log(error)}
    })    
  }

  //TO EDIT
  openUpdateProductDialog(updateProductDetails:any,selectedProduct:product){
    this.updateProductModalRef = this.modalService.open(updateProductDetails);
    this.selectedProductId = selectedProduct.id;
    this.productName = selectedProduct.name
    this.currentPrice = selectedProduct.price;
    this.currentDescription = selectedProduct.description;
  }
  closeUpdateProductDialog(){
    if(this.updateProductModalRef){
      this.updateProductModalRef.close();
    }
  }
  submitUpdatedData(){
    const postData = {"price":this.currentPrice, "description":this.currentDescription};
    this.apiService.editProductDetails(this.selectedProductId, postData).subscribe({
      next:()=>{
        this.displayProducts();
        this.closeUpdateProductDialog();
      },
      error:(error)=>{console.log(error)}
    })
  }

  // onScroll(){
  //   clearTimeout(this.scrollTimer);
  //   console.log('ss')
  //   this.scrollTimer = setTimeout(()=>{
  //     const element = document.querySelector('.scrollable-container');
  //     if(element && element?.scrollHeight - element?.scrollTop <=element?.clientHeight + 10){
  //       console.log('pavan')
  //     }
  //   })
  // }

  // onScroll(){ ?_start=13&_end=25
  //   clearTimeout(this.scrollTimer);
  //   this.scrollTimer = setTimeout(()=>{
  //     const element = document.querySelector('.scrollable-container');
  //     if (element && element?.scrollHeight - element?.scrollTop <= element?.clientHeight + 10) {
  //       this.currentPageNumber++;
  //       this.getReimbursementEligibleCSAPI(this.pageSizeLimit,this.currentPageNumber);
  //     }
  //   },250)
  // }
}
