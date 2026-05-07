export const LINKS = {
  line: "https://line.me/R/ti/p/@178ssybt",
  x: "https://x.com/syam_nihick",
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
  "1823728833025204261",
  "1883139473313247526",
  "1883148818063258002",
  "1888469504310886902",
  "1902207390042533977",
  "2049051722987999680",
  "2049440007254081753",
  "2052011921612943671",
] as const;
