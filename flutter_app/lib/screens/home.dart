import 'dart:async';

import 'package:flutter/material.dart';

import '../models.dart';
import '../theme.dart';

const familyMissions = <(String, String)>[
  (
    'membaca cerita bersama selama 10 menit',
    'Ceritakan bagian yang paling kamu sukai.',
  ),
  (
    'menghitung benda di meja makan',
    'Kelompokkan benda lalu hitung bersama-sama.',
  ),
  (
    'mencari tiga bentuk daun di sekitar rumah',
    'Amati warna dan bentuknya tanpa memetik daun.',
  ),
  (
    'menyebutkan lima kata Bahasa Inggris',
    'Gunakan setiap kata dalam kalimat sederhana.',
  ),
  (
    'merapikan rak buku bersama',
    'Pilih satu buku untuk dibaca setelah selesai.',
  ),
  (
    'bercerita tentang kegiatan hari ini',
    'Bergantianlah menjadi pendengar yang baik.',
  ),
  (
    'membuat pola dari benda berwarna',
    'Coba lanjutkan pola buatan orang tuamu.',
  ),
];

class HomeScreen extends StatelessWidget {
  const HomeScreen({
    super.key,
    required this.progress,
    required this.onSubject,
    required this.onContinue,
    required this.onParent,
  });
  final ProgressStore progress;
  final ValueChanged<SubjectInfo> onSubject;
  final VoidCallback onContinue;
  final VoidCallback onParent;

