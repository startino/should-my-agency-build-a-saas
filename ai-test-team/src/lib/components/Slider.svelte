<script lang="ts">
  let index = 0;
  const numSlides = 10;
  const next = () => (index = Math.min(index + 1, numSlides - 1));
  const prev = () => (index = Math.max(index - 1, 0));

  let startX = 0;
  function onStart(e: MouseEvent | TouchEvent) {
    startX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
  }
  function onEnd(e: MouseEvent | TouchEvent) {
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
    const dx = clientX - startX;
    if (dx < -40) next();
    if (dx > 40) prev();
  }
  function onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  }
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

<section class="relative h-[100svh] w-full overflow-hidden bg-black text-white" aria-label="Slides">
  <!-- Swipe detector overlay (behind controls) -->
  <div class="absolute inset-0 z-0" on:pointerdown={onStart} on:touchstart={onStart} on:pointerup={onEnd} on:touchend={onEnd} aria-hidden="true"></div>
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

  

  <div class="relative mx-auto flex h-full w-full max-w-7xl items-center p-6 sm:p-12">
    {#if index === 0}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">AI Testing Crew</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p><strong>Ship 2–3× faster without shipping bugs.</strong></p>
          <p>Done-for-you agentic end-to-end testing for fast-moving SaaS teams.</p>
        </div>
      </article>
    {:else if index === 1}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Why Now</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>AI lets you build features in minutes; testing is the new bottleneck.</li>
            <li>AI-era code churns constantly → specs drift, flows break.</li>
            <li>Users expect bug-free experiences; release anxiety slows you down.</li>
          </ul>
        </div>
      </article>
    {:else if index === 2}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">The Core Idea</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p>Imagine a swarm of AI Agents imitating users on every commit - that's an AI Test Crew.</p>
          <p>Anchor tests to real user flows that are always up to date to your codebase.</p>
        </div>
      </article>
    {:else if index === 3}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">What You Get</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p><strong>An installed “AI Test Crew”:</strong></p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li><strong>Flow Map:</strong> Critical paths (signup → paywall → core actions).</li>
            <li><strong>Agentic Test Gen:</strong> Playwright + browser agents create/update E2E tests from flow specs.</li>
            <li><strong>CI Integration:</strong> Tests run on every PR + nightly.</li>
            <li><strong>Dashboard:</strong> Coverage of critical flows, pass rates, MTTR, flaky tests, trendlines.</li>
          </ul>
        </div>
      </article>
    {:else if index === 4}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Outcomes We Target</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p>With an AI Test Crew, we want you to feel confident to ship to alpha knowing that bugs will be halted by your Crew.</p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li><strong>100%</strong> of user-flows under E2E coverage.</li>
            <li><strong>↓ 50–80%</strong> post-release bugs within 60 days.</li>
            <li><strong>↑ 2×</strong> release cadence (weekly → twice weekly, etc.).</li>
            <li><strong>↓ 90%</strong> manual QA hours on covered flows.</li>
          </ul>
          <p><em>We’ll align exact targets to your baseline.</em></p>
        </div>
      </article>
    {:else if index === 5}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Who This Is For</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>Lean SaaS teams (1-6 members) with &gt;100 users OR &gt;$5k/mo</li>
            <li>You&nbsp;want&nbsp;to&nbsp;ship faster with less bugs</li>
          </ul>
        </div>
      </article>
    {:else if index === 6}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Process &amp; Timeline</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p><strong>Step 1 — 15-min Fit Call</strong><br/>Is your product a good fit for an AI Testing Crew?</p>
          <p><strong>Step 2 — Audit &amp; Test Map (1 week)</strong><br/>Define flows, define “what good looks like,” pick KPIs.</p>
          <p><strong>Step 3 — Pilot Sprint (1–2 weeks)</strong><br/>We cover <strong>2–3 critical flows</strong> end-to-end; CI + dashboard live.</p>
          <p><strong>Step 4 — Rollout (2–4 weeks)</strong><br/>Expand coverage.</p>
          <p><strong>Step 5 — Ongoing</strong><br/>Weekly QA ops, break/fix, coverage creep, reporting.</p>
        </div>
      </article>
    {:else if index === 7}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Why We’ll Hit the Mark</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li><strong>User-flow-first</strong> (not selector-first) = less brittle.</li>
            <li><strong>Agentic maintenance</strong> keeps tests in lockstep with code churn.</li>
            <li><strong>Tight CI loop</strong>: fail fast on PRs, not in production.</li>
            <li><strong>We do the work</strong>: your team keeps building.</li>
          </ul>
        </div>
      </article>
    {:else if index === 8}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Offer (Case-Study Cohort)</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p>To validate the offer, we’re taking a small cohort:</p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li><strong>Build fee ($5k) &amp; first 2 months retainer ($500/mo) waived</strong> for 2 case-study partners.</li>
            <li>In return: allow us to share before/after results.</li>
          </ul>
        </div>
      </article>
    {:else}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Next Steps</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p>Message me via any of these if you're interested in shipping faster, with less bugs:</p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>WhatsApp: +852 9747 3013</li>
            <li>Instagram: <a href="https://www.instagram.com/horheyjorge_/" target="_blank" rel="noopener noreferrer">@horheyjorge_</a></li>
            <li>Discord: horheyjorge</li>
            <li>Email: <a href="mailto:jorge.lewis@starti.no">jorge.lewis@starti.no</a></li>
          </ul>
        </div>
      </article>
    {/if}
  </div>

  <div class="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2">
    {#each Array.from({ length: numSlides }) as _, i}
      <button class="h-2 w-2 rounded-full transition-colors"
              style:background-color={i===index ? 'white' : 'rgba(255,255,255,0.4)'}
              on:click={() => (index = i)} aria-label={`Go to slide ${i+1}`}></button>
    {/each}
  </div>

  <!-- Visible navigation buttons -->
  <div class="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
    {#if index > 0}
      <button 
        type="button" 
        class="flex items-center justify-center w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full transition-all duration-200 border border-white/20 hover:border-white/40" 
        on:click={prev} 
        aria-label="Previous slide"
      >
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
    {/if}
  </div>

  <div class="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
    {#if index < numSlides - 1}
      <button 
        type="button" 
        class="flex items-center justify-center w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full transition-all duration-200 border border-white/20 hover:border-white/40" 
        on:click={next} 
        aria-label="Next slide"
      >
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    {/if}
  </div>

  <!-- Invisible click areas for tap navigation (keeping existing functionality) -->
  <div class="pointer-events-none absolute inset-0 flex justify-between">
    <button type="button" class="pointer-events-auto h-full w-1/3" on:click={prev} aria-label="Previous slide"></button>
    <button type="button" class="pointer-events-auto h-full w-1/3" on:click={next} aria-label="Next slide"></button>
  </div>
</section>


