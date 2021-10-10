import { Location } from './location'
import { Group } from './group'
import { User } from './user'

export interface Evenement {
    id?: number,
    name: string,
    date: Date,
    comment: string,
    type: string,
    author?: User,
    location?: Location,
    groups?: Group[],
    users?: User[]
}
