import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserServices } from "../_services/user.service";
import { userSignUpData } from "../_interfaces/userCredentialsData";


@Injectable({
    providedIn:'root'
})
export class UserAuthService{

    private apiURL:string ='http://localhost:3000';
    isUserSignedUp:boolean = false;

    constructor(private http:HttpClient, private router:Router, private userServices:UserServices){}

    userSignUp(newUserData:userSignUpData){
        this.http.post<any>(`${this.apiURL}/user`,newUserData).subscribe({
            next:(result)=>{
                this.userServices.storeUserId(result.id);
                this.isUserSignedUp = true;
                let resultArray = [result];
                localStorage.setItem('user', JSON.stringify(resultArray));
                this.router.navigate(['userHome']);
            },
            error:(error)=>{
                this.isUserSignedUp = false;
                console.log(error)
            }
        })
    }

    reloadUser(){
        if(localStorage.getItem('user')){
            this.isUserSignedUp = true;
            this.router.navigate(['userHome']);
        }
    }
}