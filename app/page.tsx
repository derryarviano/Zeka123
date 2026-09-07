'use client';

import { FormEvent, useEffect, useState, type CSSProperties } from 'react';
import {
  ArrowLeft, BarChart3, BookOpen, Check, ChevronRight, Clock3, Crown, Edit3,
  Flame, Heart, Home, Lightbulb, LockKeyhole, Map, Play, Puzzle, Rocket,
  ShieldCheck, Star, Timer, Trophy, UserRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Progress, ProgressIndicator, ProgressTrack } from '@/components/ui/progress';

type View = 'home' | 'explore' | 'progress' | 'parent' | 'modules' | 'lesson';
type ChildProfile = { name: string; age: string; grade: '1' | '2' | '3' };
type SubjectName = 'Bahasa Indonesia' | 'Matematika' | 'Bahasa Inggris' | 'Sains & Dunia Sekitar';

const subjects: { name: SubjectName; description: string; icon: string; color: string }[] = [
  { name: 'Bahasa Indonesia', description: 'Baca, cerita, dan kosakata', icon: '📚', color: 'coral' },
  { name: 'Matematika', description: 'Angka dan logika seru', icon: '🔢', color: 'blue' },
  { name: 'Bahasa Inggris', description: 'ABC & first words', icon: '🇬🇧', color: 'yellow' },
  { name: 'Sains & Dunia Sekitar', description: 'Temukan cara dunia bekerja', icon: '🔬', color: 'green' },
];

const lessonBank: Record<ChildProfile['grade'], Record<SubjectName, { prompt: string; options: string[]; correct: string; hint: string }>> = {
  '1': {
    'Bahasa Indonesia': { prompt: 'Kata mana yang dimulai dengan huruf B?', options: ['Buku', 'Sapu', 'Meja'], correct: 'Buku', hint: 'Buku dimulai dengan bunyi “B”.' },
    'Matematika': { prompt: 'Ada 2 apel, lalu ditambah 1. Jadi berapa?', options: ['2', '3', '4'], correct: '3', hint: 'Dua ditambah satu sama dengan tiga.' },
    'Bahasa Inggris': { prompt: 'Which one means “kucing”?', options: ['Cat', 'Sun', 'Book'], correct: 'Cat', hint: 'Cat artinya kucing.' },
    'Sains & Dunia Sekitar': { prompt: 'Manakah yang termasuk makhluk hidup?', options: ['Kucing', 'Batu', 'Meja'], correct: 'Kucing', hint: 'Kucing tumbuh, bergerak, dan membutuhkan makanan.' },
  },
  '2': {
    'Bahasa Indonesia': { prompt: 'Kalimat mana yang ditulis dengan benar?', options: ['Budi membaca buku.', 'budi membaca buku', 'Budi Membaca Buku'], correct: 'Budi membaca buku.', hint: 'Kalimat dimulai huruf besar dan diakhiri tanda titik.' },
    'Matematika': { prompt: 'Berapakah hasil 8 + 7?', options: ['13', '15', '16'], correct: '15', hint: 'Delapan ditambah tujuh sama dengan lima belas.' },
    'Bahasa Inggris': { prompt: 'Complete it: “I have two ...”', options: ['books', 'book', 'bookes'], correct: 'books', hint: 'Lebih dari satu book disebut books.' },
    'Sains & Dunia Sekitar': { prompt: 'Bagian tumbuhan mana yang menyerap air?', options: ['Akar', 'Bunga', 'Buah'], correct: 'Akar', hint: 'Akar menyerap air dan mineral dari tanah.' },
  },
  '3': {
    'Bahasa Indonesia': { prompt: 'Manakah kata yang memiliki arti sama dengan “gembira”?', options: ['Senang', 'Sedih', 'Marah'], correct: 'Senang', hint: 'Gembira dan senang memiliki arti yang mirip.' },
    'Matematika': { prompt: 'Berapakah hasil 6 × 4?', options: ['20', '24', '28'], correct: '24', hint: 'Enam kelompok berisi empat jumlahnya dua puluh empat.' },
    'Bahasa Inggris': { prompt: 'Choose the correct sentence.', options: ['She likes apples.', 'She like apples.', 'She liking apples.'], correct: 'She likes apples.', hint: 'Gunakan likes setelah she.' },
    'Sains & Dunia Sekitar': { prompt: 'Perubahan air menjadi uap disebut apa?', options: ['Menguap', 'Membeku', 'Mencair'], correct: 'Menguap', hint: 'Panas mengubah air cair menjadi uap.' },
  },
};

