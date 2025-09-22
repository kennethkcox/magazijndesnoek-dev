// --- CONFIGURATION ---
// The app now loads data from mock-data.json by default.
// To switch back to GitHub releases, comment out the mock data fetch
// and uncomment the GITHUB_REPO and the original fetch call.
// const GITHUB_REPO = 'your-username/your-repo-name';

// --- DOM ELEMENTS ---
const showsList = document.getElementById('shows-list');
const upcomingShowsSection = document.getElementById('upcoming-shows');
const pastShowsList = document.getElementById('past-shows-list');
const modal = document.getElementById('show-modal');
const modalContent = document.getElementById('modal-body-content');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const aboutContent = document.getElementById('about-content');

// --- HELPER FUNCTIONS ---

/**
 * A simple Markdown parser. Handles H3, lists, and links.
 * @param {string} text - The Markdown text.
 * @returns {string} - The HTML representation.
 */
function parseMarkdown(text) {
    let html = text;
    // Convert ### headers to <h3>
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    // Convert * list items to <li>
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    // Wrap <li>s in a <ul>
    html = html.replace(/<li>.*<\/li>/gs, '<ul>$&</ul>');
    // Convert [link text](URL) to <a href="URL">link text</a>
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    return html;
}

/**
 * Opens the modal and populates it with show details.
 * @param {object} show - The show object.
 */
function openModal(show) {
    if (!modal || !modalContent) return;
    modalContent.innerHTML = parseMarkdown(show.body);
    modal.classList.remove('hidden');
}

/**
 * Closes the modal.
 */
function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
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
        // Fetch from local mock data file
        const response = await fetch('mock-data.json');

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        aboutContent.textContent = data.about; // Populate about section
        const releases = data.releases; // Extract the releases array

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of today for accurate comparison

        const allShows = releases.map(release => {
            const parts = release.name.split('//');
            if (parts.length !== 2) return null;

            const artist = parts[0].trim();
            const dateStr = parts[1].trim();
            const eventDate = new Date(dateStr);

            const timezoneOffset = eventDate.getTimezoneOffset() * 60000;
            const utcDate = new Date(eventDate.getTime() + timezoneOffset);

            return {
                artist: artist,
                date: utcDate,
                details: release.body || 'No additional details provided.',
                url: release.html_url
            };
        }).filter(show => show); // Filter out any nulls from parsing errors

        const upcomingShows = allShows
            .filter(show => show.date >= today)
            .sort((a, b) => a.date - b.date);

        const pastShows = allShows
            .filter(show => show.date < today)
            .sort((a, b) => b.date - a.date); // Sort past shows newest first

        renderShows(upcomingShows, showsList, 'No upcoming shows at the moment. Check back soon!');
        renderShows(pastShows, pastShowsList, 'No past shows in the archive yet.');

    } catch (error) {
        console.error('Failed to load shows:', error);
        showsList.innerHTML = '<p>Could not load shows. Please check the configuration.</p>';
    }
}

/**
 * Renders a list of shows into a target DOM element.
 * @param {Array} shows - An array of show objects.
 * @param {HTMLElement} targetElement - The <ul> element to render into.
 * @param {string} emptyMessage - Message to display if shows array is empty.
 */
function renderShows(shows, targetElement, emptyMessage) {
    if (!targetElement) return;
    targetElement.innerHTML = ''; // Clear loading/previous message

    if (shows.length === 0) {
        targetElement.innerHTML = `<p>${emptyMessage}</p>`;
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

        const infoBtn = document.createElement('button');
        infoBtn.className = 'show-info-btn';
        infoBtn.textContent = 'More Info';
        infoBtn.addEventListener('click', () => openModal(show));

        listItem.appendChild(dateEl);
        listItem.appendChild(artistEl);
        listItem.appendChild(infoBtn);

        targetElement.appendChild(listItem); // Correctly append to the target element
    });
}

// --- INITIALIZATION & EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', loadShows);
modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
