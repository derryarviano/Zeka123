'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft, BookOpenText, Check, ChevronRight, Clock3, Compass, Crown,
  Edit3, FlaskConical, Flower2, Home, Languages, Leaf, Lightbulb,
  LockKeyhole, Map, Microscope, Palette, Parentheses, Play, Puzzle,
  ShieldCheck, Shapes, Sparkles, Star, Trees, UserRound, Volume2, VolumeX, WandSparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';

type Grade = '1' | '2' | '3';
type Profile = { name: string; age: string; grade: Grade };
type SubjectId = 'indo' | 'math' | 'english' | 'science';
type View = 'home' | 'subjects' | 'creative' | 'collection' | 'modules' | 'lesson' | 'parent';
type Question = { prompt: string; options: string[]; answer: string; hint: string };

const subjects = [
  { id: 'indo' as SubjectId, title: 'Bahasa Indonesia', world: 'Kampung Kata', copy: 'Baca, susun, dan ceritakan', tone: 'coral' },
  { id: 'math' as SubjectId, title: 'Matematika', world: 'Lembah Angka', copy: 'Hitung, ukur, dan temukan pola', tone: 'blue' },
  { id: 'english' as SubjectId, title: 'Bahasa Inggris', world: 'Taman Bahasa', copy: 'Dengar dan pakai kata sehari-hari', tone: 'yellow' },
  { id: 'science' as SubjectId, title: 'Sains & Dunia Sekitar', world: 'Rimba Penemuan', copy: 'Amati alam di dekatmu', tone: 'green' },
];

const moduleThemes: Record<SubjectId, string[]> = { indo:['Bunyi dan Huruf','Kata di Sekitarku','Kalimat Kecil','Cerita Keluarga','Tanda dan Makna','Kampung Dongeng','Pesan Rahasia','Jelajah Bacaan','Penulis Cilik','Festival Cerita'], math:['Angka di Sekitar','Tambah dan Kurang','Bentuk Ajaib','Ukur dan Bandingkan','Pola Rahasia','Pasar Berhitung','Bagi Sama Rata','Waktu dan Uang','Teka-teki Angka','Festival Logika'], english:['Hello, Friends','My Family','Colors Around Me','At Home','Food and Drinks','My Day','Animals','Feelings','Let’s Go','Story Time'], science:['Makhluk Hidup','Tubuhku','Tumbuhan','Hewan di Sekitar','Benda dan Bahan','Cuaca','Bumi dan Langit','Gerak dan Gaya','Jaga Lingkungan','Festival Penemuan'] }; function moduleNamesFor(subject:SubjectId,grade:Grade){const phase=grade==='1'?['Kenalan','Coba Bersama','Aku Bisa']:grade==='2'?['Temukan','Latihan','Tantangan']:['Selidiki','Pecahkan','Jelaskan'];return Array.from({length:30},(_,i)=>phase[Math.floor(i/10)]+': '+moduleThemes[subject][i%10])}

function SubjectMark({ id, size = 34 }: { id: SubjectId; size?: number }) {
  const Icon = id === 'indo' ? BookOpenText : id === 'math' ? Shapes : id === 'english' ? Languages : Microscope;
  return <span className={'subject-mark-inner '+id}><Icon size={size} strokeWidth={2.4} />{id==='english'&&<b>ABC</b>}</span>;
}

