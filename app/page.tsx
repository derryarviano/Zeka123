'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import {
  ArrowLeft, BarChart3, BookOpen, Calculator, Check, ChevronRight, Clock3,
  Crown, Flame, FlaskConical, Heart, Home, Languages, Lightbulb, LockKeyhole,
  Map, Play, ShieldCheck, Sparkles, Star, Timer, Trophy, UserRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Progress, ProgressIndicator, ProgressTrack } from '@/components/ui/progress';

type View = 'home' | 'explore' | 'progress' | 'parent' | 'lesson';

const subjects = [
  { name: 'Bahasa Indonesia', description: 'Membaca kata sederhana', icon: BookOpen, color: 'coral', progress: 60, lessons: '3 modul gratis', locked: false },
  { name: 'Matematika', description: 'Tambah sampai 20', icon: Calculator, color: 'blue', progress: 35, lessons: '2 modul gratis', locked: false },
  { name: 'Bahasa Inggris', description: 'My first words', icon: Languages, color: 'yellow', progress: 0, lessons: 'Paket lengkap', locked: true },
  { name: 'Sains & Dunia Sekitar', description: 'Kenali makhluk hidup', icon: FlaskConical, color: 'green', progress: 0, lessons: 'Paket lengkap', locked: true },
];

const parentSkills = [
  { name: 'Membaca suku kata', status: 'Makin lancar', value: 76, color: 'var(--brand-coral)' },
  { name: 'Penjumlahan sampai 20', status: 'Perlu latihan', value: 48, color: 'var(--brand-blue)' },
  { name: 'Berani menjawab', status: 'Berkembang baik', value: 82, color: 'var(--brand-green)' },
];

function Meter({ value, color }: { value: number; color?: string }) {
  return (
    <Progress value={value} style={{ '--meter-color': color ?? 'var(--brand-blue)' } as CSSProperties}>
      <ProgressTrack><ProgressIndicator /></ProgressTrack>
    </Progress>
  );
}

function Logo() {
  return <div className="brand" aria-label="Zeka 123"><span className="brand-mark"><Sparkles size={20} strokeWidth={3} /></span><span>Zeka<span>123</span></span></div>;
}

function TopBar({ parent = false }: { parent?: boolean }) {
  return (
    <header className="topbar">
      <Logo />
      <div className="topbar-actions">
        {!parent && <div className="streak"><Flame size={17} fill="currentColor" /> 4 hari</div>}
        <button className="avatar" aria-label={parent ? 'Profil orang tua' : 'Profil Nara'}>{parent ? 'B' : 'N'}</button>
      </div>
    </header>
  );
}

function HomeView({ onLesson, onExplore, onPremium }: { onLesson: () => void; onExplore: () => void; onPremium: () => void }) {
  return (
    <>
      <TopBar />
      <main className="content home-view">
        <section className="welcome-row">
          <div><p className="eyebrow">Senin, 7 September</p><h1>Halo, Nara! <span aria-hidden="true">👋</span></h1><p className="soft-copy">Siap untuk petualangan kecil hari ini?</p></div>
          <div className="points"><Star size={18} fill="currentColor" /> 240</div>
        </section>

        <section className="mission-card">
          <div className="mission-copy">
            <div className="pill"><Clock3 size={15} /> Sesi 8 menit</div>
            <h2>Misi hari ini:<br />Temukan kata!</h2>
            <p>Bantu Zeka memilih kata yang dimulai dengan huruf B.</p>
            <Button className="primary-action" onClick={onLesson}><Play size={18} fill="currentColor" /> Mulai belajar</Button>
          </div>
          <div className="mascot-wrap"><span className="speech">Kita coba bersama!</span><img src="/assets/zeka-mascot.png" alt="Zeka si panda merah melambaikan tangan" /></div>
        </section>

        <section className="section-block">
          <div className="section-heading"><div><p className="eyebrow">Dipilih untukmu</p><h2>Jalur belajarmu</h2></div><Button variant="ghost" onClick={onExplore} className="see-all">Lihat semua <ChevronRight size={17} /></Button></div>
          <div className="subject-grid">
            {subjects.map((subject) => {
              const Icon = subject.icon;
              return (
                <button key={subject.name} className={`subject-card ${subject.color} ${subject.locked ? 'is-locked' : ''}`} onClick={subject.locked ? onPremium : onLesson}>
                  <span className="subject-icon"><Icon size={24} strokeWidth={2.4} /></span>
                  {subject.locked && <span className="lock-badge"><LockKeyhole size={14} /> Lengkap</span>}
                  <h3>{subject.name}</h3><p>{subject.description}</p>
                  <div className="subject-bottom"><span>{subject.lessons}</span>{!subject.locked && <span className="mini-progress"><i style={{ width: `${subject.progress}%` }} /></span>}</div>
                </button>
              );
            })}
          </div>
        </section>

        <button className="home-activity"><span className="activity-icon"><Heart size={22} fill="currentColor" /></span><span><strong>Aktivitas bersama orang tua</strong><small>Cari 3 benda berbentuk lingkaran di rumah</small></span><ChevronRight size={20} /></button>
      </main>
    </>
  );
}

