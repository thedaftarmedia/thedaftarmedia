import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

http.route({
  path: "/api",
  method: "GET",
  handler: httpAction(async () => jsonResponse({ message: "Daftar Media API" })),
});

http.route({
  path: "/api/leads",
  method: "OPTIONS",
  handler: httpAction(async () => new Response(null, { status: 204, headers: corsHeaders })),
});

http.route({
  path: "/api/leads",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      if (!body || typeof body.name !== "string" || !body.name.trim() || typeof body.email !== "string" || !body.email.trim()) {
        return jsonResponse({ error: "name and email are required" }, 400);
      }

      const lead = await ctx.runMutation(internal.leads.create, {
        name: body.name.trim(),
        brand: body.brand || "",
        help_with: Array.isArray(body.help_with) ? body.help_with : [],
        about_brand: body.about_brand || "",
        not_working: body.not_working || "",
        personality: Array.isArray(body.personality) ? body.personality : [],
        vibe_links: body.vibe_links || "",
        budget: body.budget || "",
        timeline: body.timeline || "",
        email: body.email.trim(),
        phone: body.phone || "",
        company: body.company || "",
        designation: body.designation || "",
      });

      return jsonResponse(lead, 201);
    } catch (error) {
      console.error("Failed to create lead", error);
      return jsonResponse({ error: "Unable to save lead" }, 400);
    }
  }),
});

http.route({
  path: "/api/leads",
  method: "GET",
  handler: httpAction(async (ctx) => {
    const leads = await ctx.runQuery(internal.leads.list, {});
    return jsonResponse(leads);
  }),
});

export default http;