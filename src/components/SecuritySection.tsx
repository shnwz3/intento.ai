import { Database, LockKeyhole, Cpu, ShieldCheck } from 'lucide-react';

const securityItems = [
  {
    copy: 'Passwords stay securely inside Supabase Auth. We utilize row-level security to ensure your data is isolated.',
    icon: LockKeyhole,
    title: 'Managed authentication',
  },
  {
    copy: 'Your AI interactions happen completely locally. There is no middleman tracking your keystrokes or prompts.',
    icon: Cpu,
    title: 'Zero Telemetry',
  },
  {
    copy: 'The desktop app stores your API keys securely inside your operating system\'s encrypted credential manager.',
    icon: Database,
    title: 'Native Key Storage',
  },
  {
    copy: 'Supabase row-level security and service-role only server actions give you a clean path to production hardening.',
    icon: ShieldCheck,
    title: 'Production-ready access model',
  },
];

export function SecuritySection() {
  return (
    <section className="px-6 md:px-8 py-16 md:py-24 max-w-7xl mx-auto" id="security">
      <div className="max-w-3xl mb-10">
        <p className="text-[11px] font-label uppercase tracking-[0.24em] text-secondary mb-4">Trust Layer</p>
        <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-4">
          Local performance, enterprise-grade protection.
        </h2>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          The website provides a secure gateway for initial authentication. Once inside the desktop app, you have the full power of native security.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {securityItems.map((item) => {
          const Icon = item.icon;

          return (
            <article
              className="rounded-3xl border border-outline-variant/20 bg-surface-container-low p-6 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]"
              key={item.title}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/12 text-primary mb-5">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-headline font-bold text-on-surface mb-3">{item.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{item.copy}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
