import React from 'react';
import {
  MousePointer,
  Settings2,
  GitBranch,
  History,
  Layers,
  Sparkles,
  Network,
  Split,
  Pencil,
  Palette,
  Wrench,
  Code2,
  CodeXml,
  Database,
  Globe,
  Lock,
  Zap,
  CheckCircle2,
  MessageCircle,
  Download,
  FileCode,
  Timer,
  Clock,
  Workflow,
  Puzzle,
  Languages,
  FileText,
  Server,
  Cpu,
  Boxes,
  Blocks,
  ShieldCheck,
  LayoutGrid,
  type LucideIcon,
} from 'lucide-react';

const REGISTRY: Record<string, LucideIcon> = {
  'mouse-pointer': MousePointer,
  'settings-2': Settings2,
  'git-branch': GitBranch,
  'history': History,
  'layers': Layers,
  'sparkles': Sparkles,
  'network': Network,
  'split': Split,
  'pencil': Pencil,
  'palette': Palette,
  'wrench': Wrench,
  'code': Code2,
  'code-xml': CodeXml,
  'database': Database,
  'globe': Globe,
  'lock': Lock,
  'zap': Zap,
  'check': CheckCircle2,
  'chat': MessageCircle,
  'download': Download,
  'file-code': FileCode,
  'timer': Timer,
  'clock': Clock,
  'workflow': Workflow,
  'puzzle': Puzzle,
  'languages': Languages,
  'file': FileText,
  'server': Server,
  'cpu': Cpu,
  'boxes': Boxes,
  'blocks': Blocks,
  'shield': ShieldCheck,
  'layout-grid': LayoutGrid,
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

/**
 * Render a Lucide icon by kebab-case name. Falls back to an <img> if `name`
 * looks like a file path (starts with `/`), so existing block JSONs that
 * reference `/icons/*.svg` keep working.
 */
export function Icon({ name, size = 16, className, strokeWidth = 2 }: IconProps) {
  if (name.startsWith('/')) {
    return <img src={name} alt="" className={className} style={{ width: size, height: size }} />;
  }
  const Component = REGISTRY[name];
  if (!Component) return null;
  return <Component size={size} strokeWidth={strokeWidth} className={className} />;
}
