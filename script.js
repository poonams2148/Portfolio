/* =========================================================
   POONAM SURYAWANSHI - PREMIUM PORTFOLIO
   COMPLETE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. PRELOADER
    ===================================================== */

    const preloader = document.getElementById("preloader");

    function hidePreloader() {
        if (!preloader) return;

        preloader.classList.add("hide");

        setTimeout(() => {
            preloader.style.display = "none";
        }, 700);
    }

    // Do not wait for video or images
    setTimeout(hidePreloader, 500);

    // Safety fallback
    setTimeout(hidePreloader, 1800);


    /* =====================================================
       2. MOBILE MENU
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", (event) => {

            event.stopPropagation();

            menuBtn.classList.toggle("active");
            navMenu.classList.toggle("show");

        });


        // Close menu after clicking a navigation link
        const navLinksInside =
            navMenu.querySelectorAll(".nav-link");

        navLinksInside.forEach(link => {

            link.addEventListener("click", () => {

                menuBtn.classList.remove("active");
                navMenu.classList.remove("show");

            });

        });


        // Close menu when clicking outside
        document.addEventListener("click", (event) => {

            if (
                navMenu.classList.contains("show") &&
                !navMenu.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                menuBtn.classList.remove("active");
                navMenu.classList.remove("show");

            }

        });

    }


 /* =========================================================
   HERO ROLE SLIDER
========================================================= */

const roleText = document.getElementById("roleText");

const roles = [
    "Full Stack Developer",
    "Web Developer",
    "Java Developer",
    "AI & Machine Learning Enthusiast"
];

let roleIndex = 0;

function changeRole() {

    roleText.classList.add("role-exit");

    setTimeout(() => {

        roleIndex = (roleIndex + 1) % roles.length;

        roleText.textContent = roles[roleIndex];

        roleText.classList.remove("role-exit");
        roleText.classList.add("role-enter");

        requestAnimationFrame(() => {
            roleText.classList.remove("role-enter");
        });

    }, 500);
}

