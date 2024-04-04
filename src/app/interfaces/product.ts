export interface Product{
    id:number;
    image_url:string
    title:string;
    authors:string;
    edition:string;
    price:number;
    quantity:number;
    subtotal?: number
}