import 'package:flutter/material.dart';

import '../theme.dart';

class StemExperiment {
  const StemExperiment({
    required this.emoji,
    required this.title,
    required this.category,
    required this.minutes,
    required this.materials,
    required this.steps,
    required this.science,
    required this.safety,
  });

  final String emoji;
  final String title;
  final String category;
  final int minutes;
  final String materials;
  final String steps;
  final String science;
  final String safety;
}

const stemExperiments = <StemExperiment>[
  StemExperiment(
    emoji: '🌋',
    title: 'Lampu lava ceria',
    category: 'Kimia Dapur',
    minutes: 15,
    materials: 'Botol bening, air, minyak sayur, pewarna makanan, tablet effervescent.',
    steps: '1. Isi seperempat botol dengan air dan beri pewarna.\n2. Tambahkan minyak hingga hampir penuh.\n3. Masukkan sedikit tablet dan amati gelembung naik-turun.',
    science: 'Air dan minyak tidak menyatu. Gas dari tablet membawa air berwarna naik lalu turun kembali.',
    safety: 'Dampingi orang tua. Jangan diminum dan jangan tutup botol saat tablet bereaksi.',
  ),
  StemExperiment(
    emoji: '🍋',
    title: 'Gunung meletus lemon',
    category: 'Kimia Dapur',
    minutes: 15,
    materials: 'Lemon, soda kue, sabun cuci piring, pewarna, piring.',
    steps: '1. Letakkan setengah lemon di piring.\n2. Teteskan warna dan sedikit sabun.\n3. Taburkan soda kue lalu aduk lembut bagian buah.',
    science: 'Asam lemon bereaksi dengan soda kue dan menghasilkan gas karbon dioksida.',
    safety: 'Jangan dicicipi. Jauhkan busa dari mata dan cuci tangan setelah selesai.',
  ),
  StemExperiment(
    emoji: '🎈',
    title: 'Balon mengembang sendiri',
    category: 'Kimia Dapur',
    minutes: 15,
    materials: 'Botol plastik, balon, cuka, soda kue, corong.',
    steps: '1. Isi sedikit cuka ke botol.\n2. Masukkan soda kue ke balon.\n3. Pasang balon, lalu jatuhkan bubuk ke botol.',
    science: 'Reaksi menghasilkan gas yang membutuhkan ruang dan mengembangkan balon.',
    safety: 'Kerjakan bersama orang tua. Gunakan balon, jangan pernah menutup reaksi di wadah keras.',
  ),
  StemExperiment(
    emoji: '🫠',
    title: 'Oobleck ajaib',
    category: 'Kimia Dapur',
    minutes: 15,
    materials: 'Tepung maizena, air, mangkuk, pewarna opsional.',
    steps: '1. Campur dua bagian maizena dan satu bagian air.\n2. Tekan cepat lalu sentuh perlahan.\n3. Bandingkan rasanya pada dua gerakan itu.',
    science: 'Oobleck adalah fluida non-Newtonian: terasa padat saat ditekan cepat dan mengalir saat disentuh pelan.',
    safety: 'Jangan dimakan atau dibuang ke wastafel. Masukkan sisa ke tempat sampah.',
  ),
  StemExperiment(
    emoji: '🟠',
    title: 'Clay tanpa dimasak',
    category: 'Kimia Dapur',
    minutes: 20,
    materials: 'Tepung, garam, air, sedikit minyak, pewarna makanan.',
    steps: '1. Campur dua bagian tepung dan satu bagian garam.\n2. Tambahkan air sedikit demi sedikit dan setetes minyak.\n3. Uleni sampai dapat dibentuk.',
    science: 'Air mengikat butiran tepung dan garam; menguleni membuat campuran lebih merata.',
    safety: 'Bukan untuk dimakan. Hentikan jika kulit sensitif atau alergi terhadap bahan.',
  ),
  StemExperiment(
    emoji: '🌈',
    title: 'Air pelangi berjalan',
    category: 'Kimia Dapur',
    minutes: 25,
    materials: 'Enam gelas, air, pewarna merah-kuning-biru, tisu dapur.',
    steps: '1. Isi tiga gelas berselang-seling dengan air berwarna.\n2. Hubungkan gelas memakai tisu terlipat.\n3. Tunggu air berjalan dan warna baru terbentuk.',
    science: 'Air naik melalui serat tisu karena kapilaritas lalu berpindah ke gelas kosong.',
    safety: 'Lindungi meja dari pewarna dan jangan minum air percobaan.',
  ),
  StemExperiment(
    emoji: '🥛',
    title: 'Susu warna menari',
    category: 'Kimia Dapur',
    minutes: 10,
    materials: 'Susu, piring, pewarna makanan, sabun cuci piring, cotton bud.',
    steps: '1. Tuang tipis susu ke piring dan beri tetes warna.\n2. Celupkan cotton bud ke sabun.\n3. Sentuhkan ke permukaan susu dan amati pola.',
    science: 'Sabun mengganggu tegangan permukaan dan berinteraksi dengan lemak susu sehingga warna bergerak.',
    safety: 'Jangan diminum. Cuci tangan dan meja setelah selesai.',
  ),
  StemExperiment(
    emoji: '🧼',
    title: 'Lada takut sabun',
    category: 'Kimia Dapur',
    minutes: 8,
    materials: 'Piring, air, lada bubuk, sabun cuci piring.',
    steps: '1. Isi piring dengan air dan taburkan lada.\n2. Sentuh permukaan dengan jari bersih.\n3. Oleskan sabun pada jari lain lalu sentuh lagi.',
    science: 'Sabun menurunkan tegangan permukaan sehingga air bergerak menjauh dan mendorong lada.',
    safety:
        'Jangan mengusap mata. Buang air dan cuci tangan setelah percobaan.',
  ),
  StemExperiment(
    emoji: '🫧',
    title: 'Kismis menari',
    category: 'Kimia Dapur',
    minutes: 10,
    materials: 'Gelas bening, air soda tanpa warna, beberapa kismis.',
    steps: '1. Tuang air soda ke gelas.\n2. Masukkan kismis.\n3. Amati kismis naik dan turun beberapa kali.',
    science: 'Gelembung gas menempel pada kismis dan mengangkatnya; saat pecah, kismis turun lagi.',
    safety:
        'Percobaan bukan untuk diminum atau dimakan setelah bahan disentuh.',
  ),
  StemExperiment(
    emoji: '🥚',
    title: 'Telur terapung',
    category: 'Kimia Dapur',
    minutes: 10,
    materials: 'Dua gelas, air, garam, dua telur mentah.',
    steps: '1. Isi kedua gelas dengan air.\n2. Larutkan banyak garam pada salah satunya.\n3. Masukkan telur dan bandingkan posisinya.',
    science: 'Air garam lebih rapat daripada air biasa sehingga gaya apungnya lebih besar.',
    safety: 'Orang tua menangani telur mentah. Cuci tangan dan jangan gunakan kembali telurnya.',
  ),
  StemExperiment(
    emoji: '🍯',
    title: 'Menara cairan',
    category: 'Kimia Dapur',
    minutes: 15,
    materials: 'Gelas bening, madu, air berwarna, minyak sayur.',
    steps: '1. Tuang madu perlahan.\n2. Tambahkan air berwarna lewat sisi gelas.\n3. Tambahkan minyak dan amati lapisannya.',
    science: 'Cairan tersusun menurut massa jenis; yang lebih rapat berada di bawah.',
    safety:
        'Jangan diminum. Tuang perlahan bersama orang tua agar tidak tumpah.',
  ),
  StemExperiment(
    emoji: '🟣',
    title: 'Detektif asam dan basa',
    category: 'Kimia Dapur',
    minutes: 25,
    materials: 'Air kol ungu yang disiapkan orang tua, tiga gelas, cuka, larutan soda kue.',
    steps: '1. Tuang indikator kol ke tiga gelas.\n2. Tambahkan cuka pada satu gelas.\n3. Tambahkan larutan soda kue pada gelas lain dan bandingkan warna.',
    science: 'Pigmen kol ungu berubah warna pada kondisi asam dan basa.',
    safety: 'Orang tua menyiapkan air kol. Jangan mencampur bahan pembersih dan jangan diminum.',
  ),
  StemExperiment(
    emoji: '🧊',
    title: 'Memancing es',
    category: 'Kimia Dapur',
    minutes: 10,
    materials: 'Es batu, mangkuk air, benang, garam.',
    steps: '1. Apungkan es di mangkuk.\n2. Letakkan benang di atas es dan tabur sedikit garam.\n3. Tunggu satu menit lalu angkat benang.',
    science: 'Garam mencairkan permukaan es, lalu air membeku kembali dan menjepit benang.',
    safety: 'Lap air yang tumpah agar lantai tidak licin.',
  ),
  StemExperiment(
    emoji: '🧂',
    title: 'Kristal garam matahari',
    category: 'Alam',
    minutes: 20,
    materials: 'Air hangat, garam, piring gelap, sendok.',
    steps: '1. Dengan orang tua, larutkan garam dalam air hangat sampai sulit larut.\n2. Tuang tipis ke piring.\n3. Letakkan di tempat aman dan amati setelah air menguap.',
    science:
        'Saat air menguap, partikel garam tersusun kembali menjadi kristal.',
    safety: 'Orang tua menangani air hangat. Jangan dicicipi dan simpan jauh dari hewan.',
  ),
  StemExperiment(
    emoji: '📎',
    title: 'Klip mengapung',
    category: 'Fisika Seru',
    minutes: 10,
    materials: 'Mangkuk air, klip kertas, sepotong tisu.',
    steps: '1. Letakkan klip di atas tisu kecil.\n2. Turunkan tisu perlahan ke air.\n3. Biarkan tisu tenggelam dan amati klip.',
    science: 'Tegangan permukaan air dapat menopang klip jika permukaannya tidak terganggu.',
    safety:
        'Jauhkan klip kecil dari adik bayi dan simpan kembali setelah selesai.',
  ),
  StemExperiment(
    emoji: '🤿',
    title: 'Penyelam dalam botol',
    category: 'Fisika Seru',
    minutes: 15,
    materials: 'Botol plastik lentur berisi air, pipet kecil atau sachet kecap tertutup.',
    steps: '1. Masukkan penyelam yang masih mengapung.\n2. Tutup botol oleh orang tua.\n3. Tekan botol dan lepaskan untuk melihatnya turun-naik.',
    science: 'Tekanan mengecilkan kantong udara sehingga massa jenis penyelam berubah.',
    safety: 'Gunakan botol plastik, bukan kaca. Jangan membuka atau memakan isi sachet.',
  ),
  StemExperiment(
    emoji: '⚡',
    title: 'Balon listrik statis',
    category: 'Fisika Seru',
    minutes: 10,
    materials: 'Balon, potongan kertas kecil, kain wol atau rambut kering.',
    steps: '1. Tiup dan ikat balon bersama orang tua.\n2. Gosok balon pada kain.\n3. Dekatkan ke potongan kertas tanpa menyentuhnya.',
    science: 'Gesekan memindahkan muatan listrik sehingga balon menarik benda ringan.',
    safety: 'Jauhkan balon pecah dari balita dan orang yang alergi lateks.',
  ),
  StemExperiment(
    emoji: '💧',
    title: 'Air membelok',
    category: 'Fisika Seru',
    minutes: 8,
    materials: 'Sisir plastik, rambut kering, keran air.',
    steps: '1. Atur aliran air sangat kecil.\n2. Gosok sisir pada rambut kering.\n3. Dekatkan sisir ke air tanpa menyentuhnya.',
    science:
        'Muatan statis pada sisir menarik molekul air yang bersifat polar.',
    safety: 'Jaga area lantai tetap kering dan lakukan jauh dari stopkontak.',
  ),
  StemExperiment(
    emoji: '☎️',
    title: 'Telepon gelas',
    category: 'Fisika Seru',
    minutes: 20,
    materials: 'Dua gelas kertas, benang, selotip.',
    steps: '1. Orang tua membuat lubang kecil pada dasar gelas.\n2. Masukkan dan ikat benang.\n3. Tarik benang tegang lalu bergantian bicara dan mendengar.',
    science: 'Getaran suara merambat melalui benang yang tegang dari satu gelas ke gelas lain.',
    safety: 'Lubang dibuat orang tua. Jangan melilitkan benang pada tubuh.',
  ),
  StemExperiment(
    emoji: '🎸',
    title: 'Gitar karet',
    category: 'Fisika Seru',
    minutes: 15,
    materials: 'Kotak kosong, beberapa karet gelang dengan ketebalan berbeda.',
    steps: '1. Rentangkan karet mengelilingi kotak.\n2. Petik satu per satu.\n3. Bandingkan nada karet tebal, tipis, kencang, dan longgar.',
    science: 'Ketegangan, panjang, dan ketebalan memengaruhi kecepatan getaran serta tinggi nada.',
    safety: 'Periksa karet tidak retak dan jauhkan wajah saat memasangnya.',
  ),
  StemExperiment(
    emoji: '🕰️',
    title: 'Bandul berirama',
    category: 'Fisika Seru',
    minutes: 15,
    materials: 'Benang, dua benda ringan yang sama, pensil.',
    steps: '1. Ikat benda pada dua benang dengan panjang berbeda.\n2. Gantung pada pensil yang dipegang orang tua.\n3. Ayunkan dan hitung waktunya.',
    science: 'Panjang tali memengaruhi periode ayunan bandul.',
    safety: 'Gunakan benda lunak dan ringan. Jangan mengayun dekat wajah.',
  ),
  StemExperiment(
    emoji: '🚀',
    title: 'Roket sedotan',
    category: 'Rekayasa',
    minutes: 20,
    materials: 'Kertas, sedotan, selotip, pensil warna.',
    steps: '1. Buat tabung kertas kecil yang tertutup di ujung.\n2. Tambahkan sirip lalu pasang pada sedotan.\n3. Tiup ke arah ruang kosong dan ukur jaraknya.',
    science: 'Udara yang didorong memberi gaya pada roket; bentuk sirip memengaruhi lintasan.',
    safety: 'Jangan arahkan ke wajah dan gunakan roket kertas yang ringan.',
  ),
  StemExperiment(
    emoji: '🎈',
    title: 'Roket balon',
    category: 'Rekayasa',
    minutes: 20,
    materials: 'Balon, sedotan, tali, selotip.',
    steps: '1. Masukkan tali ke sedotan lalu bentangkan.\n2. Tempel balon yang sudah ditiup tetapi belum diikat.\n3. Lepaskan dan amati geraknya.',
    science: 'Udara bergerak ke belakang dan memberikan dorongan ke arah berlawanan.',
    safety:
        'Orang tua membantu mengikat tali. Jauhkan balon pecah dari balita.',
  ),
  StemExperiment(
    emoji: '🚁',
    title: 'Helikopter kertas',
    category: 'Rekayasa',
    minutes: 20,
    materials: 'Kertas, gunting anak, klip kertas.',
    steps: '1. Potong pola helikopter sederhana bersama orang tua.\n2. Lipat dua bilah ke arah berlawanan.\n3. Jatuhkan dari ketinggian aman dan ubah ukuran bilah.',
    science: 'Hambatan udara pada bilah menghasilkan putaran dan memperlambat jatuh.',
    safety: 'Gunakan gunting anak dan jangan naik ke kursi atau tempat tinggi.',
  ),
  StemExperiment(
    emoji: '🪂',
    title: 'Parasut mini',
    category: 'Rekayasa',
    minutes: 25,
    materials:
        'Kantong plastik tipis, empat benang, selotip, boneka sangat ringan.',
    steps: '1. Potong kanopi persegi dengan bantuan orang tua.\n2. Pasang empat benang sama panjang.\n3. Ikat beban ringan dan uji dari tinggi bahu.',
    science:
        'Kanopi memperbesar hambatan udara sehingga benda jatuh lebih lambat.',
    safety: 'Jauhkan plastik dan benang dari balita. Uji hanya dari tempat berpijak aman.',
  ),
  StemExperiment(
    emoji: '⛵',
    title: 'Perahu aluminium',
    category: 'Rekayasa',
    minutes: 20,
    materials: 'Baskom air, aluminium foil, koin.',
    steps: '1. Bentuk foil menjadi perahu.\n2. Letakkan di air.\n3. Tambahkan koin satu per satu dan rancang ulang agar memuat lebih banyak.',
    science: 'Bentuk perahu memindahkan air dan menyebarkan beban sehingga tetap mengapung.',
    safety: 'Lipat tepi foil agar tidak tajam dan lap tumpahan air.',
  ),
  StemExperiment(
    emoji: '🌉',
    title: 'Jembatan kertas kuat',
    category: 'Rekayasa',
    minutes: 20,
    materials: 'Dua gelas, kertas, koin.',
    steps: '1. Bentangkan kertas datar di antara gelas dan uji dengan koin.\n2. Lipat kertas seperti kipas.\n3. Uji lagi dan bandingkan kekuatannya.',
    science: 'Lipatan menambah kekakuan dan menyebarkan gaya pada struktur.',
    safety: 'Gunakan koin hanya di meja dan simpan jauh dari anak kecil.',
  ),
  StemExperiment(
    emoji: '💨',
    title: 'Penunjuk arah angin',
    category: 'Alam',
    minutes: 25,
    materials: 'Gelas kertas, pita ringan, tali, spidol.',
    steps: '1. Tempel beberapa pita pada tepi gelas.\n2. Gantung di luar bersama orang tua.\n3. Amati arah dan kuat gerakan pita pada waktu berbeda.',
    science:
        'Udara bergerak memberikan gaya pada pita dan menunjukkan arah angin.',
    safety: 'Pasang dari tanah, bukan dengan memanjat. Hindari cuaca buruk.',
  ),
  StemExperiment(
    emoji: '☀️',
    title: 'Detektif bayangan',
    category: 'Alam',
    minutes: 30,
    materials: 'Kapur atau kertas, pensil, benda tegak, jam.',
    steps: '1. Letakkan benda tegak di tempat cerah.\n2. Tandai ujung bayangan pada beberapa waktu.\n3. Bandingkan arah dan panjangnya.',
    science: 'Posisi tampak Matahari berubah sepanjang hari sehingga bayangan ikut berubah.',
    safety:
        'Jangan menatap Matahari. Gunakan topi dan lakukan bersama orang tua.',
  ),
  StemExperiment(
    emoji: '🌧️',
    title: 'Siklus air dalam kantong',
    category: 'Alam',
    minutes: 15,
    materials: 'Kantong zip, sedikit air berwarna, selotip, jendela.',
    steps: '1. Masukkan sedikit air ke kantong dan tutup rapat.\n2. Tempel pada jendela yang terkena cahaya.\n3. Amati uap dan tetesan selama beberapa hari.',
    science:
        'Air menguap, mengembun pada kantong, lalu turun seperti hujan kecil.',
    safety: 'Orang tua menempel kantong. Jangan diminum dan periksa agar tidak bocor.',
  ),
  StemExperiment(
    emoji: '🌱',
    title: 'Kacang berkecambah',
    category: 'Alam',
    minutes: 15,
    materials: 'Biji kacang hijau, tisu, gelas bening, air.',
    steps: '1. Letakkan tisu lembap di gelas.\n2. Selipkan beberapa biji di sisi gelas.\n3. Jaga tetap lembap dan catat perubahan tiap hari.',
    science: 'Biji menyerap air dan memakai cadangan makanan untuk memulai pertumbuhan.',
    safety: 'Bukan untuk dimakan. Buang biji yang berjamur dan cuci tangan.',
  ),
  StemExperiment(
    emoji: '🌈',
    title: 'Seledri berubah warna',
    category: 'Alam',
    minutes: 15,
    materials: 'Batang seledri berdaun, gelas, air, pewarna makanan.',
    steps: '1. Beri pewarna pada air di gelas.\n2. Masukkan batang seledri.\n3. Amati urat dan daun setelah beberapa jam atau sehari.',
    science: 'Air bergerak naik melalui pembuluh tumbuhan karena kapilaritas dan tarikan transpirasi.',
    safety: 'Orang tua memotong batang. Jangan makan seledri percobaan.',
  ),
  StemExperiment(
    emoji: '🍃',
    title: 'Daun berkeringat',
    category: 'Alam',
    minutes: 15,
    materials: 'Tanaman sehat, kantong bening, tali lembut.',
    steps: '1. Bungkus beberapa daun dengan kantong.\n2. Ikat longgar tanpa merusak batang.\n3. Amati tetesan setelah beberapa jam lalu lepaskan.',
    science: 'Daun melepaskan uap air melalui transpirasi; uap mengembun di kantong.',
    safety: 'Gunakan tanaman yang dikenal aman dan segera lepaskan kantong setelah pengamatan.',
  ),
  StemExperiment(
    emoji: '🏗️',
    title: 'Menara kertas tertinggi',
    category: 'Rekayasa',
    minutes: 25,
    materials: 'Sepuluh lembar kertas, selotip, penggaris.',
    steps: '1. Rancang menara yang dapat berdiri sendiri.\n2. Gulung atau lipat kertas sebagai tiang.\n3. Ukur, uji, lalu perbaiki rancangan.',
    science: 'Bentuk tabung dan segitiga membantu struktur menahan tekanan serta tetap seimbang.',
    safety: 'Bangun di lantai atau meja yang stabil; jangan memanjat untuk mengukurnya.',
  ),
];