const parentSkills = [
  { name: 'Membaca dan memahami', status: 'Makin lancar', value: 76, color: 'var(--brand-coral)', icon: '📖' },
  { name: 'Berhitung dan logika', status: 'Perlu latihan', value: 48, color: 'var(--brand-blue)', icon: '🧠' },
  { name: 'Berani menjawab', status: 'Berkembang baik', value: 82, color: 'var(--brand-green)', icon: '💪' },
];

function Meter({ value, color }: { value: number; color?: string }) {
  return <div className="toy-meter"><Progress value={value} style={{ '--meter-color': color ?? 'var(--brand-blue)' } as CSSProperties}><ProgressTrack><ProgressIndicator /></ProgressTrack></Progress><span style={{ left: `calc(${value}% - 15px)` }}>⭐</span></div>;
}

function Logo() {
  return <div className="brand" aria-label="Zeka123"><img src="/assets/zeka-wordmark.png" alt="ZEKA" /><span className="brand-number">123</span></div>;
}

function TopBar({ profile, onEdit, parent = false }: { profile: ChildProfile; onEdit: () => void; parent?: boolean }) {
  return <header className="topbar"><Logo /><div className="topbar-actions">{!parent && <><div className="streak"><span>🔥</span><b>4</b><small>hari</small></div><div className="points"><span>⭐</span><b>240</b></div></>}<button className="avatar" onClick={onEdit} aria-label="Edit profil anak">{profile.name.charAt(0).toUpperCase()}</button></div></header>;
}

function ProfileForm({ initial, onSave, title = 'Kenalan dulu, yuk!' }: { initial?: ChildProfile; onSave: (profile: ChildProfile) => void; title?: string }) {
  const [name, setName] = useState(initial?.name ?? '');
  const [age, setAge] = useState(initial?.age ?? '7');
  const [grade, setGrade] = useState<ChildProfile['grade']>(initial?.grade ?? '1');
  const submit = (event: FormEvent) => { event.preventDefault(); if (name.trim()) onSave({ name: name.trim(), age, grade }); };
  return <form className="profile-form" onSubmit={submit}>
    <div><p className="eyebrow">Profil petualang</p><h1>{title}</h1><p>Kobi akan memilihkan permainan dan soal yang pas untukmu.</p></div>
    <div className="field"><Label htmlFor="child-name">Nama Anak</Label><Input id="child-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Contoh: Nara" autoComplete="off" required /></div>
    <div className="field-row">
      <div className="field"><Label htmlFor="child-age">Usia</Label><NativeSelect id="child-age" value={age} onChange={(e) => setAge(e.target.value)}>{['6','7','8','9'].map((item) => <NativeSelectOption key={item} value={item}>{item} tahun</NativeSelectOption>)}</NativeSelect></div>
      <div className="field"><Label htmlFor="child-grade">Jenjang Pendidikan</Label><NativeSelect id="child-grade" value={grade} onChange={(e) => setGrade(e.target.value as ChildProfile['grade'])}><NativeSelectOption value="1">Kelas 1 SD</NativeSelectOption><NativeSelectOption value="2">Kelas 2 SD</NativeSelectOption><NativeSelectOption value="3">Kelas 3 SD</NativeSelectOption></NativeSelect></div>
    </div>
    <Button className="big-primary" type="submit"><Rocket size={21} /> {initial ? 'Simpan perubahan' : 'Mulai petualangan'}</Button>
  </form>;
}

function Onboarding({ onSave }: { onSave: (profile: ChildProfile) => void }) {
  return <main className="onboarding"><div className="onboarding-cloud one" /><div className="onboarding-cloud two" /><section className="onboarding-card"><div className="onboarding-brand"><Logo /><small>Zona Eksplorasi Kompetensi Anak</small></div><div className="onboarding-mascot"><span>Hai! Aku <b>Kobi</b> 👋</span><img src="/assets/zeka-mascot.png" alt="Kobi si panda merah menyapa" /></div><ProfileForm onSave={onSave} /><p className="privacy-note"><ShieldCheck size={16} /> Data profil tersimpan aman di perangkat ini.</p></section></main>;
}

