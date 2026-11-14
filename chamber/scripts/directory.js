
const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

// Fetch business members from JSON
async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load member information.");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error("Error:", error);
        membersContainer.innerHTML =
            "<p>Sorry, business information could not be loaded.</p>";
    }
}

// Display members on the page
function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");
        card.classList.add("member-card");

        const membershipName = {
            1: "Member",
            2: "Silver",
            3: "Gold"
        };

        card.innerHTML = `
            <img src="images/${member.image}"
                 alt="${member.name}"
                 loading="lazy">

            <div class="member-details">
                <h3>${member.name}</h3>
                <p>${member.description}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Membership:</strong>
                    ${membershipName[member.membership]}
                </p>
                <a href="${member.website}"
                   target="_blank"
                   rel="noopener noreferrer">
                   Visit Website
                </a>
            </div>
        `;

        membersContainer.appendChild(card);
    });
}

// Grid view
gridButton.addEventListener("click", () => {
    membersContainer.classList.add("member-grid");
    membersContainer.classList.remove("member-list");

    gridButton.classList.add("active");
    listButton.classList.remove("active");
});

// List view
listButton.addEventListener("click", () => {
    membersContainer.classList.add("member-list");
    membersContainer.classList.remove("member-grid");

    listButton.classList.add("active");
    gridButton.classList.remove("active");
});

// Mobile navigation
menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
});

// Footer copyright year
document.querySelector("#current-year").textContent =
    new Date().getFullYear();

// Footer last modification date
document.querySelector("#last-modified").textContent =
    document.lastModified;

// Start loading members
getMembers();
