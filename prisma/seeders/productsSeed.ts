export type Product = {
  name: string;
  slug: string;
  price: number;
  description: string;
  stock: number;
  sold: number;
  images?: { imageUrl: string }[];
}[];

export const products: Product = [
  {
    name: "Plakat",
    slug: "plakat",
    price: 125000,
    description: "Salah satu jenis ikan cupang yang paling banyak digemari",
    stock: 60,
    sold: 8,
    images: [
      {
        imageUrl:
          "https://down-id.img.susercontent.com/file/sg-11134201-22120-5d3pk7upjzkv4e",
      },
      {
        imageUrl:
          "https://down-id.img.susercontent.com/file/sg-11134201-22110-3cscspjhw3jv95",
      },
      {
        imageUrl:
          "https://down-id.img.susercontent.com/file/id-11134207-7qul8-lhdnei9u12b0b6",
      },
      {
        imageUrl:
          "https://down-id.img.susercontent.com/file/sg-11134201-22110-iik4z8vew3jv07",
      },
    ],
  },
  {
    name: "Sawah",
    slug: "sawah",
    price: 210500,
    description: "Biasanya tumbuh di alam liar",
    stock: 96,
    sold: 2,
  },
  {
    name: "Halfmoon",
    slug: "halfmoon",
    price: 300100,
    description: "Salah satu jenis ikan cupang yang kini banyak digandrungi",
    stock: 366,
    sold: 3,
    images: [
      {
        imageUrl:
          "https://down-id.img.susercontent.com/file/id-11134207-7rase-m1k5xcquiy7taa@resize_w900_nl.webp",
      },
      {
        imageUrl:
          "https://down-id.img.susercontent.com/file/id-11134207-7rasa-m1k5xcquhjnd0c@resize_w900_nl.webp",
      },
      {
        imageUrl:
          "https://down-id.img.susercontent.com/file/117f0c6aa9db80fe39190f3df379d39a@resize_w900_nl.webp",
      },
    ],
  },
  {
    name: "Coccina",
    slug: "coccina",
    price: 95700,
    description:
      "Memiliki nama lain Belgi Bangkok, ikan cupang ini memiliki bentuk tubuh yang khas dengan warna merah gelap",
    stock: 0,
    sold: 2,
    images: [
      {
        imageUrl:
          "https://down-id.img.susercontent.com/file/id-11134207-7qul2-lhiq3sxvgoa8ec@resize_w900_nl.webp",
      },
    ],
  },
  {
    name: "Veil Tail",
    slug: "veil-tail",
    price: 745500,
    description:
      "Ikan cupang jantan dalam variasi ini memiliki ekor yang panjang dan menukik ke bawah",
    stock: 47,
    sold: 0,
    images: [
      {
        imageUrl:
          "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/113/MTA-148167977/fishkinian_ikan_hias_cupang_veiltail_double_tail_-vtdt-_-_line_thailand_full01_qbatb23j.jpg",
      },
      {
        imageUrl:
          "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/4/7/eabf07ab-33ac-43f4-8347-a7e5fdeae71f.jpg",
      },
      {
        imageUrl:
          "https://img2.biggo.com/sWV-E9_I7kSja-jxO7e4Czwx0fZLvkxYiuzey1Mk1qEQ/https://images.tokopedia.net/img/cache/700/VqbcmM/2024/4/26/4e2b1dd7-56bd-4f4a-9a4f-59a1c7d480e2.jpg",
      },
    ],
  },
  {
    name: "Half Sun",
    slug: "half-sun",
    price: 450800,
    description: "Hasil persilangan antara varietas halfmoon dengan crown tail",
    stock: 250,
    sold: 0,
    images: [
      {
        imageUrl:
          "https://cdn.medcom.id/images/library/images/super%20delta.jpg",
      },
      {
        imageUrl:
          "https://3.bp.blogspot.com/-umySLIfGFJc/XMgDOMxIqmI/AAAAAAAAEqA/4hUxXq-Tbeo86YxVdtmWH6DUf9eswrUmwCEwYBhgL/s1600/combtail.jpg",
      },
    ],
  },
  {
    name: "Giant",
    slug: "giant",
    price: 314509,
    description: "Dipelihara karena ukurannya yang sangat besar",
    stock: 5,
    sold: 2,
    images: [
      {
        imageUrl:
          "https://down-id.img.susercontent.com/file/3a63f7a97ea81ba5cc83e9519e93b23a",
      },
    ],
  },
  {
    name: "Big Ear",
    slug: "big-ear",
    price: 225000,
    description:
      "Biasa dikenal dengan cupang dumbo, ikan cupang ini memiliki sirip telinga yang sangat lebar seperti sayap",
    stock: 43,
    sold: 8,
    images: [
      {
        imageUrl:
          "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-36755425/tidak_ada_merk_cupang_hm_big_ear_size_m_full01_c43a18a6.jpg",
      },
      {
        imageUrl:
          "https://down-id.img.susercontent.com/file/id-11134201-23020-ybgs1gcdmznv48",
      },
      {
        imageUrl:
          "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/100/MTA-108790424/oem_oem_full01.jpg",
      },
      {
        imageUrl:
          "https://images.tokopedia.net/img/cache/700/hDjmkQ/2024/7/7/34d78a99-e7a2-40f6-a962-e17ac16d4ca7.jpg",
      },
      {
        imageUrl:
          "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/98/MTA-122415596/no-brand_no-brand_full01.jpg",
      },
    ],
  },
  {
    name: "Paradise",
    slug: "paradise",
    price: 100800,
    description:
      "Banyak ditemukan di daerah persungaian Sumatra, Kalimantan, dan Sulawesi",
    stock: 89,
    sold: 9,
    images: [
      {
        imageUrl:
          "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2024/4/19/2769845f-1875-46b4-be2a-91220a6bc8cd.jpg",
      },
    ],
  },
  {
    name: "Rosetail",
    slug: "rosetail",
    price: 560500,
    description:
      "Salah satu ikan cupang termahal, dengan ekor dan siripnya bagaikan kipas dan mawar",
    stock: 50,
    sold: 0,
    images: [
      {
        imageUrl:
          "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2023/2/18/d3e112c8-5a02-46ea-9c37-068432c5f95e.jpg",
      },
      {
        imageUrl: "https://s3.bukalapak.com/img/89879000782/large/data.jpeg",
      },
      {
        imageUrl:
          "https://down-id.img.susercontent.com/file/bddf39dc9a92654baa671310b116ce3f",
      },
      {
        imageUrl:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEidiHdETLla7vsZ_yFTq2KFhoZVZXhMNRhQxaPCUYSyGBOd9gVVdFE0Y2w9FFUYrfYJ7MSiphomQTXtHcQwl4sjkYyIMxYGeOCDnjz-n2yngAwQld8tDj572NzkYNYFCIGVv5u0xVKe_pmj/s1080/Rosetail04.jpg",
      },
    ],
  },
  {
    name: "Slayer",
    slug: "slayer",
    price: 140000,
    description: "Bentuk ekor dan sirip dari cupang slayer sangat indah.",
    stock: 0,
    sold: 0,
    images: [
      {
        imageUrl:
          "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/90/MTA-118334331/no-brand_no-brand_full01.jpg",
      },
      {
        imageUrl:
          "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/5/18/b19b3c0c-46ea-4945-b6d4-0f2d155c4a41.jpg",
      },
      {
        imageUrl:
          "https://down-id.img.susercontent.com/file/4812a4800ae51a93453356ffe491600b",
      },
    ],
  },
  {
    name: "Double Tail",
    slug: "double-tail",
    price: 120000,
    description:
      "Cupang double tail yang ekornya bercabang dua ini sangat indah karena siripnya lebar.",
    stock: 30,
    sold: 1,
    images: [
      {
        imageUrl:
          "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/MTA-91252695/fishkinian_ikan_cupang_halfmoon_double_tail_-hmdt-_mascot_grade_a_full01_f8mobw4r.jpg",
      },
      {
        imageUrl:
          "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/7/16/1b89732e-9d6d-4534-8f86-7e56c5e71de1.jpg",
      },
      {
        imageUrl:
          "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/3/13/8f3d7ca7-2049-4918-9aa7-025ee8b48a15.jpg",
      },
      {
        imageUrl:
          "https://cdn.medcom.id/images/library/images/Double%20tail.jpg",
      },
    ],
  },
  {
    name: "Serit",
    slug: "serit",
    price: 950000,
    description:
      "Ikan yang satu ini juga tergolong cukup mahal karena langka di pasaran.",
    stock: 60,
    sold: 5,
    images: [
      {
        imageUrl:
          "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2022/3/19/55481671-94fe-41da-8f92-717648ad809d.jpg",
      },
      {
        imageUrl:
          "https://s0.bukalapak.com/img/57647008562/s-463-463/data.jpeg.webp",
      },
      {
        imageUrl:
          "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/4/6/57f9c868-1292-477c-9a2b-700514687c48.jpg",
      },
      {
        imageUrl:
          "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/105/MTA-136296582/no-brand_no-brand_full01.jpg",
      },
      {
        imageUrl:
          "https://down-id.img.susercontent.com/file/a4b50495e86ee9807d421096d4d52c95",
      },
    ],
  },
];