function baseQuestionsFor(subject: SubjectId, grade: Grade): Question[] {
  if (subject === 'math') {
    if (grade === '1') return [
      { prompt:'Ada 24 kelereng. Ditambah 5, jadi berapa?', options:['19','29','35'], answer:'29', hint:'Mulai dari 24, maju lima langkah.' },
      { prompt:'Bilangan mana yang paling besar?', options:['67','76','66'], answer:'76', hint:'Bandingkan angka puluhannya.' },
      { prompt:'Setengah dari 8 adalah...', options:['2','4','6'], answer:'4', hint:'Bagi 8 menjadi dua kelompok sama banyak.' },
      { prompt:'Urutan yang benar adalah...', options:['18, 19, 20','18, 20, 19','20, 18, 19'], answer:'18, 19, 20', hint:'Hitung maju satu-satu.' },
      { prompt:'30 dikurangi 7 sama dengan...', options:['21','23','37'], answer:'23', hint:'Mundur tujuh langkah dari 30.' },
    ];
    if (grade === '2') return [
      { prompt:'Berapa hasil 6 × 4?', options:['20','24','28'], answer:'24', hint:'Enam kelompok berisi empat.' },
      { prompt:'36 dibagi 6 sama dengan...', options:['5','6','7'], answer:'6', hint:'Cari enam kelompok yang sama.' },
      { prompt:'Bilangan setelah 699 adalah...', options:['700','698','709'], answer:'700', hint:'Tambah satu pada 699.' },
      { prompt:'428 + 70 sama dengan...', options:['438','488','498'], answer:'498', hint:'Tambahkan tujuh puluhan.' },
      { prompt:'900 - 250 sama dengan...', options:['650','750','850'], answer:'650', hint:'Kurangi dua ratus, lalu lima puluh.' },
    ];
    return [
      { prompt:'Berapa hasil 8 × 7?', options:['48','54','56'], answer:'56', hint:'Delapan kelompok berisi tujuh.' },
      { prompt:'72 dibagi 8 sama dengan...', options:['8','9','10'], answer:'9', hint:'Delapan kali sembilan adalah 72.' },
      { prompt:'Pecahan terkecil adalah...', options:['1/2','1/4','1/3'], answer:'1/4', hint:'Jika pembilangnya satu, penyebut lebih besar berarti bagian lebih kecil.' },
      { prompt:'375 + 425 sama dengan...', options:['700','750','800'], answer:'800', hint:'Gabungkan ratusan, puluhan, lalu satuan.' },
      { prompt:'Urutkan dari kecil ke besar.', options:['1/4, 1/3, 1/2','1/2, 1/3, 1/4','1/3, 1/4, 1/2'], answer:'1/4, 1/3, 1/2', hint:'Bayangkan satu kue dibagi menjadi bagian yang berbeda.' },
    ];
  }
  if (subject === 'english') return [
    { prompt:'Which word means “rumah”?', options:['House','Chair','Water'], answer:'House', hint:'House adalah tempat kita tinggal.' },
    { prompt:'Choose a morning greeting.', options:['Good morning','Good night','Goodbye'], answer:'Good morning', hint:'We say it when the day begins.' },
    { prompt:'Complete: “I am ...”', options:['happy','apple','table'], answer:'happy', hint:'Happy describes a feeling.' },
    { prompt:'Which one is a family member?', options:['Mother','Window','Bread'], answer:'Mother', hint:'Mother means ibu.' },
    { prompt:'What do you drink?', options:['Water','Pencil','Shoe'], answer:'Water', hint:'Water means air.' },
  ];
  if (subject === 'science') return [
    { prompt:'Mana yang termasuk makhluk hidup?', options:['Kucing','Batu','Sendok'], answer:'Kucing', hint:'Makhluk hidup tumbuh dan membutuhkan makanan.' },
    { prompt:'Bagian tumbuhan yang menyerap air adalah...', options:['Akar','Bunga','Buah'], answer:'Akar', hint:'Akar berada di dalam tanah.' },
    { prompt:'Agar es mencair, es membutuhkan...', options:['Panas','Gelap','Angin'], answer:'Panas', hint:'Suhu yang lebih hangat mengubah es menjadi air.' },
    { prompt:'Benda yang dapat ditarik magnet adalah...', options:['Paku besi','Daun','Kertas'], answer:'Paku besi', hint:'Magnet menarik beberapa jenis logam.' },
    { prompt:'Kegiatan yang aman dilakukan bersama keluarga adalah...', options:['Menanam kacang','Menyentuh api','Mencicipi cairan asing'], answer:'Menanam kacang', hint:'Pilih kegiatan yang tidak memakai api atau bahan berbahaya.' },
  ];
  return [
    { prompt:'Kata mana yang dimulai dengan bunyi “b”?', options:['Buku','Sapu','Meja'], answer:'Buku', hint:'Ucapkan perlahan: bu-ku.' },
    { prompt:'Kalimat mana yang ditulis dengan benar?', options:['Budi membaca buku.','budi membaca buku','Budi Membaca Buku'], answer:'Budi membaca buku.', hint:'Awali dengan huruf besar dan akhiri dengan titik.' },
    { prompt:'Kata yang mirip artinya dengan “gembira” adalah...', options:['Senang','Sedih','Takut'], answer:'Senang', hint:'Gembira dan senang menggambarkan perasaan yang serupa.' },
    { prompt:'Susunan kalimat yang tepat adalah...', options:['Ibu memasak nasi.','Nasi ibu memasak.','Memasak nasi ibu.'], answer:'Ibu memasak nasi.', hint:'Mulai dari siapa, lalu kegiatannya.' },
    { prompt:'Tanda yang tepat di akhir pertanyaan adalah...', options:['?','.',','], answer:'?', hint:'Kalimat tanya memakai tanda tanya.' },
  ];
}

