"use client";

type MaskedTextProps = {
  lines: string[];
  className?: string;
};

export function MaskedText({ lines, className = "" }: MaskedTextProps) {
  return (
    <h1 className={className}>
      {lines.map((line, index) => (
        <span className="masked-line" key={line}>
          <span
            className="masked-line-inner"
            style={{ animationDelay: `${220 + index * 110}ms` }}
          >
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}
