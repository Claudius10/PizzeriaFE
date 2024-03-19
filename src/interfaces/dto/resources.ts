import {AddressDTO} from "./order";

export type OfferDTO = {
    id: number;
    image: string;
    name: string;
    description: string;
    caveat: string;
}

export type StoreDTO = {
    id: number;
    name: string;
    address: AddressDTO;
    phoneNumber: number;
    schedule: string;
}

export type ProductDTO = {
    id: number;
    productType: string;
    image: string;
    name: string;
    description: string;
    price: number;
    format: string;
}