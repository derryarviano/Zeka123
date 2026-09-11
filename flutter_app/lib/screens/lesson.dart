import 'package:flutter/material.dart';

import '../models.dart';
import '../theme.dart';

class LessonScreen extends StatefulWidget {
  const LessonScreen({
    super.key,
    required this.progress,
    required this.subject,
    required this.module,
    required this.onClose,
    required this.onFinished,
  });
  final ProgressStore progress;
  final SubjectInfo subject;
  final int module;
  final VoidCallback onClose;
  final VoidCallback onFinished;

  @override
  State<LessonScreen> createState() => _LessonScreenState();
}

class _LessonScreenState extends State<LessonScreen> {
  late final Future<List<LessonQuestion>> future;
  int index = 0;
  String? selected;
  bool checked = false;

  @override
  void initState() {
    super.initState();
    future = QuestionBank.load(
      widget.progress.grade,
      widget.subject.id,
      widget.module,
    );
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    body: SafeArea(
      child: FutureBuilder<List<LessonQuestion>>(
        future: future,
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return Center(
              child: Text('Soal belum dapat dibuka: ${snapshot.error}'),
            );
          }
          if (!snapshot.hasData) {
            return const Center(child: CircularProgressIndicator());
          }
          final questions = snapshot.data!;
          final current = questions[index];
          final correct = selected == current.answer;
          return Column(
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(10, 8, 14, 4),
                child: Row(
                  children: [
                    IconButton(
                      onPressed: widget.onClose,
                      icon: const Icon(Icons.close_rounded),
                    ),
                    Expanded(
                      child: LinearProgressIndicator(
                        value: (index + (checked ? 1 : 0)) / questions.length,
                        minHeight: 9,
                        borderRadius: BorderRadius.circular(9),
                        backgroundColor: const Color(0xFFD8E2F0),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Text(
                      '${index + 1}/${questions.length}',
                      style: const TextStyle(
                        fontWeight: FontWeight.w900,
                        color: ink,
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.fromLTRB(18, 6, 18, 16),
                  child: Center(
                    child: ConstrainedBox(
                      constraints: const BoxConstraints(maxWidth: 720),
                      child: Column(
                        children: [
                          SizedBox(
                            height: 105,
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Container(
                                  constraints: const BoxConstraints(
                                    maxWidth: 210,
                                  ),
                                  padding: const EdgeInsets.all(12),
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    border: Border.all(
                                      color: const Color(0xFFC9D9F4),
                                      width: 2,
                                    ),
                                    borderRadius: BorderRadius.circular(17),
                                  ),
                                  child: const Text(
                                    'Coba pelan-pelan. Kobi siap membantu!',
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w800,
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Image.asset(
                                  'assets/images/zeka-mascot.png',
                                  width: 85,
                                  height: 100,
                                  fit: BoxFit.contain,
                                ),
                              ],
                            ),
                          ),
                          Container(
                            width: double.infinity,
                            padding: const EdgeInsets.all(20),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(28),
                              boxShadow: const [
                                BoxShadow(
                                  color: Color(0x16173260),
                                  blurRadius: 22,
                                  offset: Offset(0, 8),
                                ),
                              ],
                            ),
                            child: Column(
                              children: [
                                Text(
                                  '${widget.subject.title.toUpperCase()} • LEVEL ${widget.module + 1}',
                                  style: TextStyle(
                                    color: widget.subject.color,
                                    fontSize: 11,
                                    fontWeight: FontWeight.w900,
                                    letterSpacing: .7,
                                  ),
                                ),
                                const SizedBox(height: 12),
                                Text(
                                  current.prompt,
                                  textAlign: TextAlign.center,
                                  style: Theme.of(context)
                                      .textTheme
                                      .headlineSmall
                                      ?.copyWith(fontSize: 25),
                                ),
                                const SizedBox(height: 18),
                                ...current.options.map(
                                  (option) => _option(current, option, correct),
                                ),
                                if (checked)
                                  Container(
                                    width: double.infinity,
                                    padding: const EdgeInsets.all(13),
                                    decoration: BoxDecoration(
                                      color: correct
                                          ? const Color(0xFFE4F7EF)
                                          : const Color(0xFFFFF2D8),
                                      borderRadius: BorderRadius.circular(16),
                                    ),
                                    child: Text(
                                      correct
                                          ? 'Hebat! Jawabanmu tepat.'
                                          : 'Belum tepat. ${current.hint}',
                                      style: TextStyle(
                                        color: correct
                                            ? const Color(0xFF176C4E)
                                            : const Color(0xFF80570A),
                                        fontWeight: FontWeight.w800,
                                      ),
                                    ),
                                  ),
                                const SizedBox(height: 14),
                                FilledButton(
                                  onPressed: selected == null
                                      ? null
                                      : () => _advance(questions),
                                  child: Text(
                                    checked
                                        ? (index == questions.length - 1
                                              ? 'Selesaikan modul'
                                              : 'Soal berikutnya')
                                        : 'Periksa jawaban',
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ],
          );
        },
      ),
    ),
  );

  Widget _option(LessonQuestion current, String option, bool correct) {
    Color border = const Color(0xFFD3DDEA);
    Color fill = Colors.white;
    if (checked && option == current.answer) {
      border = green;
      fill = const Color(0xFFE4F7EF);
    } else if (checked && option == selected && !correct) {
      border = coral;
      fill = const Color(0xFFFFECE8);
    } else if (!checked && option == selected) {
      border = blue;
      fill = const Color(0xFFE8F0FF);
    }
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: InkWell(
        onTap: checked ? null : () => setState(() => selected = option),
        borderRadius: BorderRadius.circular(17),
        child: Ink(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 15),
          decoration: BoxDecoration(
            color: fill,
            borderRadius: BorderRadius.circular(17),
            border: Border.all(color: border, width: 2),
          ),
          child: Row(
            children: [
              Expanded(
                child: Text(
                  option,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w900,
                  ),
                ),
              ),
              Icon(
                checked && option == current.answer
                    ? Icons.check_circle_rounded
                    : Icons.chevron_right_rounded,
                color: border,
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _advance(List<LessonQuestion> questions) {
    if (!checked) {
      setState(() => checked = true);
      return;
    }
    if (index == questions.length - 1) {
      widget.onFinished();
      return;
    }
    setState(() {
      index++;
      selected = null;
      checked = false;
    });
  }
}

class FinishScreen extends StatelessWidget {
  const FinishScreen({
    super.key,
    required this.subject,
    required this.module,
    required this.onNext,
    required this.onHome,
  });
  final SubjectInfo subject;
  final int module;
  final VoidCallback onNext;
  final VoidCallback onHome;

  @override
  Widget build(BuildContext context) => Scaffold(
    body: SafeArea(
      child: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(18),
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 560),
            child: Container(
              padding: const EdgeInsets.fromLTRB(24, 20, 24, 24),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(32),
                boxShadow: const [
                  BoxShadow(
                    color: Color(0x17173260),
                    blurRadius: 25,
                    offset: Offset(0, 10),
                  ),
                ],
              ),
              child: Column(
                children: [
                  SizedBox(
                    width: 210,
                    height: 210,
                    child: Image.asset(
                      'assets/images/zeka-mascot.png',
                      fit: BoxFit.contain,
                      alignment: Alignment.center,
                    ),
                  ),
                  const Text(
                    'MODUL SELESAI',
                    style: TextStyle(
                      color: Color(0xFF667695),
                      fontSize: 12,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 1,
                    ),
                  ),
                  const SizedBox(height: 9),
                  Text(
                    'Satu penemuan baru!',
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.headlineMedium
                        ?.copyWith(fontSize: 30),
                  ),
                  const SizedBox(height: 7),
                  Text(
                    'Kamu menyelesaikan ${subject.title} level ${module + 1}.',
                    textAlign: TextAlign.center,
                    style: const TextStyle(color: Color(0xFF667695)),
                  ),
                  const SizedBox(height: 15),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 10,
                    ),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFFF1BB),
                      borderRadius: BorderRadius.circular(22),
                    ),
                    child: const Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.star_rounded, color: Color(0xFFA57600)),
                        SizedBox(width: 6),
                        Text(
                          '+20 bintang',
                          style: TextStyle(
                            color: Color(0xFF775500),
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),
                  SizedBox(
                    width: double.infinity,
                    child: FilledButton(
                      onPressed: onNext,
                      child: const Text('Lanjut ke level berikutnya  →'),
                    ),
                  ),
                  const SizedBox(height: 10),
                  SizedBox(
                    width: double.infinity,
                    child: OutlinedButton(
                      onPressed: onHome,
                      style: OutlinedButton.styleFrom(
                        minimumSize: const Size(48, 52),
                        side: const BorderSide(
                          color: Color(0xFFBFD0EC),
                          width: 2,
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(17),
                        ),
                      ),
                      child: const Text(
                        'Kembali ke beranda',
                        style: TextStyle(fontWeight: FontWeight.w900),
                      ),
                    ),
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