class ExperimentScreen extends StatefulWidget {
  const ExperimentScreen({super.key});

  @override
  State<ExperimentScreen> createState() => _ExperimentScreenState();
}

class _ExperimentScreenState extends State<ExperimentScreen> {
  String category = 'Semua';
  static const categories = [
    'Semua',
    'Kimia Dapur',
    'Fisika Seru',
    'Rekayasa',
    'Alam',
  ];

  @override
  Widget build(BuildContext context) {
    final visible = category == 'Semua'
        ? stemExperiments
        : stemExperiments.where((item) => item.category == category).toList();
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [Color(0xFF126B58), Color(0xFF29A479)],
            ),
            borderRadius: BorderRadius.circular(26),
          ),
          child: Row(
            children: [
              IllustratedIcon(index: 3, size: 66),
              SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'LABORATORIUM STEM',
                      style: TextStyle(
                        color: Colors.white70,
                        fontSize: 11,
                        fontWeight: FontWeight.w900,
                        letterSpacing: .8,
                      ),
                    ),
                    Text(
                      'Eksperimen bersama keluarga',
                      style: TextStyle(
                        fontFamily: 'Fredoka',
                        color: Colors.white,
                        fontSize: 23,
                        height: 1.1,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    SizedBox(height: 5),
                    Text(
                      '${stemExperiments.length} petualangan sains di rumah',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 13, vertical: 10),
          decoration: BoxDecoration(
            color: const Color(0xFFFFF3C7),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFFFFD34F)),
          ),
          child: const Row(
            children: [
              Text('🧑‍🔬', style: TextStyle(fontSize: 25)),
              SizedBox(width: 9),
              Expanded(
                child: Text(
                  'Ayo ajak orang tuamu menyiapkan alat dan mendampingi setiap eksperimen.',
                  style: TextStyle(fontSize: 13, fontWeight: FontWeight.w900),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: categories.map((item) {
              final selected = category == item;
              return Padding(
                padding: const EdgeInsets.only(right: 7),
                child: FilterChip(
                  selected: selected,
                  label: Text(item),
                  onSelected: (_) => setState(() => category = item),
                  selectedColor: const Color(0xFFD9F4E9),
                  labelStyle: TextStyle(
                    color: selected ? const Color(0xFF126B58) : ink,
                    fontWeight: FontWeight.w900,
                  ),
                ),
              );
            }).toList(),
          ),
        ),
        const SizedBox(height: 8),
        ...visible.map((item) => _ExperimentCard(item: item)),
      ],
    );
  }
}

