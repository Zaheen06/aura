// ─────────────────────────────────────────────
// SoundViz — Animated frequency bar visualizer.
// Heights are hardcoded to mimic a real EQ curve.
// No props — purely visual.
// ─────────────────────────────────────────────

const BAR_HEIGHTS = [20,35,55,80,100,90,75,60,85,95,70,50,65,80,55,40,30,45,60,40,25,35,50,30,20];

export default function SoundViz() {
  return (
    <div className="sound-viz">
      {BAR_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="bar"
          style={{
            height: `${h}px`,
            animationDelay: `${i * 0.05}s`,
            // slight random duration per bar for organic feel
            animationDuration: `${0.8 + ((i * 37) % 80) / 100}s`,
          }}
        />
      ))}
    </div>
  );
}
