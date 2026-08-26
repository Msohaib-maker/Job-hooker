interface SliderProps {
    value: string;
    onChange: (value: string) => void;
    min?: number;
    max?: number;
    step?: number;
    // Display
    label?: string;
    required?: boolean;
    formatValue?: (value: number) => string;
    showBoundaries?: boolean;
    // Style overrides
    className?: string;
    trackColor?: string;
    fillColor?: string;
    thumbColor?: string;
    thumbGlow?: string;
}

export function Slider({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    label,
    required,
    formatValue = (v) => String(v),
    showBoundaries = true,
    className = "",
    trackColor = "#1F2A24",
    fillColor = "#34D399",
    thumbColor = "#34D399",
    thumbGlow = "rgba(0,255,136,0.6)",
}: SliderProps) {
    const numeric = Number(value) || min;
    const pct = ((numeric - min) / (max - min)) * 100;

    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-[#8FAE9B]">
                    {label}
                    {required && <span className="text-[#34D399] ml-0.5">*</span>}
                </label>
            )}

            <div className="flex flex-col gap-2 px-4 py-3 rounded-xl bg-[#0B0F0D] border border-[#1F2A24]">
                {/* Live value pill — centered above slider */}
                <div className="flex justify-center">
                    <div
                        className="flex items-center px-3 py-1 rounded-lg"
                        style={{ background: `${fillColor}1A`, border: `1px solid ${fillColor}4D` }}
                    >
                        <span className="font-bold text-sm tabular-nums" style={{ color: fillColor }}>
                            {formatValue(numeric)}
                        </span>
                    </div>
                </div>

                {/* min ── slider ── max */}
                <div className="flex items-center gap-3">
                    {showBoundaries && (
                        <span className="text-xs text-[#4A6157] flex-shrink-0">{formatValue(min)}</span>
                    )}

                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={numeric}
                        onChange={(e) => onChange(e.target.value)}
                        className="
                            flex-1 h-1.5 rounded-full appearance-none cursor-pointer
                            [&::-webkit-slider-thumb]:appearance-none
                            [&::-webkit-slider-thumb]:w-4
                            [&::-webkit-slider-thumb]:h-4
                            [&::-webkit-slider-thumb]:rounded-full
                            [&::-webkit-slider-thumb]:cursor-pointer
                            [&::-webkit-slider-thumb]:hover:scale-125
                            [&::-webkit-slider-thumb]:transition-transform
                            [&::-moz-range-thumb]:w-4
                            [&::-moz-range-thumb]:h-4
                            [&::-moz-range-thumb]:rounded-full
                            [&::-moz-range-thumb]:border-0
                            [&::-moz-range-thumb]:cursor-pointer
                        "
                        style={{
                            background: `linear-gradient(to right, ${fillColor} ${pct}%, ${trackColor} ${pct}%)`,
                        }}
                    />

                    {showBoundaries && (
                        <span className="text-xs text-[#4A6157] flex-shrink-0">{formatValue(max)}</span>
                    )}
                </div>
            </div>

            <style>{`
                input[type="range"]::-webkit-slider-thumb {
                    background: ${thumbColor};
                    box-shadow: 0 0 8px ${thumbGlow};
                }
                input[type="range"]::-moz-range-thumb {
                    background: ${thumbColor};
                }
            `}</style>
        </div>
    );
}