export default function SectionWrapper({ title, children }) {
  return (
    <div className="card mb-4">
      <div className="card-header fw-bold">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  )
}
