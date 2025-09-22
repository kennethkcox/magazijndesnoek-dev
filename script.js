document.addEventListener('DOMContentLoaded', () => {

    /**
     * ----------------------------------------------------------------
     * SETUP: WRAP TEXT ELEMENTS FOR KINETIC ANIMATIONS
     * ----------------------------------------------------------------
     * We wrap each character in a span to animate them individually.
     * This is a common technique for kinetic typography.
     */
    function wrapCharacters(selector) {
        document.querySelectorAll(selector).forEach(element => {
            element.innerHTML = element.textContent.trim().split('').map((char, i) =>
                `<span class="char" style="--i:${i}">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('');
        });
    }

    wrapCharacters('.venue-name');
    wrapCharacters('.section-title');


    /**
     * ----------------------------------------------------------------
     * FEATURE: CUSTOM CURSOR
     * ----------------------------------------------------------------
     * Moves a custom DOM element to follow the mouse and expands
     * on hover over interactive elements.
     */
    const cursor = document.querySelector('.cursor');
    const interactiveElements = document.querySelectorAll('a, #shows-list li, .venue-name');

    window.addEventListener('mousemove', e => {
        // Using transform is more performant than top/left
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
    });


    /**
     * ----------------------------------------------------------------
     * FEATURE: INTERACTIVE HERO TEXT
     * ----------------------------------------------------------------
     * Distorts the text based on mouse proximity to each character.
     * This creates a "magnetic" or "wobbly" effect.
     */
    const venueName = document.querySelector('.venue-name');
    if (venueName) {
        const chars = venueName.querySelectorAll('.char');
        venueName.addEventListener('mousemove', e => {
            const rect = venueName.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            chars.forEach(char => {
                const { left, top, width, height } = char.getBoundingClientRect();
                const charCenterX = (left - rect.left) + width / 2;
                const charCenterY = (top - rect.top) + height / 2;

                const dx = mouseX - charCenterX;
                const dy = mouseY - charCenterY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Max distance to affect the character
                const maxDist = 150;

                if (distance < maxDist) {
                    const force = 1 - (distance / maxDist);
                    const moveX = (dx / distance) * force * -10;
                    const moveY = (dy / distance) * force * -10;
                    char.style.transform = `translate(${moveX}px, ${moveY}px)`;
                } else {
                    char.style.transform = 'translate(0,0)';
                }
            });
        });

        venueName.addEventListener('mouseleave', () => {
             chars.forEach(char => {
                char.style.transform = 'translate(0,0)';
             });
        });
    }


    /**
     * ----------------------------------------------------------------
     * FEATURE: SCROLL-TRIGGERED ANIMATIONS
     * ----------------------------------------------------------------
     * Uses IntersectionObserver to add a 'is-visible' class to
     * elements when they enter the viewport, triggering CSS animations.
     */
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target;
                title.classList.add('is-visible');
                // Stagger the character animation
                title.querySelectorAll('.char').forEach((char, i) => {
                    char.style.transitionDelay = `${i * 0.03}s`;
                });
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });


    /**
     * ----------------------------------------------------------------
     * FEATURE: FETCH UPCOMING SHOWS FROM GITHUB RELEASES
     * ----------------------------------------------------------------
     * Fetches release data from a GitHub repo to dynamically populate
     * the "Upcoming Shows" list.
     */
    async function fetchUpcomingShows() {
        // --- IMPORTANT ---
        // Replace with your GitHub username and repository name.
        const githubOwner = 'The-Marquee';
        const githubRepo = 'marquee-shows';
        // -----------------

        const apiUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/releases`;
        const listElement = document.getElementById('shows-list');

        listElement.innerHTML = '<li>Loading shows...</li>';

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const releases = await response.json();

            listElement.innerHTML = ''; // Clear loading message

            if (releases.length === 0) {
                listElement.innerHTML = '<li>No upcoming shows announced.</li>';
                return;
            }

            releases.forEach(release => {
                // The release name should be in the format "Artist Name // YYYY-MM-DD"
                const showName = release.name || 'Unnamed Show';
                const listItem = document.createElement('li');
                listItem.textContent = showName;
                listElement.appendChild(listItem);
            });

            // Re-apply cursor listeners to the new list items
            listElement.querySelectorAll('li').forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
            });

        } catch (error) {
            console.error('Failed to fetch shows:', error);
            listElement.innerHTML = '<li>Could not load shows at this time.</li>';
        }
    }

    fetchUpcomingShows();

});