function questionsFor(subject: SubjectId, grade: Grade, moduleIndex: number): Question[] {
  const levelQuestion: Record<Grade, Record<SubjectId, Question>> = {
    '1': {
      indo:{prompt:'Suku kata awal pada “mata” adalah...',options:['ma','ta','at'],answer:'ma',hint:'Ucapkan perlahan: ma-ta.'},
      math:{prompt:'Seperempat dari 12 adalah...',options:['2','3','4'],answer:'3',hint:'Bagi 12 menjadi empat kelompok sama banyak.'},
      english:{prompt:'Which word means “buku”?',options:['Book','Ball','Bag'],answer:'Book',hint:'Book artinya buku.'},
      science:{prompt:'Indra untuk mendengar adalah...',options:['Telinga','Mata','Hidung'],answer:'Telinga',hint:'Telinga membantu kita mendengar.'}
    },
    '2': {
      indo:{prompt:'Lawan kata “tinggi” adalah...',options:['Rendah','Panjang','Besar'],answer:'Rendah',hint:'Tinggi dan rendah memiliki arti berlawanan.'},
      math:{prompt:'45 dibagi 5 sama dengan...',options:['8','9','10'],answer:'9',hint:'Lima kali sembilan adalah 45.'},
      english:{prompt:'Complete: “I have two ...”',options:['books','book','bookes'],answer:'books',hint:'Gunakan bentuk jamak books.'},
      science:{prompt:'Hewan yang mengalami metamorfosis adalah...',options:['Kupu-kupu','Kucing','Ayam'],answer:'Kupu-kupu',hint:'Kupu-kupu berubah melalui beberapa tahap.'}
    },
    '3': {
      indo:{prompt:'Gagasan utama adalah...',options:['Inti sebuah paragraf','Tanda baca','Nama pengarang'],answer:'Inti sebuah paragraf',hint:'Gagasan utama merangkum bagian terpenting paragraf.'},
      math:{prompt:'Pecahan terbesar adalah...',options:['1/5','1/3','1/2'],answer:'1/2',hint:'Penyebut terkecil memberi bagian terbesar.'},
      english:{prompt:'Complete: “They are ... football.”',options:['playing','plays','play'],answer:'playing',hint:'Gunakan are playing.'},
      science:{prompt:'Gaya yang menarik benda ke bumi adalah...',options:['Gravitasi','Magnet','Gesekan'],answer:'Gravitasi',hint:'Gravitasi menarik benda menuju bumi.'}
    }
  };
  const bank = [levelQuestion[grade][subject], ...baseQuestionsFor(subject, grade)];
  const count = 5 + (moduleIndex % 2);
  const start = (moduleIndex * 2) % bank.length;
  return Array.from({length:count},(_,index)=>bank[(start+index)%bank.length]);
}

function Logo() {
  return <div className="brand" aria-label="Zeka123"><img src="/assets/zeka-wordmark.png" alt="ZEKA" /><span className="brand-number"><i>1</i><i>2</i><i>3</i></span></div>;
}

function Onboarding({ onComplete }: { onComplete: (profile: Profile) => void }) {
  const [step, setStep] = useState<'hello'|'profile'|'assessment'>('hello');
  const [profile, setProfile] = useState<Profile>({ name:'', age:'7', grade:'1' });
  const [assessment, setAssessment] = useState(0);
  const checks = [
    { prompt:'Pilih gambar yang cocok untuk belajar membaca.', options:['Buku','Sepatu','Payung'], answer:'Buku' },
    { prompt:'Berapa 3 + 2?', options:['4','5','6'], answer:'5' },
    { prompt:'Which one means “blue”?', options:['Biru','Merah','Hijau'], answer:'Biru' },
    { prompt:'Mana yang membutuhkan air untuk tumbuh?', options:['Tanaman','Batu','Meja'], answer:'Tanaman' },
  ];
  if (step === 'hello') return <main className="welcome-screen"><div className="welcome-sky"><Logo/><span className="welcome-orbit one"/><span className="welcome-orbit two"/><div className="kobi-hello"><div className="speech-card"><small>HAI, PETUALANG!</small><h1>Aku Kobi.</h1><p>Kita akan membaca, berhitung, dan menemukan hal baru bersama.</p></div><img src="/assets/zeka-mascot.png" alt="Kobi menyambut anak"/></div><Button className="start-button" onClick={() => setStep('profile')}>Ayo mulai <ChevronRight/></Button><p className="grownup-note"><ShieldCheck size={17}/> Disiapkan bersama orang tua · tanpa iklan</p></div></main>;
  if (step === 'profile') {
    const submit = (e: FormEvent) => { e.preventDefault(); if (profile.name.trim()) setStep('assessment'); };
    return <main className="setup-screen"><section className="setup-card"><button className="round-back" onClick={() => setStep('hello')}><ArrowLeft/></button><div className="setup-kobi"><img src="/assets/zeka-mascot.png" alt="Kobi"/><span>Biar tantangannya pas untukmu.</span></div><div><p className="overline">UNTUK ORANG TUA</p><h1>Kenalkan petualang kecilmu</h1><p className="support">Profil membantu Kobi memilih materi sesuai jenjang anak.</p></div><form onSubmit={submit} className="profile-form"><div className="field"><Label htmlFor="name">Nama anak</Label><Input id="name" value={profile.name} onChange={e => setProfile({...profile,name:e.target.value})} placeholder="Contoh: Nara" required/></div><div className="field-pair"><div className="field"><Label htmlFor="age">Usia</Label><NativeSelect id="age" value={profile.age} onChange={e => setProfile({...profile,age:e.target.value})}>{['6','7','8','9'].map(x=><NativeSelectOption value={x} key={x}>{x} tahun</NativeSelectOption>)}</NativeSelect></div><div className="field"><Label htmlFor="grade">Jenjang</Label><NativeSelect id="grade" value={profile.grade} onChange={e => setProfile({...profile,grade:e.target.value as Grade})}>{['1','2','3'].map(x=><NativeSelectOption value={x} key={x}>Kelas {x} SD</NativeSelectOption>)}</NativeSelect></div></div><Button className="primary-big" type="submit">Lanjut asesmen <ChevronRight/></Button></form><p className="data-note"><ShieldCheck size={16}/> Tersimpan hanya di perangkat ini.</p></section></main>;
  }
  const item = checks[assessment];
  return <main className="activity-screen"><header className="activity-top"><button className="round-back" onClick={() => setStep('profile')}><ArrowLeft/></button><div className="progress-rail"><i style={{width:((assessment+1)/checks.length*100)+'%'}}/></div><b>{assessment+1}/{checks.length}</b></header><section className="question-card assessment-card"><div className="kobi-guide"><img src="/assets/zeka-mascot.png" alt="Kobi"/><span>Coba sebisamu. Tidak ada nilai jelek!</span></div><p className="overline">ASESMEN SINGKAT</p><h1>{item.prompt}</h1><div className="choice-stack">{item.options.map(option=><button key={option} onClick={() => assessment === checks.length-1 ? onComplete({...profile,name:profile.name.trim()}) : setAssessment(assessment+1)}><span>{option}</span><ChevronRight/></button>)}</div><p className="quiet-copy">Jawaban membantu kami menentukan titik mulai, bukan memberi peringkat.</p></section></main>;
}

