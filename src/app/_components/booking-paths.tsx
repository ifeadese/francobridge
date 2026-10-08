"use client";

import { Fragment, useRef, useState, type CSSProperties } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import cn from "classnames";
import { CalInline } from "@/app/_components/cal-inline";
import { CAL, CONSULTATION } from "@/lib/constants";
import { SERVICES } from "@/lib/services";

type PathId = "consultation" | "lesson";

// Each card says first who it is for, on a tag that stays on the slim card
// too, so the two are never mistaken for each other.
const PATHS: { id: PathId; who: string; tag: string; title: string; meta?: string; blurb: string }[] = [
  {
    id: "consultation",
    who: "New students",
    tag: "bg-gold text-blue",
    title: "Book a virtual consultation",
    meta: CONSULTATION.label,
    blurb:
      "Start here if you have not studied with us yet. We assess your French level and agree your program and hours. You pay when you book.",
  },
  {
    id: "lesson",
    who: "Enrolled students",
    tag: "bg-blue text-white",
    title: "Book a lesson",
    blurb:
      "For students already enrolled in a program. Choose your program and pick a time for your next session, within the hours agreed at your consultation.",
  },
];

// The programs a returning student can book, in the site's order: the ones
// with a calendar in CAL.services.
const BOOKABLE = SERVICES.filter((s) => CAL.services[s.slug]);

const isPath = (value: string | null): value is PathId => value === "consultation" || value === "lesson";

// Column widths per state, all in fr so the grid can animate between them.
const COLUMNS: Record<PathId | "none", [string, string]> = {
  none: ["1fr", "1fr"],
  consultation: ["5fr", "2fr"],
  lesson: ["2fr", "5fr"],
};

// The grid-row trick: 0fr folds the content away, 1fr lets it in.
const fold = (open: boolean) =>
  cn(
    "grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
  );