class _ExperimentCard extends StatelessWidget {
  const _ExperimentCard({required this.item});
  final StemExperiment item;

  Color get color => switch (item.category) {
    'Kimia Dapur' => const Color(0xFFFFECE8),
    'Fisika Seru' => const Color(0xFFE7F0FF),
    'Rekayasa' => const Color(0xFFF1EAFF),
    _ => const Color(0xFFE4F7EF),
  };

  @override
  Widget build(BuildContext context) => Card(
    margin: const EdgeInsets.only(bottom: 10),
    color: color,
    elevation: 0,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(21)),
    child: InkWell(
      borderRadius: BorderRadius.circular(21),
      onTap: () => _showDetails(context),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(14, 13, 11, 13),
        child: Row(
          children: [
            Container(
              width: 54,
              height: 54,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: .8),
                borderRadius: BorderRadius.circular(17),
              ),
              child: Text(item.emoji, style: const TextStyle(fontSize: 31)),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    item.title,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  const SizedBox(height: 3),
                  Text(
                    '${item.category} • ${item.minutes} menit',
                    style: const TextStyle(
                      color: Color(0xFF52627C),
                      fontSize: 12.5,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ),
            ),
            const Icon(Icons.chevron_right_rounded, color: ink),
          ],
        ),
      ),
    ),
  );

  Future<void> _showDetails(BuildContext context) => showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (context) => DraggableScrollableSheet(
      initialChildSize: .82,
      minChildSize: .55,
      maxChildSize: .94,
      expand: false,
      builder: (context, controller) => Container(
        decoration: const BoxDecoration(
          color: Color(0xFFF6F9FF),
          borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
        ),
        child: ListView(
          controller: controller,
          padding: const EdgeInsets.fromLTRB(20, 12, 20, 28),
          children: [
            Center(
              child: Container(
                width: 44,
                height: 5,
                decoration: BoxDecoration(
                  color: const Color(0xFFBFCDE2),
                  borderRadius: BorderRadius.circular(9),
                ),
              ),
            ),
            const SizedBox(height: 14),
            Text(item.emoji, style: const TextStyle(fontSize: 48)),
            Text(item.title, style: Theme.of(context).textTheme.headlineMedium),
            Text('${item.category} • sekitar ${item.minutes} menit'),
            const SizedBox(height: 16),
            _DetailBlock(
              icon: '🧰',
              title: 'Alat dan bahan',
              body: item.materials,
            ),
            _DetailBlock(icon: '🧪', title: 'Cara mencoba', body: item.steps),
            _DetailBlock(
              icon: '💡',
              title: 'Mengapa bisa?',
              body: item.science,
            ),
            _DetailBlock(
              icon: '🛡️',
              title: 'Tetap aman',
              body: item.safety,
              warning: true,
            ),
            const SizedBox(height: 4),
            FilledButton.icon(
              onPressed: () => Navigator.pop(context),
              icon: const Icon(Icons.check_circle_rounded),
              label: const Text('Siap mencoba bersama orang tua'),
            ),
          ],
        ),
      ),
    ),
  );
}

class _DetailBlock extends StatelessWidget {
  const _DetailBlock({
    required this.icon,
    required this.title,
    required this.body,
    this.warning = false,
  });
  final String icon;
  final String title;
  final String body;
  final bool warning;

  @override
  Widget build(BuildContext context) => Container(
    margin: const EdgeInsets.only(bottom: 10),
    padding: const EdgeInsets.all(14),
    decoration: BoxDecoration(
      color: warning ? const Color(0xFFFFF3C7) : Colors.white,
      borderRadius: BorderRadius.circular(18),
      border: warning ? Border.all(color: const Color(0xFFFFD34F)) : null,
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '$icon  $title',
          style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900),
        ),
        const SizedBox(height: 6),
        Text(body, style: const TextStyle(fontSize: 14, height: 1.45)),
      ],
    ),
  );
}
