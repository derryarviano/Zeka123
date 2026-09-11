export type LessonGrade = '1' | '2' | '3';
export type LessonSubject = 'indo' | 'math' | 'english' | 'science';

export type LessonQuestion = {
  prompt: string;
  options: string[];
  answer: string;
  hint: string;
};

const rotateOptions = (
  answer: string,
  distractors: [string, string],
  seed: number,
) => {
  const values = [...new Set([answer, ...distractors])];
  let fallback = 1;
  while (values.length < 3) {
    const numericAnswer = Number(answer);
    const candidate = Number.isFinite(numericAnswer)
      ? String(numericAnswer + fallback)
      : answer.length === 1
        ? String.fromCharCode(97 + ((answer.charCodeAt(0) - 96 + fallback * 7) % 26))
        : 'Pilihan lain ' + fallback;
    if (!values.includes(candidate)) values.push(candidate);
    fallback += 1;
  }
  const shift = seed % values.length;
  return [...values.slice(shift), ...values.slice(0, shift)];
};

const question = (
  prompt: string,
  answer: string,
  distractors: [string, string],
  hint: string,
  seed: number,
): LessonQuestion => ({
  prompt,
  answer,
  options: rotateOptions(answer, distractors, seed),
  hint,
});

const words = [
  ['buku', 'bu', 'benda'],
  ['bola', 'bo', 'benda'],
  ['meja', 'me', 'benda'],
  ['kucing', 'ku', 'hewan'],
  ['mangga', 'mang', 'tumbuhan'],
  ['sepeda', 'se', 'benda'],
  ['kelinci', 'ke', 'hewan'],
  ['melati', 'me', 'tumbuhan'],
  ['payung', 'pa', 'benda'],
  ['burung', 'bu', 'hewan'],
  ['kelapa', 'ke', 'tumbuhan'],
  ['pensil', 'pen', 'benda'],
  ['jerapah', 'je', 'hewan'],
  ['mawar', 'ma', 'tumbuhan'],
  ['lemari', 'le', 'benda'],
  ['harimau', 'ha', 'hewan'],
  ['pepaya', 'pe', 'tumbuhan'],
  ['gelas', 'ge', 'benda'],
  ['kupu-kupu', 'ku', 'hewan'],
  ['anggrek', 'ang', 'tumbuhan'],
  ['topi', 'to', 'benda'],
  ['lumba-lumba', 'lum', 'hewan'],
  ['bambu', 'bam', 'tumbuhan'],
  ['sendok', 'sen', 'benda'],
  ['semut', 'se', 'hewan'],
  ['jagung', 'ja', 'tumbuhan'],
  ['tas', 'tas', 'benda'],
  ['penyu', 'pe', 'hewan'],
  ['cemara', 'ce', 'tumbuhan'],
  ['kompas', 'kom', 'benda'],
] as const;

const synonymPairs = [
  ['gembira', 'senang'],
  ['pandai', 'pintar'],
  ['indah', 'elok'],
  ['cepat', 'lekas'],
  ['hening', 'sunyi'],
  ['ramah', 'baik hati'],
  ['rajin', 'tekun'],
  ['hemat', 'irit'],
  ['luas', 'lapang'],
  ['wangi', 'harum'],
  ['kokoh', 'kuat'],
  ['rapi', 'teratur'],
  ['jelas', 'terang'],
  ['sehat', 'bugar'],
  ['unik', 'khas'],
  ['sulit', 'sukar'],
  ['mudah', 'gampang'],
  ['cerdas', 'cerdik'],
  ['damai', 'tenteram'],
  ['cantik', 'menawan'],
  ['kotor', 'kumal'],
  ['lembut', 'halus'],
  ['nyaring', 'lantang'],
  ['sejuk', 'dingin'],
  ['lapar', 'haus makanan'],
  ['marah', 'geram'],
  ['takut', 'gentar'],
  ['penuh', 'berisi'],
  ['kosong', 'hampa'],
  ['tujuan', 'maksud'],
] as const;