function Topbar({ profile, onParent }: { profile: Profile; onParent: () => void }) {
  return <header className="topbar"><Logo/><button className="profile-chip" onClick={onParent}><span>{profile.name.charAt(0).toUpperCase()}</span><span><small>Petualang</small><b>{profile.name}</b></span><ChevronRight size={18}/></button></header>;
}

function HomeView({ profile, openSubject, go, parent, changeGrade }: { profile:Profile; openSubject:(id:SubjectId)=>void; go:(v:View)=>void; parent:()=>void; changeGrade:()=>void }) {
  return <><Topbar profile={profile} onParent={parent}/><main className="screen home-screen"><section className="hello-strip"><div><p>Halo, {profile.name}!</p><h1>Mau bertualang<br/>ke mana hari ini?</h1></div><button className="level-badge" onClick={changeGrade} aria-label="Ubah jenjang melalui kontrol orang tua"><span>Kelas {profile.grade}</span><ChevronRight size={17}/></button></section><section className="continue-world"><span className="sun"/><div className="continue-copy"><span className="micro-pill"><Clock3 size={16}/> sekitar 10 menit</span><p>LANJUTKAN CERITA</p><h2>Misteri Kata<br/>di Tepi Sungai</h2><button onClick={() => openSubject('indo')}><Play size={21} fill="currentColor"/> Mulai</button></div><img src="/assets/zeka-mascot.png" alt="Kobi mengajak belajar"/><span className="speech-mini">Aku sudah menunggumu!</span></section><section className="section-heading"><div><p className="overline">EMPAT DUNIA</p><h2>Pilih petualangan</h2></div><button onClick={() => go('subjects')}>Lihat semua <ChevronRight size={18}/></button></section><div className="world-grid">{subjects.map(s=><button className={'world-tile '+s.tone} key={s.id} onClick={() => openSubject(s.id)}><span className="world-mark"><SubjectMark id={s.id}/></span><span><small>{s.world}</small><strong>{s.title}</strong></span><ChevronRight/></button>)}</div><section className="family-mission"><span><Home/></span><div><small>MISI BERSAMA KELUARGA</small><strong>Temukan tiga bentuk lingkaran di rumah</strong></div><ChevronRight/></section></main></>;
}

function SubjectsView({ profile, openSubject, parent }: { profile:Profile; openSubject:(id:SubjectId)=>void; parent:()=>void }) {
  return <><Topbar profile={profile} onParent={parent}/><main className="screen"><div className="page-title"><p className="overline">KELAS {profile.grade}</p><h1>Dunia belajar</h1><p>Pilih wilayah yang ingin dijelajahi bersama Kobi.</p></div><div className="world-list">{subjects.map((s,i)=><button className={'world-banner '+s.tone} key={s.id} onClick={() => openSubject(s.id)}><div className="landscape-art"><span/><span/><span/><SubjectMark id={s.id} size={46}/></div><div><small>DUNIA {i+1} · 30 POS · 7 TERBUKA</small><h2>{s.world}</h2><p>{s.copy}</p></div><span className="banner-go"><ChevronRight/></span></button>)}</div></main></>;
}