function ExploreView({ onLesson, onPremium }: { onLesson: () => void; onPremium: () => void }) {
  return (
    <><TopBar /><main className="content">
      <div className="page-title"><p className="eyebrow">Belajar sesuai kemampuanmu</p><h1>Jelajah pelajaran</h1><p className="soft-copy">Kami membuka langkah berikutnya sedikit demi sedikit.</p></div>
      <div className="module-list">
        {subjects.map((subject, index) => {
          const Icon = subject.icon;
          return <article className={`module-row ${subject.color}`} key={subject.name}>
            <span className="subject-icon"><Icon size={25} /></span>
            <div className="module-copy"><small>Jalur {index + 1}</small><h2>{subject.name}</h2><p>{subject.description}</p></div>
            <Button variant={subject.locked ? 'outline' : 'default'} className={subject.locked ? 'locked-button' : 'round-play'} size={subject.locked ? 'default' : 'icon'} onClick={subject.locked ? onPremium : onLesson}>{subject.locked ? <><LockKeyhole size={15} /> Buka</> : <Play size={17} fill="currentColor" />}</Button>
          </article>;
        })}
      </div>
      <div className="gentle-note"><Lightbulb size={21} /><p><strong>Tidak perlu terburu-buru.</strong> Zeka akan menyesuaikan latihan dari jawabanmu.</p></div>
    </main></>
  );
}

function SkillList() {
  return <div className="skill-list">{parentSkills.map((skill) => <div className="skill-item" key={skill.name}><div><strong>{skill.name}</strong><span>{skill.status}</span></div><Meter value={skill.value} color={skill.color} /></div>)}</div>;
}

function ProgressView() {
  return (
    <><TopBar /><main className="content">
      <div className="page-title"><p className="eyebrow">Perjalanan Nara</p><h1>Kemajuan belajarku</h1></div>
      <section className="celebration-card"><Trophy size={38} /><div><strong>Hebat, 6 misi selesai!</strong><p>Kamu sudah belajar selama 42 menit minggu ini.</p></div></section>
      <section className="stats-grid"><div><Star size={21} /><strong>240</strong><span>Bintang</span></div><div><Flame size={21} /><strong>4 hari</strong><span>Beruntun</span></div><div><BookOpen size={21} /><strong>12</strong><span>Cerita dibaca</span></div></section>
      <section className="section-block"><div className="section-heading"><h2>Kemampuan yang tumbuh</h2></div><SkillList /></section>
    </main></>
  );
}

function ParentView({ onPremium }: { onPremium: () => void }) {
  return (
    <><TopBar parent /><main className="content parent-view">
      <div className="page-title parent-heading"><div><p className="eyebrow">Ringkasan minggu ini</p><h1>Perkembangan Nara</h1></div><span className="class-pill">Kelas 2</span></div>
      <section className="parent-summary"><div className="ring" aria-label="Target mingguan 78 persen"><span>78%</span><small>target</small></div><div><h2>Belajar makin konsisten</h2><p>Nara belajar 4 dari 5 hari yang direncanakan. Membaca menjadi kekuatan utamanya minggu ini.</p></div></section>
      <section className="stats-grid parent-stats"><div><Timer size={21} /><strong>42 menit</strong><span>Durasi belajar</span></div><div><Check size={21} /><strong>6 modul</strong><span>Diselesaikan</span></div><div><BarChart3 size={21} /><strong>82%</strong><span>Jawaban tepat</span></div></section>
      <section className="section-block parent-panel"><div className="section-heading"><div><p className="eyebrow">Peta kemampuan</p><h2>Yang sudah dan perlu dibantu</h2></div></div><SkillList /></section>
      <section className="recommendation"><span><Lightbulb size={23} /></span><div><small>Rekomendasi di rumah</small><h2>Bermain toko-tokoan selama 10 menit</h2><p>Ajak Nara menghitung total 2–3 barang untuk menguatkan penjumlahan.</p></div></section>
      <button className="premium-banner" onClick={onPremium}><span className="crown"><Crown size={23} /></span><span><strong>Buka semua petualangan belajar</strong><small>4 mata pelajaran, laporan lengkap, dan aktivitas baru.</small></span><ChevronRight size={20} /></button>
    </main></>
  );
}

