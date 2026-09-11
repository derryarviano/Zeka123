import 'package:flutter/material.dart';

import '../models.dart';
import '../theme.dart';

const levelArt = <String, List<String>>{
  'indo': ['📖', '🔤', '✏️', '📚', '💬', '📄', '💡', '🧩', '⭐', '📝'],
  'math': ['🌟', '🔢', '➕', '📐', '🧊', '➗', '🕐', '🥧', '📊', '🧮'],
  'english': ['📖', '💬', '🍎', '🎧', '🔤', '✏️', '📚', '🌍', '⭐', '🗣️'],
  'science': ['🌱', '🐞', '☀️', '🪴', '🧲', '🧪', '🌍', '🌱', '⚛️', '🔬'],
};

const mapCopy = <String, (String, String)>{
  'indo': ('Baca, pahami, ceritakan!', 'Ayo, jadi pembaca hebat!'),
  'math': ('Yuk, berhitung dan pecahkan masalah!', 'Kamu pasti bisa!'),
  'english': ('Listen, practice, speak!', 'Small steps, big progress!'),
  'science': ('Amati, temukan, jelajah dunia!', 'Sains itu seru!'),
};

class LevelMap extends StatelessWidget {
  const LevelMap({
    super.key,
    required this.subject,
    required this.progress,
    required this.onLevel,
  });
  final SubjectInfo subject;
  final ProgressStore progress;
  final ValueChanged<int> onLevel;

  @override
  Widget build(BuildContext context) => CustomScrollView(
    slivers: [
      SliverToBoxAdapter(
        child: _MapHeader(subject: subject, grade: progress.grade),
      ),
      SliverPadding(
        padding: const EdgeInsets.fromLTRB(12, 3, 12, 24),
        sliver: SliverGrid.builder(
          gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
            maxCrossAxisExtent: 150,
            mainAxisSpacing: 10,
            crossAxisSpacing: 10,
            childAspectRatio: 1.02,
          ),
          itemCount: 30,
          itemBuilder: (context, index) {
            final done = progress.completed.contains(
              '${progress.grade}-${subject.id}-$index',
            );
            final unlocked =
                index == 0 ||
                progress.completed.contains(
                  '${progress.grade}-${subject.id}-${index - 1}',
                );
            return _LevelCard(
              index: index,
              subject: subject,
              done: done,
              unlocked: unlocked,
              onTap: () {
                if (unlocked) {
                  onLevel(index);
                } else {
                  ScaffoldMessenger.of(context)
                    ..hideCurrentSnackBar()
                    ..showSnackBar(
                      const SnackBar(
                        behavior: SnackBarBehavior.floating,
                        backgroundColor: ink,
                        content: Text(
                          'Selesaikan level sebelumnya untuk membuka petualangan ini.',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                      ),
                    );
                }
              },
            );
          },
        ),
      ),
    ],
  );
}

class _MapHeader extends StatelessWidget {
  const _MapHeader({required this.subject, required this.grade});
  final SubjectInfo subject;
  final int grade;

  @override
  Widget build(BuildContext context) {
    final copy = mapCopy[subject.id]!;
    return Container(
      height: 146,
      margin: const EdgeInsets.fromLTRB(12, 12, 12, 10),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [subject.color, Color.lerp(subject.color, ink, .18)!],
        ),
        borderRadius: BorderRadius.circular(26),
        boxShadow: [
          BoxShadow(
            color: subject.color.withValues(alpha: .28),
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(26),
        child: Stack(
          children: [
            Positioned(
              left: -28,
              bottom: -45,
              child: Icon(
                Icons.cloud_rounded,
                size: 125,
                color: Colors.white.withValues(alpha: .12),
              ),
            ),
            Positioned(
              right: 115,
              top: -34,
              child: Icon(
                Icons.auto_awesome_rounded,
                size: 82,
                color: Colors.white.withValues(alpha: .12),
              ),
            ),
            Positioned(
              left: 16,
              top: 14,
              bottom: 14,
              right: 135,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 54,
                        height: 54,
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(17),
                        ),
                        child: IllustratedIcon(
                          index: subject.iconIndex,
                          size: 49,
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'JALUR BELAJAR',
                              style: TextStyle(
                                color: Colors.white70,
                                fontSize: 10,
                                fontWeight: FontWeight.w900,
                                letterSpacing: .8,
                              ),
                            ),
                            Text(
                              subject.title,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: Theme.of(context).textTheme.titleLarge
                                  ?.copyWith(color: Colors.white, fontSize: 22),
                            ),
                            Text(
                              'Kelas $grade • 30 level unik',
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 12.5,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    copy.$1,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 13,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                ],
              ),
            ),
            Positioned(
              right: -6,
              top: 2,
              bottom: -12,
              width: 150,
              child: Image.asset(
                'assets/images/zeka-mascot.png',
                fit: BoxFit.contain,
                alignment: Alignment.bottomCenter,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _LevelCard extends StatelessWidget {
  const _LevelCard({
    required this.index,
    required this.subject,
    required this.done,
    required this.unlocked,
    required this.onTap,
  });
  final int index;
  final SubjectInfo subject;
  final bool done;
  final bool unlocked;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final art = levelArt[subject.id]![index % 10];
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(20),
      child: Ink(
        decoration: BoxDecoration(
          color: done ? const Color(0xFFE3F8ED) : Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: done ? green : subject.color.withValues(alpha: .18),
            width: 2,
          ),
          boxShadow: const [
            BoxShadow(
              color: Color(0x1A173260),
              blurRadius: 3,
              offset: Offset(0, 4),
            ),
          ],
        ),
        child: Stack(
          children: [
            Positioned(
              left: 9,
              top: 8,
              child: Container(
                width: 27,
                height: 27,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: done ? green : subject.light,
                  shape: BoxShape.circle,
                ),
                child: Text(
                  '${index + 1}',
                  style: TextStyle(
                    fontFamily: 'Fredoka',
                    color: done ? Colors.white : subject.color,
                    fontSize: 13,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
            ),
            Positioned(
              right: 9,
              top: 8,
              child: Icon(
                done
                    ? Icons.check_circle_rounded
                    : unlocked
                    ? Icons.lock_open_rounded
                    : Icons.lock_rounded,
                size: 20,
                color: done
                    ? green
                    : unlocked
                    ? subject.color
                    : const Color(0xFF91A2BC),
              ),
            ),
            Align(
              alignment: const Alignment(0, -.18),
              child: Container(
                width: 57,
                height: 57,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: subject.light,
                  borderRadius: BorderRadius.circular(18),
                ),
                child: Text(art, style: const TextStyle(fontSize: 32)),
              ),
            ),
            Positioned(
              left: 5,
              right: 5,
              bottom: 9,
              child: Column(
                children: [
                  Text(
                    'Level ${index + 1}',
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  Text(
                    done
                        ? 'Selesai'
                        : unlocked
                        ? '${5 + index % 2} soal'
                        : 'Terkunci',
                    style: TextStyle(
                      fontSize: 11.5,
                      color: done
                          ? const Color(0xFF13704F)
                          : const Color(0xFF61718C),
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
