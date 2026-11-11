/**
 * All landing-page copy and illustrative sample data live here, so components
 * stay presentational. Every record value is illustrative and is labelled as
 * such wherever it is rendered. No customer, order number or metric is shown.
 */

export const nav = [
  { href: "#workspace", label: "One record" },
  { href: "#workflow", label: "How it works" },
  { href: "#assistance", label: "AI assistance" },
] as const;

export const hero = {
  lines: ["A customer message", "becomes an order", "you can track."],
  lede: "Vendora is for social sellers and small teams who sell through chat. It keeps the conversation, the product variant, the stock count and the order in one record, from the first question to fulfilment.",
  cta: { href: "#workspace", label: "See how it works" },
  note: "In development. Account access is not open yet.",
} as const;

/** Illustrative sample record. Not a customer, not a live order. */
export const example = {
  label: "Example record",
  workspaceLabel: "Example workspace, illustrative",
  message: "Is the sand linen shirt in M still here? I’d like two.",
  item: "Linen shirt, Sand / M",
  asked: 2,
  onHand: 3,
  draftLine: "2 × Linen shirt, Sand / M",
  draftStatus: "Waiting for your review",
  fulfilmentNow: "Ready to pack",
  fulfilmentSteps: ["Confirmed", "Ready to pack", "Handed over"],
  rail: ["Conversations", "Products", "Orders"],
} as const;

export const workspace = {
  title: "Everything the sale needs lands in one record.",
  lede: "The message, the variant, the stock count and the draft order sit side by side. Nothing is retyped between chat, a spreadsheet and a notebook.",
} as const;

export const textile = {
  title: "The record points at a real variant.",
  body: "“The sand one, medium” is a specific item with a specific stock count. Vendora keeps the variant on the order, so the answer to “is it in stock?” comes from your catalogue.",
  caption: "Illustration drawn in CSS to stand in for a product photograph. Sample variant only.",
  tag: "Sand / M",
} as const;

export type StageId = "message" | "variant" | "draft" | "fulfilment";

export const workflow = {
  title: "Four steps from “is it in stock?” to packed.",
  stages: [
    {
      id: "message",
      who: "Customer",
      title: "Customer message",
      body: "They ask for an item, a size and a number. The message stays on the order.",
    },
    {
      id: "variant",
      who: "Vendora",
      title: "Product variant and stock",
      body: "The request is matched to a product variant and checked against the stock you hold.",
    },
    {
      id: "draft",
      who: "You",
      title: "Draft order",
      body: "The match becomes a draft order. Nothing is confirmed until you say so.",
    },
    {
      id: "fulfilment",
      who: "Your team",
      title: "Order fulfilment",
      body: "Once confirmed, the order carries its status forward with the conversation attached.",
    },
  ],
} as const satisfies { title: string; stages: readonly { id: StageId; who: string; title: string; body: string }[] };

export const assistance = {
  title: "AI drafts. You decide.",
  lede: "Vendora is being built so that AI reads the message and proposes the variant and quantity. Deterministic code checks the price, the stock and the total. Nothing changes until you confirm it.",
  rules: [
    ["Drafts, not decisions", "Suggestions stay drafts until a person confirms them."],
    ["Your numbers", "Prices, stock and totals come from your catalogue, never from the model."],
    ["Manual still works", "Records stay usable without AI."],
  ],
  note: "These are design rules for a product in development, not shipped features.",
} as const;

export const early = {
  title: "Early access is not open yet.",
  body: "This page has no sign-up form and collects nothing. Log in and Create account lead here until accounts exist.",
  cta: { href: "#workspace", label: "See how it works" },
} as const;

export const footer = {
  summary: "Conversation, variant and stock, human-reviewed draft order, fulfilment.",
  legal: "© 2026 Vendora. Product in development.",
} as const;
