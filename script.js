// Enhanced Cursor trail effect with color variations
        const trailParticles = [];
        const maxParticles = 35;
        const colors = ['#00d4ff', '#0066ff', '#ff006e', '#ffeb3b', '#00ff88'];

        document.addEventListener('mousemove', (e) => {
            // Create vibrant trail particles
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';

            // Random color from palette
            const color = colors[Math.floor(Math.random() * colors.length)];
            const opacity = Math.random() * 0.5 + 0.5;

            trail.style.left = (e.clientX - 5) + 'px';
            trail.style.top = (e.clientY - 5) + 'px';
            trail.style.background = `radial-gradient(circle, ${color}, ${color}dd)`;
            trail.style.boxShadow = `0 0 20px ${color}, inset 0 0 15px ${color}88`;
            trail.style.borderColor = color;

            document.body.appendChild(trail);

            trailParticles.push({
                element: trail,
                life: 100,
                x: e.clientX,
                y: e.clientY,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2
            });

            // Limit particles
            if (trailParticles.length > maxParticles) {
                const old = trailParticles.shift();
                old.element.remove();
            }

            // Animate trail particles
            trailParticles.forEach((particle, index) => {
                particle.life -= 4;
                particle.x += particle.vx;
                particle.y += particle.vy;

                particle.element.style.opacity = particle.life / 100;
                particle.element.style.transform = `scale(${particle.life / 100 * 1.5}) translate(${particle.vx * 2}px, ${particle.vy * 2}px)`;
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';

                if (particle.life <= 0) {
                    particle.element.remove();
                }
            });
        });

        // Add glow effect to mouse position
        document.addEventListener('mousemove', (e) => {
            document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
            document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
        });

        function toggleMenu() {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        }

        // Close mobile menu when clicking a link
        document.addEventListener('click', (e) => {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        function scrollToSection(event) {
            event.preventDefault();
            const href = event.target.getAttribute('href');
            const element = document.querySelector(href);
            element.scrollIntoView({ behavior: 'smooth' });

            // Close mobile menu after clicking
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            // Update active nav link
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            event.target.classList.add('active');
        }

        // Highlight active section on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            document.querySelectorAll('section').forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Animate progress bars on scroll
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll('.skill-progress-bar');
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.animation = `progress 1.5s ease-out forwards`;
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-card').forEach(card => {
            observer.observe(card);
        });

        // Add animation class to cards when they come into view
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.project-card, .skill-card, .education-item').forEach(card => {
            cardObserver.observe(card);
        });

(() => {
  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => [...c.querySelectorAll(s)];

  // Preloader
  window.addEventListener('load', () => setTimeout(() => $('#preloader')?.classList.add('hide'), 550));

  // Mouse spotlight
  const glow = $('#mouse-glow');
  let mx = innerWidth/2, my = innerHeight/2, gx = mx, gy = my;
  addEventListener('pointermove', e => { mx=e.clientX; my=e.clientY; });
  function glowLoop(){
    gx += (mx-gx)*.12; gy += (my-gy)*.12;
    if(glow) glow.style.left=gx+'px', glow.style.top=gy+'px';
    requestAnimationFrame(glowLoop);
  }
  glowLoop();

  // Scroll progress
  const bar = $('.scroll-progress');
  addEventListener('scroll', () => {
    const max=document.documentElement.scrollHeight-innerHeight;
    if(bar) bar.style.width=(max>0?(scrollY/max)*100:0)+'%';
  }, {passive:true});

  // 3D card tilt
  $$('.project-card,.skill-card,.education-item,.certification-card,.contact-form-card,.contact-info-card').forEach(card => {
    card.addEventListener('pointermove', e => {
      if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
      const rx=(.5-y)*8, ry=(x-.5)*10;
      card.style.setProperty('--card-x',(x*100)+'%');
      card.style.setProperty('--card-y',(y*100)+'%');
      card.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-7px)`;
    });
    card.addEventListener('pointerleave', () => card.style.transform='');
  });

  // Magnetic buttons
  $$('.btn,.social-link').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r=el.getBoundingClientRect();
      const x=e.clientX-(r.left+r.width/2), y=e.clientY-(r.top+r.height/2);
      el.style.transform=`translate(${x*.10}px,${y*.10}px)`;
    });
    el.addEventListener('pointerleave',()=>el.style.transform='');
  });

  // Scroll reveal, staggered for a premium presentation
  const revealTargets=$$('section > div, .project-card, .skill-card, .education-item, .certification-card, .contact-form-card, .contact-info-card');
  revealTargets.forEach((el,i)=> {
    if(!el.classList.contains('hero-content')) el.classList.add('reveal-3d');
    el.style.transitionDelay=(Math.min(i%6,5)*55)+'ms';
  });
  const revealObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObs.unobserve(e.target);}});
  },{threshold:.12});
  $$('.reveal-3d').forEach(el=>revealObs.observe(el));

  // 3D particle field
  const canvas=$('#fx-canvas'), ctx=canvas?.getContext('2d');
  if(canvas && ctx && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    let W,H,DPR,pts=[];
    function resize(){
      DPR=Math.min(devicePixelRatio||1,2); W=innerWidth; H=innerHeight;
      canvas.width=W*DPR; canvas.height=H*DPR; canvas.style.width=W+'px'; canvas.style.height=H+'px';
      ctx.setTransform(DPR,0,0,DPR,0,0);
      const n=Math.min(115,Math.max(45,Math.floor(W*H/15000)));
      pts=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*1+.15,v:(Math.random()-.5)*.18}));
    }
    resize(); addEventListener('resize',resize);
    function draw(){
      ctx.clearRect(0,0,W,H);
      const near=[];
      for(const p of pts){
        p.y+=p.v; p.x+=Math.sin((p.y+p.z*100)*.006)*.12;
        if(p.y<-10)p.y=H+10; if(p.y>H+10)p.y=-10;
        const r=1+p.z*1.6, a=.18+p.z*.32;
        ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fillStyle=`rgba(0,229,255,${a})`;ctx.fill();
        near.push(p);
      }
      // sparse connecting constellation
      for(let i=0;i<near.length;i++) for(let j=i+1;j<near.length;j++){
        const a=near[i],b=near[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);
        if(d<105){
          ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
          ctx.strokeStyle=`rgba(0,150,255,${(1-d/105)*.06})`;ctx.stroke();
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }
})();