function SubjectIcon({ subject }: { subject: (typeof subjects)[number] }) {
  return <span className={`cartoon-subject-icon ${subject.color}`} aria-hidden="true"><span>{subject.icon}</span>{subject.name === 'Bahasa Inggris' && <b>ABC</b>}</span>;
}

function HomeView({ profile, onEdit, onSubject, onExplore }: { profile: ChildProfile; onEdit: () => void; onSubject: (subject: SubjectName) => void; onExplore: () => void }) {
  return <><TopBar profile={profile} onEdit={onEdit} /><main className="content home-view">
    <section className="welcome-row"><div><h1>Halo, {profile.name}! <span aria-hidden="true">👋</span></h1><p className="soft-copy">Petualang Kelas {profile.grade}, siap main sambil belajar?</p></div><span className="grade-sticker">Kelas {profile.grade}</span></section>
    <section className="mission-card"><div className="mission-copy"><div className="pill"><Clock3 size={16} /> Misi 8 menit</div><h2>Tantangan seru<br />menunggumu!</h2><p>Kobi sudah memilih soal sesuai kemampuan Kelas {profile.grade}.</p><Button className="primary-action" onClick={() => onSubject('Bahasa Indonesia')}><Play size={19} fill="currentColor" /> Mulai misi</Button></div><div className="mascot-wrap"><span className="speech">Ayo, {profile.name}!</span><img src="/assets/zeka-mascot.png" alt="Kobi si panda merah" /></div></section>
    <section className="section-block"><div className="section-heading"><div><p className="eyebrow">Pilih petualangan</p><h2>Mau belajar apa?</h2></div><Button variant="ghost" onClick={onExplore} className="see-all">Lihat semua <ChevronRight size={18} /></Button></div><div className="subject-grid">{subjects.map((subject) => <button key={subject.name} className={`subject-card ${subject.color}`} onClick={() => onSubject(subject.name)}><SubjectIcon subject={subject} /><h3>{subject.name}</h3><p>{subject.description}</p><div className="subject-bottom"><span>5 modul terbuka</span><span className="go-bubble"><ChevronRight size={18} /></span></div></button>)}</div></section>
    <button className="home-activity"><span className="activity-icon">🏠</span><span><strong>Misi keluarga hari ini</strong><small>Cari 3 benda berbentuk lingkaran di rumah</small></span><ChevronRight size={22} /></button>
  </main></>;
}

function ExploreView({ profile, onEdit, onSubject }: { profile: ChildProfile; onEdit: () => void; onSubject: (subject: SubjectName) => void }) {
  return <><TopBar profile={profile} onEdit={onEdit} /><main className="content"><div className="page-title"><p className="eyebrow">Untuk Kelas {profile.grade}</p><h1>Pilih dunia belajarmu</h1><p className="soft-copy">Semua mata pelajaran boleh dijelajahi. Lima modul pertama terbuka.</p></div><div className="module-list">{subjects.map((subject) => <button className={`world-card ${subject.color}`} key={subject.name} onClick={() => onSubject(subject.name)}><SubjectIcon subject={subject} /><div><small>5 MODUL GRATIS</small><h2>{subject.name}</h2><p>{subject.description}</p></div><span className="world-arrow"><ChevronRight /></span></button>)}</div><div className="gentle-note"><span>💡</span><p><strong>Tidak perlu terburu-buru.</strong> Kobi menyesuaikan tantangan dari jenjang dan jawabanmu.</p></div></main></>;
}