function CreativeView({ profile, parent }: { profile:Profile; parent:()=>void }) {
  const [open,setOpen]=useState<string|null>(null);
  const day=Math.floor(Date.now()/86400000);
  const gardens=[['Kecambah Kacang','Letakkan biji kacang di kapas basah, simpan dekat cahaya, lalu amati selama tiga hari.'],['Detektif Daun','Cari tiga bentuk daun berbeda bersama keluarga lalu kelompokkan berdasarkan ukuran.'],['Penjaga Tanaman','Pilih satu tanaman, periksa tanahnya, lalu siram secukupnya bila terasa kering.']];
  const activities={
    'Studio Bentuk':{intro:'Susun bentuk menjadi karya buatanmu sendiri.',steps:['Pilih lingkaran, segitiga, dan persegi','Susun menjadi rumah, kendaraan, atau hewan','Beri nama dan ceritakan hasil karyamu']},
    'Cerita Pilihan':{intro:'Buka cerita mandiri dan tentukan sendiri jalan petualangannya.',steps:['Kobi menemukan pintu bercahaya','Pilih: masuk ke hutan atau menuju sungai','Baca akibat pilihanmu dan pilih akhir cerita']},
    'Kebun Kecil':{intro:gardens[day%gardens.length][0]+' — '+gardens[day%gardens.length][1],steps:['Siapkan bahan bersama orang tua','Ikuti langkah aman satu per satu','Catat atau gambar perubahan yang terlihat']}
  } as const;
  const items=[{title:'Studio Bentuk',copy:'Bangun gambar dari bentuk sederhana',icon:Shapes,tone:'coral'},{title:'Cerita Pilihan',copy:'Tentukan jalan cerita bersama Kobi',icon:BookOpenText,tone:'blue'},{title:'Kebun Kecil',copy:'Eksperimen aman bersama keluarga',icon:Leaf,tone:'green'}];
  const selected=open?activities[open as keyof typeof activities]:null;
  return <><Topbar profile={profile} onParent={parent}/><main className="screen"><div className="page-title"><p className="overline">RUANG KREATIF</p><h1>Buat sesukamu</h1><p>Di sini tidak ada jawaban salah.</p></div><section className="creative-stage"><div><span className="micro-pill"><WandSparkles size={16}/> Pilihan Kobi</span><h2>Kota dari<br/>berbagai bentuk</h2><p>Susun, putar, lalu ceritakan kota buatanmu.</p><button onClick={()=>setOpen('Studio Bentuk')}><Palette/> Mulai berkarya</button></div><div className="art-shapes"><i/><i/><i/><i/></div></section><div className="activity-list">{items.map(({title,copy,icon:Icon,tone})=><button key={title} className={tone} onClick={()=>setOpen(title)}><span><Icon/></span><span><strong>{title}</strong><small>{copy}</small></span><ChevronRight/></button>)}</div><p className="safe-note"><ShieldCheck/> Eksperimen rumah dilakukan bersama orang tua.</p></main><Dialog open={!!open} onOpenChange={v=>!v&&setOpen(null)}><DialogContent className="activity-dialog"><DialogHeader><span className="gate-icon"><Sparkles/></span><DialogTitle>{open}</DialogTitle><DialogDescription>{selected?.intro}</DialogDescription></DialogHeader><div className="recommendation-list">{selected?.steps.map((step,i)=><div key={step}><b>{i+1}</b><span>{step}</span></div>)}</div><Button className="primary-big" onClick={()=>setOpen(null)}>Mulai kegiatan <ChevronRight/></Button></DialogContent></Dialog></>;
}

function CollectionView({ profile, parent }: { profile:Profile; parent:()=>void }) {
  const [panel,setPanel]=useState<'puzzle'|'badges'|null>(null);
  const [stars,setStars]=useState(240); const [pieces,setPieces]=useState(3);
  const badges=[['Berani mencoba lagi','Didapat','Lanjutkan belajar setelah jawaban belum tepat.'],['Penjelajah Tekun','3/5','Selesaikan kegiatan pada lima hari berbeda.'],['Sahabat Kata','4/10','Selesaikan sepuluh Pos Bahasa Indonesia.'],['Jago Berhitung','2/10','Selesaikan sepuluh Pos Matematika.'],['Ilmuwan Cilik','1/5','Lakukan lima eksperimen keluarga.'],['Bintang Cerita','0/3','Temukan tiga akhir Cerita Pilihan.']];
  const redeem=()=>{if(stars>=80&&pieces<6){setStars(stars-80);setPieces(pieces+1)}};
  return <><Topbar profile={profile} onParent={parent}/><main className="screen collection-screen"><div className="page-title"><p className="overline">KOLEKSI {profile.name.toUpperCase()}</p><h1>Album penemuan</h1><p>Setiap usaha membuka bagian cerita baru.</p></div><button className="puzzle-book" onClick={()=>setPanel('puzzle')}><div className="puzzle-copy"><span className="micro-pill"><Star size={16} fill="currentColor"/> {stars} bintang</span><h2>Kobi dan<br/>Pulau Awan</h2><p>{pieces} dari 6 potongan telah ditemukan.</p><div className="piece-rail"><i style={{width:(pieces/6*100)+'%'}}/></div></div><div className="puzzle-art">{Array.from({length:6},(_,i)=><span className={i<pieces?'found':''} key={i}>{i<pieces?<Sparkles/>:<LockKeyhole/>}</span>)}</div></button><button className="quiet-panel" onClick={()=>setPanel('badges')}><span><Flower2/></span><div><small>PENCAPAIAN TERBARU</small><strong>Berani mencoba lagi</strong><p>Lihat semua badge dan cara mendapatkannya.</p></div><ChevronRight/></button></main><Dialog open={panel==='puzzle'} onOpenChange={v=>!v&&setPanel(null)}><DialogContent className="collection-dialog"><DialogHeader><span className="premium-icon"><Puzzle/></span><DialogTitle>Puzzle Pulau Awan</DialogTitle><DialogDescription>Tukarkan 80 bintang untuk membuka satu potongan cerita.</DialogDescription></DialogHeader><div className="puzzle-preview">{Array.from({length:6},(_,i)=><span className={i<pieces?'found':''} key={i}>{i<pieces?<Sparkles/>:<LockKeyhole/>}</span>)}</div><Button className="primary-big" disabled={stars<80||pieces>=6} onClick={redeem}>{pieces>=6?'Puzzle sudah lengkap':`Tukarkan 80 bintang · Sisa ${stars}`}</Button></DialogContent></Dialog><Dialog open={panel==='badges'} onOpenChange={v=>!v&&setPanel(null)}><DialogContent className="collection-dialog"><DialogHeader><span className="gate-icon"><Flower2/></span><DialogTitle>Koleksi badge</DialogTitle><DialogDescription>Setiap badge menunjukkan kebiasaan baik yang sedang tumbuh.</DialogDescription></DialogHeader><div className="badge-grid">{badges.map(([name,progress,copy],i)=><article className={i===0?'earned-badge':''} key={name}><span>{i===0?<Star fill="currentColor"/>:<LockKeyhole/>}</span><div><strong>{name}</strong><small>{copy}</small></div><b>{progress}</b></article>)}</div></DialogContent></Dialog></>;
}

