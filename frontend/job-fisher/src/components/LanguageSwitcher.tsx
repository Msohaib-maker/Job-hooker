import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { LANGUAGES, LANGUAGE_META, useTranslation } from "../i18n";

interface LanguageSwitcherProps {
  /** "full" shows the native name, "compact" shows only the icon + short code. */
  variant?: "full" | "compact";
  className?: string;
}

const LanguageSwitcher = ({
  variant = "full",
  className = "",
}: LanguageSwitcherProps) => {
  const { language, setLanguage, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    // The outer element carries the caller's positioning; the inner one is the
    // anchor for the menu, so a caller passing `absolute …` cannot clash with it.
    <div ref={containerRef} className={className}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={t("language.label")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border bg-[#151515] transition-colors ${
            open
              ? "text-[#EDEDED] border-[#10B981]/50"
              : "text-[#A1A1AA] border-[#262626] hover:text-[#EDEDED] hover:border-[#10B981]/40"
          }`}
        >
          <Globe className="w-4 h-4 flex-shrink-0" />
          <span>
            {variant === "compact"
              ? LANGUAGE_META[language].short
              : LANGUAGE_META[language].nativeName}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${
              open ? "rotate-180 text-[#10B981]" : ""
            }`}
          />
        </button>

        {open && (
          <div
            role="listbox"
            className="absolute right-0 mt-2 min-w-[9rem] z-50 rounded-xl overflow-hidden bg-[#151515] border border-[#262626] shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
          >
            {LANGUAGES.map((option) => (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={option === language}
                onClick={() => {
                  setLanguage(option);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors ${
                  option === language
                    ? "bg-[#10B981]/10 text-[#10B981]"
                    : "text-[#A1A1AA] hover:bg-[#1A1A1A] hover:text-[#EDEDED]"
                }`}
              >
                <span>{LANGUAGE_META[option].nativeName}</span>
                {option === language && (
                  <Check className="w-3.5 h-3.5 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
