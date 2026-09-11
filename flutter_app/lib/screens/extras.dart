import 'package:flutter/material.dart';

import '../models.dart';
import '../theme.dart';

class CollectionScreen extends StatelessWidget {
  const CollectionScreen({super.key, required this.progress});
  final ProgressStore progress;

  @override
  Widget build(BuildContext context) {
    final earned = progress.collectionUnlocked.length;
    const finds = [
      '🦋',
      '🌳',
      '🚀',
      '🐢',
      '🌈',
      '🏕️',
      '🐝',
      '🌻',
      '⭐',
      '🗺️',
      '🏆',
      '🎨',
    ];
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text(
          'Koleksi penemuan',
          style: Theme.of(context).textTheme.headlineMedium,
        ),
        const Text('Tukarkan bintang dan pilih sendiri penemuanmu.'),
        const SizedBox(height: 16),
        Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [Color(0xFF7158C9), Color(0xFF9A67DD)],
            ),
            borderRadius: BorderRadius.circular(26),
          ),
          child: Row(
            children: [
              const IllustratedIcon(index: 6, size: 66),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'PUZZLE PETUALANGAN',
                      style: TextStyle(
                        color: Colors.white70,
                        fontSize: 10,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                    Text(
                      '$earned dari 12 bagian ditemukan',
                      style: Theme.of(context).textTheme.titleLarge
                          ?.copyWith(color: Colors.white),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
            crossAxisSpacing: 10,
            mainAxisSpacing: 10,
          ),
          itemCount: 12,
          itemBuilder: (context, index) {
            final requiredStars = index * 60;
            final unlocked = progress.collectionUnlocked.contains(index);
            final affordable = progress.stars >= requiredStars;
            return InkWell(
              borderRadius: BorderRadius.circular(18),
              onTap: () async {
                if (unlocked) {
                  ScaffoldMessenger.of(context)
                    ..hideCurrentSnackBar()
                    ..showSnackBar(
                      SnackBar(
                        behavior: SnackBarBehavior.floating,
                        content: Text(
                          '${finds[index]} Sudah menjadi koleksimu!',
                        ),
                      ),
                    );
                  return;
                }
                if (!affordable) {
                  final remaining = requiredStars - progress.stars;
                  ScaffoldMessenger.of(context)
                    ..hideCurrentSnackBar()
                    ..showSnackBar(
                      SnackBar(
                        behavior: SnackBarBehavior.floating,
                        backgroundColor: const Color(0xFF173260),
                        content: Text(
                          'Kamu membutuhkan $remaining bintang lagi, ayo lanjutkan petualanganmu!',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 14,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                      ),
                    );
                  return;
                }
                final confirmed = await showDialog<bool>(
                  context: context,
                  builder: (dialogContext) => AlertDialog(
                    title: Text(
                      requiredStars == 0
                          ? 'Buka penemuan gratis?'
                          : 'Tukarkan $requiredStars bintang?',
                    ),
                    content: Text(
                      requiredStars == 0
                          ? 'Penemuan pertama ini hadiah untuk petualanganmu.'
                          : 'Bintangmu akan berkurang setelah penemuan dibuka.',
                    ),
                    actions: [
                      TextButton(
                        onPressed: () => Navigator.pop(dialogContext, false),
                        child: const Text('Nanti dulu'),
                      ),
                      FilledButton(
                        onPressed: () => Navigator.pop(dialogContext, true),
                        child: const Text('Buka sekarang'),
                      ),
                    ],
                  ),
                );
                if (confirmed != true || !context.mounted) return;
                final redeemed = await progress.redeemCollection(
                  index,
                  requiredStars,
                );
                if (!context.mounted || !redeemed) return;
                ScaffoldMessenger.of(context)
                  ..hideCurrentSnackBar()
                  ..showSnackBar(
                    SnackBar(
                      behavior: SnackBarBehavior.floating,
                      backgroundColor: const Color(0xFF13704F),
                      content: Text(
                        '${finds[index]} Penemuan berhasil dibuka!',
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ),
                  );
              },
              child: Ink(
                decoration: BoxDecoration(
                  color: unlocked ? const Color(0xFFFFDF68) : Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(
                    color: unlocked
                        ? const Color(0xFFDDAE00)
                        : affordable
                        ? const Color(0xFF2F6FE4)
                        : const Color(0xFFBFCDE2),
                    width: 2,
                  ),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      unlocked ? finds[index] : '🔒',
                      style: const TextStyle(fontSize: 32),
                    ),
                    if (!unlocked)
                      Text(
                        requiredStars == 0 ? 'Gratis' : '$requiredStars ⭐',
                        style: const TextStyle(
                          color: Color(0xFF52627C),
                          fontSize: 11,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                  ],
                ),
              ),
            );
          },
        ),
      ],
    );
  }
}

