import 'package:flutter/material.dart';

const ink = Color(0xFF173260);
const blue = Color(0xFF2F6FE4);
const paleBlue = Color(0xFFEDF4FF);
const yellow = Color(0xFFFFD34F);
const green = Color(0xFF2AAA78);
const coral = Color(0xFFFF7A66);

ThemeData zekaTheme() {
  final base = ThemeData(
    useMaterial3: true,
    scaffoldBackgroundColor: paleBlue,
    colorScheme: ColorScheme.fromSeed(seedColor: blue, primary: blue),
    fontFamily: 'Nunito',
  );
  return base.copyWith(
    textTheme: base.textTheme.copyWith(
      displayLarge: const TextStyle(
        fontFamily: 'Fredoka',
        color: ink,
        fontWeight: FontWeight.w600,
      ),
      displayMedium: const TextStyle(
        fontFamily: 'Fredoka',
        color: ink,
        fontWeight: FontWeight.w600,
      ),
      headlineLarge: const TextStyle(
        fontFamily: 'Fredoka',
        color: ink,
        fontWeight: FontWeight.w600,
      ),
      headlineMedium: const TextStyle(
        fontFamily: 'Fredoka',
        color: ink,
        fontWeight: FontWeight.w600,
      ),
      headlineSmall: const TextStyle(
        fontFamily: 'Fredoka',
        color: ink,
        fontWeight: FontWeight.w600,
      ),
      titleLarge: const TextStyle(
        fontFamily: 'Fredoka',
        color: ink,
        fontWeight: FontWeight.w600,
      ),
      bodyLarge: const TextStyle(color: ink, fontWeight: FontWeight.w600),
      bodyMedium: const TextStyle(color: ink, fontWeight: FontWeight.w600),
      labelLarge: const TextStyle(fontWeight: FontWeight.w900),
    ),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        minimumSize: const Size(48, 52),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(17)),
        textStyle: const TextStyle(
          fontFamily: 'Nunito',
          fontSize: 15,
          fontWeight: FontWeight.w900,
        ),
      ),
    ),
    navigationBarTheme: NavigationBarThemeData(
      height: 72,
      labelTextStyle: WidgetStateProperty.resolveWith((states) {
        return TextStyle(
          color: ink,
          fontSize: 12.5,
          fontWeight: states.contains(WidgetState.selected)
              ? FontWeight.w900
              : FontWeight.w700,
        );
      }),
    ),
  );
}

class SubjectInfo {
  const SubjectInfo(
    this.id,
    this.title,
    this.subtitle,
    this.iconIndex,
    this.color,
    this.homeColor,
    this.light,
  );
  final String id;
  final String title;
  final String subtitle;
  final int iconIndex;
  final Color color;
  final Color homeColor;
  final Color light;
}

const subjects = <SubjectInfo>[
  SubjectInfo(
    'indo',
    'Bahasa Indonesia',
    'Baca & bercerita',
    0,
    Color(0xFF2D62C4),
    Color(0xFFF2B824),
    Color(0xFFE7F0FF),
  ),
  SubjectInfo(
    'math',
    'Matematika',
    'Hitung & berpola',
    1,
    Color(0xFFC94F3E),
    Color(0xFF7547BC),
    Color(0xFFFFECE8),
  ),
  SubjectInfo(
    'english',
    'Bahasa Inggris',
    'Kata & kalimat',
    2,
    Color(0xFF7450BC),
    Color(0xFFE76638),
    Color(0xFFF1EAFF),
  ),
  SubjectInfo(
    'science',
    'Sains',
    'Amati & temukan',
    3,
    Color(0xFF187A58),
    Color(0xFF88502F),
    Color(0xFFE4F7EF),
  ),
];

class IllustratedIcon extends StatelessWidget {
  const IllustratedIcon({super.key, required this.index, this.size = 48});
  final int index;
  final double size;

  @override
  Widget build(BuildContext context) {
    final column = index % 4;
    final row = index ~/ 4;
    return Semantics(
      image: true,
      child: ClipRect(
        child: SizedBox.square(
          dimension: size,
          child: OverflowBox(
            minWidth: size * 4,
            maxWidth: size * 4,
            minHeight: size * 2,
            maxHeight: size * 2,
            alignment: Alignment(-1 + (column * 2 / 3), row == 0 ? -1 : 1),
            child: Image.asset(
              'assets/images/zeka-icon-sprite-v2.png',
              width: size * 4,
              height: size * 2,
              fit: BoxFit.fill,
              filterQuality: FilterQuality.high,
            ),
          ),
        ),
      ),
    );
  }
}
