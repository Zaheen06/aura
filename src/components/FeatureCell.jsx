

export default function FeatureCell({ icon, title, desc }) {
  return (
    <div className="brand-feat">
      <div className="brand-feat-glow" />
      <div className="brand-feat-icon-wrap">
        <span className="brand-feat-icon">{icon}</span>
      </div>
      <div className="brand-feat-title">{title}</div>
      <div className="brand-feat-desc">{desc}</div>
    </div>
  );
}
