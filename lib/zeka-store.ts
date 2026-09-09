export type SubjectKey = 'indo' | 'math' | 'english' | 'science';
export type LearningEvent = {
  id: string;
  type:
    | 'module_completed'
    | 'answer_attempt'
    | 'creative_completed'
    | 'mission_completed';
  at: string;
  subject?: SubjectKey;
  grade?: '1' | '2' | '3';
  moduleIndex?: number;
  attempts?: number;
  activity?: string;
};
export type ProgressData = {
  version: 2;
  completed: string[];
  events: LearningEvent[];
};
export type CollectionData = {
  version: 2;
  stars: number;
  pieces: number;
  revealedTrivia: number[];
};
const PROGRESS_KEY = 'zeka-progress',
  COLLECTION_KEY = 'zeka-collection',
  AUDIO_KEY = 'zeka-audio';
const clamp = (value: unknown, min: number, max: number, fallback: number) => {
  const n = Number(value);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
};
export function readProgress(): ProgressData {
  try {
    const raw = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
    return {
      version: 2,
      completed: Array.isArray(raw.completed)
        ? raw.completed.filter((x: unknown) => typeof x === 'string')
        : [],
      events: Array.isArray(raw.events)
        ? (raw.events.filter(
            (x: unknown) => !!x && typeof x === 'object',
          ) as LearningEvent[])
        : [],
    };
  } catch {
    return { version: 2, completed: [], events: [] };
  }
}
export function writeProgress(progress: ProgressData) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}
export function addLearningEvent(event: Omit<LearningEvent, 'id' | 'at'>) {
  const progress = readProgress();
  progress.events.push({
    ...event,
    id: crypto.randomUUID?.() || String(Date.now()),
    at: new Date().toISOString(),
  });
  progress.events = progress.events.slice(-1000);
  writeProgress(progress);
}
export function completeModule(
  grade: '1' | '2' | '3',
  subject: SubjectKey,
  moduleIndex: number,
  attempts: number,
) {
  const progress = readProgress();
  const key = `${grade}-${subject}-${moduleIndex}`;
  const isNew = !progress.completed.includes(key);
  if (isNew) progress.completed.push(key);
  progress.events.push({
    id: crypto.randomUUID?.() || String(Date.now()),
    type: 'module_completed',
    at: new Date().toISOString(),
    grade,
    subject,
    moduleIndex,
    attempts,
  });
  progress.events = progress.events.slice(-1000);
  writeProgress(progress);
  return isNew;
}
export function readCollection(): CollectionData {
  try {
    const raw = JSON.parse(localStorage.getItem(COLLECTION_KEY) || '{}');
    return {
      version: 2,
      stars: clamp(raw.stars, 0, 99999, 240),
      pieces: clamp(raw.pieces, 0, 6, 3),
      revealedTrivia: Array.isArray(raw.revealedTrivia)
        ? raw.revealedTrivia.filter((x: unknown) => Number.isInteger(x))
        : [],
    };
  } catch {
    return { version: 2, stars: 240, pieces: 3, revealedTrivia: [] };
  }
}
export function writeCollection(collection: CollectionData) {
  localStorage.setItem(
    COLLECTION_KEY,
    JSON.stringify({
      ...collection,
      stars: clamp(collection.stars, 0, 99999, 0),
      pieces: clamp(collection.pieces, 0, 6, 0),
    }),
  );
}
export function readAudioPreference() {
  try {
    const raw = JSON.parse(localStorage.getItem(AUDIO_KEY) || '{}');
    return { enabled: raw.enabled !== false, hidden: raw.hidden === true };
  } catch {
    return { enabled: true, hidden: false };
  }
}
export function writeAudioPreference(value: {
  enabled: boolean;
  hidden: boolean;
}) {
  localStorage.setItem(AUDIO_KEY, JSON.stringify(value));
}
export function safeProfile(raw: string | null) {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    const name =
      typeof value.name === 'string' ? value.name.trim().slice(0, 32) : '';
    const age = ['6', '7', '8', '9'].includes(String(value.age))
      ? String(value.age)
      : '7';
    const grade = ['1', '2', '3'].includes(String(value.grade))
      ? (String(value.grade) as '1' | '2' | '3')
      : '1';
    return name ? { name, age, grade } : null;
  } catch {
    return null;
  }
}
export function resetZekaData() {
  [
    'zeka-child-profile',
    'zeka-assessment-done',
    'zeka-assessment-score',
    'zeka-placement',
    PROGRESS_KEY,
    COLLECTION_KEY,
    AUDIO_KEY,
  ].forEach((key) => localStorage.removeItem(key));
}
