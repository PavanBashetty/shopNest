import { Component } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { AdService } from 'src/app/_services/ad.service';
import { FooterComponent } from 'src/app/footer/footer.component';

@Component({
  selector: 'app-dynamic-ad',
  templateUrl: './dynamic-ad.component.html',
  styleUrls: ['./dynamic-ad.component.scss']
})
export class DynamicAdComponent {

  public comp = FooterComponent;
  public adList!: any[];
  public currentAdIndex:number = 1;
  public adIntervalSubscription!:Subscription;

  constructor(private adService:AdService){}
  ngOnInit(){
    this.adList = this.adService.getAds();
    this.startAdInterval();
  }

  get currentAd(){    
    return this.adList[this.currentAdIndex-1];
  }

  displayNextAd(){
    this.currentAdIndex == this.adList.length ? this.currentAdIndex = 1 : this.currentAdIndex++
  }

  startAdInterval(){
    this.adIntervalSubscription = interval(3000).subscribe(()=>{      
      this.displayNextAd()})
  }

  stopAdInterval(){
    if(this.adIntervalSubscription){this.adIntervalSubscription.unsubscribe()}
  }

  ngOnDestroy(){
    this.stopAdInterval();
  }
}
