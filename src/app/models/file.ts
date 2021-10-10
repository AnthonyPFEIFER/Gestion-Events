import { Location } from './location'

export interface File {
    id? : number,
    type: string,
    name: string,
    picByte: string,
    location? : Location
}