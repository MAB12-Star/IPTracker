require('dotenv').config();

const search_form = document.querySelector(".header_form");

search_form.addEventListener("submit", (event) => {
    // Stop form from auto submitting on click
    event.preventDefault();

    // Get the value of the form field
    const value = document.querySelector("#search").value;
    console.log(value);
    // Pass the IP address to the search_Ip_Address() function
    search_Ip_Address(value);
});

// Search for an IP Address
async function search_Ip_Address(input) {
    const api_key = process.env.API_KEY;
    let url;

    // Check if the input is an IP address or domain
    if (isValidIpAddress(input)) {
        url = `https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=${input}`;
    } else {
        url = `https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&domain=${input}`;
    }

    const request = await fetch(url);
    const response = await request.json();

    const { location, ip, isp } = response;

    // Update the UI on the page
    update_ui(ip, location.city, location.timezone, isp);

    // Update the map on the page
    if (map !== undefined && map !== null) {
        map.remove();
    }
    create_map(location.lat, location.lng, location.country, location.region);
}

// Function to validate if the input is a valid IP address
function isValidIpAddress(ip) {
    const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
}


// Update UI function
function update_ui(ip_address, location, timezone, isp) {
    // Select all the elements on the page
    const address = document.querySelector(".address");
    const city = document.querySelector(".location");
    const utc = document.querySelector(".utc");
    const isprovider = document.querySelector(".isp");

    // Update all the elements on the page
    address.textContent = ip_address;
    city.textContent = location;
    utc.textContent = 'UTC ' + timezone;
    isprovider.textContent = isp;
}