function ModulesView({ profile, subject, back, play, premium }: {profile:Profile;subject:SubjectId;back:()=>void;play:(index:number)=>void;premium:()=>void}) {
  const s=subjects.find(x=>x.id===subject)!; const modules=moduleNamesFor(subject,profile.grade);
  return <main className={'path-screen '+s.tone}><header className="path-top"><button onClick={back}><ArrowLeft/></button><Logo/><span>Kelas {profile.grade} · 30 pos</span></header><section className="path-title"><div className="path-emblem"><SubjectMark id={subject} size={43}/></div><div><p className="overline">JALUR PETUALANGAN</p><h1>{s.world}</h1><p>{s.copy}</p></div></section><section className="journey"><div className="trail"/>{modules.map((name,i)=>{const open=i<7;return <button className={'journey-stop '+(open?'open':'locked')+(i===0?' current':'')} key={name} onClick={open?()=>play(i):premium}><span className="stop-dot">{open?i+1:<LockKeyhole/>}</span><span><small>{open?'MODUL '+(i+1):'PAKET LENGKAP'}</small><strong>{name}</strong>{i===0&&<em>Lanjutkan dari sini</em>}</span>{open?<ChevronRight/>:<Crown/>}</button>})}<img src="/assets/zeka-mascot.png" alt="Kobi di jalur petualangan"/></section></main>;
}

function LessonView({ profile, subject, moduleIndex, exit, finish }: {profile:Profile;subject:SubjectId;moduleIndex:number;exit:()=>void;finish:()=>void}) {
  const questions=questionsFor(subject,profile.grade,moduleIndex); const [index,setIndex]=useState(0); const [selected,setSelected]=useState(''); const q=questions[index]; const right=selected===q.answer;
  const next=()=>{if(index===questions.length-1)finish();else{setIndex(index+1);setSelected('')}};
  return <main className="activity-screen"><header className="activity-top"><button className="round-back" onClick={exit}><ArrowLeft/></button><div className="progress-rail"><i style={{width:((index+1)/questions.length*100)+'%'}}/></div><b>{index+1}/{questions.length}</b></header><section className="question-card"><div className="kobi-guide"><img src="/assets/zeka-mascot.png" alt="Kobi"/><span>{selected?(right?'Wah, tepat sekali!':'Coba lihat petunjukku.'): 'Aku menemanimu.'}</span></div><p className="overline">{subjects.find(s=>s.id===subject)!.title} · KELAS {profile.grade}</p><h1>{q.prompt}</h1><button className="listen-button"><Volume2/> Dengarkan</button><div className="choice-stack">{q.options.map(option=><button key={option} className={selected===option?(option===q.answer?'correct':'wrong'):''} onClick={()=>setSelected(option)}><span>{option}</span>{selected===option&&right?<Check/>:<ChevronRight/>}</button>)}</div>{selected&&<div className={'feedback-card '+(right?'success':'gentle')}><Lightbulb/><div><strong>{right?'Hebat! Kamu menemukannya.':'Belum tepat, dan itu tidak apa-apa.'}</strong><p>{right?q.hint:'Petunjuk: '+q.hint}</p></div></div>}<Button className="primary-big" disabled={!right} onClick={next}>{index===questions.length-1?'Selesaikan modul':'Lanjut'} <ChevronRight/></Button></section></main>;
}

function ParentView({profile,edit,back,premium}:{profile:Profile;edit:()=>void;back:()=>void;premium:()=>void}) {
  const skills=[['Membaca dan memahami',76,'Makin lancar'],['Berhitung dan logika',48,'Perlu ditemani'],['Berani mencoba',82,'Berkembang baik']];
  return <main className="parent-screen"><header><button onClick={back}><ArrowLeft/></button><div><small>RUANG ORANG TUA</small><b>Perkembangan {profile.name}</b></div><button onClick={edit}><Edit3/></button></header><div className="parent-content"><section className="parent-story"><div><p>RINGKASAN MINGGU INI</p><h1>{profile.name} sedang membangun kebiasaan belajar yang baik.</h1><span>4 dari 5 hari belajar · 42 menit</span></div><div className="progress-orb"><b>78%</b><small>target</small></div></section><section className="parent-section"><div className="section-heading"><div><p className="overline">PETA KEMAMPUAN</p><h2>Yang tumbuh dan perlu dibantu</h2></div></div><div className="skill-list">{skills.map(([name,value,status],i)=><div className="skill-row" key={String(name)}><span className={'skill-symbol s'+i}>{i===0?<BookOpenText/>:i===1?<Shapes/>:<Sparkles/>}</span><div><span><strong>{name}</strong><small>{status}</small></span><div className="skill-track"><i style={{width:String(value)+'%'}}/></div></div><b>{value}%</b></div>)}</div></section><section className="home-tip"><span><Home/></span><div><small>COBA DI RUMAH</small><h2>Bermain toko-tokoan 10 menit</h2><p>Ajak {profile.name} menghitung harga dua atau tiga barang.</p></div></section><button className="parent-premium" onClick={premium}><span><Crown/></span><span><strong>Buka seluruh petualangan</strong><small>Modul 8 dan seterusnya di empat mata pelajaran</small></span><ChevronRight/></button></div></main>;
}

