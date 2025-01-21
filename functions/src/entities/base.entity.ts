import { Timestamp } from 'firebase-admin/firestore';

export abstract class BaseEntity {
  constructor(
    public id: string,
    public createdAt: Timestamp,
    public updatedAt: Timestamp,
  ) {}

  abstract toJson(): Record<string, any>;
}
