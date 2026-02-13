import { z } from "zod";

export const kaosKakiSchema = z.object({
  id: z.number().optional(),
  nama_kaos: z.string().min(3, "Nama kaos minimal 3 karakter"),
  mesin: z.array(z.string()).min(1, "Pilih setidaknya 1 mesin"),
  bahan: z.string().min(1, "Bahan wajib diisi"),
});

export type KaosKaki = z.infer<typeof kaosKakiSchema>;