const antonymPairs = [
  ['tinggi', 'rendah'],
  ['besar', 'kecil'],
  ['terang', 'gelap'],
  ['panas', 'dingin'],
  ['jauh', 'dekat'],
  ['cepat', 'lambat'],
  ['rajin', 'malas'],
  ['bersih', 'kotor'],
  ['ramai', 'sepi'],
  ['keras', 'lunak'],
  ['panjang', 'pendek'],
  ['tebal', 'tipis'],
  ['awal', 'akhir'],
  ['masuk', 'keluar'],
  ['naik', 'turun'],
  ['maju', 'mundur'],
  ['muda', 'tua'],
  ['penuh', 'kosong'],
  ['menang', 'kalah'],
  ['aman', 'bahaya'],
  ['subur', 'gersang'],
  ['rapi', 'berantakan'],
  ['jujur', 'bohong'],
  ['hemat', 'boros'],
  ['tajam', 'tumpul'],
  ['luas', 'sempit'],
  ['ringan', 'berat'],
  ['kering', 'basah'],
  ['hidup', 'mati'],
  ['datang', 'pergi'],
] as const;

const names = ['Ayu', 'Bima', 'Citra', 'Danu', 'Eka', 'Fani', 'Gita', 'Hadi', 'Intan', 'Joko'];
const actions = ['membaca', 'menata', 'membawa', 'menggambar', 'menanam', 'membersihkan', 'mengamati', 'menghitung', 'menulis', 'merawat'];
const objects = ['buku', 'mainan', 'bekal', 'pemandangan', 'bibit', 'kelas', 'awan', 'kelereng', 'cerita', 'tanaman'];

