const STARS: Array<{ top: string; left: string; size: number; delay: string; dur: string }> = [
  { top: "3%",  left: "8%",  size: 2, delay: "0s",   dur: "3s" },
  { top: "5%",  left: "22%", size: 4, delay: "0.4s", dur: "4s" },
  { top: "2%",  left: "38%", size: 2, delay: "0.8s", dur: "3.5s" },
  { top: "7%",  left: "55%", size: 4, delay: "1.2s", dur: "4.5s" },
  { top: "4%",  left: "68%", size: 2, delay: "1.6s", dur: "3s" },
  { top: "6%",  left: "85%", size: 4, delay: "2.0s", dur: "4s" },
  { top: "10%", left: "15%", size: 2, delay: "0.2s", dur: "3.5s" },
  { top: "12%", left: "45%", size: 2, delay: "0.6s", dur: "4s" },
  { top: "9%",  left: "75%", size: 4, delay: "1.0s", dur: "3s" },
  { top: "14%", left: "92%", size: 2, delay: "1.4s", dur: "4.5s" },
  { top: "8%",  left: "28%", size: 2, delay: "1.8s", dur: "3.5s" },
  { top: "11%", left: "62%", size: 2, delay: "0.3s", dur: "4s" },
  { top: "15%", left: "5%",  size: 2, delay: "0.5s", dur: "3.2s" },
  { top: "16%", left: "33%", size: 4, delay: "0.9s", dur: "4.2s" },
  { top: "17%", left: "58%", size: 2, delay: "1.3s", dur: "3.8s" },
  { top: "18%", left: "80%", size: 2, delay: "1.7s", dur: "3s" },
  { top: "20%", left: "12%", size: 2, delay: "2.1s", dur: "4s" },
  { top: "21%", left: "40%", size: 4, delay: "0.7s", dur: "3.5s" },
  { top: "22%", left: "65%", size: 2, delay: "1.1s", dur: "4.5s" },
  { top: "23%", left: "88%", size: 2, delay: "1.5s", dur: "3.2s" },
  { top: "25%", left: "20%", size: 2, delay: "1.9s", dur: "4s" },
  { top: "26%", left: "50%", size: 2, delay: "0.4s", dur: "3s" },
  { top: "27%", left: "72%", size: 4, delay: "0.8s", dur: "3.5s" },
  { top: "28%", left: "95%", size: 2, delay: "1.2s", dur: "4s" },
];

export function PixelStars() {
  return (
    <div className="absolute inset-0">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: "#F4F0E0",
            boxShadow: `0 0 ${s.size * 2}px rgba(244,240,224,0.6)`,
            animation: `twinkle ${s.dur} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
