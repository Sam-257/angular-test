export class Event{
    sno: number
    title: string
    description: string
    active: boolean
    //I've added "strictPropertyInitialization": false after strict in tsconfig.json.
    // Can also use sno!: number instead
}