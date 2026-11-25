
// Get the submitted form information from the URL
const urlParams = new URLSearchParams(window.location.search);

// Function to display a submitted value
function displayValue(elementId, parameterName) {
  const element = document.getElementById(elementId);
  const value = urlParams.get(parameterName);

  if (element) {
    element.textContent = value && value.trim()
      ? value
      : "Not provided";
  }
}

// Display the applicant's information
displayValue("firstName", "firstName");
displayValue("lastName", "lastName");
displayValue("email", "email");
displayValue("phone", "phone");
displayValue("organization", "organization");
displayValue("timestamp", "timestamp");

// Display the membership level in a friendly format
const membership = urlParams.get("membershipLevel");

const membershipNames = {
  np: "Non-Profit Membership",
  bronze: "Bronze Membership",
  silver: "Silver Membership",
  gold: "Gold Membership"
};

const membershipElement = document.getElementById("membershipLevel");

if (membershipElement) {
  membershipElement.textContent =
    membershipNames[membership] || "Not provided";
}

// Display the current year in the footer
const currentYear = document.getElementById("currentyear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Display the page's last modified date
const lastModified = document.getElementById("lastModified");

if (lastModified) {
  lastModified.textContent =
    `Last Modified: ${document.lastModified}`;
}
