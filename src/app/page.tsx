"use client";

import React, { useState } from "react";

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




export default function Page() {
  const [step, setStep] = useState<"intro" | "poem" | "quiz" | "result">("intro");
  const [cursor, setCursor] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const selectChoice = (choice: { label: string; ghost: string }) => {
    setAnswers((prev) => [...prev, choice.ghost]);
    if (cursor < QUESTIONS.length - 1) setCursor((c) => c + 1);
    else setStep("result");
  };

  const restart = () => {
    setStep("intro");
    setCursor(0);
    setAnswers([]);
  };




  const bgFor = (s: typeof step, ghost?: string) => {
    if (s === "intro") return "/S__14794756_0.jpg"; // Intro poster
    if (s === "poem") return "/S__14794757_0.jpg"; // Poem poster
    if (s === "quiz") return "/S__14794758_0.jpg"; // Generic red bg
    if (s === "result") {
      if (ghost === "ผีกระสือ") return "/S__14794759_0.jpg";
      if (ghost === "ผีกะ") return "/S__14794760_0.jpg";
      if (ghost === "ผีนางรำ") return "/S__14794761_0.jpg";
      if (ghost === "ผีปอบ") return "/S__14794762_0.jpg";
      return "/S__14794758_0.jpg";
    }
    return "/S__14794758_0.jpg";
  };

  const ghostNow = answers.length
    ? Object.entries(
        answers.reduce<Record<string, number>>((acc, g) => {
          acc[g] = (acc[g] || 0) + 1;
          return acc;
        }, {})
      ).sort((a, b) => b[1] - a[1])[0][0]
    : undefined;

  return (
    <div
      className="relative min-h-screen text-white flex flex-col items-center justify-center p-6"
      style={{
        backgroundImage: `url('${bgFor(step, ghostNow)}')`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
        
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 " />

      <div className="relative z-10 w-full max-w-3xl mx-auto space-y-8">
        {step === "intro" && (
          <div className="text-center space-y-6 max-w-xl mx-auto">
            
            <button
              onClick={() => setStep("poem")}
              className="mt-60 px-7 py-3 bg-red-700 hover:bg-red-800 rounded-xl font-semibold shadow-[0_8px_20px_rgba(220,20,60,0.45)] transition"
            >
              ลองกดดูสิ
            </button>
            <div className="mt-16 space-y-2">
  
            </div>

          </div>
        )}

        {step === "poem" && (
          <div className="text-center space-y-6 max-w-2xl mx-auto">
          
            <button
              onClick={() => setStep("quiz")}
              className="mt-120 px-7 py-3 bg-red-700 hover:bg-red-800 rounded-xl font-semibold shadow-[0_8px_20px_rgba(220,20,60,0.45)] transition"
            >
              ถัดไป
            </button>
 
          </div>
        )}

        {step === "quiz" && (
              <div className="w-full mx-auto">
                {/* การ์ดคำถามกว้างพอดีกับรูป: สูงสุด ~520px และไม่เกิน 92vw */}
                <div className="mx-auto w-[min(92vw,520px)] bg-black/45 border border-red-900/30
                                rounded-2xl p-5 md:p-6 shadow-[0_10px_30px_rgba(0,0,0,.6)]">
                  <h2 className="text-lg md:text-xl font-bold drop-shadow mb-4">
                    {QUESTIONS[cursor].text}
                  </h2>

                  <div className="space-y-3">
                    {QUESTIONS[cursor].choices.map((c, i) => (
                                        <button
                      key={i}
                      onClick={() => selectChoice(c)}
                      className="w-full p-3.5 md:p-4 
                                bg-black/60 border border-red-900/30 rounded-xl 
                                text-left transition 
                                hover:bg-red-800/70 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(220,20,60,0.6)] 
                                active:scale-[0.97] active:bg-red-900/80"
                    >
                      {c.label}
                    </button>

                    ))}
                  </div>
                </div>
              </div>
            )}
              {step === "result" && (
  <div className="w-full mx-auto">
    {/* เนื้อหาผลลัพธ์ */}
    <div className="max-w-2xl mx-auto text-center space-y-6">
     
      {/* กดเพื่อแสดงปุ่ม */}
         <button
          onClick={restart}
          className="px-6 py-3 bg-red-700 hover:bg-red-800 rounded-xl font-semibold 
                    shadow-[0_8px_20px_rgba(220,20,60,0.45)] transition active:scale-95"
        >
          ทำใหม่อีกครั้ง
        </button>
    </div>

   
  </div>
)}




      </div>
    </div>
  );
}
