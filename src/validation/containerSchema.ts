import { z } from "zod";

export const containerSchema = z.object({
  containerName: z
    .string()
    .max(14, "Container name should not exceed 14 characters")
    .nonempty("Container name is required"),
});
