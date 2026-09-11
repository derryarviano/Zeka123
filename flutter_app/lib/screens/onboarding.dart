import 'package:flutter/material.dart';

import '../models.dart';
import '../theme.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key, required this.progress});
  final ProgressStore progress;

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final controller = TextEditingController();
  int step = 0;
  int grade = 1;
  int assessment = 0;

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => step == 0 ? _profile() : _assessment();

  Widget _profile() => Scaffold(
    body: SafeArea(
      child: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(22),
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 620),
            child: Container(
              padding: const EdgeInsets.fromLTRB(24, 24, 24, 22),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(32),
                boxShadow: const [
                  BoxShadow(
                    color: Color(0x1B173260),
                    blurRadius: 30,
                    offset: Offset(0, 12),
                  ),
                ],
              ),
              child: Column(
                children: [
                  Image.asset(
                    'assets/images/zeka-wordmark.png',
                    height: 45,
                    fit: BoxFit.contain,
                  ),
                  const SizedBox(height: 8),
                  SizedBox(
                    height: 172,
                    child: Image.asset(
                      'assets/images/zeka-mascot.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                  Text(
                    'Halo, penjelajah baru!',
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.headlineMedium
                        ?.copyWith(fontSize: 29),
                  ),
                  const SizedBox(height: 6),
                  const Text(
                    'Kobi akan menemanimu belajar dengan cara yang seru.',
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 24),
                  const Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      'Nama panggilan anak',
                      style: TextStyle(
                        fontSize: 13.5,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                  ),
                  const SizedBox(height: 7),
                  TextField(
                    controller: controller,
                    textInputAction: TextInputAction.done,
                    decoration: InputDecoration(
                      hintText: 'Contoh: Timothy',
                      hintStyle: const TextStyle(color: Color(0xFF70809C)),
                      prefixIcon: const Icon(Icons.face_rounded),
                      filled: true,
                      fillColor: paleBlue,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(17),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),
                  const SizedBox(height: 14),
                  Row(
                    children: List.generate(3, (index) {
                      final value = index + 1;
                      return Expanded(
                        child: Padding(
                          padding: EdgeInsets.only(right: index == 2 ? 0 : 8),
                          child: ChoiceChip(
                            label: Text('Kelas $value'),
                            selected: grade == value,
                            onSelected: (_) => setState(() => grade = value),
                            showCheckmark: false,
                          ),
                        ),
                      );
                    }),
                  ),
                  const SizedBox(height: 18),
                  FilledButton.icon(
                    onPressed: () => setState(() => step = 1),
                    icon: const Icon(Icons.arrow_forward_rounded),
                    label: const Text('Mulai asesmen singkat'),
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'Aman untuk anak • Progres tersimpan di perangkat',
                    style: TextStyle(color: Color(0xFF61718C), fontSize: 13),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    ),
  );

  Widget _assessment() {
    const items = [
      (
        'Pilih gambar yang cocok untuk belajar membaca.',
        [('📚', 1, 'Buku'), ('👟', 1, 'Sepatu'), ('☂️', 1, 'Payung')],
      ),
      (
        'Manakah yang merupakan makhluk hidup?',
        [('🪨', 1, 'Batu'), ('🐱', 1, 'Kucing'), ('🥄', 1, 'Sendok')],
      ),
      (
        'Gambar mana yang menunjukkan tiga benda?',
        [
          ('⭐', 1, 'Satu bintang'),
          ('🍎', 2, 'Dua apel'),
          ('⚽', 3, 'Tiga bola'),
        ],
      ),
    ];
    final item = items[assessment];
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(18),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 620),
              child: Container(
                padding: const EdgeInsets.all(22),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(30),
                  boxShadow: const [
                    BoxShadow(
                      color: Color(0x16173260),
                      blurRadius: 24,
                      offset: Offset(0, 10),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: LinearProgressIndicator(
                            value: (assessment + 1) / items.length,
                            minHeight: 8,
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Text(
                          '${assessment + 1}/${items.length}',
                          style: const TextStyle(fontWeight: FontWeight.w900),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    SizedBox(
                      height: 105,
                      child: Image.asset(
                        'assets/images/zeka-mascot.png',
                        fit: BoxFit.contain,
                      ),
                    ),
                    const Text(
                      'ASESMEN SINGKAT',
                      style: TextStyle(
                        color: Color(0xFF667695),
                        letterSpacing: 1,
                        fontSize: 12,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      item.$1,
                      textAlign: TextAlign.center,
                      style: Theme.of(context).textTheme.headlineSmall
                          ?.copyWith(fontSize: 25),
                    ),
                    const SizedBox(height: 18),
                    ...item.$2.map(
                      (option) => Padding(
                        padding: const EdgeInsets.only(bottom: 10),
                        child: InkWell(
                          borderRadius: BorderRadius.circular(18),
                          onTap: () async {
                            if (assessment < items.length - 1) {
                              setState(() => assessment++);
                            } else {
                              await widget.progress.finishSetup(
                                controller.text,
                                grade,
                              );
                            }
                          },
                          child: Ink(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 14,
                              vertical: 11,
                            ),
                            decoration: BoxDecoration(
                              color: paleBlue,
                              border: Border.all(
                                color: const Color(0xFFC9D9F4),
                                width: 2,
                              ),
                              borderRadius: BorderRadius.circular(18),
                            ),
                            child: Row(
                              children: [
                                Container(
                                  width: 82,
                                  height: 58,
                                  alignment: Alignment.center,
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(15),
                                  ),
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: List.generate(
                                      option.$2,
                                      (_) => Text(
                                        option.$1,
                                        style: TextStyle(
                                          fontSize: option.$2 == 3 ? 20 : 25,
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 14),
                                Expanded(
                                  child: Text(
                                    option.$3,
                                    style: const TextStyle(
                                      fontSize: 17,
                                      fontWeight: FontWeight.w900,
                                    ),
                                  ),
                                ),
                                const Icon(
                                  Icons.chevron_right_rounded,
                                  color: blue,
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                    const Text(
                      'Jawaban ini hanya membantu Kobi menentukan titik mulai.',
                      textAlign: TextAlign.center,
                      style: TextStyle(color: Color(0xFF667695), fontSize: 12),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