function BottomNav({view,go}:{view:View;go:(v:View)=>void}) {
  const items=[{id:'home' as View,label:'Beranda',icon:Home},{id:'subjects' as View,label:'Pelajaran',icon:Compass},{id:'creative' as View,label:'Kreatif',icon:Palette},{id:'collection' as View,label:'Koleksiku',icon:Puzzle}];
  return <nav className="bottom-nav">{items.map(({id,label,icon:Icon})=><button className={view===id?'active':''} onClick={()=>go(id)} key={id}><span><Icon/></span><b>{label}</b></button>)}</nav>;
}

function GradeControl({open,profile,close,save}:{open:boolean;profile:Profile;close:()=>void;save:(grade:Grade)=>void}) {
  return <Dialog open={open} onOpenChange={v=>!v&&close()}><DialogContent className="grade-dialog"><DialogHeader><span className="gate-icon"><UserRound/></span><DialogTitle>Pilih jenjang belajar</DialogTitle><DialogDescription>Jalur modul dan soal akan langsung menyesuaikan kelas yang dipilih.</DialogDescription></DialogHeader><div className="grade-options">{(['1','2','3'] as Grade[]).map(grade=><button key={grade} className={profile.grade===grade?'selected':''} onClick={()=>save(grade)}><span>Kelas {grade} SD</span>{profile.grade===grade?<Check/>:<ChevronRight/>}</button>)}</div><p><ShieldCheck/> Perubahan ini hanya dapat dilakukan setelah kontrol orang tua.</p></DialogContent></Dialog>;
}

function ParentGate({open,close,enter}:{open:boolean;close:()=>void;enter:()=>void}) {
  const [answer,setAnswer]=useState(''); const [error,setError]=useState(false);
  const submit=(e:FormEvent)=>{e.preventDefault();if(answer==='13'){setAnswer('');setError(false);enter()}else setError(true)};
  return <Dialog open={open} onOpenChange={v=>!v&&close()}><DialogContent className="gate-dialog"><DialogHeader><span className="gate-icon"><ShieldCheck/></span><DialogTitle>Ruang orang tua</DialogTitle><DialogDescription>Jawab pertanyaan sederhana ini agar anak tidak masuk tanpa sengaja.</DialogDescription></DialogHeader><form onSubmit={submit}><Label htmlFor="adult">Berapa 6 + 7?</Label><Input id="adult" inputMode="numeric" value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Ketik jawaban"/>{error&&<p>Jawabannya belum tepat.</p>}<Button type="submit" className="primary-big">Masuk</Button></form></DialogContent></Dialog>;
}

function BackgroundMusic({ active }: { active: boolean }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [enabled, setEnabled] = useState(true);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const begin = () => setStarted(true);
    window.addEventListener('pointerdown', begin, { once: true });
    return () => window.removeEventListener('pointerdown', begin);
  }, []);
  useEffect(() => {
    const player = audio.current;
    if (!player) return;
    player.volume = .22;
    const sync = () => {
      if (active && enabled && started && !document.hidden && document.hasFocus()) player.play().catch(() => {});
      else player.pause();
    };
    sync();
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('focus', sync);
    window.addEventListener('blur', sync);
    return () => {
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('focus', sync);
      window.removeEventListener('blur', sync);
    };
  }, [active, enabled, started]);
  return <><audio ref={audio} src="/assets/zeka-bgm.mp3" loop preload="auto"/>{active&&<button className="bgm-toggle" onClick={() => { setStarted(true); setEnabled(value => !value); }} aria-label={enabled?'Matikan musik':'Nyalakan musik'}>{enabled?<Volume2/>:<VolumeX/>}</button>}</>;
}
function PremiumDialog({open,close}:{open:boolean;close:()=>void}) {
  return <Dialog open={open} onOpenChange={v=>!v&&close()}><DialogContent className="premium-dialog"><DialogHeader><span className="premium-icon"><Crown/></span><DialogTitle>Buka semua dunia Zeka123</DialogTitle><DialogDescription>Tujuh modul pertama di setiap mata pelajaran tetap terbuka. Paket keluarga membuka modul 8 dan seterusnya.</DialogDescription></DialogHeader><div className="benefit-list"><span><Check/> Empat jalur belajar lengkap</span><span><Check/> Penyesuaian tingkat kesulitan</span><span><Check/> Koleksi cerita dan puzzle baru</span><span><ShieldCheck/> Tanpa iklan dan chat publik</span></div><Button className="primary-big">Lihat paket keluarga</Button><small className="purchase-note">Pembelian hanya dilakukan di ruang orang tua.</small></DialogContent></Dialog>;
}

