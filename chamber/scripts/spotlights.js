
// Get the spotlight container
const spotlightContainer = document.querySelector("#spotlights-container");

// Convert membership number to membership level
function getMembershipLevel(level) {
    if (level === 3) return "Gold Member";
    if (level === 2) return "Silver Member";
    return "Bronze Member";
}

// Fetch chamber members
async function displaySpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load members.json");
        }

        const members = await response.json();

        // Select only Gold and Silver members
        const eligibleMembers = members.filter(member =>
            member.membership === 2 || member.membership === 3
        );

        // Shuffle members randomly
        const shuffledMembers = [...eligibleMembers];

        for (let i = shuffledMembers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [shuffledMembers[i], shuffledMembers[j]] =
                [shuffledMembers[j], shuffledMembers[i]];
        }

        // Randomly choose 2 or 3 members
        const numberToShow = Math.min(
            eligibleMembers.length,
            Math.floor(Math.random() * 2) + 2
        );

        const selectedMembers = shuffledMembers.slice(0, numberToShow);

        // Display spotlight cards
        spotlightContainer.innerHTML = selectedMembers.map(member => `
            <article class="spotlight-card">

                <img src="images/${member.image}"
                     alt="${member.name} logo"
                     loading="lazy">

                <h3>${member.name}</h3>

                <p>${member.description}</p>

                <p><strong>Phone:</strong>
                    <a href="tel:${member.phone}">
                        ${member.phone}
                    </a>
                </p>

                <p><strong>Address:</strong>
                    ${member.address}
                </p>

                <p><strong>Membership:</strong>
                    ${getMembershipLevel(member.membership)}
                </p>

                <a href="${member.website}"
                   target="_blank"
                   rel="noopener noreferrer">
                    Visit Website
                </a>

            </article>
        `).join("");

    } catch (error) {
        console.error("Spotlight error:", error);

        spotlightContainer.innerHTML =
            "<p>Business spotlights are currently unavailable.</p>";
    }
}

// Run the function
displaySpotlights();
