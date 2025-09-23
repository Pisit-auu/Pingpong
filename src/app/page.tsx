"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Question {
  id: number;
  text: string;
  choices: { label: string; ghost: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "ถ้าคุณกำลังฝันว่าอยู่ในมหาวิทยาลัยร้าง คุณจะทำสิ่งใดเป็นอย่างแรก",
    choices: [
      { label: "เดินสำรวจมหาวิทยาลัย", ghost: "" },
      { label: "อยู่เฉยๆกลัวไม่กล้าไปไหน", ghost: "" },
      { label: "พยายามจะตื่น ต่อให้พยายามไปก็ไม่ตื่นหรอก", ghost: "" },
    ],
  },
  {
    id: 2,
    text: "ถ้ามีโอกาสหรือตอนนี้กำลังเรียนอยู่ ตอนเรียน คุณเป็นแบบไหน",
    choices: [
      { label: "เด็กกิจกรรมตัวยง", ghost: "ผีนางรำ" },
      { label: "เกาะเพื่อนอย่างเดียว", ghost: "ผีกะ" },
      { label: "ของกินเต็มโต๊ะยิ่งกว่าโรงอาหาร", ghost: "ผีปอบ" },
      { label: "ทำงานโต้รุ่งนอนเช้าทีเดียว", ghost: "ผีกระสือ" },
    ],
  },
  {
    id: 3,
    text: "แล้วถ้าเลือกคบเพื่อนล่ะ จะเลือกคบยังไง?",
    choices: [
      { label: "ติดสวย แกงค์ลูกคุณ", ghost: "ผีกะ" },
      { label: "Tiktoker วันๆพันคอนเทนต์ เน้นรำตึงๆ", ghost: "ผีนางรำ" },
      { label: "introvert เพื่อนน้อย แต่ 100%", ghost: "ผีกระสือ" },
      { label: "สายกิน เลิกเรียนเจอกันตี๋น้อย", ghost: "ผีปอบ" },
    ],
  },
  {
    id: 4,
    text: "ตอนนี้เรียนสายไหนอยู่?",
    choices: [
      { label: "สายศิลป์/ครีเอทีฟ", ghost: "ผีกะ" },
      { label: "สายสุขภาพ/วิทย์", ghost: "ผีกระสือ" },
      { label: "สายอาหาร/บริการ", ghost: "ผีปอบ" },
      { label: "สายการแสดง/ดนตรี/การสื่อสาร", ghost: "ผีนางรำ" },
    ],
  },
  {
    id: 5,
    text: "เวลาออกไปแฮงค์เอาท์เป็นคนแบบไหน",
    choices: [
      { label: "สายส่องเน้นกินเงียบๆ", ghost: "ผีกระสือ" },
      { label: "ดื่มอย่างเดียว อย่างอื่นไว้ก่อน", ghost: "ผีปอบ" },
      { label: "เน้นสวยไว้ก่อน หน้าต้องเป๊ะ", ghost: "ผีกะ" },
      { label: "เต้นก่อนใครมองชั่งมัน", ghost: "ผีนางรำ" },
    ],
  },
  {
    id: 6,
    text: "ตอนสอบล่ะ เป็นยังไง",
    choices: [
      { label: "คะแนนเต็ม 100 อย่างน้อยต้องได้ 99", ghost: "ผีกระสือ" },
      { label: "ทำได้ ❌ ได้ทำ ✅", ghost: "ผีกะ" },
      { label: "อ่านหนังสือเต็มที่ แต่ไม่ออกสอบเลย", ghost: "ผีนางรำ" },
      { label: "มีสอบด้วยหรอ", ghost: "ผีปอบ" },
    ],
  },
  {
    id: 7,
    text: "เวลานั่งเรียน จะเลือกแถวไหน",
    choices: [
      { label: "นั่งหน้าอยู่แล้ว ชอบตอบมาก", ghost: "ผีนางรำ" },
      { label: "นั่งกลางๆดีกว่า กำลังดี", ghost: "ผีกะ" },
      { label: "เด็กหลังห้อง ขออยู่เงียบๆ", ghost: "ผีปอบ" },
      { label: "ยังไม่ทันนั่งก็เลิกเรียนแล้ว", ghost: "ผีกระสือ" },
    ],
  },
  {
    id: 8,
    text: "ตอนทำงานกลุ่มเป็นแบบไหน",
    choices: [
      { label: "หัวหน้ากลุ่ม แบกหลังหัก", ghost: "ผีกะ" },
      { label: "เดี๋ยวพรีเอง เน้นพรีเซนต์งาน", ghost: "ผีนางรำ" },
      { label: "ทำคนเดียวขี้เกียจคุยกับคนอื่น", ghost: "ผีปอบ" },
      { label: "หาย มาอีกทีตอนส่งงาน", ghost: "ผีกระสือ" },
    ],
  },
  {
    id: 9,
    text: "เวลาประชุมงานเป็นคนยังไง?",
    choices: [
      { label: "พูดเต็มที่มีไอเดียในหัว", ghost: "ผีนางรำ" },
      { label: "ฟังแล้วทำ", ghost: "ผีกะ" },
      { label: "หลับ", ghost: "ผีปอบ" },
      { label: "ไม่ว่าง", ghost: "ผีกระสือ" },
    ],
  },
  {
    id: 10,
    text: "Item ที่ต้องมีติดตัวคือ?",
    choices: [
      { label: "อาหาร อะไรก็ได้", ghost: "ผีปอบ" },
      { label: "เครื่องสำอางค์", ghost: "ผีกะ" },
      { label: "เครื่องประดับ", ghost: "ผีนางรำ" },
      { label: "กาแฟ", ghost: "ผีกระสือ" },
    ],
  },
];

