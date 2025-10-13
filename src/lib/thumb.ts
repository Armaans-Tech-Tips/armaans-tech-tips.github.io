import { withBase } from "@/lib/paths";
const FALLBACK = withBase('/assets/_fallback.png');

export const thumb = (p: string | undefined) => {
  const resolved = !p ? '' : /^https?:\/\//.test(p) ? p : withBase(p.replace(/^\/src\/assets\//, '/assets/'));
  return resolved || FALLBACK;
};

// Small React helper (optional)
export const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const el = e.currentTarget;
  if (el.src !== FALLBACK) el.src = FALLBACK;
};
