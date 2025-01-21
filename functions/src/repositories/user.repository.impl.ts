import {
  CollectionReference,
  DocumentSnapshot,
  Firestore,
} from 'firebase-admin/firestore';
import {
  CreateUserDto,
  GetUserByEmailDto,
  GetUserByIdDto,
  UpdateUserByIdDto,
} from '../dtos';
import { UserEntitiy } from '../entities';
import { IUserRepository } from '../repositories';
import { AppError } from '../errors';
import TimestampFormatter from '../utils/timestampFormatter';

export class UserRepositoryImpl implements IUserRepository {
  private readonly dbRef: CollectionReference;
  constructor(private readonly db: Firestore, private readonly dbPath: string) {
    this.dbRef = this.db.collection(this.dbPath);
  }

  async create(dto: CreateUserDto): Promise<UserEntitiy> {
    const { address, email, name, phoneNumber } = dto;
    const currentTimestamp = TimestampFormatter.currentTimestamp();

    const userRef = await this.dbRef.add({
      address,
      email,
      name,
      phoneNumber,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    });
    await userRef.update({ id: userRef.id });
    const user = await userRef.get();

    return UserEntitiy.fromJson(user.data()!);
  }

  async delete(dto: GetUserByIdDto): Promise<UserEntitiy> {
    const { id } = dto;
    const userRef = await this.getUserById(id);

    await userRef.ref.delete();

    return UserEntitiy.fromJson(userRef.data()!);
  }

  async getAll(): Promise<UserEntitiy[]> {
    const userRef = (await this.dbRef.get()).docs;
    return userRef.map((e) => UserEntitiy.fromJson(e.data()));
  }

  async getById(dto: GetUserByIdDto): Promise<UserEntitiy> {
    const { id } = dto;
    const userRef = await this.getUserById(id);

    return UserEntitiy.fromJson(userRef.data()!);
  }

  async getByEmail(dto: GetUserByEmailDto): Promise<UserEntitiy> {
    const { email } = dto;
    const userRef = await this.dbRef.where('email', '==', email).get();
    if (userRef.empty) {
      throw AppError.notFound({
        message: `User with email ${email} not found`,
      });
    }

    return UserEntitiy.fromJson(userRef.docs[0]?.data());
  }

  async update(dto: UpdateUserByIdDto): Promise<UserEntitiy> {
    const { id, address, name, phoneNumber } = dto;
    const currentTimestamp = TimestampFormatter.currentTimestamp();
    const userRef = await this.getUserById(id);

    const updateData: Partial<UserEntitiy> = {
      updatedAt: currentTimestamp,
      ...(address && { address }),
      ...(name && { name }),
      ...(phoneNumber && { phoneNumber }),
    };

    await userRef.ref.update(updateData);
    const updatedDoc = await userRef.ref.get();

    return UserEntitiy.fromJson(updatedDoc.data()!);
  }

  /**
   * Boolean condition email is taken or not
   *
   * @param {GetUserByEmailDto} dto - dto
   * @returns
   */
  async checkDupplicateEmail(dto: GetUserByEmailDto): Promise<boolean> {
    const { email } = dto;
    const userRef = await this.dbRef.where('email', '==', email).get();

    return !userRef.empty;
  }

  /**
   * Function helper for check existing users
   *
   * @param {string} id - User id
   * @returns DocumentSnapshot (Firebase reference)
   */
  private async getUserById(id: string): Promise<DocumentSnapshot> {
    const userRef = await this.dbRef.doc(id).get();
    if (!userRef.exists) {
      throw AppError.notFound({ message: `User with id ${id} not found` });
    }
    return userRef;
  }
}