function indoQuestion(
  grade: LessonGrade,
  moduleIndex: number,
  index: number,
): LessonQuestion {
  const seed = Number(grade) * 1000 + moduleIndex * 10 + index;
  const [word, syllable, category] = words[moduleIndex];
  const name = names[moduleIndex % names.length];
  const action = actions[Math.floor(moduleIndex / 3) % actions.length];
  const object = objects[(moduleIndex * 3 + index) % objects.length];
  const sentence = name + ' ' + action + ' ' + object + '.';

  if (grade === '1') {
    if (index === 0)
      return question(
        'Bunyi awal kata “' + word + '” adalah...',
        syllable,
        [word.slice(-2), word.charAt(word.length - 1)],
        'Ucapkan kata itu perlahan dari bagian pertama.',
        seed,
      );
    if (index === 1)
      return question(
        'Huruf pertama pada kata “' + word + '” adalah...',
        word.charAt(0),
        [word.charAt(1), word.charAt(word.length - 1)],
        'Lihat huruf yang berada paling kiri.',
        seed,
      );
    if (index === 2)
      return question(
        'Pilih penulisan kalimat tentang ' + name + ' yang benar.',
        sentence,
        [sentence.toLowerCase().slice(0, -1), sentence.slice(0, -1)],
        'Kalimat dimulai huruf besar dan diakhiri titik.',
        seed,
      );
    if (index === 3)
      return question(
        'Kata “' + word + '” termasuk kelompok...',
        category,
        category === 'benda' ? ['hewan', 'tumbuhan'] : category === 'hewan' ? ['benda', 'tumbuhan'] : ['benda', 'hewan'],
        'Bayangkan apakah kata itu nama benda, hewan, atau tumbuhan.',
        seed,
      );
    if (index === 4)
      return question(
        'Tanda baca untuk kalimat “Di mana ' + word + ' itu” adalah...',
        '?',
        ['.', '!'],
        'Kalimat yang menanyakan sesuatu memakai tanda tanya.',
        seed,
      );
    return question(
      'Susunan kata yang tepat untuk cerita ' + name + ' adalah...',
      sentence,
      [object + ' ' + name + ' ' + action + '.', action + ' ' + object + ' ' + name + '.'],
      'Mulai dengan siapa, lalu kegiatan, kemudian objeknya.',
      seed,
    );
  }

  const [synonym, synonymAnswer] = synonymPairs[moduleIndex];
  const [antonym, antonymAnswer] = antonymPairs[moduleIndex];
  if (grade === '2') {
    if (index === 0)
      return question('Sinonim kata “' + synonym + '” adalah...', synonymAnswer, [antonymAnswer, object], 'Cari kata yang maknanya paling mirip.', seed);
    if (index === 1)
      return question('Lawan kata “' + antonym + '” adalah...', antonymAnswer, [synonymAnswer, word], 'Cari kata dengan arti yang berlawanan.', seed);
    if (index === 2)
      return question('Predikat dalam kalimat “' + sentence + '” adalah...', action, [name, object], 'Predikat menerangkan tindakan yang dilakukan.', seed);
    if (index === 3)
      return question('Subjek dalam kalimat “' + sentence + '” adalah...', name, [action, object], 'Subjek adalah pelaku dalam kalimat.', seed);
    if (index === 4)
      return question('Lengkapi: “' + name + ' berlatih ... ingin semakin ' + synonym + '.”', 'karena', ['tetapi', 'atau'], 'Gunakan kata penghubung yang menunjukkan alasan.', seed);
    return question(
      'Gagasan utama: “Setiap pagi ' + name + ' ' + action + ' ' + object + '. Kegiatan itu dilakukan dengan tekun.”',
      name + ' tekun ' + action,
      [object + ' hilang', name + ' terlambat'],
      'Pilih jawaban yang merangkum kedua kalimat.',
      seed,
    );
  }

  if (index === 0)
    return question('Makna kata “' + synonym + '” dalam kalimat “Suasana menjadi ' + synonym + '” adalah...', synonymAnswer, [antonymAnswer, object], 'Gunakan konteks kalimat untuk menemukan maknanya.', seed);
  if (index === 1)
    return question('Kalimat efektif tentang ' + name + ' adalah...', sentence, [name + ' sedang ' + action + ' ' + object + ' sekali.', name + ' ' + action + ' daripada ' + object + '.'], 'Kalimat efektif singkat, jelas, dan tidak memakai kata berlebihan.', seed);
  if (index === 2)
    return question('Hubungan dalam kalimat “' + name + ' ' + action + ' agar ' + object + ' tertata” adalah...', 'tujuan', ['pertentangan', 'pilihan'], 'Kata “agar” menandai sebuah tujuan.', seed);
  if (index === 3)
    return question('Antonim yang tepat untuk kata “' + antonym + '” adalah...', antonymAnswer, [synonymAnswer, word], 'Pilih makna yang paling berlawanan.', seed);
  if (index === 4)
    return question(
      'Simpulan: “' + name + ' ' + action + ' setiap hari. Hasilnya menjadi semakin ' + synonym + '.”',
      'Latihan rutin memberi hasil baik.',
      ['Latihan harus dihentikan.', object + ' tidak diperlukan.'],
      'Simpulan merangkum sebab dan hasil.',
      seed,
    );
  return question('Penulisan judul yang tepat adalah...', 'Petualangan ' + name + ' dan ' + word[0].toUpperCase() + word.slice(1), ['petualangan ' + name + ' dan ' + word, 'Petualangan ' + name + ' Dan ' + word], 'Huruf kapital dipakai pada kata penting dalam judul.', seed);
}

