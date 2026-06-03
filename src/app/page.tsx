const stackItems = ["Next.js", "TypeScript", "Tailwind CSS"] as const;

export default function Home() {
  return (
    <main id="content" className="flex flex-1 items-center">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16 sm:px-8 lg:px-10">
        <div className="max-w-3xl space-y-5">
          <p className="text-brand text-sm font-medium">
            Project Status: Ready
          </p>
          <div className="space-y-3">
            <h1 className="text-primary text-4xl font-semibold tracking-normal md:text-5xl">
              CartFlow
            </h1>
            <p className="text-secondary max-w-2xl text-sm leading-7 md:text-base">
              Modern E-Commerce Experience
            </p>
          </div>
          <p className="text-muted max-w-2xl text-sm leading-7 md:text-base">
            Environment validation complete. The application shell, App Router,
            TypeScript strict mode, and Tailwind CSS foundation are operational.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {stackItems.map((item) => (
            <div
              key={item}
              className="border-default bg-elevated rounded-2xl border p-5 shadow-sm"
            >
              <p className="text-primary text-base font-semibold">{item}</p>
              <p className="text-muted mt-2 text-xs">Configured</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
