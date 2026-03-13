"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
}) {
  return (
    <div
      className={cn(
        "group relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border border-border/50 bg-white/5 backdrop-blur-sm px-4 py-3 transition-all duration-500 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-white/10 hover:skew-y-0 hover:z-50 hover:scale-105 hover:after:opacity-0 [&>*]:flex [&>*]:items-center [&>*]:gap-2",

        className
      )}
    >



      <div>
        <span className="relative inline-block rounded-full bg-slate-800 p-2 shadow-inner group-hover:bg-blue-600 transition-colors">
          {icon}
        </span>
        <p className={cn("text-lg font-semibold text-slate-400 group-hover:text-blue-500 transition-colors", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg font-medium text-slate-300 group-hover:text-white transition-colors">
        {description}
      </p>
      <p className="text-slate-500 text-sm">{date}</p>

    </div>
  );
}

export default function DisplayCards({ cards }) {
  const defaultCards = [
    {
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