function mathQuestion(
  grade: LessonGrade,
  moduleIndex: number,
  index: number,
): LessonQuestion {
  const g = Number(grade);
  const seed = g * 1000 + moduleIndex * 10 + index;
  const [word] = words[moduleIndex];
  if (grade === '1') {
    const a = 12 + moduleIndex * 2 + index;
    const b = 2 + ((moduleIndex + index) % 8);
    if (index === 0) return question('Nara punya ' + a + ' kelereng lalu mendapat ' + b + ' lagi. Jumlahnya...', String(a + b), [String(a - b), String(a + b + 1)], 'Tambahkan kedua banyak kelereng.', seed);
    if (index === 1) return question('Dari ' + a + ' stiker, ' + b + ' diberikan. Sisanya...', String(a - b), [String(a + b), String(a - b + 2)], 'Kurangi jumlah awal dengan yang diberikan.', seed);
    if (index === 2) return question('Bilangan setelah ' + a + ' adalah...', String(a + 1), [String(a - 1), String(a + 2)], 'Hitung maju satu langkah.', seed);
    if (index === 3) return question('Bilangan terbesar di antara pilihan berikut adalah...', String(a + b), [String(a), String(a - b)], 'Bandingkan nilai setiap bilangan.', seed);
    if (index === 4) return question('Lengkapi pola: ' + a + ', ' + (a + 2) + ', ' + (a + 4) + ', ...', String(a + 6), [String(a + 5), String(a + 8)], 'Pola bertambah dua.', seed);
    const groups = 2 + (moduleIndex % 4);
    return question('Ada ' + groups * 2 + ' ' + word + ' dibagi rata ke ' + groups + ' kelompok. Tiap kelompok berisi...', '2', [String(groups), String(groups * 2)], 'Bagikan satu per satu dengan jumlah sama.', seed);
  }
  if (grade === '2') {
    const a = 120 + moduleIndex * 17 + index * 3;
    const b = 20 + ((moduleIndex + index) % 9) * 5;
    const factor = 2 + (moduleIndex % 8);
    if (index === 0) return question(a + ' + ' + b + ' = ...', String(a + b), [String(a + b - 10), String(a + b + 100)], 'Jumlahkan nilai tempat yang sama.', seed);
    if (index === 1) return question(a + ' - ' + b + ' = ...', String(a - b), [String(a + b), String(a - b + 10)], 'Kurangi puluhan lalu satuan.', seed);
    if (index === 2) return question(factor + ' × ' + (3 + (moduleIndex % 7)) + ' = ...', String(factor * (3 + (moduleIndex % 7))), [String(factor * (2 + (moduleIndex % 7))), String(factor * (4 + (moduleIndex % 7)))], 'Perkalian adalah penjumlahan berulang.', seed);
    if (index === 3) return question('Sebanyak ' + factor * (4 + (moduleIndex % 6)) + ' ' + word + ' dibagi ke ' + factor + ' kelompok. Tiap kelompok berisi...', String(4 + (moduleIndex % 6)), [String(factor), String(5 + (moduleIndex % 6))], 'Cari hasil perkalian yang sesuai.', seed);
    if (index === 4) return question('Nilai angka ratusan pada ' + (a + 500) + ' adalah...', String(Math.floor((a + 500) / 100) * 100), [String(Math.floor((a + 500) / 100)), String(((a + 500) % 100))], 'Lihat angka pada tempat ratusan.', seed);
    return question('Kegiatan dengan ' + word + ' dimulai pukul ' + (7 + (moduleIndex % 5)) + '. Dua jam kemudian pukul...', String(9 + (moduleIndex % 5)), [String(8 + (moduleIndex % 5)), String(10 + (moduleIndex % 5))], 'Maju dua angka pada jam.', seed);
  }
  const a = 240 + moduleIndex * 23 + index * 7;
  const b = 35 + (moduleIndex % 10) * 4;
  const factor = 3 + (moduleIndex % 7);
  if (index === 0) return question(a + ' + ' + b + ' = ...', String(a + b), [String(a + b - 10), String(a + b + 100)], 'Jumlahkan dari satuan ke ratusan.', seed);
  if (index === 1) return question(a + ' - ' + b + ' = ...', String(a - b), [String(a - b + 10), String(a + b)], 'Kurangi sesuai nilai tempat.', seed);
  if (index === 2) return question('Ada ' + factor + ' kelompok ' + word + ', masing-masing berisi ' + (6 + (moduleIndex % 6)) + '. Jumlahnya...', String(factor * (6 + (moduleIndex % 6))), [String(factor * (5 + (moduleIndex % 6))), String(factor * (7 + (moduleIndex % 6)))], 'Gunakan fakta perkalian terdekat.', seed);
  if (index === 3) return question('Sebuah persegi panjang panjangnya ' + (8 + moduleIndex) + ' cm dan lebarnya ' + factor + ' cm. Kelilingnya...', String(2 * (8 + moduleIndex + factor)) + ' cm', [String((8 + moduleIndex) * factor) + ' cm', String(8 + moduleIndex + factor) + ' cm'], 'Keliling adalah dua kali jumlah panjang dan lebar.', seed);
  if (index === 4) {
    const denominator = 3 + (moduleIndex % 6);
    return question('Gambar ' + word + ' dibagi menjadi ' + denominator + ' bagian sama besar. Satu bagian ditulis...', '1/' + denominator, ['1/' + (denominator + 1), '2/' + denominator], 'Pembilang satu berarti satu bagian diambil.', seed);
  }
  return question('Ada ' + factor * (5 + (moduleIndex % 5)) + ' ' + word + ' dibagi rata kepada ' + factor + ' anak. Setiap anak mendapat...', String(5 + (moduleIndex % 5)), [String(factor), String(6 + (moduleIndex % 5))], 'Gunakan pembagian sama rata.', seed);
}

