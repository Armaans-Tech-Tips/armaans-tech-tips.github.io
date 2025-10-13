import { withBase } from "@/lib/paths";
export const thumb = (p: string | undefined) =>
  !p ? '' : /^https?:\/\//.test(p) ? p : withBase(p.replace(/^\/src\/assets\//, '/assets/'));
