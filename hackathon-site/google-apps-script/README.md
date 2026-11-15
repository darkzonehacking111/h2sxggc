# 🚀 Udbhav 2027 — Google Sheets & Google Drive Automatic Cloud Integration

All data across the entire Udbhav 2027 hackathon platform is now unified to automatically store on:
1. 📊 **Target Google Spreadsheet**: [Open Google Sheet](https://docs.google.com/spreadsheets/d/10ykklemdk9MIRbnIfySx5-5qkHPyejNNIxoJZSBH-tE/edit?usp=drive_link)
   - **Spreadsheet ID**: `10ykklemdk9MIRbnIfySx5-5qkHPyejNNIxoJZSBH-tE`
2. 📁 **Target Google Drive Folder**: [Open Ticket Uploads Folder](https://drive.google.com/drive/folders/1-jo3KWLEZIh8wGSVDU1VPd4vQO_5wQse?usp=sharing)
   - **Folder ID**: `1-jo3KWLEZIh8wGSVDU1VPd4vQO_5wQse`

---

## 📋 What Gets Stored Automatically

| Data Type | Target Destination | Details Saved |
| :--- | :--- | :--- |
| **Squad Registrations** | Sheet: `Registrations` | Timestamp, Pass Code (`HS-PASS-XXXX`), Ticket ID, Team Squad Name, Leader Name, Leader Email, Phone/WhatsApp, College/Institute, Course/Branch, Year, Members 2/3/4, Innovation Domain, Registration Time, 72-Hour Edit Deadline, and direct clickable **Google Drive Ticket Link**. |
| **High-Res Ticket PNGs** | Drive Folder: `1-jo3KWLEZIh8wGSVDU1VPd4vQO_5wQse` | Automated 1200×540px high-resolution PNG image of the official VIP Ticket Pass with holographic foil, QR verification matrix, and team roster. |
| **72-Hour Pass Modifications** | Sheet: `Registrations` & Drive Folder | Updates the existing team squad row in place without duplicates and uploads an updated ticket pass to the Google Drive folder. |
| **Problem Statement Selections** | Sheet: `ProblemSelections` | Concurrency-protected by `LockService`: Timestamp, Confirmation ID, Team Code, Team Name, Leader Name, Problem Statement # (PS-01 to PS-10), Problem Title, and Security CRC Hash. |
| **24/7 Command Inquiries** | Sheet: `ContactInquiries` | Timestamp, Ticket Reference (`DISPATCH-2027-XXXXXX`), Name, Email, Phone, Category/Subject, Message, and Status (`NEW`). |
| **Admin Audit Logs** | Sheet: `AdminAuditLogs` | Immutable record of all system events, capacity adjustments, and state changes. |

---

## ⚡ 2-Minute Deployment Guide

### Step 1: Open Apps Script in Your Google Sheet
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/10ykklemdk9MIRbnIfySx5-5qkHPyejNNIxoJZSBH-tE/edit
2. In the top Google Sheets menu bar, click **Extensions** ➔ **Apps Script**.

### Step 2: Paste the Unified Backend Code
1. Erase any default code in the editor (`function myFunction() { ... }`).
2. Open [`hackathon-site/Code.gs`](../Code.gs) (or [`hackathon-site/google-apps-script/Code.gs`](./Code.gs)).
3. Copy the entire file content and paste it into the Apps Script editor.
4. Click the **Save** disk icon (or press `Ctrl + S`).

### Step 3: Deploy as a Web App
1. At the top-right of the Apps Script editor, click **Deploy** ➔ **New deployment**.
2. Click the gear icon ⚙️ beside **Select type** and choose **Web app**.
3. Configure the settings:
   - **Description**: `Udbhav 2027 Cloud Gateway`
   - **Execute as**: `Me (your Google email)`
   - **Who has access**: `Anyone` *(Crucial: Allows attendee submissions without forcing a Google login)*
4. Click **Deploy**.
5. When prompted for authorization:
   - Click **Authorize access**.
   - Choose your Google account.
   - Click **Advanced** (at the bottom-left of the popup).
   - Click **Go to Untitled project (unsafe)**.
   - Click **Allow**.
6. Copy the generated **Web App URL** (format: `https://script.google.com/macros/s/AKfycb.../exec`).

### Step 4: Connect the Web App URL to the Site
You have two quick options:
- **Option A (Instant in Admin Portal / Theme Reveal)**:
  Open `index.html#theme` or `admin.html`, go to the **Cloud & Google Sheets** tab, paste the Web App URL into the **Apps Script Web App URL** input, and click **Save Endpoint**.
- **Option B (Direct in Code)**:
  Open `hackathon-site/script.js`, find line 951:
  ```javascript
  var GOOGLE_APPS_SCRIPT_WEBAPP_URL = "PASTE_YOUR_COPIED_URL_HERE";
  ```
  Paste your URL there and save.

---

## 🔒 Security & Privacy Guarantee
- The private Google Drive folder and Spreadsheet editing links are **never exposed to unauthorized public visitors**.
- Participants only view their own generated ticket pass on their screen.
- Concurrency control prevents race conditions during problem statement reservations when 200+ teams select simultaneously.
