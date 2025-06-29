import React from "react";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const faqs = [
  {
    question: "Jak mogę złożyć zamówienie?",
    answer:
      "Aby złożyć zamówienie, wybierz produkt, dodaj go do koszyka, a następnie przejdź do realizacji zamówienia i postępuj zgodnie z instrukcjami.",
  },
  {
    question: "Jak sprawdzić status zamówienia?",
    answer:
      "Status zamówienia możesz sprawdzić w panelu użytkownika po zalogowaniu lub poprzez link otrzymany na maila po zakupie.",
  },
  {
    question: "Czy mogę zwrócić zamówiony produkt?",
    answer:
      "Tak, możesz zwrócić produkt w ciągu 14 dni od otrzymania przesyłki. Więcej informacji znajdziesz w naszym regulaminie zwrotów.",
  },
  {
    question: "Jak mogę się skontaktować z obsługą klienta?",
    answer:
      "Napisz do nas na adres support@example.com lub skorzystaj z formularza kontaktowego dostępnego na stronie.",
  },
];
const FrequentlyAskedQuestions = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-200 py-12 px-2 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-neutral-900 tracking-tight">
          Najczęściej zadawane pytania
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={faq.question}
              className="rounded-xl border border-neutral-200 bg-white shadow transition"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex justify-between items-center p-4 text-left group"
              >
                <span className="font-semibold text-neutral-900">
                  {faq.question}
                </span>
                <span
                  className={`
                    transition-transform duration-300
                    ${openIdx === idx ? "rotate-180" : ""}
                  `}
                >
                  <KeyboardArrowDownIcon />
                </span>
              </button>
              <div
                className={`px-4 pb-4 text-neutral-700 text-sm transition-all duration-300 overflow-hidden ${
                  openIdx === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center text-neutral-500 text-sm">
          Masz inne pytanie?{" "}
          <a href="#" className="underline hover:text-neutral-900 transition">
            Skontaktuj się z nami
          </a>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
