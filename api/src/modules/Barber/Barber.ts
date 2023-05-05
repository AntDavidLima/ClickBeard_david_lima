import { UUID } from 'crypto';

export interface Barber {
  id: UUID
  name: string
  age: number
  hiring_date: Date
}