export default function HomePage(){
  const [ready,setReady]=useState(false); const [profile,setProfile]=useState<Profile|null>(null); const [view,setView]=useState<View>('home'); const [subject,setSubject]=useState<SubjectId>('indo'); const [moduleIndex,setModuleIndex]=useState(0); const [gate,setGate]=useState(false); const [gateTarget,setGateTarget]=useState<'parent'|'grade'>('parent'); const [gradeOpen,setGradeOpen]=useState(false); const [edit,setEdit]=useState(false); const [premium,setPremium]=useState(false); const [complete,setComplete]=useState(false);
  useEffect(()=>{const saved=localStorage.getItem('zeka-child-profile');if(saved)try{setProfile(JSON.parse(saved))}catch{}setReady(true)},[]);
  const save=(p:Profile)=>{localStorage.setItem('zeka-child-profile',JSON.stringify(p));localStorage.setItem('zeka-assessment-done','true');setProfile(p);setEdit(false);setView('home')};
  const openSubject=(id:SubjectId)=>{setSubject(id);setView('modules')};
  const requestGate=(target:'parent'|'grade')=>{setGateTarget(target);setGate(true)}; const enterParent=()=>{setGate(false);if(gateTarget==='grade')setGradeOpen(true);else setView('parent')}; const changeGrade=(grade:Grade)=>{save({...profile!,grade});setGradeOpen(false);setView('home')};
  if(!ready)return <div className="splash"><Logo/><span>Menyiapkan dunia Kobi...</span></div>;
  if(!profile)return <Onboarding onComplete={save}/>;
  if(complete)return <><BackgroundMusic active/><main className="finish-screen"><div><img className="kobi-jump" src="/assets/zeka-mascot.png" alt="Kobi melompat gembira"/><p className="overline">MODUL SELESAI</p><h1>Satu penemuan baru!</h1><p>Kamu sudah menyelesaikan semua tantangan di modul ini. Sekarang mata dan tubuhmu boleh beristirahat.</p><div className="earned"><Star fill="currentColor"/> +20 bintang</div><Button className="primary-big" onClick={()=>{setComplete(false);if(moduleIndex<6){setModuleIndex(moduleIndex+1);setView('lesson')}else setView('modules')}}>Lanjut ke level selanjutnya <ChevronRight/></Button><Button className="secondary-big" onClick={()=>{setComplete(false);setView('home')}}>Kembali ke beranda</Button></div></main></>;
  return <div className="app-shell">
    <BackgroundMusic active/>
    {view==='home'&&<HomeView profile={profile} openSubject={openSubject} go={setView} parent={()=>requestGate('parent')} changeGrade={()=>requestGate('grade')}/>}
    {view==='subjects'&&<SubjectsView profile={profile} openSubject={openSubject} parent={()=>requestGate('parent')}/>}
    {view==='creative'&&<CreativeView profile={profile} parent={()=>requestGate('parent')}/>}
    {view==='collection'&&<CollectionView profile={profile} parent={()=>requestGate('parent')}/>}
    {view==='modules'&&<ModulesView profile={profile} subject={subject} back={()=>setView('subjects')} play={(index)=>{setModuleIndex(index);setView('lesson')}} premium={()=>setPremium(true)}/>}
    {view==='lesson'&&<LessonView profile={profile} subject={subject} moduleIndex={moduleIndex} exit={()=>setView('modules')} finish={()=>setComplete(true)}/>}
    {view==='parent'&&<ParentView profile={profile} edit={()=>setEdit(true)} back={()=>setView('home')} premium={()=>setPremium(true)}/>}
    {['home','subjects','creative','collection'].includes(view)&&<BottomNav view={view} go={setView}/>}
    <GradeControl open={gradeOpen} profile={profile} close={()=>setGradeOpen(false)} save={changeGrade}/><ParentGate open={gate} close={()=>setGate(false)} enter={enterParent}/>
    <Dialog open={edit} onOpenChange={setEdit}><DialogContent className="edit-dialog"><DialogHeader><DialogTitle>Edit profil anak</DialogTitle><DialogDescription>Materi berikutnya akan mengikuti kelas yang dipilih.</DialogDescription></DialogHeader><EditForm profile={profile} save={save}/></DialogContent></Dialog>
    <PremiumDialog open={premium} close={()=>setPremium(false)}/>
  </div>;
}

function EditForm({profile,save}:{profile:Profile;save:(p:Profile)=>void}){
  const [next,setNext]=useState(profile); const submit=(e:FormEvent)=>{e.preventDefault();save(next)};
  return <form onSubmit={submit} className="profile-form"><div className="field"><Label htmlFor="edit-name">Nama anak</Label><Input id="edit-name" value={next.name} onChange={e=>setNext({...next,name:e.target.value})}/></div><div className="field"><Label htmlFor="edit-grade">Jenjang</Label><NativeSelect id="edit-grade" value={next.grade} onChange={e=>setNext({...next,grade:e.target.value as Grade})}>{['1','2','3'].map(x=><NativeSelectOption key={x} value={x}>Kelas {x} SD</NativeSelectOption>)}</NativeSelect></div><Button type="submit" className="primary-big">Simpan perubahan</Button></form>;
}