function ModulesView({ profile, subjectName, onBack, onLesson, onPremium }: { profile: ChildProfile; subjectName: SubjectName; onBack: () => void; onLesson: () => void; onPremium: () => void }) {
  const subject = subjects.find((item) => item.name === subjectName)!;
  const sceneIcons = ['🌳', '☁️', '🏕️', '🌈', '⛺', '⛰️', '🎈', '🏰'];
  const moduleNames = ['Ayo kenalan', 'Coba bersama Kobi', 'Main dan pilih', 'Cerita mini', 'Tantangan bintang', 'Petualangan lanjut', 'Misi kejutan', 'Uji kehebatan'];
  return <main className={`modules-view ${subject.color}`}>
    <header className="path-header"><Button variant="ghost" size="icon" onClick={onBack} aria-label="Kembali"><ArrowLeft /></Button><Logo /><span className="path-grade">Kelas {profile.grade}</span></header>
    <section className="path-intro"><SubjectIcon subject={subject} /><div><p className="eyebrow">Jalur petualangan</p><h1>{subject.name}</h1><p>Ikuti jalan bersama Kobi. Lima pos pertama terbuka gratis.</p></div></section>
    <section className="adventure-map"><div className="map-river" aria-hidden="true" />{Array.from({ length: 8 }, (_, index) => { const unlocked = index < 5; return <div className={`map-row ${index % 2 ? 'right' : 'left'}`} key={index}><span className="scene-icon" aria-hidden="true">{sceneIcons[index]}</span><button className={`map-stop ${unlocked ? 'unlocked' : 'locked'}`} onClick={unlocked ? onLesson : onPremium}><span className="stop-number">{unlocked ? index + 1 : <LockKeyhole size={22} />}</span><span><small>{unlocked ? `MODUL ${index + 1}` : 'PAKET LENGKAP'}</small><strong>{moduleNames[index]}</strong></span>{unlocked && index === 4 && <b>BATAS GRATIS</b>}</button></div>; })}<img className="map-kobi" src="/assets/zeka-mascot.png" alt="Kobi menunggu di ujung jalur belajar" /></section>
  </main>;
}

function SkillList() {
  return <div className="skill-list">{parentSkills.map((skill) => <div className="skill-item" key={skill.name}><span className="skill-emoji">{skill.icon}</span><div className="skill-main"><div><strong>{skill.name}</strong><span>{skill.status}</span></div><Meter value={skill.value} color={skill.color} /></div><b className="skill-score">{skill.value}%</b></div>)}</div>;
}

function PuzzleReward() {
  const pieces = ['🚀', '🌙', '🪐', '⭐', '🛰️', '👨‍🚀'];
  return <section className="puzzle-card"><div className="puzzle-copy"><p className="eyebrow">Tukar bintangmu</p><h2>Puzzle Luar Angkasa</h2><p>Setiap 80 bintang membuka satu potongan. Kumpulkan semuanya untuk melihat kejutan!</p><div className="puzzle-status"><Star size={18} fill="currentColor" /> 240 bintang = 3 potongan</div></div><div className="puzzle-grid" aria-label="3 dari 6 potongan puzzle terbuka">{pieces.map((piece, index) => <span key={piece} className={index < 3 ? 'found' : 'hidden-piece'}>{index < 3 ? piece : <LockKeyhole size={20} />}</span>)}</div></section>;
}

function ProgressView({ profile, onEdit }: { profile: ChildProfile; onEdit: () => void }) {
  return <><TopBar profile={profile} onEdit={onEdit} /><main className="content"><div className="page-title"><p className="eyebrow">Perjalanan {profile.name}</p><h1>Lihat hebatnya kamu!</h1></div><section className="celebration-card"><span className="trophy-blob">🏆</span><div><strong>6 misi selesai!</strong><p>Kobi bangga. Kamu belajar 42 menit minggu ini.</p></div></section><PuzzleReward /><section className="stats-grid"><div><span>⭐</span><strong>240</strong><small>Bintang</small></div><div><span>🔥</span><strong>4 hari</strong><small>Beruntun</small></div><div><span>📖</span><strong>12</strong><small>Cerita dibaca</small></div></section><section className="section-block"><div className="section-heading"><h2>Kekuatan supermu</h2></div><SkillList /></section></main></>;
}

