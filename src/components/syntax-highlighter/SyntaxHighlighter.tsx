import type { HlJsSyntaxHighlighterProps } from "@/components/syntax-highlighter/HlJsSyntaxHighlighter";
import { lazy } from "react";

const HlJsSyntaxHighlighter = lazy(() => import("./HlJsSyntaxHighlighter"));

export function SyntaxHighlighter(props: HlJsSyntaxHighlighterProps) {
  return <HlJsSyntaxHighlighter {...props} />;
}

export default SyntaxHighlighter;
