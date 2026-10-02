import { BookButton } from "@/app/_components/book-button";

// The one button always in view: pinned to the bottom-right corner of every
// page, above the content and under the open mobile menu.
export function FloatingBookButton() {
  return (
    <div className="fixed bottom-5 right-5 z-30 md:bottom-8 md:right-8">
      <BookButton size="sm" className="shadow-[0_8px_24px_rgb(29_26_23/0.18)]" />
    </div>
  );
}

export default FloatingBookButton;
