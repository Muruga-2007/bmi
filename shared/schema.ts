import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table - stores user profile information
export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  age: integer("age").notNull(),
  gender: text("gender").notNull(), // 'male', 'female', 'other'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// BMI Records table - stores historical BMI calculations
export const bmiRecords = pgTable("bmi_records", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id),
  height: decimal("height", { precision: 5, scale: 2 }).notNull(), // in cm
  weight: decimal("weight", { precision: 5, scale: 2 }).notNull(), // in kg
  bmi: decimal("bmi", { precision: 4, scale: 2 }).notNull(),
  category: text("category").notNull(), // 'underweight', 'normal', 'overweight', 'obese'
  activityLevel: text("activity_level").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  bmiRecords: many(bmiRecords),
}));

export const bmiRecordsRelations = relations(bmiRecords, ({ one }) => ({
  user: one(users, {
    fields: [bmiRecords.userId],
    references: [users.id],
  }),
}));

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users, {
  age: z.number().min(1).max(120),
  gender: z.enum(["male", "female", "other"]),
}).omit({
  id: true as any,
  createdAt: true as any,
});

export const insertBmiRecordSchema = createInsertSchema(bmiRecords, {
  height: z.string().or(z.number()),
  weight: z.string().or(z.number()),
  bmi: z.string().or(z.number()),
  category: z.enum(["underweight", "normal", "overweight", "obese"]),
}).omit({
  id: true as any,
  createdAt: true as any,
});

// TypeScript types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBmiRecord = z.infer<typeof insertBmiRecordSchema>;
export type BmiRecord = typeof bmiRecords.$inferSelect;
