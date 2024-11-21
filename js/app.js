document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seitenreload)

    // Holen der Eingabewerte aus den Formularfeldern
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const name = `${firstName} ${lastName}`;
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const priority = document.getElementById("priority").value;

    // Holen des Hauptservices (Radio-Buttons)
    const serviceType = document.querySelector('input[name="serviceType"]:checked');
    if (!serviceType) {
        alert("Bitte wählen Sie einen Hauptservice aus (Kleiner oder Großer Service).");
        return;
    }

    // Holen der zusätzlichen Dienstleistungen (Checkboxen)
    const additionalServices = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map((checkbox) => checkbox.value);

    // Regulärer Ausdruck für die E-Mail-Validierung
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Regulärer Ausdruck für Telefonnummer im Format 081 581 92 35
    const phoneRegex = /^\d{3} \d{3} \d{2} \d{2}$/;

    // Validierung der E-Mail-Adresse
    if (!emailRegex.test(email)) {
        alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        return;
    }

    // Validierung der Telefonnummer
    if (!phoneRegex.test(phone)) {
        alert("Bitte geben Sie die Telefonnummer im Format 081 581 92 35 ein.");
        return;
    }

    // Zusammenfügen der Dienstleistungen (Hauptservice + zusätzliche Services)
    const allServices = [serviceType.value, ...additionalServices].join(", ");

    // Zusammenstellen der Anmeldedaten
    const registrationData = {
        id: Date.now(), // Beispielhafte ID basierend auf Zeitstempel
        name: name,
        email: email,
        phone: phone,
        priority: priority,
        service: allServices, // Alle Services als String zusammengefügt
        create_date: new Date().toISOString(),
        pickup_date: calculatePickupDate(priority),
    };

    // Senden der Daten an die API
    fetch("http://localhost:5000/api/registration", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData), // Daten in JSON umwandeln
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Fehler beim Speichern der Daten.");
            }
            return response.json();
        })
        .then((data) => {
            alert("Anmeldung erfolgreich!");
            console.log("Server-Antwort:", data);
        })
        .catch((error) => console.error("Fehler:", error));
});

// Funktion zur Berechnung des Abholdatums basierend auf der Priorität
function calculatePickupDate(priority) {
    let daysToAdd = 7;
    if (priority === "low") daysToAdd = 12;
    if (priority === "express") daysToAdd = 5;

    const pickupDate = new Date();
    pickupDate.setDate(pickupDate.getDate() + daysToAdd);
    return pickupDate.toISOString().split("T")[0];
}


// Event-Listener für die Telefonnummer-Eingabe
document.getElementById("phone").addEventListener("input", function(e) {
    const input = e.target; // Aktuelles Eingabefeld
    let value = input.value.replace(/\D/g, ''); // Entfernt alle Nicht-Zahlen
    const maxLength = 10; // Maximale Anzahl von Ziffern
    const cursorPosition = input.selectionStart; // Aktuelle Cursorposition
    const prevLength = input.dataset.prevLength || 0; // Vorherige Länge der Eingabe
    const isDeleting = value.length < prevLength; // Überprüfung, ob der Benutzer löscht

    // Beschränke die Eingabe auf maximal 10 Ziffern
    value = value.slice(0, maxLength);

    // Formatiere die Eingabe in Blöcke von 3 3 2 2
    let formattedValue = value
        .replace(/(\d{3})(\d{0,3})/, '$1 $2') // Fügt den ersten Abstand ein
        .replace(/(\d{3}) (\d{3})(\d{0,2})/, '$1 $2 $3') // Fügt den zweiten Abstand ein
        .replace(/(\d{3}) (\d{3}) (\d{2})(\d{0,2})/, '$1 $2 $3 $4'); // Fügt den dritten Abstand ein

    // Setze den formatierten Wert in das Eingabefeld
    input.value = formattedValue;

    // Korrigiere die Cursorposition, wenn Leerzeichen beim Löschen entstehen
    if (isDeleting && cursorPosition > 0 && formattedValue[cursorPosition - 1] === ' ') {
        input.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
    } else if (!isDeleting) {
        input.setSelectionRange(cursorPosition + (formattedValue.length - prevLength), cursorPosition + (formattedValue.length - prevLength));
    }

    // Speichere die aktuelle Länge der Eingabe
    input.dataset.prevLength = formattedValue.length;
});