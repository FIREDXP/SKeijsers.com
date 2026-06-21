// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Cursor-tracking radial gradient background
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
});

// Active nav on scroll & Smooth navigation
const links = document.querySelectorAll('.navlink');
const sections = Array.from(links).map(l => document.querySelector(l.getAttribute('href')));

const onScroll = () => {
    const y = window.scrollY + 120;
    sections.forEach((sec, i) => {
        if (sec && sec.offsetTop <= y && sec.offsetTop + sec.offsetHeight > y) {
            links.forEach(a => a.classList.remove('active'));
            links[i].classList.add('active');
        }
    });
};
window.addEventListener('scroll', onScroll, { passive: true });

links.forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    links.forEach(x => x.classList.remove('active'));
    a.classList.add('active');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}));

/* ========== Hero image rotator & nav gradient sync ========== */
(function () {
    let frontEl = document.querySelector('.hero-image.front');
    let backEl = document.querySelector('.hero-image.back');
    if (!frontEl || !backEl) return;

    const heroImages = [
        { src: 'assets/images/sunCarFull4k.jpg', nav: ['#ff831d', '#fac88f'] },
        { src: 'assets/images/redCarFullEnhanced.jpg', nav: ['#FA010A', '#7292B7'] },
        { src: 'assets/images/prpMtrFull.jpg', nav: ['#A079CC', '#FFA18B'] },
        { src: 'assets/images/slfMtrFull.jpg', nav: ['#6E77B8', '#F38D4B'] }
    ];

    let current = 0;
    const rotateMs = 20000;
    let isTransitioning = false;

    heroImages.forEach(i => { const im = new Image(); im.src = i.src; });

    frontEl.src = heroImages[0].src;
    frontEl.style.opacity = '1';
    backEl.style.opacity = '0';
    document.documentElement.style.setProperty('--nav-grad-start', heroImages[0].nav[0]);
    document.documentElement.style.setProperty('--nav-grad-end', heroImages[0].nav[1]);

    function getRandomIndex() {
        if (heroImages.length <= 1) return 0;
        let nextIndex = Math.floor(Math.random() * heroImages.length);
        while (nextIndex === current) {
            nextIndex = Math.floor(Math.random() * heroImages.length);
        }
        return nextIndex;
    }

    function crossfadeTo(nextIndex) {
        if (isTransitioning) return;
        isTransitioning = true;
        const item = heroImages[nextIndex];

        const pre = new Image();
        pre.src = item.src;
        pre.onload = () => {
            backEl.src = item.src;
            backEl.style.zIndex = '2';
            frontEl.style.zIndex = '1';

            document.documentElement.style.setProperty('--nav-grad-start', item.nav[0]);
            document.documentElement.style.setProperty('--nav-grad-end', item.nav[1]);

            requestAnimationFrame(() => {
                backEl.style.opacity = '1';
                frontEl.style.opacity = '0';
            });

            setTimeout(() => {
                const tmp = frontEl;
                frontEl = backEl;
                backEl = tmp;

                backEl.style.opacity = '0';
                backEl.style.zIndex = '0';
                frontEl.style.zIndex = '1';

                current = nextIndex;
                isTransitioning = false;
            }, 1050);
        };
        pre.onerror = () => { isTransitioning = false; };
    }

    let timer = setInterval(() => { crossfadeTo(getRandomIndex()); }, rotateMs);

    function handleImageClick() {
        if (isTransitioning) return;
        clearInterval(timer);
        crossfadeTo(getRandomIndex());
        timer = setInterval(() => { crossfadeTo(getRandomIndex()); }, rotateMs);
    }

    frontEl.addEventListener('click', handleImageClick, false);
    backEl.addEventListener('click', handleImageClick, false);
})();

// Functie om de huidige geselecteerde taal te bepalen
function getCurrentLang() {
    return document.body.classList.contains('lang-en') ? 'en' : 'nl';
}

