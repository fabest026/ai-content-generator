import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

// Define the structure of the aiOuput table using Drizzle schema
export const aiOuput = pgTable("aiOuput", {
    id: serial("id").primaryKey(), // Auto-incrementing primary key
    formData: text("formData").notNull(), // Save form data as text
    aiResponse: text("aiResponse"), // AI response as text
    templateSlug: varchar("templateSlug", { length: 255 }).notNull(), // Template slug as varchar
    createdBy: varchar("createdBy", { length: 255 }).notNull(), // Created by user email
    createdAt: varchar("createdAt", { length: 255 }) // Creation date
});
