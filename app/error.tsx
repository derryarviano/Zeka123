'use client';

export default function ErrorScreen({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="error-screen">
      <section className="error-card">
        <h1>Dunia Kobi perlu disiapkan lagi</h1>
        <p>Data kamu tetap aman di perangkat ini. Coba muat ulang layar.</p>
        <button onClick={reset}>Coba lagi</button>
      </section>
    </main>
  );
}