class ParentScreen extends StatelessWidget {
  const ParentScreen({super.key, required this.progress});
  final ProgressStore progress;

  @override
  Widget build(BuildContext context) => ListView(
    padding: const EdgeInsets.all(16),
    children: [
      Text(
        'Ringkasan orang tua',
        style: Theme.of(context).textTheme.headlineMedium,
      ),
      Text('${progress.name} • Kelas ${progress.grade}'),
      const SizedBox(height: 16),
      Row(
        children: [
          Expanded(
            child: _Stat(
              label: 'Modul selesai',
              value: '${progress.completed.length}',
              icon: '✅',
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: _Stat(
              label: 'Bintang',
              value: '${progress.stars}',
              icon: '⭐',
            ),
          ),
        ],
      ),
      const SizedBox(height: 16),
      Card(
        elevation: 0,
        color: Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(22)),
        child: const Padding(
          padding: EdgeInsets.all(18),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Rekomendasi minggu ini',
                style: TextStyle(fontSize: 17, fontWeight: FontWeight.w900),
              ),
              SizedBox(height: 8),
              Text(
                '• Belajar 10–15 menit per sesi.\n• Dampingi saat anak menemukan kata baru.\n• Rayakan usaha, bukan hanya jawaban benar.',
              ),
            ],
          ),
        ),
      ),
      const SizedBox(height: 14),
      OutlinedButton.icon(
        onPressed: () =>
            progress.setGrade(progress.grade == 3 ? 1 : progress.grade + 1),
        icon: const Icon(Icons.school_rounded),
        label: Text(
          'Ubah ke Kelas ${progress.grade == 3 ? 1 : progress.grade + 1}',
        ),
      ),
      TextButton(
        onPressed: () => showDialog<void>(
          context: context,
          builder: (dialogContext) => AlertDialog(
            title: const Text('Reset progres?'),
            content: const Text(
              'Nama, kelas, bintang, dan modul selesai akan dihapus dari perangkat ini.',
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(dialogContext),
                child: const Text('Batal'),
              ),
              FilledButton(
                onPressed: () {
                  Navigator.pop(dialogContext);
                  progress.reset();
                },
                child: const Text('Reset'),
              ),
            ],
          ),
        ),
        child: const Text(
          'Reset data di perangkat',
          style: TextStyle(color: Color(0xFFB9473A)),
        ),
      ),
    ],
  );
}

class _Stat extends StatelessWidget {
  const _Stat({required this.label, required this.value, required this.icon});
  final String label;
  final String value;
  final String icon;

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(
      color: Colors.white,
      borderRadius: BorderRadius.circular(20),
    ),
    child: Column(
      children: [
        Text(icon, style: const TextStyle(fontSize: 28)),
        Text(value, style: Theme.of(context).textTheme.headlineMedium),
        Text(
          label,
          textAlign: TextAlign.center,
          style: const TextStyle(fontSize: 11, color: Color(0xFF667695)),
        ),
      ],
    ),
  );
}
