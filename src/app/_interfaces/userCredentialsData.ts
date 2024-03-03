export interface commonData{
    id:string
    name:string
    email:string
    password:string
}

export interface userSignUpData{
    id:string
    name:string
    email:string
    password:string    
    userType:string
}

export interface userLoginData{
    email:string
    password:string
}