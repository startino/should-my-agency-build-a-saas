<script lang="ts">
  let index = 0;
  const numSlides = 15;
  const next = () => (index = Math.min(index + 1, numSlides - 1));
  const prev = () => (index = Math.max(index - 1, 0));

  let startX: number | null = null;
  function onStart(e: MouseEvent | TouchEvent) {
    // ignore gestures that start on interactive elements
    const target = e.target as EventTarget | null;
    if (isInteractiveTarget(target)) return;
    startX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
  }
  function onEnd(e: MouseEvent | TouchEvent) {
    // if gesture didn't start here, don't navigate
    if (startX === null) return;
    // also ignore pointerup ending on interactive elements
    if (isInteractiveTarget(e.target)) {
      startX = null;
      return;
    }
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
    const dx = clientX - startX;
    if (dx < -40) next();
    if (dx > 40) prev();
    startX = null;
  }

  // Click (no-swipe) navigation — left half = prev, right half = next
  function onSectionClick(e: MouseEvent) {
    if (isInteractiveTarget(e.target)) return;
    const container = e.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) prev();
    else next();
  }
  function onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  }
  function isInteractiveTarget(target: EventTarget | null): boolean {
    let el: Element | null = null;
    if (target instanceof Element) el = target;
    else if (target instanceof Node) el = (target as Node).parentElement;
    if (!el) return false;
    return Boolean(
      el.closest('a, button, input, textarea, select, summary, [role="button"], [data-interactive="true"]')
    );
  }

  // tap-to-navigate handled in onEnd when no swipe detected
  // Rotate background gradient variants per slide using the same color palette
  const gradientBackgroundVariants: string[] = [
    // Variant A — like screenshot 1: bottom-left sweep + strong top-right glow
    'bg-[linear-gradient(200deg,transparent_0%,transparent_36%,hsl(var(--glow-eucalyptus)/0.16)_52%,transparent_78%),radial-gradient(900px_650px_at_88%_18%,hsl(var(--glow-cyan)/0.35)_0%,transparent_62%)]',
    // Variant B — like screenshot 2: pronounced top-right circular glow
    'bg-[radial-gradient(850px_700px_at_86%_18%,hsl(var(--glow-teal)/0.38)_0%,transparent_62%)]',
    // Variant C — mirrored: strong bottom-left glow with subtle diagonal fade
    'bg-[radial-gradient(900px_700px_at_12%_82%,hsl(var(--glow-eucalyptus)/0.30)_0%,transparent_60%),linear-gradient(145deg,hsl(var(--glow-cyan)/0.12)_0%,transparent_38%)]',
    // Variant D — elongated ellipse from right edge
    'bg-[radial-gradient(1100px_700px_at_95%_35%,hsl(var(--glow-teal)/0.28)_0%,transparent_70%)]',
  ];

  $: gradientBackgroundClass = gradientBackgroundVariants[index % gradientBackgroundVariants.length];
</script>

<svelte:window on:keydown={onKey} />

