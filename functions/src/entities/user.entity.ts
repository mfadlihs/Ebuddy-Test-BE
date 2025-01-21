import { DocumentData, Timestamp } from 'firebase-admin/firestore';
import { BaseEntity } from './base.entity';
import TimestampFormatter from '../utils/timestampFormatter';

export interface UserEntityJson {
  id: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export class UserEntitiy extends BaseEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public address: string,
    public phoneNumber: string,
    public createdAt: Timestamp,
    public updatedAt: Timestamp,
  ) {
    super(id, createdAt, updatedAt);
  }

  static fromJson(json: DocumentData): UserEntitiy {
    if (
      !json.id ||
      !json.name ||
      !json.email ||
      !json.address ||
      !json.phoneNumber ||
      !json.createdAt ||
      !json.updatedAt
    ) {
      throw new Error('Invalid data for User entity');
    }
    return new UserEntitiy(
      json.id,
      json.name,
      json.email,
      json.address,
      json.phoneNumber,
      json.createdAt,
      json.updatedAt,
    );
  }

  toJson(): UserEntityJson {
    const createdAt = TimestampFormatter.formatTimestamp(this.createdAt);
    const updatedAt = TimestampFormatter.formatTimestamp(this.updatedAt);

    return {
      id: this.id,
      name: this.name,
      email: this.email,
      address: this.address,
      phoneNumber: this.phoneNumber,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };
  }
}
