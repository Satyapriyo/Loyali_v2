// components/FaqSection.tsx
"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
    {
      question: "What is Loyali?",
      answer:
        "Loyali is a platform that helps creators launch loyalty drops as compressed NFTs (cNFTs) on Solana. Fans can claim unique digital rewards, while creators stay in control of the experience.",
    },
    {
      question: "How do loyalty drops work?",
      answer:
        "Creators can upload an image and name for their drop, set a max supply, and publish it. Fans can then claim a limited-edition cNFT — first come, first served.",
    },
    {
      question: "Why use compressed NFTs (cNFTs)?",
      answer:
        "cNFTs are optimized for scalability and cost-efficiency on Solana. They’re perfect for large drops, allowing creators to reward fans without high on-chain fees.",
    },
    {
      question: "Do I need to pay gas or fees?",
      answer:
        "No, claiming is free for fans. All on-chain fees are handled upfront by the creator when launching the drop.",
    },
    {
      question: "Is wallet connection secure?",
      answer:
        "Yes. We use Solana’s trusted wallet adapters and never access your private keys. You remain fully in control of your wallet at all times.",
    },
    {
      question: "Can I trade or transfer the cNFTs I claim?",
      answer:
        "Yes. Once claimed, your cNFT is yours to keep, trade, or send — just like any standard Solana NFT.",
    },
  ];
  

export default function FaqSection() {
  return (
    <div className="max-w-3xl mx-auto p-4 mt-10 mb-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem
            value={`item-${index}`}
            key={index}
            className="border border-violet-500 rounded-xl p-2"
          >
            <AccordionTrigger className="text-left text-black">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
