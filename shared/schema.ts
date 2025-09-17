import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const experiences = pgTable("experiences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  location: text("location").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("originalPrice", { precision: 10, scale: 2 }),
  rating: decimal("rating", { precision: 3, scale: 1 }).notNull().default("4.5"),
  reviewCount: integer("reviewCount").notNull().default(0),
  duration: text("duration").notNull(),
  groupSize: text("groupSize").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  featured: boolean("featured").notNull().default(false),
  description: text("description"),
  inclusions: json("inclusions").$type<string[]>(),
  exclusions: json("exclusions").$type<string[]>(),
  highlights: json("highlights").$type<string[]>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  experienceId: varchar("experienceId").notNull().references(() => experiences.id),
  customerName: text("customerName").notNull(),
  customerEmail: text("customerEmail").notNull(),
  customerPhone: text("customerPhone").notNull(),
  bookingDate: timestamp("bookingDate").notNull(),
  guests: integer("guests").notNull(),
  totalAmount: decimal("totalAmount", { precision: 10, scale: 2 }).notNull(),
  specialRequests: text("specialRequests"),
  status: text("status").notNull().default("pending"), // pending, confirmed, cancelled, completed
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertExperienceSchema = createInsertSchema(experiences).omit({
  id: true,
  createdAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  totalAmount: true, // This will be calculated on the server
}).extend({
  bookingDate: z.string().transform((str) => new Date(str)),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type Experience = typeof experiences.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;