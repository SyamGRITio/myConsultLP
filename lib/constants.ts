export const LINKS = {
  line: "https://line.me/R/ti/p/@178ssybt",
  x: "https://x.com/syam_nihick",
  xDm: "https://x.com/messages/compose?recipient_id=syam_nihick",
  note: "https://note.com/syam_grit",
  zenn: "https://zenn.dev/syam_nihick",
  instagram: "https://www.instagram.com/syam_gritio/",
  github: "https://github.com/SyamGRITio",
} as const;

export function withUtm(
  url: string,
  campaign: string,
  medium: string = "cta",
  source: string = "lp",
): string {
  if (!url || url.startsWith("#")) return url;
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", source);
    u.searchParams.set("utm_medium", medium);
    u.searchParams.set("utm_campaign", campaign);
    return u.toString();
  } catch {
    return url;
  }
}

export const TWEET_IDS = [
  "1425332692564865024",
  "1427933347729141760",
  "1548174762760740866",
  "1603250436730822659",
  "1694714364123861088",
  "1769857390936265194",
  "1823728833025204261",
  "1873741836696846367",
  "2004157174587793651",
  "2031188263399206923",
  "2031189339833774549",
  "2034532788125483435",
  "2038934331817898056",
  "2052011921612943671",
] as const;
