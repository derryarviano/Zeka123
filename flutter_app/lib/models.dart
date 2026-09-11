import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ProgressStore extends ChangeNotifier {
  ProgressStore(this._prefs);
  final SharedPreferences _prefs;
  String name = '';
  int grade = 1;
  int stars = 0;
  int streak = 1;
  bool onboarded = false;
  bool musicOn = false;
  final Set<String> completed = {};

  static Future<ProgressStore> load() async {
    final prefs = await SharedPreferences.getInstance();
    final store = ProgressStore(prefs)
      ..name = prefs.getString('childName') ?? ''
      ..grade = prefs.getInt('grade') ?? 1
      ..stars = prefs.getInt('stars') ?? 0
      ..streak = prefs.getInt('streak') ?? 1
      ..onboarded = prefs.getBool('onboarded') ?? false
      ..musicOn = prefs.getBool('musicOn') ?? false;
    store.completed.addAll(prefs.getStringList('completed') ?? const []);
    return store;
  }

  Future<void> finishSetup(String childName, int selectedGrade) async {
    name = childName.trim().isEmpty ? 'Penjelajah' : childName.trim();
    grade = selectedGrade;
    onboarded = true;
    await _prefs.setString('childName', name);
    await _prefs.setInt('grade', grade);
    await _prefs.setBool('onboarded', true);
    notifyListeners();
  }

  Future<void> complete(String subject, int module) async {
    if (completed.add('$grade-$subject-$module')) stars += 20;
    await _prefs.setInt('stars', stars);
    await _prefs.setStringList('completed', completed.toList());
    notifyListeners();
  }

  Future<void> setGrade(int value) async {
    grade = value;
    await _prefs.setInt('grade', value);
    notifyListeners();
  }

  Future<void> setMusic(bool value) async {
    musicOn = value;
    await _prefs.setBool('musicOn', value);
    notifyListeners();
  }

  Future<void> reset() async {
    await _prefs.clear();
    name = '';
    grade = 1;
    stars = 0;
    streak = 1;
    onboarded = false;
    musicOn = false;
    completed.clear();
    notifyListeners();
  }
}

class LessonQuestion {
  const LessonQuestion({
    required this.prompt,
    required this.options,
    required this.answer,
    required this.hint,
  });
  final String prompt;
  final List<String> options;
  final String answer;
  final String hint;
  factory LessonQuestion.fromJson(Map<String, dynamic> json) => LessonQuestion(
    prompt: json['prompt'] as String,
    options: (json['options'] as List).cast<String>(),
    answer: json['answer'] as String,
    hint: json['hint'] as String,
  );
}

class QuestionBank {
  static Map<String, dynamic>? _data;
  static Future<List<LessonQuestion>> load(
    int grade,
    String subject,
    int module,
  ) async {
    _data ??= jsonDecode(
      await rootBundle.loadString('assets/data/questions.json'),
    ) as Map<String, dynamic>;
    final gradeData = _data!['$grade'] as Map<String, dynamic>;
    final modules = gradeData[subject] as List;
    return (modules[module] as List)
        .map((item) => LessonQuestion.fromJson(item as Map<String, dynamic>))
        .toList();
  }
}
