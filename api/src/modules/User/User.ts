import { UUID } from 'crypto';

export interface User {
  id: UUID;
  name: string;
  email: string;
  password_hash?: string;
  admin?: boolean;
}
