import { internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

const leadFields = {
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
};

export const create = internalMutation({
  args: leadFields,
  handler: async (ctx, input) => {
    const lead = {
      id: crypto.randomUUID(),
      ...input,
      created_at: new Date().toISOString(),
    };

    await ctx.db.insert("leads", lead);
    return lead;
  },
});

export const list = internalQuery({
  args: {},
  handler: async (ctx) => {
    const leads = await ctx.db
      .query("leads")
      .withIndex("by_created_at")
      .order("desc")
      .take(1000);

    return leads.map(({ _id, _creationTime, ...lead }) => lead);
  },
});