const RESULT_META: Record<string, string> = {
  "ผีกะ": "คุณคือ ผีกะ ผีกะชอบสิงอยู่ในคน เกาะคนอื่นใช้ชีวิต ตอนกลางวันจะเป็นคนธรรมดา แต่พอตกกลางคืนแล้วสวยทันตาเห็น",
  "ผีกระสือ": "คุณคือ ผีกระสือ เน้นออกหากินในเวลากลางคืน กลางวันพักก่อน กลางคืนคือเวลาของพี่ ชอบเก็บตัวเวลากลางวัน ไม่ชอบสุงสิงกับใคร ขออยู่คนเดียว",
  "ผีปอบ": "คุณคือ ผีปอบ ผีปอบกินเก่งมาก ขอให้ได้กิน ชอบกินสุดๆ หิวอยู่อย่างงั้น เน้นออกหากินเวลากลางคืน ใครที่ได้ผีกะน่าจะชอบกิน บุฟเฟต์แน่นอน",
  "ผีนางรำ": "คุณคือ ผีนางรำ ผีนางรำสง่างาม อ่อนช้อย ชอบการรำมาก ถ้าในโลกของผีมี TikTok ผีนางรำคงได้เป็น tiktoker แล้วล่ะ",
};

export default function Page() {
  const [step, setStep] = useState<"intro" | "poem" | "quiz" | "result">("intro");
  const [cursor, setCursor] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const selectChoice = (choice: { label: string; ghost: string }) => {
    setAnswers([...answers, choice.ghost]);
    if (cursor < QUESTIONS.length - 1) setCursor(cursor + 1);
    else setStep("result");
  };

  const restart = () => {
    setStep("intro");
    setCursor(0);
    setAnswers([]);
  };

  const resultGhost = () => {
    const counts: Record<string, number> = {};
    for (const g of answers) counts[g] = (counts[g] || 0) + 1;
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  };

  const FooterMessage = () => (
    <p className="mt-6 text-center text-red-400 text-sm md:text-base">
      แล้วอยากรู้ไหมว่าวิลัยเป็นผีอะไร ถ้าอยากรู้ก็ตามมาเจอกันได้ที่<br />
      มหาวิทยาลัยรังสิต ตึก8 วันที่ 14-16 ตุลาคมนี้
    </p>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 space-y-8">
      <div className="w-64 mx-auto">
        <Image
          src="/mahawilai.png"
          alt="มาหาวิลัย วิญญาณเฮี้ยน"
          width={768}
          height={768}
          priority
          className="w-full h-auto"
        />
      </div>

      {step === "intro" && (
        <div className="text-center space-y-6 max-w-xl">
          <h1 className="text-2xl md:text-3xl font-bold">คุณเคยตายไหม?</h1>
          <p>ถ้าได้ลองตาย จะเป็นผีอะไร? ถ้าอยากรู้</p>
          <button
            onClick={() => setStep("poem")}
            className="px-6 py-3 bg-red-700 hover:bg-red-800 rounded-lg font-semibold shadow-lg"
          >
            ลองกดดูสิ
          </button>
          <div className="mt-16 space-y-2">
            <h2 className="text-xl font-bold">มาหาวิลัย วิญญาณเฮี้ยน</h2>
            <p className="text-sm text-gray-400">
              ** เป็นแบบทดสอบเพื่อความบันเทิงเท่านั้น ไม่ใช่แบบทดสอบทางจิตวิทยา **
            </p>
          </div>
          <FooterMessage />
        </div>
      )}

      {step === "poem" && (
        <div className="text-center space-y-6 max-w-xl">
          <p>
            เสียงโหยสะท้อน ดังย้อนวิญญา<br />
            เฝ้าจ้องเวลา ถึงคราจากกัน<br />
            โอ้วิไลเอ๋ย ละเลยผูกพัน<br />
            สิ้นคืนสิ้นวัน ไม่หวนคืนมา
          </p>
          <button
            onClick={() => setStep("quiz")}
            className="px-6 py-3 bg-red-700 hover:bg-red-800 rounded-lg font-semibold shadow-lg"
          >
            ถัดไป
          </button>
          <FooterMessage />
        </div>
      )}

      {step === "quiz" && (
        <div className="max-w-2xl w-full space-y-8">
          <h2 className="text-xl font-bold">{QUESTIONS[cursor].text}</h2>
          <div className="space-y-4">
            {QUESTIONS[cursor].choices.map((c, i) => (
              <button
                key={i}
                onClick={() => selectChoice(c)}
                className="w-full p-4 bg-gray-900 rounded-lg hover:bg-gray-800 text-left shadow"
              >
                {c.label}
              </button>
            ))}
          </div>
          <FooterMessage />
        </div>
      )}

      {step === "result" && (
        <div className="text-center max-w-xl space-y-6">
          <h2 className="text-2xl font-bold">{resultGhost()}</h2>
          <p>{RESULT_META[resultGhost()]}</p>
          <FooterMessage />
          <button
            onClick={restart}
            className="mt-6 px-6 py-3 bg-red-700 hover:bg-red-800 rounded-lg font-semibold shadow-lg"
          >
            ทำใหม่อีกครั้ง
          </button>
        </div>
      )}
    </div>
  );
}
