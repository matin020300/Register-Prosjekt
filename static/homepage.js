// Grab elements
const nameInput = document.getElementById("nameInput");
const tableBody = document.getElementById("tableBody"); // fixed: use the tbody id from HTML
const presentCount = document.getElementById("presentCount");
const totalCount = document.getElementById("totalCount");

let currentlyPresent = 0;
let totalVisits = 0;

// Track who is currently present (case-insensitive)
const presentSet = new Set();

// Utility: formatted time
function formatTime() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

// Function to add a row to the table
function addRow(name, status) {
    const row = document.createElement("tr");

    const time = formatTime();

    row.innerHTML = `
        <td>${escapeHtml(name)}</td>
        <td>${time}</td>
        <td>
            <span class="${status === "Present" ? "status-present" : "status-left"}">
                ${status}
            </span>
        </td>
    `;

    tableBody.prepend(row); // add row at top of tbody
}

// Simple HTML-escape to avoid injection if names contain markup
function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// ARRIVING button
document.getElementById("arriveBtn").addEventListener("click", () => {
    const rawName = nameInput.value.trim();

    if (!rawName) {
        alert("Please enter a name.");
        return;
    }

    const key = rawName.toLowerCase();

    if (presentSet.has(key)) {
        alert(`${rawName} is already marked as present.`);
        nameInput.value = "";
        return;
    }

    presentSet.add(key);
    addRow(rawName, "Present");
    currentlyPresent++;
    totalVisits++;

    presentCount.textContent = currentlyPresent;
    totalCount.textContent = totalVisits;

    nameInput.value = "";
});

// LEAVING button
document.getElementById("leaveBtn").addEventListener("click", () => {
    const rawName = nameInput.value.trim();

    if (!rawName) {
        alert("Please enter a name.");
        return;
    }

    const key = rawName.toLowerCase();

    if (!presentSet.has(key)) {
        // If person wasn't marked present, still log the leaving event but don't decrement below zero.
        addRow(rawName, "Left");
        alert(`${rawName} was not marked as present.`);
    } else {
        presentSet.delete(key);
        addRow(rawName, "Left");
        currentlyPresent = Math.max(0, currentlyPresent - 1);
        presentCount.textContent = currentlyPresent;
    }

    nameInput.value = "";
});