// ========== Projecten Data ==========
const projectData = {
    projectstudio2: {
        title: { nl: "Project Studio 2", en: "Project Studio 2" },
        subtitle: { nl: "Web Design & Development voor Haagse sportverenigingen", en: "Web Design & Development for Hague sports clubs" },
        caption: { nl: "Communication & Multimedia Desing: semester 2, 2025-2026 | Vak: PS2", en: "Communication & Multimedia Design: semester 2, 2025-2026 | Course: PS2" },
        items: [
            { 
                title: { nl: "Projectoverzicht", en: "Project Overview" }, 
                desc: { 
                    nl: "In opdracht van de Gemeente Den Haag is er gewerkt aan het herontwerpen en coderen van een vernieuwde, toegankelijke en responsieve website voor een lokale sportvereniging.<br><br>Het doel van dit intensieve 8-weekse project was om de verouderde digitale identiteit van de club volledig te moderniseren. Hierbij is de aangeleverde informatie (zoals interviews en logo's) geanalyseerd en vertaald naar een gebruiksvriendelijk digitaal platform dat proeflessen en ledenwerving laagdrempelig stimuleert.<br><br>Klik <a href='https://www.figma.com/site/oL3AoNKmnQpxsDGbCVJxLC/PS2---Choukoud-Gym?node-id=0-1&t=7pLRkJezDR9r1ixe-1' target='_blank' style='color: var(--accent); text-decoration: underline;'>hier</a> om de figma eindversie te bekijken.", 
                    en: "Commissioned by the Municipality of The Hague, this project focused on redesigning and coding a renewed, accessible, and responsive website for a local sports club.<br><br>The goal of this intensive 8-week project was to completely modernize the club's outdated digital identity. Supplied information (such as interviews and logos) was analyzed and translated into a user-friendly digital platform that seamlessly encourages trial lessons and member recruitment.<br><br>Click <a href='https://www.figma.com/site/oL3AoNKmnQpxsDGbCVJxLC/PS2---Choukoud-Gym?node-id=0-1&t=7pLRkJezDR9r1ixe-1' target='_blank' style='color: var(--accent); text-decoration: underline;'>here</a> to view the final figma version." 
                } 
            },
            { 
                title: { nl: "Werkwijze & Leerpunten", en: "Methodology & Key Takeaways" }, 
                desc: { 
                    nl: "<strong>User-Centered Design:</strong> Op basis van persona's, scenarios en een grondige concurrentieanalyse is er via card sorting en user flows gebouwd aan een sterke informatiearchitectuur.<br><br><strong>Van Schets tot Hi-Fi:</strong> Via wekelijkse iteraties en intensieve peerfeedback-sprints zijn low-fidelity wireframes doorontwikkeld naar een pixel-perfect high-fidelity prototype, getest met de Heuristic Evaluation en Microsoft Desirability Toolkit.<br><br><strong>Development & AI-Reflectie:</strong> Het hi-fi ontwerp is nauwkeurig gecodeerd in semantisch, overdraagbaar en responsief HTML en CSS volgens de best practices. Dit project heeft mij geleerd hoe je een complex ontwerptraject structureert, designregels (UX/UI) consistent vertaalt naar code en kritisch reflecteert op de inzet van AI-tools tijdens het development-proces.", 
                    en: "<strong>User-Centered Design:</strong> Based on personas, scenarios, and a thorough competitor analysis, a strong information architecture was built using card sorting and user flows.<br><br><strong>From Sketch to Hi-Fi:</strong> Through weekly iterations and intensive peer feedback sprints, low-fidelity wireframes were developed into a pixel-perfect high-fidelity prototype, tested using Heuristic Evaluation and the Microsoft Desirability Toolkit.<br><br><strong>Development & AI Reflection:</strong> The hi-fi design was accurately coded into semantic, transferable, and responsive HTML and CSS following industry best practices. This project taught me how to structure a complex design process, consistently translate UX/UI principles into clean code, and critically reflect on the integration of AI tools during development." 
                } 
            },
        ]
    },
    parkproost: {
        title: { nl: "ParkProost", en: "ParkProost" },
        subtitle: { nl: "Spelontwerp voor empathie en verbinding", en: "Game design for empathy and connection" },
        caption: { nl: "Semester 2, 2025-2026 | Vak: VP", en: "Semester 2, 2025-2026 | Course: VP" },
        items: [
            {
                title: { nl: "Projectoverzicht", en: "Project Overview" },
                desc: {
                    nl: "Het doel van het project was het ontwerpen van een spel met minimaal één digitaal element dat empathie creëert tussen twee opponerende groepen. Wij hebben gekozen voor de doelgroepen jongeren (straathangers) en ouderen (bejaardenhuisbewoners).<br><br>Het ontwerp streeft ernaar om door middel van een toegankelijk spel de kloof tussen deze twee groepen te verkleinen en wederzijdse frustraties om te buigen naar begrip en verbinding.",
                    en: "The goal of the project was to design a game containing at least one digital element to foster empathy between two opposing groups. We chose the target groups of youth and elderly people.<br><br>The design aims to bridge the gap between these two groups and turn mutual frustration into understanding and connection through an accessible game."
                }
            },
            {
                title: { nl: "Werkwijze", en: "Methodology" },
                desc: {
                    nl: "<strong>Opstart:</strong> Er zijn persona’s en HKJ-vragen opgesteld om de behoeften and frustraties in kaart te brengen.<br><br><strong>Divergeren & Conceptkeuze:</strong> Door technieken zoals mindmapping en 'crazy 8' is het concept ParkProost gekozen.<br><br><strong>Ontwikkeling:</strong> Het concept is uitgewerkt in userflows, wireframes en een styleguide.<br><br><strong>AI-integratie:</strong> Er is actief gebruikgemaakt van AI-tools, waarbij kritisch is gereflecteerd op de meerwaarde en beperkingen.<br><br><strong>Prototype & Testen:</strong> Er is een Hi-Fi prototype getest middels usability tests, gevolgd door optimalisaties.",
                    en: "<strong>Initiation:</strong> Personas and HMW-questions were created to map needs and frustrations.<br><br><strong>Divergence & Concept Selection:</strong> Techniques like mind mapping and 'crazy 8' led to the ParkProost concept.<br><br><strong>Development:</strong> The concept was detailed through user flows, wireframes, and a style guide.<br><br><strong>AI Integration:</strong> AI tools were actively used, with reflection on their value and limitations.<br><br><strong>Prototyping & Testing:</strong> A Hi-Fi prototype was tested via usability tests, followed by design optimizations."
                }
            }
        ]
    },
    visualcommunication: {
        title: { nl: "Visual Communication", en: "Visual Communication" },
        subtitle: { nl: "UI/UX Design & Branding voor digitale producten", en: "UI/UX Design & Branding for digital products" },
        caption: { nl: "Semester 1, 2025-2026 | Vak: VisCom", en: "Semester 1, 2025-2026 | Course: VisCom" },
        items: [
            {
                title: { nl: "Projectoverzicht", en: "Project Overview" },
                desc: {
                    nl: "Tijdens het vak Visual Communication stond het ontwerpen van een krachtige visuele identiteit en een intuïtieve gebruikersinterface centraal. Voor dit project is een digitaal platform van grond af aan opgebouwd.<br><br>Het doel was om complexe informatie op een heldere, esthetische en gebruiksvriendelijke manier te presenteren, waarbij rekening is gehouden met interactieve patronen en een consistente merkidentiteit.",
                    en: "During the Visual Communication course, the focus was on designing a powerful visual identity and an intuitive user interface. For this project, a digital platform was built from scratch.<br><br>The goal was to present complex information in a clear, aesthetic, and user-friendly manner, taking interactive patterns and a consistent brand identity into account."
                }
            },
            {
                title: { nl: "Werkwijze & UI Components", en: "Methodology & UI Components" },
                desc: {
                    nl: "<strong>Branding & Style Guide:</strong> Er is een unieke huisstijl ontwikkeld met een zorgvuldig gekozen kleurenpalet en typografie die de identiteit van het platform versterken.<br><br><strong>Figma Design System:</strong> Het volledige interface-ontwerp is modulair opgebouwd in Figma door middel van herbruikbare componenten, varianten en autolayout.<br><br><strong>Wireframing tot Hi-Fi:</strong> Via low-fidelity schetsen en mid-fidelity wireframes is er stapsgewijs toegewerkt naar pixel-perfecte, high-fidelity user interfaces (UI) die klaar zijn voor interactieve prototyping.",
                    en: "<strong>Branding & Style Guide:</strong> A unique brand identity was developed, featuring a carefully selected color palette and typography that strengthen the platform's appearance.<br><br><strong>Figma Design System:</strong> The entire interface design was built modularly in Figma using reusable components, variants, and auto-layout.<br><br><strong>Wireframing to Hi-Fi:</strong> Moving from low-fidelity sketches and mid-fidelity wireframes, the project step-by-step achieved pixel-perfect, high-fidelity user interfaces (UI) ready for interactive prototyping."
                }
            }
        ]
    },
    fotografie: {
        title: { nl: "Fotografie", en: "Photography" },
        subtitle: { nl: "Passie voor Automotive", en: "Passion for Automotive" },
        caption: { nl: "Vrije Tijd & Hobby", en: "Leisure & Hobby" },
        items: [
            {
                title: { nl: "Automotive Fotografie", en: "Automotive Photography" },
                desc: {
                    nl: "Als kleine jongen had ik al een passie voor auto's, en nu ik zelf ook een auto en zelfs een motor bezit is de glimlach niet meer van mijn gezicht te krijgen.<br><br>Naast het immense plezier dat ik eruit haal ben ik doorgaans bezig met het maken van foto's van mijn (deze Audi TT) auto, en die van others binnen mijn kring.<br><br>Dit legt hopelijk een basis voor iets waar ik later mijn werk van kan maken. (Help jij mij verder? neem contact op via mijn contactpagina)",
                    en: "Ever since I was a little boy, I've had a passion for cars. Now that I own a car and even a motorcycle myself, I just can't wipe the smile off my face.<br><br>Besides the immense joy I get out of driving, I spend most of my time taking photos of my own car (this Audi TT) and those of others within my circle.<br><br>Hopefully, this lays the foundation for something I can turn into my career down the road. (Want to help me take the next step? Get in touch via my contact page!)"
                }
            },
            {
                title: { nl: "Meer werk zoals dit:", en: "More Work Like This:" },
                desc: {
                    nl: "Bekijk <a href='https://www.instagram.com/tt_vr6/' target='_blank' style='color: var(--accent); text-decoration: underline;'> mijn Instagram</a> voor meer van mijn cinematografische edits en content creatie rondom auto's en motoren. Hier deel ik regelmatig nieuwe video's waarin ik mijn passie voor automotive combineer met mijn vaardigheden in videobewerking. Abonneer je om op de hoogte te blijven van mijn nieuwste creaties!",
                    en: "Check out <a href='https://www.instagram.com/tt_vr6/' target='_blank' style='color: var(--accent); text-decoration: underline;'> my Instagram</a> for more of my cinematic edits and content creation around cars and motorcycles. I regularly share new videos where I combine my passion for automotive with my video editing skills. Follow to stay updated on my latest creations!",
                }
            }
        ]
    },
    montage: {
        title: { nl: "Video Montage", en: "Video Editing" },
        subtitle: { nl: "Passie voor Automotive video's", en: "Passion for Automotive videos" },
        caption: { nl: "Mijn meest recente content creatie & Montage (2026)", en: "My Most Recent Content Creation & Editing (2026)" },
        video: "assets/videos/Montage-Alive.mp4",
        items: [
            {
                title: { nl: "Cinematografische edits", en: "Cinematic edits" },
                desc: {
                    nl: "Met een diepgewortelde passie voor automotive combineer ik mijn creativiteit en technische vaardigheden in het monteren van dynamische video's van auto's en motoren. Wat begon als een hobby gedreven door puur plezier, is uitgegroeid tot een serieuze ambitie. Ik streef ernaar om elke unieke lijn en het karakter van een voertuig cinematografisch vast te leggen en te versterken in de montage.<br><br>Wanneer de kans zich voordoet, wil ik mijn kennis op dit vakgebied dolgraag verder uitbreiden en professioneel aan de slag gaan binnen deze sector. (Benieuwd naar de mogelijkheden of klaar voor een samenwerking? Neem contact op via de contactpagina!)",
                    en: "Driven by a deep-rooted passion for the automotive world, I combine creativity and technical skills to edit dynamic videos of cars and motorcycles. What started as a hobby fueled by pure enjoyment has evolved into a serious ambition. In the editing process, I strive to cinematically capture and enhance the unique lines and character of every vehicle.<br><br>Given the opportunity, I am highly motivated to expand my knowledge in this field and look forward to working professionally within the industry. (Curious about the possibilities or ready to collaborate? Get in touch via the contact page!)"
                }
            },
            {
                title: { nl: "Meer werk zoals dit:", en: "More work like this:" },
                desc: {
                    nl: "Bekijk <a href='https://www.instagram.com/tt_vr6/' target='_blank' style='color: var(--accent); text-decoration: underline;'> mijn Instagram</a> voor meer van mijn cinematografische edits en content creatie rondom auto's en motoren. Hier deel ik regelmatig nieuwe video's waarin ik mijn passie voor automotive combineer met mijn vaardigheden in videobewerking. Abonneer je om op de hoogte te blijven van mijn nieuwste creaties!",
                    en: "Check out <a href='https://www.instagram.com/tt_vr6/' target='_blank' style='color: var(--accent); text-decoration: underline;'> my Instagram</a> for more of my cinematic edits and content creation around cars and motorcycles. I regularly share new videos where I combine my passion for automotive with my video editing skills. Follow to stay updated on my latest creations!",
                }
            }
        ]
    },
    drawing: {
        title: { nl: "Tekenen", en: "Drawing" },
        subtitle: { nl: "Talent voor handwerk", en: "Talent for Handicraft" },
        caption: { nl: "Muurtekening \"Rossi\" (2026)", en: "Wall Drawing \"Rossi\" (2026)" },
        items: [
            {
                title: { nl: "Van Hobby tot Studie", en: "From Hobby to Study" },
                desc: {
                    nl: "Mijn passie voor tekenen heb ik al vanaf jongs af aan. Het begon als een leuke bezigheid, maar al snel merkte ik dat ik er echt talent voor had. Mijn tekeningen werden steeds beter en ik kreeg er steeds meer plezier in.<br><br>Helaas heb ik door mijn opleiding op het Gymnasium in Apeldoorn het tekenen naast mij gelaten, door het gebrek aan tijd dat ik overhad voor de hobby. Naast de velen schilderingen en schetsen die ik in rond tijd heb gemaakt, deed ik er niet veel meer mee, tot ik bij CMD terecht kon; mijn tekenkunsten kunnen tijdens projecten weer in de schijnwerkpers staan, en mijn passie voor het handwerk uit zich nu weer in mijn dagelijks leven. Zoals bijvoorbeeld te zien op de bovenstaande foto, Een motortekening van krijt gebaseerd op Valentino Rossi voor een familielid van mij die graag wilt motorrijden.<br><br>Geinterreseerd? Ik sta altijd open om meer werk te delen, of samen nieuwe dingen te maken, neem contact met mij op via de contact pagina!",
                    en: "My passion for drawing has been with me since I was young. It started as a fun activity, but I quickly realized that I had a real talent for it. My drawings improved over time, and I found increasing joy in the process.<br><br>Unfortunately, due to my studies at the Gymnasium in Apeldoorn, I had to set aside drawing because of the lack of time available for the hobby. Despite creating many paintings and sketches during that period, I didn't pursue it much further until I joined CMD; now my drawing skills can shine through in projects, and my passion for handicraft is once again a part of my daily life. As seen in the photo above, a chalk drawing of Valentino Rossi for a family member who loves motorcycling.<br><br>Interested? I'm always open to sharing more work or collaborating on new projects. Feel free to reach out via the contact page!"
                }
            }
        ]
    },
    cooking: {
        title: { nl: "Desing op een bord", en: "Design on a Plate" },
        subtitle: { nl: "Culinair ontwerpen", en: "Culinary Design" },
        caption: { nl: "Gerechten uit mijn keuken (2024)", en: "Dishes from My Kitchen (2024)" },
        items: [
            {
                title: { nl: "Het Bord als Canvas", en: "The Plate as Canvas" },
                desc: {
                    nl: "Sinds mijn eerste bijbaan in de horeca ben ik bezig met het bereiden en presenteren van bijzondere gerechten, eerst al keukenhulp, en nu na 2 jaar fulltime werkervaring zelfs als supervisor zelfstandig werkend kok. Op mijn werk ben ik vooral bezig met koken en leidinggeven, maar het leukste van mijn baan vind ik het presenteren van mijn werk.<br><br>Ieder gerecht is als een leef canvas, die ik zelf mag invullen. Het \"platen\" is voor mij echt het belangrijkste van het vak, en waar ik mijn meeste aandacht in steek. \"Waar ligt wat\" , \"hoeveel saus\" en \"welke kleurcombinatie\" zijn allemaal dingen waar ik over nadenk bij het presenteren van mijn gerechten. Het is een kunst op zich, en ik ben er trots op dat ik dit kan doen.",
                    en: "Since my first part-time job in the hospitality industry, I have been involved in preparing and presenting special dishes, starting as a kitchen helper and now as a supervisor working independently as a chef. At my job, I am mainly focused on cooking and management, but the most enjoyable aspect of my work is presenting my creations.<br><br>Each dish is like a living canvas that I can fill with my own touch. The \"plating\" is for me truly the most important part of the job, and where I put most of my attention. \"Where to place what\" , \"how much sauce\" and \"which color combination\" are all things I consider when presenting my dishes. It's an art in itself, and I'm proud that I can do this."
                }
            }
        ]
    },
    firstmontage: {
        title: { nl: "Waar Montage Begon", en: "Where Editing Began" },
        subtitle: { nl: "Griekenland Excursie Video", en: "Greece Excursion Video" },
        caption: { nl: "Mijn eerste grote succesvolle montage (2022)", en: "My First Major Successful Edit (2022)" },
        video: "assets/videos/Montage-Greece.mp4",
        items: [
            {
                title: { nl: "Montage in de kinderschoenen", en: "Editing in its early stages" },
        desc: {
        nl: "Tijdens mijn opleiding op het Gymnasium ben ik in het vijfde jaar naar Griekenland geweest als cultuurreis. Samen met mijn klasgenoten hebben we een indrukwekkende rondreis gemaakt langs de Peloponnesos en alle historische bezienswaardigheden die deze regio te bieden heeft.<br><br>Na afloop heb ik het op mij genomen om vanuit een hobby alle gemaakte foto’s en video's te monteren op een leuk muziekje. Dit was een klus waar ik destijds uren mee bezig ben geweest, omdat ik nog geen enkele ervaring had met filmmontage.<br><br>Maar met succes: na het eigen maken van CapCut, iMovie en het nauwkeurig timen van de beelden, had ik een prachtige video gecreëerd die tot op de dag van vandaag trots op de officiële Instagram-pagina van mijn middelbare school staat. Met deze basisskills op zak en de geweldige reacties van docenten en klasgenoten, werd hier het fundament gelegd voor mijn passie voor montage — ook buiten de automotive sector.",
        en: "During my high school education at the Gymnasium, I went on a cultural trip to Greece in my fifth year. Together with my classmates, we went on an impressive road trip across the Peloponnese, exploring all the historic landmarks the region has to offer.<br><br>Afterwards, driven by personal interest, I took it upon myself to edit all the photos and footage we took into a fun video set to music. This was a project that took me hours at the time, as I had absolutely no prior experience with video editing.<br><br>It turned out to be a great success: after teaching myself CapCut and iMovie and meticulously timing the visuals, I created a beautiful video that is still proudly featured on my high school's official Instagram page to this day. Having acquired these foundational skills and receiving amazing feedback, this project laid the groundwork for my passion for editing—even beyond automotive content."
    }
            },
            {
                title: { nl: "Meer werk zoals dit:", en: "More Work Like This:" },
                desc: {
                    nl: "Bekijk <a href='https://www.instagram.com/tt_vr6/' target='_blank' style='color: var(--accent); text-decoration: underline;'> mijn Instagram</a> voor meer van mijn cinematografische edits en content creatie rondom auto's en motoren. Hier deel ik regelmatig nieuwe video's waarin ik mijn passie voor automotive combineer met mijn vaardigheden in videobewerking. Abonneer je om op de hoogte te blijven van mijn nieuwste creaties!",
                    en: "Check out <a href='https://www.instagram.com/tt_vr6/' target='_blank' style='color: var(--accent); text-decoration: underline;'> my Instagram</a> for more of my cinematic edits and content creation around cars and motorcycles. I regularly share new videos where I combine my passion for automotive with my video editing skills. Follow to stay updated on my latest creations!",
                }
            }   
        ]
    },
    _: {
        title: { nl: "Een lege stoel", en: "An empty seat" },
        subtitle: { nl: "carpoolen?", en: "Need a ride?" },
        caption: { nl: "Plek voor de toekomst", en: "Space for the Future" },
        items: [
            {
    title: { 
        nl: "Samenwerken?", 
        en: "Let's Collaborate" 
    },
    desc: {
        nl: "Zoals misschien te zien is, heb ik nog een stoeltje vrij om deze tegel samen op te vullen met mooie projecten. Op mijn contactpagina vind je alles over mijn beschikbaarheid en hoe jij mij kunt bereiken voor meer informatie, of om te overleggen over projecten!<br><br><strong>\"Zie ik je zo?\"</strong>",
        en: "As you might notice, I still have a seat available to fill this section with beautiful collaborative projects. On my contact page, you will find all the details regarding my availability and how to reach out for more information or to discuss potential projects!<br><br><strong>\"See you there?\"</strong>"
    }
}
        ]
    },
};

