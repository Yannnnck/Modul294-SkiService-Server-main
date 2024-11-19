document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const priority = document.getElementById("priority").value;
    const service = document.getElementById("service").value;

    // Einfache Validierung für Telefonnummer und E-Mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{10,}$/;

    if (!emailRegex.test(email)) {
        alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        return;
    }
    if (!phoneRegex.test(phone)) {
        alert("Bitte geben Sie eine gültige Telefonnummer ein.");
        return;
    }

    // Daten an die API senden
    const registrationData = {
        name: name,
        email: email,
        phone: phone,
        priority: priority,
        service: service,
        create_date: new Date().toISOString(),
        pickup_date: calculatePickupDate(priority) // Berechnung des Abholdatums
    };

    fetch("https://ski-service.netlify.app/api/registration", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registrationData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Anmeldung erfolgreich!");
        console.log(data);
    })
    .catch(error => console.error("Fehler:", error));
});

// Berechnung des Abholdatums basierend auf der Priorität
function calculatePickupDate(priority) {
    let daysToAdd = 7;
    if (priority === "low") daysToAdd = 12;
    if (priority === "express") daysToAdd = 5;
    
    const pickupDate = new Date();
    pickupDate.setDate(pickupDate.getDate() + daysToAdd);
    return pickupDate.toISOString().split("T")[0];
}