setInterval(changeRole, 2500);


    /* =====================================================
       4. HERO VIDEO
    ===================================================== */

    const video =
        document.getElementById("introVideo");

    const soundBtn =
        document.getElementById("soundBtn");

    const replayBtn =
        document.getElementById("replayBtn");

    const videoWrapper =
        document.querySelector(".video-wrapper");


    if (video) {

        /*
         * Browser autoplay policy:
         * Video starts muted.
         */
        video.muted = true;
        video.autoplay = true;
        video.playsInline = true;


        /* ---------------------------------------------
           PLAY VIDEO
        --------------------------------------------- */

        function playVideo() {

            const promise =
                video.play();

            if (promise !== undefined) {

                promise.catch(() => {
                    /*
                     * Browser blocked autoplay.
                     * User can click video manually.
                     */
                });

            }

        }


        /* ---------------------------------------------
           AUTOPLAY
        --------------------------------------------- */

        playVideo();


        /* ---------------------------------------------
           VIDEO CLICK = PLAY / PAUSE
        --------------------------------------------- */

        if (videoWrapper) {

            videoWrapper.addEventListener(
                "click",
                (event) => {

                    /*
                     * Do not trigger play/pause
                     * when replay button is clicked.
                     */

                    if (
                        event.target.closest(
                            "#replayBtn"
                        )
                    ) {
                        return;
                    }


                    if (video.paused) {

                        /*
                         * If video reached end,
                         * start again from beginning.
                         */

                        if (video.ended) {
                            video.currentTime = 0;
                        }

                        playVideo();

                    }

                    else {

                        video.pause();

                    }

                }
            );

        }


        /* ---------------------------------------------
           SOUND BUTTON
        --------------------------------------------- */

        if (soundBtn) {

            soundBtn.addEventListener(
                "click",
                async (event) => {

                    event.preventDefault();
                    event.stopPropagation();


                    /*
                     * Toggle mute
                     */

                    video.muted =
                        !video.muted;


                    /*
                     * If sound is ON,
                     * make sure video is playing.
                     */

                    if (!video.muted) {

                        if (video.ended) {
                            video.currentTime = 0;
                        }

                        try {

                            await video.play();

                        }

                        catch (error) {

                            console.log(
                                "Video playback blocked."
                            );

                        }

                    }


                    /*
                     * Change button icon
                     */

                    if (video.muted) {

                        soundBtn.textContent = "🔇";

                        soundBtn.title =
                            "Turn sound on";

                    }

                    else {

                        soundBtn.textContent = "🔊";

                        soundBtn.title =
                            "Mute video";

                    }

                }
            );

        }


        /* ---------------------------------------------
           REPLAY BUTTON
        --------------------------------------------- */

        if (replayBtn) {

            replayBtn.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();
                    event.stopPropagation();

                    /*
                     * Restart from beginning
                     */

                    video.currentTime = 0;

                    playVideo();

                }
            );

        }


        /* ---------------------------------------------
           VIDEO EVENTS
        --------------------------------------------- */

        video.addEventListener(
            "play",
            () => {

                if (videoWrapper) {

                    videoWrapper.classList.remove(
                        "is-paused"
                    );

                }

            }
        );


        video.addEventListener(
            "playing",
            () => {

                if (videoWrapper) {

                    videoWrapper.classList.remove(
                        "is-paused"
                    );

                }

            }
        );


        video.addEventListener(
            "pause",
            () => {

                if (videoWrapper) {

                    videoWrapper.classList.add(
                        "is-paused"
                    );

                }

            }
        );


        video.addEventListener(
            "ended",
            () => {

                if (videoWrapper) {

                    videoWrapper.classList.add(
                        "is-paused"
                    );

                }

            }
        );


        /*
         * IMPORTANT:
         * Do NOT automatically replay after ended.
         *
         * User can press replay button or
         * click the video to start again.
         */

    }


    /* =====================================================
       5. SCROLL PROGRESS
    ===================================================== */

    const progress =
        document.getElementById(
            "scrollProgress"
        );


    function updateScrollProgress() {

        if (!progress) return;

        const scrollTop =
            window.scrollY;

        const pageHeight =
            document.documentElement
                .scrollHeight
            - window.innerHeight;


        let percentage = 0;


        if (pageHeight > 0) {

            percentage =
                (scrollTop / pageHeight) * 100;

        }


        progress.style.width =
            Math.min(
                percentage,
                100
            ) + "%";

    }


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        {
            passive: true
        }
    );


    updateScrollProgress();


    /* =====================================================
       6. SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "visible"
                                    );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    }

    else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       7. ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    function updateActiveNavigation() {

        let current = "";


        sections.forEach(
            section => {

                const sectionTop =
                    section.offsetTop - 180;

                const sectionHeight =
                    section.offsetHeight;


                if (
                    window.scrollY >=
                    sectionTop
                    &&
                    window.scrollY <
                    sectionTop +
                    sectionHeight
                ) {

                    current =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navLinks.forEach(
            link => {

                link.classList.remove(
                    "active"
                );


                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    href ===
                    `#${current}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );


    updateActiveNavigation();


    /* =====================================================
       8. SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {
                            return;
                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });


                        /*
                         * Close mobile menu
                         */

                        if (
                            menuBtn &&
                            navMenu
                        ) {

                            menuBtn.classList.remove(
                                "active"
                            );

                            navMenu.classList.remove(
                                "show"
                            );

                        }

                    }
                );

            }
        );


    /* =====================================================
       9. CURSOR GLOW
    ===================================================== */

    const cursorGlow =
        document.getElementById(
            "cursorGlow"
        );


    const isTouchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        cursorGlow &&
        !isTouchDevice &&
        !reducedMotion
    ) {

        let mouseX =
            window.innerWidth / 2;

        let mouseY =
            window.innerHeight / 2;


        let glowX = mouseX;
        let glowY = mouseY;


        document.addEventListener(
            "pointermove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

            },
            {
                passive: true
            }
        );


        function animateGlow() {

            glowX +=
                (mouseX - glowX)
                * 0.12;

            glowY +=
                (mouseY - glowY)
                * 0.12;


            cursorGlow.style.left =
                glowX + "px";

            cursorGlow.style.top =
                glowY + "px";


            requestAnimationFrame(
                animateGlow
            );

        }


        animateGlow();

    }


    /* =====================================================
       10. 3D CARD TILT
    ===================================================== */

    if (
        !reducedMotion &&
        !isTouchDevice
    ) {

        const cards =
            document.querySelectorAll(
                `
                .project-card,
                .experience-card,
                .skill-box,
                .certificate-card
                `
            );


        cards.forEach(
            card => {

                card.addEventListener(
                    "pointermove",
                    event => {

                        if (
                            window.innerWidth <
                            900
                        ) {
                            return;
                        }


                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            (
                                event.clientX -
                                rect.left
                            )
                            / rect.width;


                        const y =
                            (
                                event.clientY -
                                rect.top
                            )
                            / rect.height;


                        const rotateX =
                            (0.5 - y) * 7;


                        const rotateY =
                            (x - 0.5) * 9;


                        card.style.transform =
                            `
                            perspective(900px)
                            rotateX(${rotateX}deg)
                            rotateY(${rotateY}deg)
                            translateY(-5px)
                            `;

                    }
                );


                card.addEventListener(
                    "pointerleave",
                    () => {

                        card.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =====================================================
       11. MAGNETIC BUTTON EFFECT
    ===================================================== */

    if (
        !reducedMotion &&
        !isTouchDevice
    ) {

        const buttons =
            document.querySelectorAll(
                ".btn, .social-link"
            );


        buttons.forEach(
            button => {

                button.addEventListener(
                    "pointermove",
                    event => {

                        const rect =
                            button.getBoundingClientRect();


                        const x =
                            event.clientX -
                            (
                                rect.left +
                                rect.width / 2
                            );


                        const y =
                            event.clientY -
                            (
                                rect.top +
                                rect.height / 2
                            );


                        button.style.transform =
                            `
                            translate(
                                ${x * 0.08}px,
                                ${y * 0.08}px
                            )
                            `;

                    }
                );


                button.addEventListener(
                    "pointerleave",
                    () => {

                        button.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =====================================================
       12. PARTICLE CANVAS
    ===================================================== */

    const canvas =
        document.getElementById(
            "particleCanvas"
        );


    if (
        canvas &&
        !reducedMotion
    ) {

        const ctx =
            canvas.getContext("2d");


        if (ctx) {

            let width;
            let height;
            let dpr;

            let particles = [];


            /* ---------------------------------------------
               RESIZE
            --------------------------------------------- */

            function resizeCanvas() {

                dpr =
                    Math.min(
                        window.devicePixelRatio ||
                        1,
                        2
                    );


                width =
                    window.innerWidth;

                height =
                    window.innerHeight;


                canvas.width =
                    width * dpr;

                canvas.height =
                    height * dpr;


                canvas.style.width =
                    width + "px";

                canvas.style.height =
                    height + "px";


                ctx.setTransform(
                    dpr,
                    0,
                    0,
                    dpr,
                    0,
                    0
                );


                createParticles();

            }


            /* ---------------------------------------------
               CREATE PARTICLES
            --------------------------------------------- */

            function createParticles() {

                const count =
                    window.innerWidth <
                    700
                        ? 25
                        : 50;


                particles = [];


                for (
                    let i = 0;
                    i < count;
                    i++
                ) {

                    particles.push({

                        x:
                            Math.random()
                            * width,

                        y:
                            Math.random()
                            * height,

                        radius:
                            Math.random()
                            * 1.5
                            + 0.5,

                        speedX:
                            (
                                Math.random()
                                - 0.5
                            )
                            * 0.25,

                        speedY:
                            (
                                Math.random()
                                - 0.5
                            )
                            * 0.25,

                        opacity:
                            Math.random()
                            * 0.35
                            + 0.15

                    });

                }

            }


            /* ---------------------------------------------
               DRAW PARTICLES
            --------------------------------------------- */

            function drawParticles() {

                ctx.clearRect(
                    0,
                    0,
                    width,
                    height
                );


                particles.forEach(
                    (particle, index) => {

                        particle.x +=
                            particle.speedX;

                        particle.y +=
                            particle.speedY;


                        /*
                         * Screen wrapping
                         */

                        if (
                            particle.x < 0
                        ) {
                            particle.x =
                                width;
                        }


                        if (
                            particle.x > width
                        ) {
                            particle.x = 0;
                        }


                        if (
                            particle.y < 0
                        ) {
                            particle.y =
                                height;
                        }


                        if (
                            particle.y > height
                        ) {
                            particle.y = 0;
                        }


                        /*
                         * Particle
                         */

                        ctx.beginPath();

                        ctx.arc(
                            particle.x,
                            particle.y,
                            particle.radius,
                            0,
                            Math.PI * 2
                        );


                        ctx.fillStyle =
                            `
                            rgba(
                                0,
                                229,
                                255,
                                ${particle.opacity}
                            )
                            `;


                        ctx.fill();


                        /*
                         * Connect nearby particles
                         */

                        for (
                            let j =
                                index + 1;

                            j <
                            particles.length;

                            j++
                        ) {

                            const other =
                                particles[j];


                            const dx =
                                particle.x -
                                other.x;


                            const dy =
                                particle.y -
                                other.y;


                            const distance =
                                Math.sqrt(
                                    dx * dx +
                                    dy * dy
                                );


                            if (
                                distance < 110
                            ) {

                                ctx.beginPath();

                                ctx.moveTo(
                                    particle.x,
                                    particle.y
                                );


                                ctx.lineTo(
                                    other.x,
                                    other.y
                                );


                                const opacity =
                                    (
                                        1 -
                                        distance /
                                        110
                                    ) * 0.06;


                                ctx.strokeStyle =
                                    `
                                    rgba(
                                        0,
                                        150,
                                        255,
                                        ${opacity}
                                    )
                                    `;


                                ctx.lineWidth =
                                    0.6;


                                ctx.stroke();

                            }

                        }

                    }
                );


                requestAnimationFrame(
                    drawParticles
                );

            }


            resizeCanvas();

            drawParticles();


            window.addEventListener(
                "resize",
                resizeCanvas,
                {
                    passive: true
                }
            );

        }

    }


    /* =====================================================
       13. CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach(
        element => {

            element.textContent =
                new Date().getFullYear();

        }
    );


    /* =====================================================
       14. INITIAL STATE
    ===================================================== */

    document.body.classList.add(
        "js-ready"
    );

});


/* =========================================================
   FINAL SAFETY FALLBACK
========================================================= */

window.addEventListener(
    "load",
    () => {

        const preloader =
            document.getElementById(
                "preloader"
            );


        if (preloader) {

            preloader.classList.add(
                "hide"
            );

        }

    }
);