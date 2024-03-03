export interface product{
    id:string
    sellerId:string
    name:string
    price:number
    color:string
    description:string
    image:string
    quantity:number
    productId?:string
}

export interface cart{
    id?:string
    sellerId:string
    name:string
    price:number
    color:string
    description:string
    image:string
    quantity:number
    userId:string
    productId:string
}

export interface priceSummary{
    price:number
    deliveryCharge:number
    total:number
}

export interface orders{
    id:string
    userId:string
    address:string
    email:string
    contact:string
    totalPayment:number
    paymentMethod:string
}

