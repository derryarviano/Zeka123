import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return {name:'Zeka123 — Belajar Bersama Kobi',short_name:'Zeka123',description:'Petualangan belajar untuk anak kelas 1–3 SD.',start_url:'/',display:'standalone',background_color:'#eef4ff',theme_color:'#2167d9',orientation:'portrait',icons:[{src:'/assets/zeka-mascot.png',sizes:'any',type:'image/png',purpose:'maskable'}]};
}

