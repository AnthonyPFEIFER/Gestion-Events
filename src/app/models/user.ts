// Models
import { Group } from '../models/Group';

export interface User {
    id ?: number,
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    groups: Group[],
    events: any,
    base64 ?: string
}
