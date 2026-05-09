function ShieldCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function Truck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function Star() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function Refresh() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  );
}

const items = [
  { icon: <ShieldCheck />, text: "Nhập khẩu chính hãng", color: "#1D9E75" },
  { icon: <Truck />,       text: "Giao toàn quốc trong 24h", color: "#1D9E75" },
  { icon: <Star />,        text: "4.9★ — 2.400+ đánh giá",  color: "#EF9F27" },
  { icon: <Refresh />,     text: "Hoàn tiền nếu không ưng", color: "#1D9E75" },
];

export default function TrustBar() {
  return (
    <div
      className="w-full border-b border-[#ede8e0] bg-white px-4 py-[10px]"
      aria-label="Cam kết của Viora Wine"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-4 sm:gap-x-5 sm:gap-y-0">
        {items.map(({ icon, text, color }) => (
          <div key={text} className="flex items-center gap-[7px]">
            <span className="shrink-0" style={{ color }} aria-hidden="true">
              {icon}
            </span>
            <span className="text-[11px] leading-snug text-[#555] sm:text-[13px]">
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
