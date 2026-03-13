"use client";

import DisplayCards from "@/components/ui/display-cards";
import { Sparkles, Send, Bell } from "lucide-react";

const defaultCards = [
  {
    icon: <Send className="size-4 text-blue-300" />,
    title: "Message Ingest",
    description: "Telegram bot active",
    date: "10s ago",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] hover:-translate-y-24 hover:-translate-x-12 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-purple-300" />,
    title: "AI Analysis",
    description: "Extracted: TechNova Inc",
    date: "5s ago",
    iconClassName: "text-purple-500",
    titleClassName: "text-purple-500",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-20 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Bell className="size-4 text-red-300" />,
    title: "Due Soon",
    description: "Frontend Developer role",
    date: "2 days left",
    iconClassName: "text-red-500",
    titleClassName: "text-red-500",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:-translate-y-12 hover:translate-x-32",
  },
];


export function DisplayCardsDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center py-10 scale-90 sm:scale-100">
      <div className="w-full max-w-3xl">
        <DisplayCards cards={defaultCards} />
      </div>
    </div>
  );
}
