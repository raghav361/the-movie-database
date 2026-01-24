import { useState } from "react";
import ChevronDownIcon from "../../assets/icons/ChevronDownIcon";
import ChevronUpIcon from "../../assets/icons/ChevronUpIcon";

export type Option<T extends string> = {
  label: string;
  value: T;
};

export interface TogglerProps<T extends string> {
  options: readonly Option<T>[];
  active: T;
  onToggle: (value: T) => void;
  section?: "movies" | "trailers";
}

const Toggler = <T extends string>({
  options,
  active,
  onToggle,
  section
}: TogglerProps<T>) => {
    const isSection = section === "movies";
    const [open, setOpen] = useState(false);
    const activeOption = options.find((o) => o.value === active);

  return (
    <div className="relative">
      {/* Desktop Pills */}
      <div
        className={`hidden lg:inline-flex items-center rounded-full ${
          isSection ? "border-2 border-cyan-950" : "border-2 border-emerald-300"
        }`}
      >
        {options.map((opt) => {
          const isActive = active === opt.value;
          const classes = [
            "px-[clamp(1rem,1vw,2rem)] py-[clamp()] rounded-full text-[clamp(0.9rem,1vw,1rem)] font-medium transition-colors duration-300 whitespace-nowrap",
            isSection
              ? isActive
                ? "bg-cyan-950 text-emerald-400"
                : "text-cyan-950"
              : isActive
              ? "bg-emerald-300 text-cyan-950"
              : "text-white",
          ].join(" ");

          return (
            <button
              key={opt.value}
              onClick={() => onToggle(opt.value)}
              className={classes}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Mobile Dropdown */}
      <div className="lg:hidden relative w-36">
        {/* Active option button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`w-full px-[clamp(1rem,1vw,1.5rem)] py-[clamp(0.2rem,0.5vw,0.7rem)] rounded-full text-[clamp(0.9rem,1vw,1.4rem)] font-medium flex justify-between items-center ${
            isSection
              ? active
                ? "bg-cyan-950 text-emerald-400"
                : "text-cyan-950"
              : active
                ? "bg-emerald-300 text-cyan-950"
                : "text-white"
          }`}
        >
          {options.find((opt) => opt.value === active)?.label}
          <span className={isSection ? "fill-emerald-300" : "fill-cyan-950"}>{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
        </button>

        {/* Dropdown */}
        {open && (
          <div className={`absolute left-0 w-full overflow-hidden rounded-b-3xl rounded-t-3xl shadow-lg z-10 transition-all duration-300 ease-in-out ${
            open && isSection ? "bg-white border-b border-cyan-950" : "bg-none border-b border-emerald-300"
          }`}>
            {options
              .filter((opt) => opt.value !== active) // ❌ exclude active option
              .map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onToggle(opt.value);
                    setOpen(false); // ✅ close after selecting
                  }}
                  className={`block w-full px-[clamp(1rem,1vw,1.5rem)] py-[clamp(0.2rem,0.5vw,0.7rem)] text-left text-[clamp(0.9rem,1vw,1.4rem)] font-medium border-b border-cyan-950 rounded-b-3xl rounded-t-3xl ${
                    isSection ? "text-cyan-950" : "text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Toggler;