const englishWords = [
  ['book', 'buku'], ['house', 'rumah'], ['water', 'air'], ['chair', 'kursi'], ['apple', 'apel'],
  ['school', 'sekolah'], ['family', 'keluarga'], ['garden', 'kebun'], ['pencil', 'pensil'], ['window', 'jendela'],
  ['morning', 'pagi'], ['friend', 'teman'], ['teacher', 'guru'], ['flower', 'bunga'], ['bird', 'burung'],
  ['happy', 'senang'], ['small', 'kecil'], ['clean', 'bersih'], ['yellow', 'kuning'], ['purple', 'ungu'],
  ['kitchen', 'dapur'], ['bedroom', 'kamar tidur'], ['breakfast', 'sarapan'], ['bicycle', 'sepeda'], ['library', 'perpustakaan'],
  ['cloud', 'awan'], ['river', 'sungai'], ['mountain', 'gunung'], ['turtle', 'kura-kura'], ['butterfly', 'kupu-kupu'],
] as const;

function englishQuestion(
  grade: LessonGrade,
  moduleIndex: number,
  index: number,
): LessonQuestion {
  const [english, indonesian] = englishWords[moduleIndex];
  const otherA = englishWords[(moduleIndex + 7) % englishWords.length][0];
  const otherB = englishWords[(moduleIndex + 13) % englishWords.length][0];
  const seed = Number(grade) * 1000 + moduleIndex * 10 + index;
  if (grade === '1') {
    if (index === 0) return question('Which word means “' + indonesian + '”?', english, [otherA, otherB], 'Say each English word slowly.', seed);
    if (index === 1) return question('Choose the first letter of “' + english + '”.', english.charAt(0), [otherA.charAt(0), otherB.charAt(0)], 'Look at the first character.', seed);
    if (index === 2) return question('Complete: “This is a ' + english + '. It is ...”', 'here', ['three', 'eat'], 'Choose a word that tells where it is.', seed);
    if (index === 3) return question('Which phrase is polite when asking for a ' + english + '?', 'Please', ['Never', 'Yesterday'], 'We use “please” for a polite request.', seed);
    if (index === 4) return question('How many words are in “my ' + english + '”?', '2', ['1', '3'], 'Count each word separated by a space.', seed);
    return question('Choose the correct sentence.', 'I see a ' + english + '.', ['I see ' + english + ' a.', 'See I a ' + english + '.'], 'English sentences begin with the subject.', seed);
  }
  if (grade === '2') {
    if (index === 0) return question('Translate “' + indonesian + '” into English.', english, [otherA, otherB], 'Recall the matching vocabulary.', seed);
    if (index === 1) return question('Choose the plural form of “' + english + '”.', english + (english.endsWith('y') ? 's' : 's'), [english, english + 'es'], 'Most nouns add -s in the plural.', seed);
    if (index === 2) return question('Complete: “I have a ' + english + ', ... I use it every day.”', 'and', ['because of', 'under'], 'Use a conjunction that joins two related ideas.', seed);
    if (index === 3) return question('Choose the correct question about a ' + english + '.', 'Where is the ' + english + '?', ['Where the ' + english + ' is?', 'Is where the ' + english + '.'], 'A question starts with the question word and ends with ?. ', seed);
    if (index === 4) return question('Complete: “The ' + english + ' ... near me.”', 'is', ['are', 'am'], 'Use “is” for one thing.', seed);
    return question('Choose the sentence with correct word order.', 'We found the ' + english + ' today.', ['Found we today the ' + english + '.', 'The today we found ' + english + '.'], 'Use subject, verb, object, then time.', seed);
  }
  if (index === 0) return question('Choose the closest meaning of “' + english + '”.', indonesian, [englishWords[(moduleIndex + 5) % 30][1], englishWords[(moduleIndex + 11) % 30][1]], 'Use the vocabulary meaning you learned.', seed);
  if (index === 1) return question('Complete: “Yesterday, we ... the ' + english + '.”', 'observed', ['observe', 'observing'], '“Yesterday” needs a past-tense verb.', seed);
  if (index === 2) return question('Complete: “The ' + english + ' is useful ... it helps us.”', 'because', ['but', 'or'], 'Use “because” to give a reason.', seed);
  if (index === 3) return question('Choose the correct negative sentence.', 'We do not have the ' + english + '.', ['We not have the ' + english + '.', 'We does not have the ' + english + '.'], 'Use “do not” with the subject “we”.', seed);
  if (index === 4) return question('Which question asks for information about the ' + english + '?', 'Why is the ' + english + ' important?', ['The ' + english + ' is important.', 'Important the ' + english + '?'], 'A complete question begins with a question word.', seed);
  return question('Choose the best summary: “We found a ' + english + '. We observed it and wrote notes.”', 'We studied a ' + english + '.', ['We lost every note.', 'We did not see a ' + english + '.'], 'A summary keeps the most important idea.', seed);
}

