import { z } from "zod";

export const kaosKakiSchema = z.object({
  nama: z.string().min(3, "Nama produk minimal 3 karakter"),
  mesin: z.string().min(1, "Pilih jenis mesin terlebih dahulu"),
  bahan: z.string().min(1, "Pilih bahan terlebih dahulu"),

  variasi: z
    .array(
      z.object({
        warna: z.string().min(1, "Warna wajib dipilih"),
        ukuran: z.string().min(1, "Ukuran wajib dipilih"),
      })
    )
    .min(1, "Minimal 1 variasi diperlukan"),

  foto: z
    .array(z.instanceof(File))
    .min(1, "Upload minimal 1 foto")
    .max(5, "Maksimal 5 foto")
    .refine(
      (files) => {
        return files.every((file) => file.size <= 5 * 1024 * 1024); // 5MB
      },
      { message: "Setiap foto maksimal 5MB" }
    )
    .refine(
      (files) => {
        return files.every((file) =>
          ["image/jpeg", "image/png", "image/webp"].includes(file.type)
        );
      },
      { message: "Hanya boleh upload file JPG, PNG, atau WebP" }
    ),
});

export type KaosKakiFormValues = z.infer<typeof kaosKakiSchema>;