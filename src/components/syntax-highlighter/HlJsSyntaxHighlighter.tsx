import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/stackoverflow-dark.css";
import { type CSSProperties, useMemo } from "react";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("jsx", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("tsx", typescript);

export interface HlJsSyntaxHighlighterProps {
  language: "bash" | "json" | "jsx" | "javascript" | "tsx" | "typescript";
  children: string;
  className?: string;
  style?: CSSProperties;
}

export function HlJsSyntaxHighlighter({
  language,
  children,
  className,
  style,
}: HlJsSyntaxHighlighterProps) {
  const code = useMemo(() => {
    let html = hljs.highlight(children ?? "", { language }).value;
    // Emphasize common CLI tools (e.g., `npm`) in bash to improve visual contrast
    if (language === "bash") {
      try {
        html = html.replace(/(^|>)\s*(\$\s*)?(npm)(?=\s)/g, (_m, p1, _p2, cmd) => `${p1}<span class=\"hljs-built_in\">${cmd}</span>`);
      } catch {}
    }
    return html;
  }, [children, language]);
  return (
    <pre
      dangerouslySetInnerHTML={{ __html: code }}
      className={`hljs${className ? ` ${className}` : ""}`}
      style={style}
    ></pre>
  );
}

export default HlJsSyntaxHighlighter;
