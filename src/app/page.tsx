"use client";

import React, { useMemo, useState } from "react";

// --- Mock data: คุณแก้คำถาม/ตัวเลือกได้ตามต้องการ ---
// แนวคิดคล้ายแบบทดสอบบุคลิกภาพ: ให้คะแนนแต่ละตัวเลือกไปยัง "key" ต่าง ๆ
// แล้วสรุปผลว่า key ไหนเด่นที่สุด

type KeyId = "sun" | "water" | "soil" | "wind"; // ธีมให้ความรู้สึก "Blooming"

interface Choice {
  id: string;
  label: string;
  // น้ำหนักคะแนนต่อ key แต่ละตัว
  weights: Partial<Record<KeyId, number>>;
}

interface Question {
  id: string;
  title: string;
  choices: Choice[];
}

const QUESTIONS: Question[] = [
  {
    id: "q1",
    title: "เช้าวันหยุดที่ชอบ คุณมักจะทำอะไร?",
    choices: [
      { id: "q1a", label: "ออกไปเจอแดด ออกกำลังเบา ๆ", weights: { sun: 2, wind: 1 } },
      { id: "q1b", label: "รดน้ำต้นไม้ จัดบ้านให้สดชื่น", weights: { water: 2, soil: 1 } },
      { id: "q1c", label: "คาเฟ่เงียบ ๆ อ่านหนังสือ", weights: { soil: 2 } },
      { id: "q1d", label: "ทริปสั้น ๆ เปลี่ยนบรรยากาศ", weights: { wind: 2, sun: 1 } },
    ],
  },
  {
    id: "q2",
    title: "ถ้าต้องเริ่มโปรเจกต์ใหม่ คุณโฟกัสอะไรเป็นอันดับแรก?",
    choices: [
      { id: "q2a", label: "ภาพรวม เป้าหมายใหญ่ และเดดไลน์", weights: { sun: 2 } },
      { id: "q2b", label: "ทรัพยากรและข้อมูลที่มีอยู่", weights: { soil: 2 } },
      { id: "q2c", label: "ความยืดหยุ่น ปรับได้ตามสถานการณ์", weights: { wind: 2 } },
      { id: "q2d", label: "คนในทีมและการสื่อสารให้ไหลลื่น", weights: { water: 2 } },
    ],
  },
  {
    id: "q3",
    title: "คำไหนสะท้อนสไตล์คุณที่สุด",
    choices: [
      { id: "q3a", label: "สดใส มุ่งมั่น", weights: { sun: 2 } },
      { id: "q3b", label: "สงบ ลุ่มลึก", weights: { soil: 2 } },
      { id: "q3c", label: "ลื่นไหล เอื้อเฟื้อ", weights: { water: 2 } },
      { id: "q3d", label: "พลิ้วไหว ชอบลองของใหม่", weights: { wind: 2 } },
    ],
  },
  {
    id: "q4",
    title: "เวลามีปัญหาเข้ามา คุณมักจะ…",
    choices: [
      { id: "q4a", label: "ลุยแก้ตรงจุด โฟกัสเป้าหมาย", weights: { sun: 2 } },
      { id: "q4b", label: "ชะลอ ดูรากเหง้าอย่างเป็นระบบ", weights: { soil: 2 } },
      { id: "q4c", label: "ถาม รับฟัง ปรับแผนร่วมกัน", weights: { water: 2 } },
      { id: "q4d", label: "ดูทางเลือกหลาย ๆ ทาง แล้วลองเลย", weights: { wind: 2 } },
    ],
  },
  {
    id: "q5",
    title: "กิจกรรมที่ทำแล้วรู้สึกได้พลัง",
    choices: [
      { id: "q5a", label: "กิจกรรมกลางแจ้ง แดดดี ๆ", weights: { sun: 2 } },
      { id: "q5b", label: "จัดระเบียบ เคลียร์งานค้าง", weights: { soil: 2 } },
      { id: "q5c", label: "พูดคุย เชื่อมคน ช่วยเหลือกัน", weights: { water: 2 } },
      { id: "q5d", label: "เดินทาง คิดไอเดียใหม่ ๆ", weights: { wind: 2 } },
    ],
  },
];

// คำอธิบายผลลัพธ์ของแต่ละ key
const KEY_META: Record<
  KeyId,
  { title: string; description: string; emoji: string; accent: string }
> = {
  sun: {
    title: "Sun Key",
    description:
      "พลังขับเคลื่อน ชัดเจน มุ่งสู่เป้าหมาย จุดไฟให้ทีมและตัวเองได้ดี",
    emoji: "☀️",
    accent: "from-amber-300 to-orange-400",
  },
  water: {
    title: "Water Key",
    description:
      "ลื่นไหล เข้าใจผู้คน เก่งเรื่องการสื่อสารและชุบชูบรรยากาศร่วมงาน",
    emoji: "💧",
    accent: "from-sky-300 to-cyan-400",
  },
  soil: {
    title: "Soil Key",
    description:
      "มั่นคง รอบคอบ รากฐานแน่น สร้างระบบให้ทุกอย่างเติบโตอย่างยั่งยืน",
    emoji: "🌱",
    accent: "from-lime-300 to-emerald-400",
  },
  wind: {
    title: "Wind Key",
    description:
      "คล่องตัว ชอบทดลอง เปิดรับสิ่งใหม่ สร้างทางเลือกและโอกาส",
    emoji: "🌬️",
    accent: "from-violet-300 to-fuchsia-400",
  },
};

