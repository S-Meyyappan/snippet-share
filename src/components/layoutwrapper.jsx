export default function LayoutWrapper({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-12">
      <div className="max-w-5xl mx-auto">{children}</div>
    </div>
  );
}
