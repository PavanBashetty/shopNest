import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class UserServices{

    //An observable to store UserID
    private userIdSubject = new BehaviorSubject<string>('');
    public userId$ = this.userIdSubject.asObservable();
    storeUserId(userId:string){
        this.userIdSubject.next(userId);
    }
}