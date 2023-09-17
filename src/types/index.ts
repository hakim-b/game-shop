import { z } from "zod";

const vgSchema = z.object({
  id: z.string().uuid(),
  price: z.number().nonnegative(),
  title: z.string(),
  desc: z.string(),
  thumbnail: z.string(),
});

export type Game = z.infer<typeof vgSchema>;
