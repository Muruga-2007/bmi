// Using the javascript_database blueprint
import { users, bmiRecords, type User, type InsertUser, type BmiRecord, type InsertBmiRecord } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // BMI Record operations
  createBmiRecord(record: InsertBmiRecord): Promise<BmiRecord>;
  getUserBmiHistory(userId: number): Promise<BmiRecord[]>;
  getLatestBmiRecord(userId: number): Promise<BmiRecord | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser as any)
      .returning();
    return user;
  }

  async createBmiRecord(record: InsertBmiRecord): Promise<BmiRecord> {
    const [bmiRecord] = await db
      .insert(bmiRecords)
      .values(record as any)
      .returning();
    return bmiRecord;
  }

  async getUserBmiHistory(userId: number): Promise<BmiRecord[]> {
    return db
      .select()
      .from(bmiRecords)
      .where(eq(bmiRecords.userId, userId))
      .orderBy(desc(bmiRecords.createdAt));
  }

  async getLatestBmiRecord(userId: number): Promise<BmiRecord | undefined> {
    const [record] = await db
      .select()
      .from(bmiRecords)
      .where(eq(bmiRecords.userId, userId))
      .orderBy(desc(bmiRecords.createdAt))
      .limit(1);
    return record || undefined;
  }
}

export const storage = new DatabaseStorage();
