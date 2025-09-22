// --- CONFIGURATION ---
// IMPORTANT: Replace with your public GitHub repository path
// The repository must have releases with titles formatted as: "Artist Name // YYYY-MM-DD"
const GITHUB_REPO = 'tech-creative-cat/example-assets';

// --- DOM ELEMENTS ---
const showsList = document.getElementById('shows-list');
const upcomingShowsSection = document.getElementById('upcoming-shows');

// --- HELPER FUNCTIONS ---

/**
 * A simple Markdown parser. For this project, it just handles links.
 * @param {string} text - The Markdown text.
 * @returns {string} - The HTML representation.
 */
function parseMarkdown(text) {
    // Convert [link text](URL) to <a href="URL">link text</a>
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    return text.replace(linkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

/**
 * Formats a Date object into a more readable string (e.g., "Oct 26").
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted date string.
 */
function formatDate(date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}


// --- MAIN LOGIC ---

/**
 * Fetches, processes, and renders the upcoming shows.
 */
async function loadShows() {
    if (!showsList) return;

    showsList.innerHTML = '<p>Loading shows...</p>';

    try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases`);

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const releases = await response.json();

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of today for accurate comparison

        const upcomingShows = releases
            .map(release => {
                const parts = release.name.split('//');
                if (parts.length !== 2) return null;

                const artist = parts[0].trim();
                const dateStr = parts[1].trim();
                const eventDate = new Date(dateStr);

                // Adjust for timezone offset to treat date as UTC
                const timezoneOffset = eventDate.getTimezoneOffset() * 60000;
                const utcDate = new Date(eventDate.getTime() + timezoneOffset);


                return {
                    artist: artist,
                    date: utcDate,
                    details: release.body || 'No additional details provided.',
                    url: release.html_url
                };
            })
            .filter(show => show && show.date >= today)
            .sort((a, b) => a.date - b.date);

        renderShows(upcomingShows);

    } catch (error) {
        console.error('Failed to load shows:', error);
        showsList.innerHTML = '<p>Could not load shows. Please check the repository configuration.</p>';
    }
}

/**
 * Renders the list of shows into the DOM.
 * @param {Array} shows - An array of show objects.
 */
function renderShows(shows) {
    showsList.innerHTML = ''; // Clear loading message

    if (shows.length === 0) {
        showsList.innerHTML = '<p>No upcoming shows at the moment. Check back soon!</p>';
        return;
    }

    shows.forEach(show => {
        const listItem = document.createElement('li');
        listItem.className = 'show-item';

        const dateEl = document.createElement('div');
        dateEl.className = 'show-date';
        dateEl.textContent = formatDate(show.date);

        const artistEl = document.createElement('div');
        artistEl.className = 'show-artist';
        artistEl.textContent = show.artist;

        const infoBtn = document.createElement('a');
        infoBtn.className = 'show-info-btn';
        infoBtn.href = show.url;
        infoBtn.textContent = 'More Info';
        infoBtn.target = '_blank'; // Open in new tab

        listItem.appendChild(dateEl);
        listItem.appendChild(artistEl);
        listItem.appendChild(infoBtn);

        showsList.appendChild(listItem);
    });
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', loadShows);
