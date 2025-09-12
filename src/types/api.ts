// src/types/api.ts
export interface JenisBahan {
  id: number;
  nama: string;
  kode_bahan: string;
  status: number;
}

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface KaosKaki {
  id: number;
  nama: string;
  jenis_bahan_id: number;
  keterangan: string;
  last_order_date: string | null; // bisa null
  kode_kaos_kaki?: string; // optional kalau backend beda nama
  status: number | null;
  createdAt: string;
  updatedAt: string;
  jenis_bahan: JenisBahan; // objek bukan array
  images: string[]; // array path/url
  mesin: string[]; // array nama mesin
}

export interface KaosKakiListResponse {
  success: boolean;
  message: string;
  data: {
    kaosKakiList: KaosKaki[];
    pagination: Pagination;
  };
}

export interface KaosKakiDetailResponse {
  success: boolean;
  message: string;
  data: {
    kaosKaki: KaosKaki;
  };
}
