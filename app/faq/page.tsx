import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQ = {
  question: string;
  answer: string;
};

const faqItems: FAQ[] = [
  {
    question: "Is AnimeVault completely free?",
    answer: "Yes! (and will always be)",
  },
  {
    question: "Does AnimeVault own/store any of the content?",
    answer:
      "Nope, AnimeVault simply connects to servers such as gogoanime to provide epsiode streams.",
  },
  {
    question: "Any recommendations?",
    answer:
      "Try searching One Piece, Naruto, Attack on Titan or Fullmetal Alchemist.",
  },
];

const Page = () => {
  return (
    <div className="min-h-[80vh] py-8 xl:px-24 px-8 flex flex-col gap-8 items-center">
      <h1 className="text-white font-bold text-3xl">
        Frequently Asked Questions
      </h1>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((value, index) => (
          <AccordionItem value={index.toString()} key={index}>
            <AccordionTrigger className="text-white">
              {value.question}
            </AccordionTrigger>
            <AccordionContent className="text-zinc-300">
              {value.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Page;