const livingThings = ['kucing', 'pohon mangga', 'ikan mas', 'bunga matahari', 'ayam', 'rumput', 'kupu-kupu', 'pohon kelapa', 'kelinci', 'lumut', 'burung pipit', 'tanaman cabai', 'semut', 'pohon jambu', 'katak', 'anggrek', 'capung', 'padi', 'penyu', 'bambu', 'lebah', 'jagung', 'cacing', 'mawar', 'belalang', 'pepaya', 'cicak', 'cemara', 'siput', 'teratai'];
const habitats = ['darat', 'kebun', 'air', 'kebun', 'kandang', 'tanah', 'udara', 'pantai', 'darat', 'tempat lembap', 'pepohonan', 'kebun', 'tanah', 'kebun', 'air dan darat', 'tempat teduh', 'dekat air', 'sawah', 'laut', 'tanah', 'sarang', 'ladang', 'tanah', 'kebun', 'rerumputan', 'kebun', 'dinding', 'pegunungan', 'tempat lembap', 'kolam'];
const materials = ['kayu', 'plastik', 'kaca', 'kertas', 'logam', 'kain'];
const phenomena = ['es mencair', 'air menguap', 'bayangan terbentuk', 'magnet menarik paku', 'daun bergerak tertiup angin', 'embun muncul', 'pelangi terlihat', 'benda jatuh', 'suara terdengar', 'lampu menyala'];

