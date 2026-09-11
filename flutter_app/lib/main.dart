import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';

import 'models.dart';
import 'screens/extras.dart';
import 'screens/home.dart';
import 'screens/learn.dart';
import 'screens/onboarding.dart';
import 'theme.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(ZekaApp(progress: await ProgressStore.load()));
}

class ZekaApp extends StatelessWidget {
  const ZekaApp({super.key, required this.progress});
  final ProgressStore progress;

  @override
  Widget build(BuildContext context) => MaterialApp(
    title: 'Zeka123',
    debugShowCheckedModeBanner: false,
    theme: zekaTheme(),
    home: ZekaRoot(progress: progress),
  );
}

enum AppView { home, map, lesson, finish, collection, creative, parent }

class ZekaRoot extends StatefulWidget {
  const ZekaRoot({super.key, required this.progress});
  final ProgressStore progress;

  @override
  State<ZekaRoot> createState() => _ZekaRootState();
}

class _ZekaRootState extends State<ZekaRoot> {
  AppView view = AppView.home;
  SubjectInfo subject = subjects.first;
  int module = 0;
  final AudioPlayer player = AudioPlayer();

  @override
  void initState() {
    super.initState();
    widget.progress.addListener(_refresh);
  }

  @override
  void dispose() {
    widget.progress.removeListener(_refresh);
    player.dispose();
    super.dispose();
  }

  void _refresh() => setState(() {});

  Future<void> _toggleMusic() async {
    final next = !widget.progress.musicOn;
    if (next) {
      await player.setReleaseMode(ReleaseMode.loop);
      await player.play(AssetSource('audio/zeka-bgm.mp3'), volume: .22);
    } else {
      await player.pause();
    }
    await widget.progress.setMusic(next);
  }

  void _openMap(SubjectInfo value) => setState(() {
    subject = value;
    view = AppView.map;
  });

  void _openLesson(int value) => setState(() {
    module = value;
    view = AppView.lesson;
  });

  @override
  Widget build(BuildContext context) {
    if (!widget.progress.onboarded) {
      return OnboardingScreen(progress: widget.progress);
    }
    if (view == AppView.lesson) {
      return LessonScreen(
        progress: widget.progress,
        subject: subject,
        module: module,
        onClose: () => setState(() => view = AppView.map),
        onFinished: () async {
          await widget.progress.complete(subject.id, module);
          if (mounted) setState(() => view = AppView.finish);
        },
      );
    }
    if (view == AppView.finish) {
      return FinishScreen(
        subject: subject,
        module: module,
        onNext: () => setState(() {
          module = (module + 1).clamp(0, 29);
          view = AppView.lesson;
        }),
        onHome: () => setState(() => view = AppView.home),
      );
    }

    final body = switch (view) {
      AppView.map => LevelMap(
        subject: subject,
        progress: widget.progress,
        onLevel: _openLesson,
      ),
      AppView.collection => CollectionScreen(progress: widget.progress),
      AppView.creative => const CreativeScreen(),
      AppView.parent => ParentScreen(progress: widget.progress),
      _ => HomeScreen(
        progress: widget.progress,
        onSubject: _openMap,
        onContinue: () => _openMap(subjects.first),
        onParent: () => setState(() => view = AppView.parent),
      ),
    };

    return Scaffold(
      appBar: ZekaTopBar(progress: widget.progress, onMusic: _toggleMusic),
      body: body,
      bottomNavigationBar: NavigationBar(
        backgroundColor: Colors.white,
        indicatorColor: const Color(0xFFDDE9FF),
        selectedIndex: switch (view) {
          AppView.home || AppView.parent => 0,
          AppView.map => 1,
          AppView.collection => 2,
          AppView.creative => 3,
          _ => 0,
        },
        onDestinationSelected: (index) => setState(() {
          view = [
            AppView.home,
            AppView.map,
            AppView.collection,
            AppView.creative,
          ][index];
        }),
        destinations: const [
          NavigationDestination(
            icon: IllustratedIcon(index: 4, size: 31),
            selectedIcon: IllustratedIcon(index: 4, size: 35),
            label: 'Beranda',
          ),
          NavigationDestination(
            icon: IllustratedIcon(index: 5, size: 31),
            selectedIcon: IllustratedIcon(index: 5, size: 35),
            label: 'Belajar',
          ),
          NavigationDestination(
            icon: IllustratedIcon(index: 6, size: 31),
            selectedIcon: IllustratedIcon(index: 6, size: 35),
            label: 'Koleksi',
          ),
          NavigationDestination(
            icon: IllustratedIcon(index: 7, size: 31),
            selectedIcon: IllustratedIcon(index: 7, size: 35),
            label: 'Kreasi',
          ),
        ],
      ),
    );
  }
}

class ZekaTopBar extends StatelessWidget implements PreferredSizeWidget {
  const ZekaTopBar({super.key, required this.progress, required this.onMusic});
  final ProgressStore progress;
  final VoidCallback onMusic;

  @override
  Size get preferredSize => const Size.fromHeight(64);

  @override
  Widget build(BuildContext context) => AppBar(
    toolbarHeight: 64,
    backgroundColor: Colors.white,
    surfaceTintColor: Colors.white,
    titleSpacing: 16,
    title: Image.asset(
      'assets/images/zeka-wordmark.png',
      height: 34,
      fit: BoxFit.contain,
    ),
    actions: [
      _TopChip(
        icon: Icons.local_fire_department_rounded,
        text: '${progress.streak}',
        color: coral,
      ),
      const SizedBox(width: 6),
      _TopChip(
        icon: Icons.star_rounded,
        text: '${progress.stars}',
        color: const Color(0xFFE6A800),
      ),
      IconButton(
        tooltip: progress.musicOn ? 'Matikan musik' : 'Putar musik',
        onPressed: onMusic,
        icon: Icon(
          progress.musicOn ? Icons.volume_up_rounded : Icons.volume_off_rounded,
          color: blue,
        ),
      ),
      const SizedBox(width: 4),
    ],
  );
}

class _TopChip extends StatelessWidget {
  const _TopChip({required this.icon, required this.text, required this.color});
  final IconData icon;
  final String text;
  final Color color;

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
    decoration: BoxDecoration(
      color: color.withValues(alpha: .12),
      borderRadius: BorderRadius.circular(13),
    ),
    child: Row(
      children: [
        Icon(icon, size: 18, color: color),
        const SizedBox(width: 3),
        Text(
          text,
          style: const TextStyle(color: ink, fontWeight: FontWeight.w900),
        ),
      ],
    ),
  );
}
