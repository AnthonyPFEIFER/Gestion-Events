import { Evenement } from "./evenement"
import { File } from './file';

export interface Location {
    id?: number;
    name: string;
    adress: string;
    city: string;
    events?: Evenement[];
    phone?: string;
    images: File[];
}
