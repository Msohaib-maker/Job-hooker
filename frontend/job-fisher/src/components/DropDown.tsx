import { useState, useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface DropdownOption<T extends string = string> {
    value: T;
    label: string;
    icon?: ReactNode;
    description?: string;
    disabled?: boolean;
}

interface BaseDropdownProps<T extends string> {
    id?: string;
    label?: string;
    placeholder?: string;
    options: DropdownOption<T>[];
    required?: boolean;
    disabled?: boolean;
    className?: string;
    renderOption?: (option: DropdownOption<T>, selected: boolean) => ReactNode;
}

interface SingleDropdownProps<T extends string> extends BaseDropdownProps<T> {
    multi?: false;
    value: T | "";
    onChange: (value: T) => void;
}

interface MultiDropdownProps<T extends string> extends BaseDropdownProps<T> {
    multi: true;
    value: T[];
    onChange: (value: T) => void;
}

type DropdownProps<T extends string> =
    | SingleDropdownProps<T>
    | MultiDropdownProps<T>;

// ─────────────────────────────────────────────
// Portal panel — renders outside all overflow
// ─────────────────────────────────────────────

interface PanelPortalProps {
    anchorRef: React.RefObject<HTMLDivElement>;
    panelRef: React.RefObject<HTMLDivElement>;
    children: ReactNode;
}

function PanelPortal({ anchorRef, panelRef, children }: PanelPortalProps) {
    const [coords, setCoords] = useState<{
        top: number;
        left: number;
        width: number;
    } | null>(null);

    useEffect(() => {
        if (!anchorRef.current) return;

        const update = () => {
            const rect = anchorRef.current!.getBoundingClientRect();
            setCoords({
                top: rect.bottom + window.scrollY + 6,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        };

        update();

        window.addEventListener("scroll", update, true);
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update, true);
            window.removeEventListener("resize", update);
        };
    }, [anchorRef]);

    if (!coords) return null;

    return createPortal(
        <div
            ref={panelRef}
            style={{
                position: "absolute",
                top: coords.top,
                left: coords.left,
                width: coords.width,
                zIndex: 9999,
            }}
        >
            {children}
        </div>,
        document.body
    );
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function Dropdown<T extends string>(props: DropdownProps<T>) {
    const {
        id,
        label,
        placeholder = "Select an option",
        options,
        required,
        disabled,
        className = "",
        renderOption,
    } = props;

    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
    const panelRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

    // Close on outside click — must exclude the portal panel too,
    // since it lives outside containerRef in the DOM
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const target = e.target as Node;
            const inTrigger = containerRef.current?.contains(target);
            const inPanel = panelRef.current?.contains(target);
            if (!inTrigger && !inPanel) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    const isSelected = (optionValue: T): boolean => {
        if (props.multi) return (props.value as T[]).includes(optionValue);
        return props.value === optionValue;
    };

    const handleSelect = (optionValue: T) => {
        if (props.multi) {
            props.onChange(optionValue);
        } else {
            (props as SingleDropdownProps<T>).onChange(optionValue);
            setOpen(false);
        }
    };

    const renderTriggerContent = () => {
        if (props.multi) {
            const selected = options.filter((o) => (props.value as T[]).includes(o.value));
            if (selected.length === 0) {
                return <span className="text-[#4A6157] text-sm">{placeholder}</span>;
            }
            return (
                <div className="flex items-center gap-2 flex-wrap">
                    {selected.map((o) => (
                        <span
                            key={o.value}
                            className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] text-xs font-medium"
                        >
                            {o.icon && <span className="w-3.5 h-3.5 flex-shrink-0">{o.icon}</span>}
                            {o.label}
                        </span>
                    ))}
                </div>
            );
        }

        const selected = options.find((o) => o.value === props.value);
        if (!selected) {
            return <span className="text-[#4A6157] text-sm">{placeholder}</span>;
        }
        return (
            <span className="flex items-center gap-2 text-sm text-white">
                {selected.icon && <span className="w-4 h-4 flex-shrink-0">{selected.icon}</span>}
                {selected.label}
            </span>
        );
    };

    const renderRow = (option: DropdownOption<T>) => {
        const selected = isSelected(option.value);

        if (renderOption) {
            return (
                <button
                    key={option.value}
                    type="button"
                    disabled={option.disabled}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                    className="w-full text-left"
                >
                    {renderOption(option, selected)}
                </button>
            );
        }

        return (
            <button
                key={option.value}
                type="button"
                disabled={option.disabled}
                onClick={() => !option.disabled && handleSelect(option.value)}
                className={`
                    w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150
                    ${option.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
                    ${selected
                        ? "bg-[#00FF88]/10 text-[#00FF88]"
                        : "text-[#8FAE9B] hover:bg-[#0F1A14] hover:text-white"
                    }
                `}
            >
                {option.icon && (
                    <span className="w-4 h-4 flex-shrink-0 flex items-center">{option.icon}</span>
                )}
                <span className="flex-1 flex flex-col items-start">
                    <span className="font-medium leading-tight">{option.label}</span>
                    {option.description && (
                        <span className="text-xs text-[#4A6157] leading-tight mt-0.5">
                            {option.description}
                        </span>
                    )}
                </span>
                {selected && <Check className="w-3.5 h-3.5 flex-shrink-0 text-[#00FF88]" />}
                {props.multi && !selected && (
                    <span className="w-3.5 h-3.5 flex-shrink-0 rounded border border-[#1F2A24]" />
                )}
            </button>
        );
    };

    return (
        <div className={`flex flex-col gap-1.5 ${className}`} ref={containerRef}>
            {/* Label */}
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-[#8FAE9B]">
                    {label}
                    {required && <span className="text-[#00FF88] ml-0.5">*</span>}
                </label>
            )}

            {/* Trigger button */}
            <button
                id={id}
                type="button"
                disabled={disabled}
                onClick={() => !disabled && setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className={`
                    relative w-full flex items-center justify-between
                    px-4 py-2.5 min-h-[42px]
                    rounded-xl
                    bg-[#0B0F0D]
                    border transition-all duration-200
                    ${open
                        ? "border-[#00FF88]/60 shadow-[0_0_16px_rgba(0,255,136,0.15)]"
                        : "border-[#1F2A24] hover:border-[#2A3D30]"
                    }
                    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]/40
                `}
            >
                <span className="flex-1 flex items-center min-w-0">
                    {renderTriggerContent()}
                </span>
                <ChevronDown
                    className={`
                        w-4 h-4 flex-shrink-0 ml-2 text-[#4A6157]
                        transition-transform duration-200
                        ${open ? "rotate-180 text-[#00FF88]" : ""}
                    `}
                />
            </button>

            {/* Portal panel — escapes overflow clipping */}
            {open && (
                <PanelPortal anchorRef={containerRef} panelRef={panelRef}>
                    <div
                        role="listbox"
                        className="
                            rounded-xl overflow-hidden
                            bg-[#0B0F0D]
                            border border-[#1F2A24]
                            shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(0,255,136,0.08)]
                        "
                        style={{ maxHeight: "260px", overflowY: "auto" }}
                    >
                        <style>{`
                            [role="listbox"]::-webkit-scrollbar { width: 4px; }
                            [role="listbox"]::-webkit-scrollbar-track { background: transparent; }
                            [role="listbox"]::-webkit-scrollbar-thumb { background: #1F2A24; border-radius: 99px; }
                        `}</style>
                        {options.length === 0 ? (
                            <div className="px-4 py-3 text-sm text-[#4A6157] text-center">
                                No options available
                            </div>
                        ) : (
                            <div className="py-1">{options.map((opt) => renderRow(opt))}</div>
                        )}
                    </div>
                </PanelPortal>
            )}
        </div>
    );
}

// ─────────────────────────────────────────────
// DropdownWrapper — kept for API compatibility
// (no longer needed for clipping, but harmless)
// ─────────────────────────────────────────────
export function DropdownWrapper({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    return <div className={`relative ${className}`}>{children}</div>;
}