  @override
  Widget build(BuildContext context) => LayoutBuilder(
    builder: (context, box) {
      final compact = box.maxHeight < 560;
      final day = DateTime.now().difference(DateTime(2026)).inDays;
      final mission = familyMissions[day.abs() % familyMissions.length];
      return Padding(
        padding: EdgeInsets.fromLTRB(14, compact ? 8 : 12, 14, 8),
        child: Column(
          children: [
            SizedBox(
              height: compact ? 38 : 48,
              child: Row(
                children: [
                  Expanded(
                    child: InkWell(
                      onTap: onParent,
                      child: Text(
                        'Halo, ${progress.name}! 👋',
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: Theme.of(context).textTheme.titleLarge
                            ?.copyWith(fontSize: compact ? 20 : 23),
                      ),
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 11,
                      vertical: 7,
                    ),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFFF3C4),
                      borderRadius: BorderRadius.circular(15),
                      border: Border.all(color: yellow, width: 2),
                    ),
                    child: Text(
                      'Kelas ${progress.grade} ▾',
                      style: const TextStyle(fontWeight: FontWeight.w900),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 8),
            Expanded(
              flex: 4,
              child: RotatingHero(onSubject: onSubject, compact: compact),
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Expanded(
                  child: Text(
                    'Pilih dunia belajar',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: Theme.of(context).textTheme.titleLarge
                        ?.copyWith(fontSize: 18),
                  ),
                ),
                const SizedBox(width: 8),
                const Text(
                  '30 level/mapel',
                  style: TextStyle(fontSize: 12, color: Color(0xFF52627C)),
                ),
              ],
            ),
            const SizedBox(height: 6),
            Expanded(
              flex: 5,
              child: GridView.builder(
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 8,
                  mainAxisSpacing: 8,
                  childAspectRatio: 2.35,
                ),
                itemCount: subjects.length,
                itemBuilder: (_, index) => _SubjectTile(
                  subject: subjects[index],
                  onTap: () => onSubject(subjects[index]),
                ),
              ),
            ),
            const SizedBox(height: 8),
            SizedBox(
              height: compact ? 50 : 58,
              child: InkWell(
                onTap: () => showDialog<void>(
                  context: context,
                  builder: (_) => AlertDialog(
                    title: const Text('Misi keluarga hari ini'),
                    content: Text(
                      'Ayo ajak orang tuamu untuk ${mission.$1}. ${mission.$2}',
                    ),
                  ),
                ),
                borderRadius: BorderRadius.circular(18),
                child: Ink(
                  padding: const EdgeInsets.symmetric(horizontal: 12),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(
                      color: const Color(0xFFC9D9F4),
                      width: 2,
                    ),
                  ),
                  child: Row(
                    children: [
                      const CircleAvatar(
                        backgroundColor: Color(0xFFFFE4A3),
                        child: IllustratedIcon(index: 4, size: 30),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Text(
                              'MISI KELUARGA HARI INI',
                              style: TextStyle(
                                fontSize: 10,
                                color: Color(0xFF52627C),
                                fontWeight: FontWeight.w900,
                                letterSpacing: .45,
                              ),
                            ),
                            Text(
                              'Ayo ajak orang tuamu untuk ${mission.$1}',
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                fontSize: 13.5,
                                fontWeight: FontWeight.w900,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const Icon(Icons.chevron_right_rounded, color: blue),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      );
    },
  );
}

class RotatingHero extends StatefulWidget {
  const RotatingHero({
    super.key,
    required this.onSubject,
    required this.compact,
  });
  final ValueChanged<SubjectInfo> onSubject;
  final bool compact;

  @override
  State<RotatingHero> createState() => _RotatingHeroState();
}

class _RotatingHeroState extends State<RotatingHero> {
  int index = 0;
  Timer? timer;

  static const copy = [
    ('Baca, pahami, ceritakan!', 'Ayo, jadi pembaca hebat!'),
    ('Berhitung jadi seru!', 'Pecahkan masalah bersama Kobi.'),
    ('Listen, practice, speak!', 'Small steps, big progress!'),
    ('Amati dan temukan!', 'Pertanyaan kecil, jawaban besar.'),
  ];

  @override
  void initState() {
    super.initState();
    timer = Timer.periodic(const Duration(seconds: 5), (_) {
      if (mounted) setState(() => index = (index + 1) % subjects.length);
    });
  }

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final subject = subjects[index];
    return InkWell(
      onTap: () => widget.onSubject(subject),
      borderRadius: BorderRadius.circular(27),
      child: AnimatedSwitcher(
        duration: const Duration(milliseconds: 650),
        transitionBuilder: (child, animation) =>
            FadeTransition(opacity: animation, child: child),
        child: Ink(
          key: ValueKey(subject.id),
          width: double.infinity,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [subject.color, Color.lerp(subject.color, ink, .2)!],
            ),
            borderRadius: BorderRadius.circular(27),
            boxShadow: [
              BoxShadow(
                color: subject.color.withValues(alpha: .3),
                offset: const Offset(0, 6),
              ),
            ],
          ),
          child: Stack(
            children: [
              Positioned(
                left: 18,
                top: 10,
                bottom: 15,
                width: MediaQuery.sizeOf(context).width * .56,
                child: FittedBox(
                  fit: BoxFit.scaleDown,
                  alignment: Alignment.centerLeft,
                  child: SizedBox(
                    width: MediaQuery.sizeOf(context).width * .56,
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            IllustratedIcon(index: subject.iconIndex, size: 30),
                            const SizedBox(width: 7),
                            Expanded(
                              child: Text(
                                subject.title.toUpperCase(),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(
                                  color: Colors.white70,
                                  fontSize: 10,
                                  fontWeight: FontWeight.w900,
                                  letterSpacing: .5,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 3),
                        Text(
                          copy[index].$1,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: Theme.of(context).textTheme.headlineSmall
                              ?.copyWith(
                                color: Colors.white,
                                fontSize: widget.compact ? 19 : 22,
                              ),
                        ),
                        Text(
                          copy[index].$2,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 11.5,
                          ),
                        ),
                        const SizedBox(height: 6),
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 13,
                            vertical: 7,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(13),
                          ),
                          child: Text(
                            'Mulai belajar  →',
                            style: TextStyle(
                              color: subject.color,
                              fontWeight: FontWeight.w900,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              Positioned(
                right: -7,
                top: 3,
                bottom: -8,
                width: MediaQuery.sizeOf(context).width * .42,
                child: Image.asset(
                  'assets/images/zeka-mascot.png',
                  fit: BoxFit.contain,
                  alignment: Alignment.bottomCenter,
                ),
              ),
              Positioned(
                left: 0,
                right: 0,
                bottom: 5,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: List.generate(
                    subjects.length,
                    (dot) => AnimatedContainer(
                      duration: const Duration(milliseconds: 250),
                      width: dot == index ? 14 : 5,
                      height: 5,
                      margin: const EdgeInsets.symmetric(horizontal: 2),
                      decoration: BoxDecoration(
                        color: dot == index ? Colors.white : Colors.white54,
                        borderRadius: BorderRadius.circular(5),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _SubjectTile extends StatelessWidget {
  const _SubjectTile({required this.subject, required this.onTap});
  final SubjectInfo subject;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final foreground = subject.id == 'indo' ? ink : Colors.white;
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(18),
      child: Ink(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
        decoration: BoxDecoration(
          color: subject.homeColor,
          borderRadius: BorderRadius.circular(18),
          border: Border.all(color: subject.homeColor, width: 2),
          boxShadow: [
            BoxShadow(
              color: subject.homeColor.withValues(alpha: .24),
              offset: const Offset(0, 3),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              width: 43,
              height: 43,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
              ),
              child: IllustratedIcon(index: subject.iconIndex, size: 39),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    subject.title,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontSize: 13.2,
                      fontWeight: FontWeight.w900,
                      color: foreground,
                    ),
                  ),
                  Text(
                    subject.subtitle,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontSize: 11.2,
                      color: foreground,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ),
            ),
            Icon(Icons.chevron_right_rounded, size: 19, color: foreground),
          ],
        ),
      ),
    );
  }
}
