import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  leads: defineTable({
    id: v.string(),
    name: v.string(),
    brand: v.string(),
    help_with: v.array(v.string()),
    about_brand: v.string(),
    not_working: v.string(),
    personality: v.array(v.string()),
    vibe_links: v.string(),
    budget: v.string(),
    timeline: v.string(),
    email: v.string(),
    phone: v.string(),
    company: v.string(),
    designation: v.string(),
    created_at: v.string(),
  }).index("by_created_at", ["created_at"]),
});