# Ski-Service Server (Backend & Frontend)

Willkommen beim Ski-Service Server! Dieses Projekt ist eine Praxisarbeit und stellt sowohl das Backend als auch das Frontend für einen Ski-Service bereit.

## Voraussetzungen

Stellen Sie sicher, dass die folgenden Anforderungen erfüllt sind, bevor Sie mit der Installation beginnen:

- **Node.js** ist installiert
- **npm** (Node Package Manager) ist verfügbar

## Setup

### 1. Projekt initialisieren

Initialisieren Sie das Projekt mit den folgenden Befehlen:

```bash
npm init --y
```

### 2. Notwendige Abhängigkeiten installieren

Installieren Sie die benötigten Pakete:

- **Express** für den Webserver
- **dotenv** zur Verwaltung von Umgebungsvariablen
- **cors** zur Cross-Origin Resource Sharing-Unterstützung

```bash
npm install --save express dotenv cors
```

### 3. Entwicklungsabhängigkeiten installieren

Installieren Sie **Nodemon** für die automatische Serverneustarts während der Entwicklung:

```bash
npm install --save-dev nodemon
```

### 4. Swagger für API-Dokumentation

Installieren Sie Swagger, um Ihre API-Dokumentation bereitzustellen:

```bash
npm install swagger-ui-express -S
```

## Start des Servers

### 1. Produktionsstart

Um den Server zu starten, verwenden Sie:

```bash
npm start
```

### 2. Entwicklungsstart

Starten Sie den Server im Entwicklungsmodus (mit automatischen Neustarts):

```bash
npm run dev
```

## Struktur des Projekts

Hier ist eine Übersicht über die Projektstruktur:

```
Modul294-SkiService-Server/
├── css/               # CSS-Dateien für das Frontend
├── html/              # HTML-Seiten
├── js/                # JavaScript-Dateien für das Frontend
├── server/            # Backend-Server und API-Logik
│   ├── controllers/   # Controller-Logik für die API
│   ├── data/          # Daten (z. B. JSON-Dateien)
│   ├── models/        # Datenmodelle
│   ├── routes/        # API-Routen
│   └── server.js      # Einstiegspunkt für den Server
├── .env               # Umgebungsvariablen
├── package.json       # Projektkonfiguration und Abhängigkeiten
├── README.md          # Dokumentation des Projekts
└── swagger.json       # Swagger-Dokumentation für die API
```

## Zugriff auf die API-Dokumentation

Swagger wird verwendet, um die API-Dokumentation bereitzustellen. Nach dem Start des Servers können Sie die Dokumentation unter folgender URL aufrufen:

```
http://localhost:5000/api-docs
```

## Hinweis

**Wichtig:** Führen Sie dieses Projekt **nicht** in einem OneDrive-Ordner aus, da dies zu Problemen führen kann.

## Frontend-Zugriff

Das Frontend für den Ski-Service ist in diesem Projekt integriert. Nach dem Start des Servers können Sie das Frontend über folgende URL aufrufen:

```
http://localhost:5000
```
Starte es über den Live Server um die Webseite zu benutzen.

## Happy Coding 😊