// Helper function to pad numbers with leading zeros
function padZero(value, length = 2) {
    return String(value).padStart(length, '0');
}

// Function to update the countdown every second
function updateCountdown() {
    // Get the current date and time
    const currDate = new Date();

    // Get the current year
    const currentYear = currDate.getFullYear();

    // Create the target date (last day of the current year, 31st December at 23:59:59)
    let targetDate = new Date(`${currentYear}-12-31T23:59:59`);

    // If the target date has passed, move the target to the next year
    if (currDate > targetDate) {
        targetDate.setFullYear(currentYear + 1); // Set the target date to next year's 31st Dec
    }

    // Calculate the difference in milliseconds
    let diff = targetDate - currDate;

    // Convert milliseconds into total seconds
    const totalSeconds = Math.floor(diff / 1000);

    // Calculate years, months, days, hours, minutes, and seconds
    const years = padZero(Math.floor(totalSeconds / (60 * 60 * 24 * 365)));
    const months = padZero(Math.floor((totalSeconds % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30.44)));
    const days = padZero(Math.floor((totalSeconds % (60 * 60 * 24 * 30.44)) / (60 * 60 * 24)));
    const hours = padZero(Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60)));
    const minutes = padZero(Math.floor((totalSeconds % (60 * 60)) / 60));
    const seconds = padZero(totalSeconds % 60);

    // Calculate the remaining milliseconds
    const remainingMilliseconds = diff % 1000;

    // Format milliseconds to always show 3 digits (with leading zeros if necessary)
    const formattedMilliseconds = String(remainingMilliseconds).padStart(3, '0');

    // Update the countdown in the DOM
    document.getElementById("year").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
    document.getElementById("ms").textContent = formattedMilliseconds;

    // Highlight months: 
    // Get the current month (0-based index: 0 = January, 11 = December)
    const monthsPassed = currDate.getMonth(); // Current month (0-11)
    const boxes = document.querySelectorAll('.box');

    // Reset all boxes to the default background color
    boxes.forEach((box) => {
        box.style.backgroundColor = '#212121'; // Default color for remaining months
    });

    // Highlight the completed months in green
    for (let i = 0; i < monthsPassed; i++) {
        boxes[i].style.backgroundColor = 'green'; // Green for completed months
    }

    // Optionally, you can change the color of the current (remaining) month to something else
    if (monthsPassed < 12) {
        boxes[monthsPassed].style.backgroundColor = '#e6e600'; // Highlight the current month (remaining month)
        boxes[monthsPassed].style.color = '#ff4500';
    }

    // For debugging/logging purposes, you can log the remaining months
    const remainingMonths = 12 - monthsPassed - 1;
    // console.log(`Remaining months: ${remainingMonths}`);
}

// Start the countdown immediately
updateCountdown();

// Update the countdown every second (1000 milliseconds)
const intervalID = setInterval(updateCountdown, 1000);

// Ensure the countdown is updated immediately after page load


// Function to get the username (checks localStorage for a saved name, otherwise prompts the user)
function getUsername() {
    // Check if username is stored in localStorage, otherwise prompt for it
    let username = localStorage.getItem('username');

    // If no username is saved, show a popup to ask for it
    if (!username) {
        username = prompt("Please enter your name:", "Guest");
        // Save the username in localStorage if it's provided
        if (username && username.trim() !== "") {
            localStorage.setItem('username', username.trim());
        } else {
            // If no name entered, set a default name
            username = "Guest";
        }
    }

    return username;
}

// Set the username dynamically in the h1 tag
const username = getUsername();
document.getElementById('username').textContent = `Hello, ${username}!`;