// The two ways to book, as two cards side by side, after the start page on
// adese.studio. Choosing one widens it to hold its calendar and narrows the
// other to a slim card that stays in view, so switching is one click. The
// choice lives in the query (?book=lesson&service=general-french), so
// BookButton and any link can open a card directly.
export function BookingPaths() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const book = params.get("book");
  const chosen = isPath(book) ? book : null;
  const service = BOOKABLE.find((s) => s.slug === params.get("service")) ?? null;
  const grid = useRef<HTMLDivElement>(null);

  // The calendars are third-party embeds. Once a card has been opened it
  // stays mounted, so switching away and back doesn't reload it.
  const [opened, setOpened] = useState<Record<PathId, boolean>>({ consultation: false, lesson: false });
  const mounted = (id: PathId) => chosen === id || opened[id];

  const go = (next: PathId, slug?: string | null) => {
    const query = new URLSearchParams({ book: next, ...(slug ? { service: slug } : {}) });
    router.replace(`${pathname}?${query}`, { scroll: false });
  };

  const choose = (id: PathId) => {
    if (id === chosen) return;
    if (chosen) setOpened((o) => ({ ...o, [chosen]: true }));
    // Bring the cards up under the header as the chosen one opens.
    grid.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    go(id, id === "lesson" ? service?.slug : null);
  };

  const [consultCol, lessonCol] = COLUMNS[chosen ?? "none"];

  return (
    <div
      ref={grid}
      id="book"
      style={{ "--consult-col": consultCol, "--lesson-col": lessonCol } as CSSProperties}
      className="container-fb grid scroll-mt-[112px] items-start gap-4 md:scroll-mt-[132px] md:grid-cols-[minmax(0,var(--consult-col))_minmax(0,var(--lesson-col))] md:gap-5 md:transition-[grid-template-columns] md:duration-700 md:ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      {PATHS.map((path) => {
        const isOpen = chosen === path.id;
        // Narrowed beside the other card's calendar.
        const isSlim = chosen !== null && !isOpen;
        const panelId = `book-${path.id}`;
        return (
          <article
            key={path.id}
            className={cn(
              "border border-blue/10 transition-colors duration-300",
              isOpen ? "bg-blue/[0.05]" : "bg-white hover:bg-blue/[0.05] has-[button:focus-visible]:bg-blue/[0.05]",
              // Phones stack the cards, so the slim one moves above the open
              // one rather than wait below a whole calendar.
              isSlim && "max-md:order-first md:sticky md:top-[148px]"
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => choose(path.id)}
              className={cn(
                "group block w-full text-left",
                isOpen ? "cursor-default" : "cursor-pointer",
                isSlim ? "p-5 sm:p-6" : "p-6 sm:p-8 md:p-10"
              )}
            >
              {/* The tag and the details (the consultation's length and
                  price), side by side; the slim card stacks them, and lets
                  the details wrap, so both always show. */}
              <span
                className={cn(
                  "regular-s flex text-blue/70",
                  isSlim ? "flex-col items-start gap-2" : "flex-wrap items-center justify-between gap-x-4 gap-y-2"
                )}
              >
                <span className={cn("whitespace-nowrap px-2.5 py-0.5", path.tag)}>{path.who}</span>
                {/* Breaks only between the parts, never inside one. */}
                {path.meta && (
                  <span>
                    {path.meta.split(" · ").map((part, i) => (
                      <Fragment key={part}>
                        {i > 0 && " · "}
                        <span className="whitespace-nowrap">{part}</span>
                      </Fragment>
                    ))}
                  </span>
                )}
              </span>
              <span className={cn("mt-4 block", isSlim ? "h4" : "h3")}>{path.title}</span>

              {/* The blurb reads before a choice and above the calendar it
                  describes; the slim card drops it. */}
              <span className={fold(!isSlim)}>
                <span className="overflow-hidden">
                  <span className="regular-m mt-4 block max-w-[560px]">{path.blurb}</span>
                </span>
              </span>

              {!isOpen && (
                <span className="tertiary mt-6 whitespace-nowrap">
                  <span className="underline-offset-4 group-hover:text-blue/70 group-hover:underline">
                    {isSlim ? "Switch" : "Choose this"}
                  </span>
                  <span className="tertiary-icon group-hover:border-blue group-hover:bg-blue group-hover:text-white" aria-hidden>
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 7h10M8 3l4 4-4 4" />
                    </svg>
                  </span>
                </span>
              )}
            </button>

            <div id={panelId} inert={!isOpen} className={fold(isOpen)}>
              <div className="relative overflow-hidden">
                <div className="px-4 pb-6 sm:px-8 sm:pb-10">
                  {path.id === "consultation"
                    ? mounted("consultation") && <CalInline namespace="consultation" calLink={CAL.consultation} />
                    : mounted("lesson") && (
                        <LessonPicker
                          selected={service?.slug ?? null}
                          onSelect={(slug) => go("lesson", slug)}
                          onConsult={() => choose("consultation")}
                        />
                      )}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

// The program first, then that program's calendar. Each program has its own
// cal.com event, so the calendar is keyed to it and reloads on a change.
// New students who land here are pointed back to the consultation.
function LessonPicker({
  selected,
  onSelect,
  onConsult,
}: {
  selected: string | null;
  onSelect: (slug: string) => void;
  onConsult: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="regular-s mb-3 text-blue/70">Which program are you enrolled in?</legend>
        <div className="flex flex-wrap gap-2">
          {BOOKABLE.map((s) => (
            <label key={s.slug} className="cursor-pointer">
              <input
                type="radio"
                name="program"
                value={s.slug}
                checked={selected === s.slug}
                onChange={() => onSelect(s.slug)}
                className="peer sr-only"
              />
              <span className="regular-s inline-flex border border-blue px-4 py-2 transition-colors hover:text-blue/70 peer-checked:border-blue peer-checked:bg-blue peer-checked:text-white peer-checked:hover:border-blue peer-checked:hover:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue">
                {s.short}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      {selected ? (
        <CalInline key={selected} namespace={`lesson-${selected}`} calLink={CAL.services[selected]} />
      ) : (
        <p className="regular-m border-l-2 border-blue pl-6">Choose your program to see the times open for it.</p>
      )}
      <p className="regular-s text-blue/70">
        Not enrolled yet? Lessons follow a consultation.{" "}
        <button type="button" onClick={onConsult} className="text-blue underline underline-offset-4 transition-colors hover:text-blue/70">
          Book a consultation instead
        </button>
      </p>
    </div>
  );
}

export default BookingPaths;
