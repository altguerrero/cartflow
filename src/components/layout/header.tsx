export function Header() {
  return (
    <header className="border-default bg-base border-b">
      <a
        href="#content"
        className="focus:border-default focus:bg-elevated focus:text-primary sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:rounded-xl focus:border focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:outline-none"
      >
        Skip to content
      </a>
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
        <div className="flex items-center gap-3" aria-label="CartFlow">
          <div className="bg-accent-primary-soft text-brand flex size-9 items-center justify-center rounded-xl text-sm font-semibold">
            CF
          </div>
          <div>
            <p className="text-primary text-base font-semibold">CartFlow</p>
            <p className="text-muted text-xs">Foundation</p>
          </div>
        </div>
      </div>
    </header>
  );
}