<section class="relative h-[100svh] w-full overflow-hidden bg-black text-white" aria-label="Slides" on:pointerdown={onStart} on:touchstart={onStart} on:pointerup={onEnd} on:touchend={onEnd} on:click={onSectionClick}>
  <!-- Ambient color glows -->
  <div class="pointer-events-none absolute inset-0">
    <!-- Variant background pattern -->
    <div class={"absolute inset-0 opacity-100 filter saturate-150 " + gradientBackgroundClass}></div>
    <!-- Eucalyptus / Teal glows -->
    <div class="absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl" style="background-color:hsl(var(--glow-eucalyptus)/0.55)"></div>
    <div class="absolute -right-24 -top-24 h-96 w-96 rounded-full blur-3xl" style="background-color:hsl(var(--glow-teal)/0.65)"></div>
    <div class="absolute -right-10 bottom-[-80px] h-72 w-72 rounded-full blur-3xl" style="background-color:hsl(var(--glow-cyan)/0.55)"></div>
    <div class="absolute -left-10 bottom-[-80px] h-72 w-72 rounded-full blur-3xl" style="background-color:hsl(var(--glow-teal)/0.45)"></div>
    <!-- Vignette -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.60)_55%,rgba(0,0,0,0.85)_85%)]"></div>
  </div>

  

  <!-- Navigation hints - symmetrical on both sides -->
  <div class="absolute top-4 left-6 text-xs text-white/50 z-10 pointer-events-none hidden sm:block">
    ← Click right to go back
  </div>
  <div class="absolute top-4 right-6 text-xs text-white/50 z-10 pointer-events-none hidden sm:block">
    Click right to go forward →
  </div>

  <!-- Wordmark - Inline with nav hints, centered -->
  <div class="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
    <img src="/saas-for-agencies-slides/startino-wordmark.png" alt="Startino" class="h-6 sm:h-8 w-auto opacity-90" />
  </div>

  <div class="relative mx-auto flex h-full w-full max-w-7xl items-start justify-start sm:items-center sm:justify-center pt-16 px-4 pb-24 sm:p-6 lg:p-12 sm:pb-0 overflow-y-auto overscroll-y-contain">
    {#if index === 0}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">Ready to stop selling time?</h1>
        <div class="prose-measure space-y-4 text-base leading-snug text-white/90 sm:text-lg md:text-xl lg:text-2xl">
          <p class="text-white/90">Your partner to productize your services and automate workflows—so revenue and margins grow.</p>
        </div>
      </article>
    {:else if index === 1}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Your agency’s challenges</h1>
        <div class="space-y-6">
          <div class="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-xl sm:text-2xl">👨‍💼</span>
                <p class="text-sm sm:text-base md:text-lg text-white/90">Too founder-dependent: Almost all of your revenue needs you in the loop.</p>
              </div>
            </div>
            <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-xl sm:text-2xl">💸</span>
                <p class="text-sm sm:text-base md:text-lg text-white/90">No passive income: revenue resets monthly.</p>
              </div>
            </div>
            <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-xl sm:text-2xl">⏱️</span>
                <p class="text-sm sm:text-base md:text-lg text-white/90">Team leaks: 40–60 hrs/week on repetitive tasks.</p>
              </div>
            </div>
            <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-xl sm:text-2xl">📉</span>
                <p class="text-sm sm:text-base md:text-lg text-white/90">Cut-throat margins: cost & pricing pressure → “race to the bottom.”</p>
              </div>
            </div>
            <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-xl sm:text-2xl">🧩</span>
                <p class="text-sm sm:text-base md:text-lg text-white/90">Differentiation is becoming harder: build your own IP or get commoditized.</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 2}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">The New Opportunity</h1>
        <div class="mb-2">
          <p class="text-lg sm:text-xl md:text-2xl text-white/90">In two years, the only agencies left standing will be those offering clients their own proprietary SaaS tools. Everyone else will become a reseller for someone else's software.</p>
        </div>
      </article>
    {:else if index === 3}
      <!-- Solution Slide -->
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">A SaaS will give you</h1>
        <div class="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
          <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center">
              <span class="mr-3 text-xl sm:text-2xl">🧭</span>
              <p class="text-sm sm:text-base md:text-lg text-white/90">An asset that allows you to step off the endless treadmill</p>
            </div>
          </div>
          <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center">
              <span class="mr-3 text-xl sm:text-2xl">💵</span>
              <p class="text-sm sm:text-base md:text-lg text-white/90">A new recurring income stream</p>
            </div>
          </div>
          <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center">
              <span class="mr-3 text-xl sm:text-2xl">😌</span>
              <p class="text-sm sm:text-base md:text-lg text-white/90">No stress about whether you’ll have any profit</p>
            </div>
          </div>
          <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center">
              <span class="mr-3 text-xl sm:text-2xl">🔒</span>
              <p class="text-sm sm:text-base md:text-lg text-white/90">Proprietary technology that makes you better than competitors</p>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 9}
      <article class="w-full max-w-6xl text-left">
        <h1 class="mb-4 sm:mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">What's possible - #1</h1>
        

        <div class="grid gap-6 lg:grid-cols-2">
          <!-- Left: KPI Cards -->
          <div class="space-y-4">
            <div class="rounded-xl bg-zinc-800/80 p-6 backdrop-blur-sm border border-zinc-700/50 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-r from-[#45dfa4]/10 to-transparent opacity-60"></div>
              <div class="relative z-10">
                <div class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">$5,000</div>
                <div class="text-base sm:text-lg text-white/90">MRR in 6 weeks</div>
              </div>
            </div>
            <div class="rounded-xl bg-zinc-800/80 p-6 backdrop-blur-sm border border-zinc-700/50 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-r from-[#45dfa4]/10 to-transparent opacity-60"></div>
              <div class="relative z-10">
                <div class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">1–1.5 years</div>
                <div class="text-base sm:text-lg text-white/90">to surpass agency revenue</div>
              </div>
            </div>
            <div class="rounded-xl bg-zinc-800/80 p-6 backdrop-blur-sm border border-zinc-700/50 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-r from-[#45dfa4]/10 to-transparent opacity-60"></div>
              <div class="relative z-10">
                <div class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">$0</div>
                <div class="text-base sm:text-lg text-white/90">paid advertising to reach early scale</div>
              </div>
            </div>
          </div>

          <!-- Right: Case Study Details -->
          <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="mb-6">
              <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white">37signals → Basecamp</h3>
            </div>

            <div class="space-y-6">
              <div>
                <h4 class="font-semibold mb-3 text-white text-lg">Challenge:</h4>
                <p class="text-white/90 text-base leading-relaxed">Client comms & project tracking scattered across email/docs; delivery inefficiencies.</p>
              </div>

              <div>
                <h4 class="font-semibold mb-3 text-white text-lg">Solution:</h4>
                <p class="text-white/90 text-base leading-relaxed">Build an internal, minimal tool; launch publicly with simple monthly plans; pivot fully when product revenue beat services.</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 10}
      <article class="w-full max-w-6xl text-left">
        <h1 class="mb-4 sm:mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">What's possible - #2</h1>
        
        <div class="grid gap-6 lg:grid-cols-2">
          <!-- Left: KPI Cards -->
          <div class="space-y-4">
            <div class="rounded-xl bg-zinc-800/80 p-6 backdrop-blur-sm border border-zinc-700/50 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-r from-[#45dfa4]/10 to-transparent opacity-60"></div>
              <div class="relative z-10">
                <div class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">30,000</div>
                <div class="text-base sm:text-lg text-white/90">paying customers at pivot</div>
              </div>
            </div>
            <div class="rounded-xl bg-zinc-800/80 p-6 backdrop-blur-sm border border-zinc-700/50 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-r from-[#45dfa4]/10 to-transparent opacity-60"></div>
              <div class="relative z-10">
                <div class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">$500,000</div>
                <div class="text-base sm:text-lg text-white/90">annual product revenue at pivot</div>
              </div>
            </div>
            <div class="rounded-xl bg-zinc-800/80 p-6 backdrop-blur-sm border border-zinc-700/50 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-r from-[#45dfa4]/10 to-transparent opacity-60"></div>
              <div class="relative z-10">
                <div class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">$300,000</div>
                <div class="text-base sm:text-lg text-white/90">annual agency revenue replaced</div>
              </div>
            </div>
          </div>

          <!-- Right: Case Study Details -->
          <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="mb-6">
              <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Rocket Science Group → Mailchimp</h3>
            </div>

            <div class="space-y-6">
              <div>
                <h4 class="font-semibold mb-3 text-white text-lg">Challenge:</h4>
                <p class="text-white/90 text-base leading-relaxed">SMB clients needed email marketing; manual service didn’t scale; enterprise tools ignored small businesses.</p>
              </div>

              <div>
                <h4 class="font-semibold mb-3 text-white text-lg">Solution:</h4>
                <p class="text-white/90 text-base leading-relaxed">Turn service into self-serve product with online payments; focus on small-business self-serve and organic, word-of-mouth growth.</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 4}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Why You?</h1>
        
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p>Your domain expertise + our SaaS expertise (engineering + go-to-market) = A market-ready product that solves real problems, retains clients, and generates recurring revenue — faster than either of us could do alone.</p>
        </div>
      </article>
    {:else if index === 5}
      <article class="w-full max-w-5xl text-left">
        <div class="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
          <!-- You bring -->
          <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="mb-4 flex items-center">
              <span class="mr-3 text-2xl sm:text-3xl">👑</span>
              <h3 class="text-xl sm:text-2xl font-bold text-white">You bring:</h3>
            </div>
            <ul class="space-y-3 text-white/90">
              <li class="flex items-start">
                <span class="mr-2 mt-1 text-white/60">•</span>
                <span>Extremely deep knowledge of your market, clients, and pain points</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-1 text-white/60">•</span>
                <span>Proven service processes that have generated $80k+/month in revenue</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-1 text-white/60">•</span>
                <span>First batch of users from your existing clientele (<strong>super</strong> valuable)</span>
              </li>
            </ul>
          </div>

          <!-- We bring -->
          <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="mb-4 flex items-center">
              <span class="mr-3 text-2xl sm:text-3xl">⚡</span>
              <h3 class="text-xl sm:text-2xl font-bold text-white">We bring:</h3>
            </div>
            <ul class="space-y-3 text-white/90">
              <li class="flex items-start">
                <span class="mr-2 mt-1 text-white/60">•</span>
                <span>7+ years per engineer in programming experience</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-1 text-white/60">•</span>
                <span>2+ years in the SaaS industry, learning and building</span>
              </li>
            </ul>
          </div>
        </div>
      </article>
    {:else if index === 11}
      <!-- Project Showcase Slide -->
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Our Favourite Builds</h1>
        
        <div class="grid gap-6 grid-cols-1 md:grid-cols-3">
          <!-- Reletino -->
          <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center mb-4">
              <img src="/saas-for-agencies-slides/reletino-logo.png" alt="Reletino" class="h-12 w-12 mr-4 rounded-lg" />
              <div>
                <h3 class="text-lg sm:text-xl font-bold text-white">Reletino</h3>
                <p class="text-white/80 text-xs sm:text-sm">Lead Generation SaaS</p>
              </div>
            </div>
            <p class="text-white/90 mb-4 text-sm">Brings leads straight to agencies from Reddit, in real-time using AI agents.</p>
            <div class="text-white/70 text-sm mb-3">
              <p>• Real-time lead detection</p>
              <p>• AI-powered filtering</p>
              <p>• Automated outreach</p>
            </div>
            <a href="https://www.starti.no/projects/reletino" class="text-blue-400 hover:text-blue-300 text-xs underline relative z-20 pointer-events-auto" target="_blank" on:click|stopPropagation on:pointerdown|stopPropagation on:touchstart|stopPropagation>View Case Study →</a>
          </div>

          <!-- Aitino -->
          <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center mb-4">
              <img src="/saas-for-agencies-slides/aitino-logo.png" alt="Aitino" class="h-12 w-12 mr-4 rounded-lg" />
              <div>
                <h3 class="text-lg sm:text-xl font-bold text-white">Aitino</h3>
                <p class="text-white/80 text-xs sm:text-sm">Multi-Agent AI Platform</p>
              </div>
            </div>
            <p class="text-white/90 mb-4 text-sm">Platform for creating multi-agent AI teams that collaborate to solve complex tasks.</p>
            <div class="text-white/70 text-sm mb-3">
              <p>• Visual agent builder</p>
              <p>• Team collaboration</p>
              <p>• Drag-and-drop interface</p>
            </div>
            <a href="https://www.starti.no/projects/aitino" class="text-blue-400 hover:text-blue-300 text-xs underline relative z-20 pointer-events-auto" target="_blank" on:click|stopPropagation on:pointerdown|stopPropagation on:touchstart|stopPropagation>View Case Study →</a>
          </div>

          <!-- Third Project -->
          <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center mb-4">
              <div class="h-12 w-12 mr-4 rounded-lg bg-zinc-700/60 flex items-center justify-center">
                <span class="text-2xl">🚀</span>
              </div>
              <div>
                <h3 class="text-lg sm:text-xl font-bold text-white">MyChance.ai</h3>
                <p class="text-white/80 text-xs sm:text-sm">College Admissions AI</p>
              </div>
            </div>
            <p class="text-white/90 mb-4 text-sm">AI-powered platform helping students discover best-fit universities and improve admission odds.</p>
            <div class="text-white/70 text-sm mb-3">
              <p>• University matching</p>
              <p>• Admissions analytics</p>
            </div>
            <a href="https://www.starti.no/projects/mychance-ai" class="text-blue-400 hover:text-blue-300 text-xs underline relative z-20 pointer-events-auto" target="_blank" on:click|stopPropagation on:pointerdown|stopPropagation on:touchstart|stopPropagation>View Case Study →</a>
          </div>
        </div>
        
        <!-- Projects Link -->
        <div class="mt-8 text-center">
          <a href="https://www.starti.no/projects" class="text-white underline hover:no-underline text-base" target="_blank">View all our projects →</a>
        </div>
      </article>
    {:else if index === 7}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">What you get</h1>
        
        <div class="space-y-6">
          <!-- Core -->
          <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
            <!-- Monetizable SaaS Product -->
            <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center mb-3">
                <span class="mr-3 sm:mr-4 text-2xl sm:text-3xl">🚀</span>
                <div>
                  <h3 class="text-lg sm:text-xl font-bold text-white">A monetizable software product (SaaS)</h3>
                </div>
              </div>
            </div>

            <!-- Post-launch iteration -->
            <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center mb-3">
                <span class="mr-3 sm:mr-4 text-2xl sm:text-3xl">🔄</span>
                <div>
                  <h3 class="text-lg sm:text-xl font-bold text-white">Post-launch iteration & collaboration (12 weeks)</h3>
                </div>
              </div>
            </div>
          </div>

          <!-- Bonuses Header -->
          <div class="mb-4">
            <h2 class="text-xl sm:text-2xl font-bold text-white">Bonuses:</h2>
          </div>

          <!-- Bonuses -->
          <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
            <!-- Company-wide AI Automations -->
            <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center mb-3">
                <span class="mr-3 sm:mr-4 text-2xl sm:text-3xl">🤖</span>
                <div>
                  <h3 class="text-lg sm:text-xl font-bold text-white">Company-wide AI automations (ops, reporting, delivery)</h3>
                </div>
              </div>
            </div>

            <!-- GTM Playbooks & Consulting -->
            <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center mb-3">
                <span class="mr-3 sm:mr-4 text-2xl sm:text-3xl">📊</span>
                <div>
                  <h3 class="text-lg sm:text-xl font-bold text-white">GTM playbooks & consulting (positioning, pricing, launch plan)</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 8}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">The ROI model</h1>
        <div class="grid gap-4 grid-cols-1 md:grid-cols-4">
          <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-5 backdrop-blur-sm border border-zinc-700/50">
            <div class="text-white/70 text-sm mb-2">Step 1</div>
            <div class="text-white font-semibold">Today</div>
            <div class="text-white/90 text-sm">$X one-time investment</div>
          </div>
          <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-5 backdrop-blur-sm border border-zinc-700/50">
            <div class="text-white/70 text-sm mb-2">Step 2</div>
            <div class="text-white font-semibold">0–6 months</div>
            <div class="text-white/90 text-sm">$50–100k/yr efficiency gains</div>
          </div>
          <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-5 backdrop-blur-sm border border-zinc-700/50">
            <div class="text-white/70 text-sm mb-2">Step 3</div>
            <div class="text-white font-semibold">6–12 months</div>
            <div class="text-white/90 text-sm">New MRR from product/SaaS</div>
          </div>
          <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-5 backdrop-blur-sm border border-zinc-700/50">
            <div class="text-white/70 text-sm mb-2">Step 4</div>
            <div class="text-white font-semibold">Final</div>
            <div class="text-white/90 text-sm">Sell for significant amounts</div>
          </div>
        </div>
      </article>
    {:else if index === 6}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Path to SaaS Success</h1>
        
        <div class="space-y-4">
          <!-- Step 1 -->
          <div class="rounded-xl bg-zinc-800/60 p-4 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center mb-3">
              <div class="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700">
                <span class="text-lg font-bold text-white">1</span>
              </div>
              <div>
                <h3 class="text-xl font-bold text-white">Discover</h3>
                <p class="text-white/80 text-sm">Week 1</p>
              </div>
            </div>
            <div class="ml-13">
              <p class="text-white/90 text-sm">Deep-dive analysis, automation audit, custom SaaS blueprint, and ROI projections</p>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="rounded-xl bg-zinc-800/60 p-4 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center mb-3">
              <div class="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700">
                <span class="text-lg font-bold text-white">2</span>
              </div>
              <div>
                <h3 class="text-xl font-bold text-white">Build</h3>
                <p class="text-white/80 text-sm">Weeks 2–7</p>
              </div>
            </div>
            <div class="ml-13">
              <p class="text-white/90 text-sm">v1.0 product + automations</p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="rounded-xl bg-zinc-800/60 p-4 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center mb-3">
              <div class="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700">
                <span class="text-lg font-bold text-white">3</span>
              </div>
              <div>
                <h3 class="text-xl font-bold text-white">Launch & Improve</h3>
                <p class="text-white/80 text-sm">Weeks 7–19</p>
              </div>
            </div>
            <div class="ml-13">
              <p class="text-white/90 text-sm">Pilot, feedback, iterate</p>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 13}
      <article class="w-full max-w-5xl text-center">
        <div class="flex justify-center px-4">
          <div class="rounded-xl bg-zinc-800/60 p-6 sm:p-8 backdrop-blur-sm border border-zinc-700/50 max-w-2xl w-full">
            <div class="text-center flex flex-col items-center justify-center">
              <div class="mb-4 sm:mb-6 text-4xl sm:text-5xl">⏰</div>
              <h3 class="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Only 2 Spots Available This Quarter</h3>
              <p class="text-base sm:text-lg text-white/90 leading-relaxed">Due to our hands-on approach and commitment to quality, we limit ourselves to 2 agency SaaS projects per quarter. We are extremely picky with who we choose to work with to increase the chances of success.</p>
            </div>
          </div>
        </div>
      </article>

    {:else if index === 14}
      <article class="w-full max-w-5xl text-left">
        <div class="mb-8 text-left">
          <p class="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed">Your competitors are already exploring SaaS solutions. The agencies that act first will dominate their markets while others struggle with manual processes and shrinking margins.</p>
        </div>

        <div class="grid gap-6 grid-cols-1 max-w-md w-full">
          <!-- Book a Fit Call -->
          <div class="rounded-xl bg-zinc-800/60 p-6 sm:p-8 backdrop-blur-sm border border-zinc-700/50">
            <div class="text-left">
              <div class="mb-4 text-4xl sm:text-5xl">📅</div>
              <h3 class="text-xl sm:text-2xl font-bold text-white mb-4">Book a Fit Call</h3>
              <a href="https://cal.com/jorgelewis/15min" class="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors" target="_blank">Schedule 15min Call</a>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 12}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Testimonials</h1>
        <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
          <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="text-3xl mb-3">💬</div>
            <p class="text-white/90 text-base leading-relaxed mb-4">“Startino transformed our agency from manual chaos to automated efficiency. Our SaaS platform now generates $40k MRR and our team productivity increased by 200%. Best investment we've ever made.”</p>
            <div class="text-white font-semibold">John Davis</div>
            <div class="text-white/70 text-sm">CEO, DigitalFlow Agency</div>
            <div class="mt-2 text-yellow-400">⭐⭐⭐⭐⭐</div>
          </div>
          <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="text-3xl mb-3">💬</div>
            <p class="text-white/90 text-base leading-relaxed mb-4">“The custom SaaS platform Jorge and his team built for us eliminated 60 hours of manual work per week. We went from 8 clients to 25 clients with the same team size. Incredible ROI.”</p>
            <div class="text-white font-semibold">Sarah Miller</div>
            <div class="text-white/70 text-sm">Founder, GrowthHack Solutions</div>
            <div class="mt-2 text-yellow-400">⭐⭐⭐⭐⭐</div>
          </div>
        </div>
      </article>
    {/if}
  </div>

  <div class="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2">
    {#each Array.from({ length: numSlides }) as _, i}
      <button class="h-2 w-2 rounded-full transition-colors"
              style:background-color={i===index ? 'white' : 'rgba(255,255,255,0.4)'}
              on:click|stopPropagation={() => (index = i)} aria-label={`Go to slide ${i+1}`}></button>
    {/each}
  </div>

</section>



