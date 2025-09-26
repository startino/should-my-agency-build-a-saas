<script lang="ts">
  let index = 0;
  const numSlides = 20;
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
  const gradientBackgroundVariants: string[] = [
    'bg-[linear-gradient(200deg,transparent_0%,transparent_36%,hsl(var(--glow-eucalyptus)/0.16)_52%,transparent_78%),radial-gradient(900px_650px_at_88%_18%,hsl(var(--glow-cyan)/0.35)_0%,transparent_62%)]',
    'bg-[radial-gradient(850px_700px_at_86%_18%,hsl(var(--glow-teal)/0.38)_0%,transparent_62%)]',
    'bg-[radial-gradient(900px_700px_at_12%_82%,hsl(var(--glow-eucalyptus)/0.30)_0%,transparent_60%),linear-gradient(145deg,hsl(var(--glow-cyan)/0.12)_0%,transparent_38%)]',
    'bg-[radial-gradient(1100px_700px_at_95%_35%,hsl(var(--glow-teal)/0.28)_0%,transparent_70%)]',
  ];

  $: gradientBackgroundClass = gradientBackgroundVariants[index % gradientBackgroundVariants.length];
</script>

<svelte:window on:keydown={onKey} />

<section class="relative h-[100svh] w-full overflow-hidden bg-black text-white" aria-label="Slides">
  <div class="absolute inset-0 z-0" on:pointerdown={onStart} on:touchstart={onStart} on:pointerup={onEnd} on:touchend={onEnd} aria-hidden="true"></div>
  <div class="pointer-events-none absolute inset-0">
    <div class={"absolute inset-0 opacity-100 filter saturate-150 " + gradientBackgroundClass}></div>
    <div class="absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl" style="background-color:hsl(var(--glow-eucalyptus)/0.55)"></div>
    <div class="absolute -right-24 -top-24 h-96 w-96 rounded-full blur-3xl" style="background-color:hsl(var(--glow-teal)/0.65)"></div>
    <div class="absolute -right-10 bottom-[-80px] h-72 w-72 rounded-full blur-3xl" style="background-color:hsl(var(--glow-cyan)/0.55)"></div>
    <div class="absolute -left-10 bottom-[-80px] h-72 w-72 rounded-full blur-3xl" style="background-color:hsl(var(--glow-teal)/0.45)"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.60)_55%,rgba(0,0,0,0.85)_85%)]"></div>
  </div>

  <div class="relative mx-auto flex h-full w-full max-w-7xl items-center p-6 sm:p-12">
    {#if index === 0}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">AI Automation for Indie Music Labels</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p><strong>Case Study Partnership Opportunity</strong></p>
        </div>
      </article>
    {:else if index === 1}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">The Reality Check</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <h2 class="text-2xl sm:text-3xl font-bold">Your Label Is Drowning in Manual Work</h2>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li><strong>87%</strong> say it's getting <strong>harder to cut through the noise</strong></li>
            <li><strong>78%</strong> struggle to <strong>retain fan interest</strong></li>
            <li><strong>$1.5B</strong> spent on marketing by indies in 2023</li>
            <li><strong>60+ hours/week</strong> on tasks that should take 10</li>
          </ul>
        </div>
      </article>
    {:else if index === 2}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">You're Not Alone</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <h2 class="text-2xl sm:text-3xl font-bold">Every $10k+/Month Indie Label Faces These</h2>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>Manual playlist submissions to 500+ curators monthly</li>
            <li>Spreadsheet hell for royalty tracking across 20+ platforms</li>
            <li>Social media burnout posting 5x daily across platforms</li>
            <li>Data scattered across 15+ tools with no central insights</li>
            <li>Release coordination nightmares with artists and partners</li>
          </ul>
        </div>
      </article>
    {:else if index === 3}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">What If You Could Automate 70%?</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>Automated playlist outreach to 2,000+ curators based on genre matching</li>
            <li>Real-time royalty consolidation from all revenue streams</li>
            <li>AI-powered social content generated and scheduled weeks ahead</li>
            <li>Smart release workflows that coordinate your entire team automatically</li>
            <li>Predictive analytics showing which tracks will perform pre-release</li>
          </ul>
        </div>
      </article>
    {:else if index === 4}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Meet Labels Already Winning</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p><em>"Such revolutionizing technology has the potential to save major companies with massive catalogs more money than they make in a year."</em> — Bob Shami, CEO</p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li><strong>100,000+ albums</strong> automated and distributed</li>
            <li><strong>Zero human curation</strong> needed</li>
            <li><strong>Massive catalog monetization</strong> from forgotten tracks</li>
            <li><strong>Split-second</strong> ISRC/UPC generation</li>
          </ul>
        </div>
      </article>
    {:else if index === 5}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">The Numbers Don't Lie</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <h2 class="text-2xl sm:text-3xl font-bold">ROI of Music Industry Automation</h2>
          <p class="font-semibold">Time Savings</p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>35% reduction in manual labor costs</li>
            <li>28% faster task completion</li>
            <li>40% reduction in release coordination time</li>
          </ul>
          <p class="font-semibold">Revenue Growth</p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>20% increase in catalog streaming revenue</li>
            <li>50% improvement in playlist placement rates</li>
            <li>30% boost in social media engagement</li>
          </ul>
        </div>
      </article>
    {:else if index === 6}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Here's The Problem</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <h2 class="text-2xl sm:text-3xl font-bold">You Can't Risk $5,000+ On "Maybe"</h2>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li><strong>$5,000 setup fee</strong> feels like a gamble</li>
            <li><strong>$1,000/month retainer</strong> adds up fast</li>
            <li><strong>What if it doesn't work</strong> for your workflow?</li>
            <li><strong>No proof</strong> it works for labels your size</li>
          </ul>
        </div>
      </article>
    {:else if index === 7}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Exclusive Case Study Partnership</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p class="font-semibold">We'll Prove ROI Before You Pay Anything</p>
          <p class="font-semibold">What We're Offering</p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li><strong>$5,000 build fee</strong> → <strong>WAIVED</strong></li>
            <li><strong>2 months retainer ($2,000 value)</strong> → <strong>FREE</strong></li>
            <li>Full custom AI automation setup for your label</li>
            <li>Dedicated implementation specialist</li>
            <li>24/7 support during trial period</li>
          </ul>
        </div>
      </article>
    {:else if index === 8}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">What We Need</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>Detailed testimonial about your experience</li>
            <li>Before/after metrics we can share (with your approval)</li>
            <li>3-month commitment after trial (if you love the results)</li>
          </ul>
          <p><strong>Only 2 spots available</strong> for Q1 2025</p>
        </div>
      </article>
    {:else if index === 9}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Perfect Fit Labels</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <h2 class="text-2xl sm:text-3xl font-bold">Is This You?</h2>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li><strong>$10,000+ monthly revenue</strong></li>
            <li><strong>3–15 active artists</strong></li>
            <li><strong>40+ hours/week</strong> on repetitive tasks</li>
            <li><strong>Growth-focused</strong> mindset</li>
            <li><strong>Open to sharing success story</strong></li>
          </ul>
        </div>
      </article>
    {:else if index === 10}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Your Automation Blueprint</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p class="font-semibold">Phase 1: Intelligence Layer (Week 1–2)</p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>Consolidate data streams (Spotify, Apple, distributors, social)</li>
            <li>Set up predictive analytics dashboard</li>
            <li>Implement smart tagging and categorization</li>
          </ul>
        </div>
      </article>
    {:else if index === 11}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Workflow Automation</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p class="font-semibold">Phase 2: Workflow Automation (Week 3–4)</p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>Automate playlist submission workflows</li>
            <li>Set up social media content pipelines</li>
            <li>Build release coordination system</li>
          </ul>
        </div>
      </article>
    {:else if index === 12}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Revenue Optimization</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p class="font-semibold">Phase 3: Revenue Optimization (Week 5–6)</p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>Implement dynamic pricing strategies</li>
            <li>Automate royalty tracking and payments</li>
            <li>Set up performance-based marketing triggers</li>
          </ul>
        </div>
      </article>
    {:else if index === 13}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">90-Day Success Journey</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p class="font-semibold">Days 1–30: Foundation</p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>Complete system setup and integration</li>
            <li>Team training and workflow optimization</li>
            <li>Initial automation deployment</li>
          </ul>
        </div>
      </article>
    {:else if index === 14}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Acceleration & Optimization</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p class="font-semibold">Days 31–60: Acceleration</p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>Fine-tune AI models based on your data</li>
            <li>Scale automated processes</li>
            <li>Measure early performance gains</li>
          </ul>
          <p class="font-semibold">Days 61–90: Optimization</p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>Activate advanced automation features</li>
            <li>Performance review and testimonial creation</li>
            <li>Transition to standard service (if you choose)</li>
          </ul>
        </div>
      </article>
    {:else if index === 15}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Investment After Trial</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p class="font-semibold">Transparent Pricing For Continued Success</p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li><strong>Setup Fee:</strong> covered in case study</li>
            <li><strong>Monthly Retainer:</strong> $997/month</li>
            <li><strong>ROI Guarantee:</strong> 300% return or we work for free until you get it</li>
          </ul>
          <p><strong>Most labels see $4,000–8,000 monthly savings</strong> from day one</p>
          <p><strong>Break-even in 30 days or less</strong></p>
        </div>
      </article>
    {:else if index === 16}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Ready To Transform Your Label?</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p><strong>This offer expires February 15th, 2025</strong></p>
          <p><strong>Only 2 partnerships available</strong></p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>Email: <a href="mailto:hello@youragency.com">hello@youragency.com</a></li>
            <li>Book a call: <a href="https://calendly.com/youragency/case-study" target="_blank" rel="noopener noreferrer">calendly.com/youragency/case-study</a></li>
            <li>Text/WhatsApp: +1 (555) 123-4567</li>
          </ul>
        </div>
      </article>
    {:else if index === 17}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Next Steps</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <ol class="list-decimal list-outside pl-6 space-y-2">
            <li><strong>15-minute qualification call</strong> this week</li>
            <li><strong>Technical assessment</strong> of your current setup</li>
            <li><strong>Start building</strong> within 7 days</li>
          </ol>
        </div>
      </article>
    {:else if index === 18}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Questions?</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li><strong>What if my label is too small?</strong> We’ve worked with labels doing $8k/month successfully</li>
            <li><strong>What if I'm not tech-savvy?</strong> Zero technical knowledge required</li>
            <li><strong>What about integrations?</strong> We support 200+ music industry platforms</li>
            <li><strong>What about data security?</strong> Enterprise-grade; your data stays on secure servers</li>
          </ul>
        </div>
      </article>
    {:else}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Let's Prove What's Possible</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p>Secure your case study spot and see measurable ROI before you pay anything.</p>
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