// ========== Projecten Zijpaneel & Interactie Logica ==========
document.addEventListener('DOMContentLoaded', () => {
    const sideTitle = document.getElementById('side-title');
    const sideImage = document.getElementById('side-image');
    const sideVideo = document.getElementById('side-video');
    const sideSubProjects = document.getElementById('side-sub-projects');
    const sideInner = document.getElementById('side-project-info');
    const projectDiamonds = document.querySelectorAll('.project-diamond-wrapper');
    const sideContentWrapper = document.getElementById('side-content-wrapper');

    function updateSideContent(category) {
        const lang = getCurrentLang();
        const data = projectData[category];

        if (!data) {
            console.warn(`Geen data gevonden voor categorie: ${category}`);
            return;
        }
        // NIEUW: Verberg de initiële gecentreerde titel volledig bij selectie!
        const initialTitleWrapper = document.getElementById('initial-title-wrapper');
        if (initialTitleWrapper) {
            initialTitleWrapper.style.display = 'none';
        }
        // Maak de content-wrapper pas zichtbaar zodra er geklikt is!
        if (sideContentWrapper) {
            sideContentWrapper.style.display = 'block';
        }

        // Trigger de CSS fade-in animatie
        if (sideInner) {
            sideInner.style.animation = 'none';
            sideInner.offsetHeight; /* trigger reflow */
            sideInner.style.animation = 'fadeInSide 0.4s ease forwards';
        }

        // 1. Vul de hoofdtitel
        if (sideTitle) {
            sideTitle.textContent = data.title[lang] || data.title['nl'];
        }

        // 2. Vul de subtitel
        const sideSubtitle = document.getElementById('side-subtitle');
        if (sideSubtitle) {
            sideSubtitle.textContent = data.subtitle ? data.subtitle[lang] : "";
        }

        // 3. Vul het bijschrift (caption)
        const sideCaption = document.getElementById('side-caption');
        if (sideCaption) {
            sideCaption.textContent = data.caption ? data.caption[lang] : "";
        }

        // 4. Haal media op (Video of Afbeelding)
        const imageWrapper = document.querySelector('.side-image-wrapper');
        const videoControls = document.getElementById('video-controls');
        const playPauseBtn = document.getElementById('video-play-pause');
        const muteBtn = document.getElementById('video-mute');

        let videoSrc = data.video;
        if (videoSrc) {
            videoSrc = videoSrc.replace(/^(\.\.\/)+/, ''); // Automatische cleaning van ../ paths
        }

        if (videoSrc) {
            if (imageWrapper) imageWrapper.classList.add('has-video');
            if (videoControls) videoControls.style.display = 'flex';

            if (sideVideo) {
                // Alleen de src aanpassen en loaden als de video ECHT verandert (voorkomt herstart bij taalwissel)
                if (sideVideo.getAttribute('src') !== videoSrc) {
                    sideVideo.src = videoSrc;
                    sideVideo.muted = true;
                    sideVideo.play().catch(err => console.log("Video afspelen mislukt:", err));
                }

                // Knoppen synchroniseren met video state
                if (playPauseBtn) {
                    if (sideVideo.paused) {
                        playPauseBtn.querySelector('.play-icon').style.display = 'inline';
                        playPauseBtn.querySelector('.pause-icon').style.display = 'none';
                    } else {
                        playPauseBtn.querySelector('.play-icon').style.display = 'none';
                        playPauseBtn.querySelector('.pause-icon').style.display = 'inline';
                    }
                }
                if (muteBtn) {
                    if (sideVideo.muted) {
                        muteBtn.querySelector('.mute-icon').style.display = 'inline';
                        muteBtn.querySelector('.unmute-icon').style.display = 'none';
                    } else {
                        muteBtn.querySelector('.mute-icon').style.display = 'none';
                        muteBtn.querySelector('.unmute-icon').style.display = 'inline';
                    }
                }
            }
            if (sideImage) sideImage.style.display = 'none';
            if (sideVideo) sideVideo.style.display = 'block';
        } else {
            // Afbeeldingen modus
            if (imageWrapper) imageWrapper.classList.remove('has-video');
            if (videoControls) videoControls.style.display = 'none';

            if (sideVideo) {
                sideVideo.style.display = 'none';
                sideVideo.src = "";
            }
            if (sideImage) {
                let imgUrl = data.image;
                if (!imgUrl) {
                    const activeDiamond = document.querySelector(`[data-category="${category}"].active .project-diamond`);
                    if (activeDiamond) {
                        const bgUrl = window.getComputedStyle(activeDiamond).backgroundImage;
                        if (bgUrl && bgUrl !== 'none') {
                            imgUrl = bgUrl.replace(/^url\(['"](.+)['"]\)$/, '$1');
                        }
                    }
                }
                if (imgUrl) {
                    sideImage.src = imgUrl;
                    sideImage.style.display = 'block';
                }
            }
        }

        // 5. Bouw de subprojecten kaarten op
        if (sideSubProjects) {
            sideSubProjects.innerHTML = '';

            if (data.items && Array.isArray(data.items)) {
                data.items.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'sub-project-card';
                    card.innerHTML = `
                        <h4>${item.title[lang] || item.title['nl']}</h4>
                        <p>${item.desc[lang] || item.desc['nl']}</p>
                    `;
                    sideSubProjects.appendChild(card);
                });
            }
        }
    }

    // Voeg de klik-events toe aan de ruiten
    projectDiamonds.forEach(diamond => {
        diamond.addEventListener('click', function () {
            document.querySelector('.project-diamond-wrapper.active')?.classList.remove('active');
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            updateSideContent(category);
        });
    });

    // ========== LANGUAGE SWITCHER LOGIC ==========
    const langButtons = document.querySelectorAll('.lang-diamond');

    langButtons.forEach(button => {
        button.addEventListener('click', function () {
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const selectedLang = this.getAttribute('data-lang');

            if (selectedLang === 'en') {
                document.body.classList.remove('lang-nl');
                document.body.classList.add('lang-en');
            } else {
                document.body.classList.remove('lang-en');
                document.body.classList.add('lang-nl');
            }

            localStorage.setItem('preferredLanguage', selectedLang);

            // Live vertaling: update direct de actieve categorie zonder de video te herstarten
            const activeDiamond = document.querySelector('.project-diamond-wrapper.active');
            if (activeDiamond) {
                const currentCategory = activeDiamond.getAttribute('data-category');
                updateSideContent(currentCategory);
            }
        });
    });

    // Laad voorkeurstaal in bij opstarten
    const savedLang = localStorage.getItem('preferredLanguage') || 'nl';
    const activeBtn = document.querySelector(`.lang-diamond[data-lang="${savedLang}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        if (savedLang === 'en') {
            document.body.classList.add('lang-en');
        } else {
            document.body.classList.add('lang-nl');
        }
    }

    // ========== Custom Video Controls Klik-Events ==========
    const mainVideo = document.getElementById('side-video');
    const mainPlayPauseBtn = document.getElementById('video-play-pause');
    const mainMuteBtn = document.getElementById('video-mute');

    if (mainPlayPauseBtn && mainVideo) {
        mainPlayPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const playIcon = mainPlayPauseBtn.querySelector('.play-icon');
            const pauseIcon = mainPlayPauseBtn.querySelector('.pause-icon');

            if (mainVideo.paused) {
                mainVideo.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'inline';
            } else {
                mainVideo.pause();
                playIcon.style.display = 'inline';
                pauseIcon.style.display = 'none';
            }
        });
    }

    if (mainMuteBtn && mainVideo) {
        mainMuteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const muteIcon = mainMuteBtn.querySelector('.mute-icon');
            const unmuteIcon = mainMuteBtn.querySelector('.unmute-icon');

            if (mainVideo.muted) {
                mainVideo.muted = false;
                muteIcon.style.display = 'none';
                unmuteIcon.style.display = 'inline';
            } else {
                mainVideo.muted = true;
                muteIcon.style.display = 'inline';
                unmuteIcon.style.display = 'none';
            }
        });
    }

    // ========== Intersection Observer: Automatisch muten buiten Projects ==========
    const projectsSection = document.getElementById('projects');
    if (projectsSection && mainVideo) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    mainVideo.muted = true;

                    const muteIcon = mainMuteBtn?.querySelector('.mute-icon');
                    const unmuteIcon = mainMuteBtn?.querySelector('.unmute-icon');
                    if (muteIcon && unmuteIcon) {
                        muteIcon.style.display = 'inline';
                        unmuteIcon.style.display = 'none';
                    }
                }
            });
        }, { threshold: 0.1 });

        observer.observe(projectsSection);
    }
    // ========== COPY TO CLIPBOARD LOGIC ==========
    const copyButtons = document.querySelectorAll('.copy-trigger');

    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            const textSpan = this.querySelector('.copy-text');
            const originalText = textSpan.textContent;
            const lang = getCurrentLang();

            // Kopieer de tekst naar het klembord via de Clipboard API
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Voeg tijdelijk de feedback class toe
                this.classList.add('copied');
                
                // Toon feedbacktekst op basis van de taal
                textSpan.textContent = lang === 'en' ? 'COPIED!' : 'GEKOPIEERD!';

                // Herstel de originele text na 1.5 seconde
                setTimeout(() => {
                    textSpan.textContent = originalText;
                    this.classList.remove('copied');
                }, 1500);
            }).catch(err => {
                console.error('Kopiëren mislukt: ', err);
            });
        });
    });
    // ========== DETECT CONTACT SECTION FOR FIXED FOOTER ==========
    const contactSection = document.getElementById('contact');
    
    if (contactSection) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Als contact in beeld is, activeer de fixed variant
                    document.body.classList.add('contact-active');
                } else {
                    // Als je weer omhoog scrollt, wordt de footer weer normaal
                    document.body.classList.remove('contact-active');
                }
            });
        }, { 
            // Hij triggert zodra er minimaal 20% van de contactpagina in beeld is
            threshold: 0.2 
        });

        footerObserver.observe(contactSection);
    }
});