import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:zeka123/main.dart';
import 'package:zeka123/models.dart';

void main() {
  test('penukaran koleksi mengurangi dan menyimpan bintang', () async {
    SharedPreferences.setMockInitialValues({'stars': 120});
    final progress = await ProgressStore.load();

    expect(progress.collectionUnlocked, isEmpty);
    expect(await progress.redeemCollection(1, 60), isTrue);
    expect(progress.stars, 60);
    expect(progress.collectionUnlocked, contains(1));

    final reloaded = await ProgressStore.load();
    expect(reloaded.stars, 60);
    expect(reloaded.collectionUnlocked, contains(1));
  });

  testWidgets('onboarding dan jumlah gambar aman pada layar 438x608', (
    tester,
  ) async {
    tester.view.physicalSize = const Size(438, 608);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    SharedPreferences.setMockInitialValues({});
    final progress = await ProgressStore.load();

    await tester.pumpWidget(ZekaApp(progress: progress));
    await tester.pumpAndSettle();
    expect(find.text('Halo, penjelajah baru!'), findsOneWidget);
    expect(tester.takeException(), isNull);

    await tester.enterText(find.byType(TextField), 'Timothy');
    final start = find.text('Mulai asesmen singkat');
    await tester.ensureVisible(start);
    await tester.tap(start);
    await tester.pumpAndSettle();
    await tester.tap(find.text('Buku'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Kucing'));
    await tester.pumpAndSettle();

    expect(find.text('🍎'), findsNWidgets(2));
    expect(find.text('⚽'), findsNWidgets(3));
    expect(tester.takeException(), isNull);

    await tester.tap(find.text('Tiga bola'));
    await tester.pumpAndSettle();
    expect(find.text('Pilih dunia belajar'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('koleksi terkunci menjelaskan kekurangan bintang', (
    tester,
  ) async {
    tester.view.physicalSize = const Size(438, 608);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    SharedPreferences.setMockInitialValues({
      'onboarded': true,
      'childName': 'Timothy',
      'grade': 2,
      'stars': 0,
    });
    final progress = await ProgressStore.load();

    await tester.pumpWidget(ZekaApp(progress: progress));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Koleksi'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('60 ⭐'));
    await tester.pump();

    expect(
      find.text(
        'Kamu membutuhkan 60 bintang lagi, ayo lanjutkan petualanganmu!',
      ),
      findsOneWidget,
    );
    expect(tester.takeException(), isNull);
  });
}