function ParentView({ profile, onEdit, onPremium }: { profile: ChildProfile; onEdit: () => void; onPremium: () => void }) {
  return <><TopBar profile={profile} onEdit={onEdit} parent /><main className="content parent-view"><div className="page-title parent-heading"><div><p className="eyebrow">Ringkasan minggu ini</p><h1>Perkembangan {profile.name}</h1></div><Button variant="outline" className="edit-profile" onClick={onEdit}><Edit3 size={17} /> Edit profil</Button></div><section className="parent-summary"><div className="ring"><span>78%</span><small>target</small></div><div><h2>Belajar makin konsisten</h2><p>{profile.name} belajar 4 dari 5 hari. Materi disesuaikan untuk Kelas {profile.grade}.</p></div></section><section className="stats-grid parent-stats"><div><span>⏱️</span><strong>42 menit</strong><small>Durasi belajar</small></div><div><span>✅</span><strong>6 modul</strong><small>Diselesaikan</small></div><div><span>📈</span><strong>82%</strong><small>Jawaban tepat</small></div></section><section className="section-block parent-panel"><div className="section-heading"><div><p className="eyebrow">Peta kemampuan</p><h2>Yang tumbuh dan perlu dibantu</h2></div></div><SkillList /></section><section className="recommendation"><span>💡</span><div><small>Rekomendasi di rumah</small><h2>Bermain toko-tokoan 10 menit</h2><p>Ajak {profile.name} menghitung total 2–3 barang untuk menguatkan penjumlahan.</p></div></section><button className="premium-banner" onClick={onPremium}><span className="crown">👑</span><span><strong>Buka seluruh petualangan</strong><small>Modul lanjutan, laporan lengkap, dan hadiah baru.</small></span><ChevronRight size={22} /></button></main></>;
}

function LessonView({ profile, subject, onBack }: { profile: ChildProfile; subject: SubjectName; onBack: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null); const question = lessonBank[profile.grade][subject]; const correct = answer === question.correct;
  return <main className="lesson-view"><header className="lesson-header"><Button variant="ghost" size="icon" onClick={onBack} aria-label="Kembali"><ArrowLeft /></Button><Meter value={20} /><span>1/5</span></header><section className="lesson-card"><div className="kobi-mini"><img src="/assets/zeka-mascot.png" alt="Kobi" /><span>Aku bantu, ya!</span></div><p className="eyebrow">{subject} · Kelas {profile.grade}</p><h1>{question.prompt}</h1><button className="sound-button">🔊 Dengarkan</button><div className="answer-grid">{question.options.map((item) => <Button key={item} variant="outline" className={`answer-button ${answer === item ? (item === question.correct ? 'correct' : 'wrong') : ''}`} onClick={() => setAnswer(item)}>{item}</Button>)}</div>{answer && <div className={`feedback ${correct ? 'positive' : 'try-again'}`} role="status"><span>{correct ? '🌟' : '💛'}</span><div><strong>{correct ? 'Hebat, jawabanmu tepat!' : 'Hampir! Coba sekali lagi.'}</strong><p>{correct ? question.hint : 'Salah itu bagian dari belajar. Kobi tetap menemanimu.'}</p></div></div>}<Button className="big-primary lesson-next" disabled={!correct} onClick={onBack}>Lanjutkan <ChevronRight size={19} /></Button></section></main>;
}

function BottomNav({ view, setView }: { view: View; setView: (view: View) => void }) {
  const items = [{ id: 'home' as View, label: 'Beranda', icon: Home, color: 'blue' }, { id: 'explore' as View, label: 'Jelajah', icon: Map, color: 'yellow' }, { id: 'progress' as View, label: 'Hadiah', icon: Puzzle, color: 'coral' }, { id: 'parent' as View, label: 'Orang Tua', icon: UserRound, color: 'green' }];
  return <nav className="bottom-nav" aria-label="Navigasi utama">{items.map(({ id, label, icon: Icon, color }) => <Button key={id} variant="ghost" className={view === id ? `active ${color}` : color} onClick={() => setView(id)}><span className="nav-icon"><Icon size={27} strokeWidth={2.6} /></span><span>{label}</span></Button>)}</nav>;
}

function PremiumDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const [requested, setRequested] = useState(false); return <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) setRequested(false); }}><DialogContent className="premium-dialog"><DialogHeader><span className="dialog-crown">👑</span><DialogTitle>Petualangan berikutnya menunggu!</DialogTitle><DialogDescription>Lima modul pertama tetap gratis. Paket lengkap membuka modul 6 dan seterusnya.</DialogDescription></DialogHeader><ul><li><Check size={19} /> Semua modul di 4 mata pelajaran</li><li><Check size={19} /> Tantangan sesuai kemampuan anak</li><li><Check size={19} /> Puzzle dan hadiah baru</li><li><ShieldCheck size={19} /> Tanpa iklan dan chat publik</li></ul>{requested ? <div className="payment-note"><Check size={21} /><span><strong>Siap dilanjutkan</strong>Alur pembayaran aman orang tua akan dibuka di tahap berikutnya.</span></div> : <Button className="premium-cta" onClick={() => setRequested(true)}>Lihat paket lengkap</Button>}<p className="fine-print">Pembelian hanya dapat dilakukan oleh orang tua.</p></DialogContent></Dialog>;
}

export default function HomePage() {
  const [ready, setReady] = useState(false); const [profile, setProfile] = useState<ChildProfile | null>(null); const [view, setView] = useState<View>('home'); const [subject, setSubject] = useState<SubjectName>('Bahasa Indonesia'); const [premiumOpen, setPremiumOpen] = useState(false); const [editOpen, setEditOpen] = useState(false);
  useEffect(() => { const saved = localStorage.getItem('zeka-child-profile'); if (saved) { try { setProfile(JSON.parse(saved)); } catch {} } setReady(true); }, []);
  const saveProfile = (next: ChildProfile) => { localStorage.setItem('zeka-child-profile', JSON.stringify(next)); setProfile(next); setEditOpen(false); setView('home'); };
  const openSubject = (next: SubjectName) => { setSubject(next); setView('modules'); };
  useEffect(() => { type ModelContext = { registerTool: (tool: object, options: { signal: AbortSignal }) => void | Promise<void> }; const context = (document as Document & { modelContext?: ModelContext }).modelContext; if (!context?.registerTool) return; const lifecycle = new AbortController(); void Promise.resolve(context.registerTool({ name: 'start_learning_session', title: 'Mulai sesi belajar', description: 'Membuka jalur belajar gratis sesuai profil kelas anak.', inputSchema: { type: 'object', properties: { subject: { type: 'string', enum: subjects.map((item) => item.name) } }, required: ['subject'], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute(input: { subject: SubjectName }) { if (!subjects.some((item) => item.name === input.subject)) throw new Error('Mata pelajaran tidak tersedia.'); setSubject(input.subject); setView('modules'); return { status: 'opened', subject: input.subject, freeModules: 5 }; } }, { signal: lifecycle.signal })).catch(() => undefined); return () => lifecycle.abort(); }, []);
  if (!ready) return <div className="splash"><Logo /><span>Menyiapkan petualangan...</span></div>;
  if (!profile) return <Onboarding onSave={saveProfile} />;
  return <div className="app-shell">
    {view === 'home' && <HomeView profile={profile} onEdit={() => setEditOpen(true)} onSubject={openSubject} onExplore={() => setView('explore')} />}
    {view === 'explore' && <ExploreView profile={profile} onEdit={() => setEditOpen(true)} onSubject={openSubject} />}
    {view === 'progress' && <ProgressView profile={profile} onEdit={() => setEditOpen(true)} />}
    {view === 'parent' && <ParentView profile={profile} onEdit={() => setEditOpen(true)} onPremium={() => setPremiumOpen(true)} />}
    {view === 'modules' && <ModulesView profile={profile} subjectName={subject} onBack={() => setView('explore')} onLesson={() => setView('lesson')} onPremium={() => setPremiumOpen(true)} />}
    {view === 'lesson' && <LessonView profile={profile} subject={subject} onBack={() => setView('modules')} />}
    {!['modules','lesson'].includes(view) && <BottomNav view={view} setView={setView} />}
    <Dialog open={editOpen} onOpenChange={setEditOpen}><DialogContent className="edit-dialog"><ProfileForm initial={profile} onSave={saveProfile} title="Edit profil anak" /></DialogContent></Dialog>
    <PremiumDialog open={premiumOpen} setOpen={setPremiumOpen} />
  </div>;
}