// --- UI Components ---

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function ChoiceItem({
  choice,
  selected,
  onSelect,
}: {
  choice: Choice;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-2xl border mb-3 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
        selected ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          aria-hidden
          className={`mt-1 size-4 rounded-full border ${
            selected ? "border-indigo-600 bg-indigo-600" : "border-gray-400"
          }`}
        />
        <span className="leading-relaxed">{choice.label}</span>
      </div>
    </button>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-16 px-4">
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-medium">
        <span>🎯 แบบทดสอบใช้เวลา ~5-10 นาที</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mt-6">
        My{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
          Blooming Key
        </span>
      </h1>
      <p className="text-gray-600 mt-3">
        ค้น &quot;กุญแจ&quot; ที่ทำให้คุณเติบโตและทำงานได้อย่างเป็นตัวเอง
      </p>
      <div className="mt-10">
        <button
          onClick={onStart}
          className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-lg"
        >
          เริ่มทำแบบทดสอบ
        </button>
      </div>
    </div>
  );
}

function Result({
  bestKey,
  onRestart,
  scores,
}: {
  bestKey: KeyId;
  onRestart: () => void;
  scores: Record<KeyId, number>;
}) {
  const meta = KEY_META[bestKey];
  const percent = useMemo(() => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
    const entries = (Object.keys(scores) as KeyId[]).map((k) => ({
      k,
      v: Math.round((scores[k] / total) * 100),
    }));
    return entries;
  }, [scores]);

  const share = async () => {
    const text = `ฉันคือ ${meta.emoji} ${meta.title} – ${meta.description}`;
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Blooming Key", text, url });
      } catch (_) {}
    } else {
      try {
        await navigator.clipboard.writeText(`${text} \n${url}`);
        alert("คัดลอกข้อความสำหรับแชร์แล้ว");
      } catch (_) {}
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center py-16 px-4">
      <div
        className={`mx-auto w-24 h-24 rounded-3xl bg-gradient-to-br ${meta.accent} grid place-items-center text-4xl`}
      >
        <span>{meta.emoji}</span>
      </div>
      <h2 className="text-3xl font-bold mt-6">คุณคือ {meta.title}</h2>
      <p className="text-gray-600 mt-3">{meta.description}</p>

      <div className="mt-8 text-left">
        <h3 className="font-semibold mb-2">สัดส่วนพลังของคุณ</h3>
        <div className="space-y-2">
          {percent.map(({ k, v }) => (
            <div key={k}>
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  {KEY_META[k].emoji} {KEY_META[k].title}
                </span>
                <span>{v}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${KEY_META[k].accent}`}
                  style={{ width: `${v}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={share}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700"
        >
          แชร์ผลลัพธ์
        </button>
        <button
          onClick={onRestart}
          className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50"
        >
          ทำใหม่อีกครั้ง
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");
  const [cursor, setCursor] = useState(0); // index ของคำถามปัจจุบัน
  const [answers, setAnswers] = useState<Record<string, string>>({}); // questionId -> choiceId

  const progress = Math.round((cursor / QUESTIONS.length) * 100);

  const current = QUESTIONS[cursor];

  const selectChoice = (qId: string, choiceId: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: choiceId }));
  };

  const next = () => {
    if (cursor < QUESTIONS.length - 1) setCursor((c) => c + 1);
    else setStep("result");
  };

  const prev = () => setCursor((c) => Math.max(0, c - 1));

  const restart = () => {
    setStep("intro");
    setCursor(0);
    setAnswers({});
  };

  const scores: Record<KeyId, number> = useMemo(() => {
    const s: Record<KeyId, number> = { sun: 0, water: 0, soil: 0, wind: 0 };
    for (const q of QUESTIONS) {
      const cid = answers[q.id];
      const ch = q.choices.find((c) => c.id === cid);
      if (ch?.weights) {
        for (const [k, v] of Object.entries(ch.weights)) {
          s[k as KeyId] += v ?? 0;
        }
      }
    }
    return s;
  }, [answers]);

  const bestKey: KeyId = useMemo(() => {
    return (Object.keys(scores) as KeyId[]).reduce((best, k) =>
      scores[k] > scores[best] ? k : best
    , "sun");
  }, [scores]);

  if (step === "intro") return <Intro onStart={() => setStep("quiz")} />;

  if (step === "result") return <Result bestKey={bestKey} scores={scores} onRestart={restart} />;

  // --- Quiz Step ---
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-6">
        <ProgressBar value={progress} />
        <div className="mt-2 text-sm text-gray-600">
          ข้อ {cursor + 1} / {QUESTIONS.length}
        </div>
      </div>

      <div className="bg-white border rounded-3xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">{current.title}</h2>
        <div>
          {current.choices.map((c) => (
            <ChoiceItem
              key={c.id}
              choice={c}
              selected={answers[current.id] === c.id}
              onSelect={() => selectChoice(current.id, c.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={prev}
          disabled={cursor === 0}
          className="px-5 py-2.5 rounded-xl border border-gray-300 disabled:opacity-40 hover:bg-gray-50"
        >
          ย้อนกลับ
        </button>
        <button
          onClick={next}
          disabled={!answers[current.id]}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium disabled:bg-indigo-300"
        >
          {cursor === QUESTIONS.length - 1 ? "ดูผลลัพธ์" : "ถัดไป"}
        </button>
      </div>
    </div>
  );
}