function LessonView({ onBack }: { onBack: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);
  const correct = answer === 'Buku';
  return (
    <main className="lesson-view">
      <header className="lesson-header"><Button variant="ghost" size="icon" onClick={onBack} aria-label="Kembali"><ArrowLeft /></Button><Meter value={25} /><span>1/4</span></header>
      <section className="lesson-card">
        <div className="zeka-mini"><img src="/assets/zeka-mascot.png" alt="Zeka" /></div><p className="eyebrow">Misi membaca</p>
        <h1>Kata mana yang dimulai dengan huruf <em>B</em>?</h1><button className="sound-button" aria-label="Dengarkan pertanyaan">🔊 Dengarkan</button>
        <div className="answer-grid">{['Buku', 'Sapu', 'Meja'].map((item) => <Button key={item} variant="outline" className={`answer-button ${answer === item ? (item === 'Buku' ? 'correct' : 'wrong') : ''}`} onClick={() => setAnswer(item)}>{item}</Button>)}</div>
        {answer && <div className={`feedback ${correct ? 'positive' : 'try-again'}`} role="status">{correct ? <Check size={23} /> : <Heart size={23} />}<div><strong>{correct ? 'Hebat, kamu menemukannya!' : 'Hampir benar. Coba dengarkan bunyi awalnya.'}</strong><p>{correct ? 'Buku dimulai dengan bunyi “B”.' : 'Tidak apa-apa salah. Zeka akan membantumu.'}</p></div></div>}
        <Button className="primary-action lesson-next" disabled={!correct} onClick={onBack}>Lanjutkan <ChevronRight size={18} /></Button>
      </section>
    </main>
  );
}

function BottomNav({ view, setView }: { view: View; setView: (view: View) => void }) {
  const items = [{ id: 'home' as View, label: 'Beranda', icon: Home }, { id: 'explore' as View, label: 'Jelajah', icon: Map }, { id: 'progress' as View, label: 'Kemajuan', icon: Trophy }, { id: 'parent' as View, label: 'Orang Tua', icon: UserRound }];
  return <nav className="bottom-nav" aria-label="Navigasi utama">{items.map(({ id, label, icon: Icon }) => <Button key={id} variant="ghost" className={view === id ? 'active' : ''} onClick={() => setView(id)}><Icon size={21} /><span>{label}</span></Button>)}</nav>;
}

function PremiumDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const [requested, setRequested] = useState(false);
  return (
    <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) setRequested(false); }}>
      <DialogContent className="premium-dialog"><DialogHeader><span className="dialog-crown"><Crown size={28} /></span><DialogTitle>Paket Belajar Lengkap</DialogTitle><DialogDescription>Lebih banyak ruang untuk tumbuh, tetap dengan sesi singkat dan aman untuk anak.</DialogDescription></DialogHeader>
        <ul><li><Check size={18} /> Semua modul di 4 mata pelajaran</li><li><Check size={18} /> Jalur adaptif sesuai kemampuan anak</li><li><Check size={18} /> Laporan dan rekomendasi orang tua</li><li><ShieldCheck size={18} /> Tanpa iklan dan tanpa chat publik</li></ul>
        {requested ? <div className="payment-note"><Check size={20} /><span><strong>Siap dilanjutkan</strong>Alur pembayaran aman orang tua akan dibuka di tahap berikutnya.</span></div> : <Button className="premium-cta" onClick={() => setRequested(true)}>Aktifkan paket lengkap</Button>}
        <p className="fine-print">Pembelian hanya dapat dilakukan oleh orang tua.</p>
      </DialogContent>
    </Dialog>
  );
}

export default function HomePage() {
  const [view, setView] = useState<View>('home');
  const [premiumOpen, setPremiumOpen] = useState(false);
  const showPremium = () => setPremiumOpen(true);

  useEffect(() => {
    type ToolInput = { subject?: string };
    type ModelContext = { registerTool: (tool: { name: string; title: string; description: string; inputSchema: object; annotations: { readOnlyHint: boolean; untrustedContentHint: boolean }; execute: (input: ToolInput) => object }, options: { signal: AbortSignal }) => void | Promise<void> };
    const context = (document as Document & { modelContext?: ModelContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: 'start_learning_session',
      title: 'Mulai sesi belajar',
      description: 'Membuka sesi latihan gratis yang sesuai dengan mata pelajaran pilihan anak.',
      inputSchema: { type: 'object', properties: { subject: { type: 'string', enum: ['Bahasa Indonesia', 'Matematika'] } }, additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (input.subject && !['Bahasa Indonesia', 'Matematika'].includes(input.subject)) throw new Error('Mata pelajaran belum tersedia dalam paket gratis.');
        setView('lesson');
        return { status: 'started', subject: input.subject ?? 'Bahasa Indonesia', module: 'Temukan kata' };
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);

  return <div className="app-shell">
    {view === 'home' && <HomeView onLesson={() => setView('lesson')} onExplore={() => setView('explore')} onPremium={showPremium} />}
    {view === 'explore' && <ExploreView onLesson={() => setView('lesson')} onPremium={showPremium} />}
    {view === 'progress' && <ProgressView />}{view === 'parent' && <ParentView onPremium={showPremium} />}{view === 'lesson' && <LessonView onBack={() => setView('home')} />}
    {view !== 'lesson' && <BottomNav view={view} setView={setView} />}<PremiumDialog open={premiumOpen} setOpen={setPremiumOpen} />
  </div>;
}