function scienceQuestion(
  grade: LessonGrade,
  moduleIndex: number,
  index: number,
): LessonQuestion {
  const target = livingThings[moduleIndex];
  const habitat = habitats[moduleIndex];
  const material = materials[moduleIndex % materials.length];
  const phenomenon = phenomena[moduleIndex % phenomena.length];
  const seed = Number(grade) * 1000 + moduleIndex * 10 + index;
  const level = moduleIndex + 1;
  if (grade === '1') {
    if (index === 0) return question('Manakah yang hidup seperti ' + target + '?', target, ['batu ' + level, 'sendok ' + level], 'Makhluk hidup tumbuh dan membutuhkan makanan.', seed);
    if (index === 1) return question('Tempat hidup yang sesuai untuk ' + target + ' adalah...', habitat, ['lemari', 'kotak pensil'], 'Pilih tempat yang memenuhi kebutuhan makhluk itu.', seed);
    if (index === 2) return question('Agar ' + target + ' tetap hidup, yang paling dibutuhkan adalah...', 'air dan makanan', ['cat dan lem', 'batu dan kaca'], 'Makhluk hidup membutuhkan air dan sumber makanan.', seed);
    if (index === 3) return question('Saat mengamati ' + target + ', benda dari ' + material + ' dapat kita amati dengan indra...', 'penglihatan', ['keseimbangan', 'khayalan'], 'Mata membantu mengamati bentuk dan warna.', seed);
    if (index === 4) return question('Di sekitar ' + target + ', saat ' + phenomenon + ', kita sedang melihat sebuah...', 'perubahan', ['nama orang', 'huruf'], 'Perhatikan keadaan sebelum dan sesudahnya.', seed);
    return question('Cara aman mengamati ' + target + ' adalah...', 'melihat tanpa mengganggu', ['menarik dengan kasar', 'mencicipinya'], 'Amati makhluk hidup dengan lembut dan aman.', seed);
  }
  if (grade === '2') {
    if (index === 0) return question('Ciri yang menunjukkan ' + target + ' adalah makhluk hidup ialah...', 'tumbuh dan berkembang', ['selalu diam', 'tidak membutuhkan air'], 'Makhluk hidup mengalami pertumbuhan.', seed);
    if (index === 1) return question('Hubungan ' + target + ' dengan habitat ' + habitat + ' adalah...', 'habitat menyediakan kebutuhannya', ['habitat menghentikan pertumbuhan', 'keduanya tidak berhubungan'], 'Habitat menyediakan ruang, air, dan makanan.', seed);
    if (index === 2) return question('Ketika merawat ' + target + ', benda berbahan ' + material + ' dipilih berdasarkan...', 'sifat bahannya', ['nama pemiliknya', 'jumlah hurufnya'], 'Setiap bahan memiliki kekuatan dan kegunaan berbeda.', seed);
    if (index === 3) return question('Di habitat ' + target + ', peristiwa “' + phenomenon + '” dapat diketahui melalui...', 'pengamatan', ['tebakan tanpa bukti', 'cerita khayalan'], 'Sains memakai bukti yang dapat diamati.', seed);
    if (index === 4) return question('Jika jumlah air di habitat ' + target + ' berkurang, kemungkinan yang terjadi...', 'kehidupannya terganggu', ['selalu bertambah sehat', 'tidak ada perubahan apa pun'], 'Perubahan habitat memengaruhi makhluk hidup.', seed);
    return question('Langkah pertama menyelidiki ' + phenomenon + ' di sekitar ' + target + ' adalah...', 'menentukan apa yang diamati', ['langsung menyimpulkan', 'mengabaikan hasil'], 'Mulai penyelidikan dengan pertanyaan dan objek jelas.', seed);
  }
  if (index === 0) return question('Adaptasi membantu ' + target + ' untuk...', 'bertahan di habitatnya', ['mengubah semua cuaca', 'hidup tanpa energi'], 'Adaptasi sesuai dengan kondisi habitat.', seed);
  if (index === 1) return question('Jika ' + target + ' berkurang drastis, keseimbangan di ' + habitat + ' dapat...', 'terganggu', ['selalu tetap sama', 'hilang tanpa sebab'], 'Setiap organisme berperan dalam ekosistem.', seed);
  if (index === 2) return question('Dalam penelitian ' + target + ', sifat bahan ' + material + ' perlu diuji supaya kita dapat...', 'memilih penggunaan yang tepat', ['mengubah namanya', 'menghitung hurufnya'], 'Pengujian menghubungkan sifat bahan dengan fungsi.', seed);
  if (index === 3) return question('Penjelasan ilmiah untuk “' + phenomenon + '” di habitat ' + target + ' harus didukung oleh...', 'bukti pengamatan', ['pendapat tanpa data', 'jawaban acak'], 'Kesimpulan sains dibangun dari bukti.', seed);
  if (index === 4) return question('Variabel yang perlu dicatat saat meneliti ' + target + ' adalah...', 'perubahan yang diamati', ['warna buku catatan', 'nama jalan'], 'Catat hal yang berhubungan langsung dengan pertanyaan.', seed);
  return question('Tindakan terbaik untuk menjaga habitat ' + target + ' di ' + habitat + ' adalah...', 'mengurangi sampah dan gangguan', ['membuang limbah', 'merusak tempat hidup'], 'Habitat sehat membantu seluruh makhluk di dalamnya.', seed);
}

export function createLessonQuestions(
  subject: LessonSubject,
  grade: LessonGrade,
  moduleIndex: number,
): LessonQuestion[] {
  const safeModule = Math.min(29, Math.max(0, moduleIndex));
  const count = 5 + (safeModule % 2);
  const factory =
    subject === 'indo'
      ? indoQuestion
      : subject === 'math'
        ? mathQuestion
        : subject === 'english'
          ? englishQuestion
          : scienceQuestion;
  return Array.from({ length: count }, (_, index) =>
    factory(grade, safeModule, index),
  );
}
