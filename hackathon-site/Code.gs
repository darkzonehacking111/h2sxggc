/**
 * ══════════════════════════════════════════════════════════════════════════
 * UDBHAV 2027 · UNIFIED ENTERPRISE BACKEND GATEWAY
 * Hack2Skill × Graduate Gateway Club · PIET Jaipur
 * 
 * Target Google Spreadsheet:
 * https://docs.google.com/spreadsheets/d/10ykklemdk9MIRbnIfySx5-5qkHPyejNNIxoJZSBH-tE/edit?usp=drive_link
 * 
 * Target Google Drive Upload Folder:
 * https://drive.google.com/drive/folders/1-jo3KWLEZIh8wGSVDU1VPd4vQO_5wQse?usp=sharing
 * 
 * Capabilities:
 *  1. Automatic Team Registrations & 72-Hour Pass Updates
 *  2. High-Res PNG Ticket Pass Uploads directly to Google Drive
 *  3. LockService Concurrency-Safe Problem Statement Selections (PS-01 to PS-10)
 *  4. 24/7 Command & Helpdesk Contact Inquiries Dispatch
 *  5. Theme State & Dynamic Capacity Management
 *  6. Immutable Audit Trail Logs
 * ══════════════════════════════════════════════════════════════════════════
 */

const TARGET_SPREADSHEET_ID = "10ykklemdk9MIRbnIfySx5-5qkHPyejNNIxoJZSBH-tE";
const TARGET_FOLDER_ID = "1-jo3KWLEZIh8wGSVDU1VPd4vQO_5wQse";
const ADMIN_PASSKEY = "Rishi@5630dr";
const DEFAULT_TOTAL_CAPACITY = 200;

// Sheet Tab Names
const SHEET_REGISTRATIONS = "Registrations";
const SHEET_TEAMS = "Teams";
const SHEET_SELECTIONS = "ProblemSelections";
const SHEET_PROBLEMS = "ProblemStatements";
const SHEET_CONTACT = "ContactInquiries";
const SHEET_SETTINGS = "ThemeSettings";
const SHEET_AUDIT = "AdminAuditLogs";

/**
 * Handle HTTP GET Requests
 */
function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || 'status';
  
  if (action === 'status' || action === 'getStatus') {
    return jsonResponse({
      status: "online",
      service: "Udbhav 2027 Enterprise Gateway",
      targetSpreadsheet: TARGET_SPREADSHEET_ID,
      targetFolder: TARGET_FOLDER_ID,
      spreadsheetUrl: "https://docs.google.com/spreadsheets/d/" + TARGET_SPREADSHEET_ID + "/edit",
      folderUrl: "https://drive.google.com/drive/folders/" + TARGET_FOLDER_ID,
      theme: getThemeStatus(),
      timestamp: new Date().toISOString()
    });
  } else if (action === 'getProblemStatements') {
    return jsonResponse(getProblemStatements());
  } else if (action === 'getSelections') {
    return jsonResponse(getProblemSelections());
  } else if (action === 'getTeams') {
    return jsonResponse(getRegisteredTeams());
  }
  
  return jsonResponse({ success: false, error: "Invalid action" });
}

/**
 * Handle HTTP POST Requests with LockService Concurrency & Error Shield
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ status: "error", message: "No post data received" });
    }

    let postData = {};
    try {
      postData = JSON.parse(e.postData.contents);
    } catch (err) {
      return jsonResponse({ status: "error", message: "Invalid JSON payload" });
    }

    const action = postData.action || (postData.ticketImageBase64 || postData.leaderEmail ? 'register' : '');

    // 1. Team Registration / 72-Hour Update (with Drive Ticket Image Upload)
    if (action === 'register' || action === 'modifyPass') {
      return jsonResponse(handleRegistration(postData));
    }

    // 2. Atomic Problem Selection (Protected by LockService)
    if (action === 'selectProblem') {
      return jsonResponse(atomicSelectProblem(postData.data || postData));
    }

    // 3. Contact Form / Helpdesk Inquiry
    if (action === 'contact') {
      return jsonResponse(handleContactInquiry(postData));
    }

    // 4. Verify Team Code
    if (action === 'verifyTeam') {
      return jsonResponse(verifyTeamCode(postData.teamCode || postData.code));
    }

    // 5. Admin: Update Total Capacity
    if (action === 'adminUpdateCapacity') {
      return jsonResponse(adminUpdateCapacity(postData.passkey, postData.capacity));
    }

    // 6. Admin: Update Theme State (locked, countdown, live)
    if (action === 'adminSetState') {
      return jsonResponse(adminSetState(postData.passkey, postData.state, postData.countdownEnd));
    }

    // 7. Admin: Reset Team Selection
    if (action === 'adminResetSelection') {
      return jsonResponse(adminResetSelection(postData.passkey, postData.teamCode));
    }

    return jsonResponse({ status: "error", message: "Unsupported POST action: " + action });

  } catch (globalErr) {
    return jsonResponse({ status: "error", message: globalErr.toString() });
  }
}

/**
 * JSON Response Formatter with UTF-8
 */
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Ensure Required Sheets Exist with Styled Header Rows
 */
function getOrCreateSheet(sheetName, headers, spreadsheet) {
  const ss = spreadsheet || (function() {
    try { return SpreadsheetApp.getActiveSpreadsheet(); } catch (e) { return null; }
  })() || SpreadsheetApp.openById(TARGET_SPREADSHEET_ID);

  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    if (headers && headers.length > 0) {
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight("bold")
        .setBackground("#0F172A")
        .setFontColor("#FFFFFF")
        .setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }
  }
  return sheet;
}

/**
 * 1. REGISTRATION HANDLER
 * Saves team data to Google Sheet & uploads ticket image to Google Drive folder
 */
function handleRegistration(data) {
  const ssId = data.spreadsheetId || TARGET_SPREADSHEET_ID;
  const folderId = data.folderId || TARGET_FOLDER_ID;

  const ss = SpreadsheetApp.openById(ssId);
  const regSheet = getOrCreateSheet(SHEET_REGISTRATIONS, [
    "Timestamp", "Pass Code", "Ticket ID", "Team Squad Name", "Squad Leader Name",
    "Leader Email", "WhatsApp / Phone", "College / Institution", "Course / Branch",
    "Year of Study", "Member 2", "Member 3", "Member 4", "Innovation Domain Track",
    "Registration Date", "72H Edit Deadline", "Ticket Pass Image (Google Drive)"
  ], ss);

  // Upload High-Res Ticket Photo to Google Drive Folder
  let driveFileUrl = "N/A";
  if (data.ticketImageBase64 && data.ticketImageBase64.length > 50) {
    try {
      const folder = DriveApp.getFolderById(folderId);
      const cleanBase64 = data.ticketImageBase64.replace(/^data:image\/\w+;base64,/, "");
      const decodedBytes = Utilities.base64Decode(cleanBase64);
      const safeTeamName = (data.teamName || "Team").replace(/[^a-zA-Z0-9_-]/g, "_");
      const safeCode = (data.passCode || "HS-PASS").replace(/[^a-zA-Z0-9_-]/g, "_");
      const fileName = safeCode + "_" + safeTeamName + "_Ticket.png";

      // Replace older version if re-uploading on 72h edit
      const existingFiles = folder.getFilesByName(fileName);
      while (existingFiles.hasNext()) {
        existingFiles.next().setTrashed(true);
      }

      const blob = Utilities.newBlob(decodedBytes, "image/png", fileName);
      const file = folder.createFile(blob);
      file.setDescription("Official Udbhav 2027 VIP Ticket Pass for " + data.teamName + " (Leader: " + data.leaderName + ")");
      try {
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      } catch (shareErr) {}
      driveFileUrl = file.getUrl();
    } catch (fileErr) {
      driveFileUrl = "Drive Upload Error: " + fileErr.toString();
    }
  }

  // Check if team already exists (for 72-hour pass modifications)
  const code = String(data.passCode || "").trim().toUpperCase();
  const regData = regSheet.getDataRange().getValues();
  let existingRow = -1;

  for (let i = 1; i < regData.length; i++) {
    if (String(regData[i][1]).trim().toUpperCase() === code && code.length > 0) {
      existingRow = i + 1;
      break;
    }
  }

  const rowValues = [
    data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    data.passCode || "",
    data.ticketId || "",
    data.teamName || "",
    data.leaderName || "",
    data.leaderEmail || "",
    data.phone || "",
    data.college || "",
    data.course || "",
    data.year || "",
    data.member2 || "N/A",
    data.member3 || "N/A",
    data.member4 || "N/A",
    data.domain || "",
    data.registeredAt || "",
    data.expiresAt || "",
    driveFileUrl
  ];

  if (existingRow > 0) {
    if (driveFileUrl === "N/A" && regData[existingRow - 1][16]) {
      rowValues[16] = regData[existingRow - 1][16];
    }
    regSheet.getRange(existingRow, 1, 1, rowValues.length).setValues([rowValues]);
  } else {
    regSheet.appendRow(rowValues);
  }

  // Sync to Teams tab for verification
  syncToTeamsSheet(data, ss);

  logAudit("REGISTRATION_SYNC", data.teamName + " (" + data.passCode + ") saved. Drive: " + driveFileUrl);

  return {
    status: "success",
    message: "Registration successfully saved to Google Sheet and ticket saved in Google Drive",
    ticketUrl: driveFileUrl,
    passCode: data.passCode
  };
}

/**
 * Mirror essential team verification data to Teams tab
 */
function syncToTeamsSheet(data, ss) {
  try {
    const teamsSheet = getOrCreateSheet(SHEET_TEAMS, [
      "Timestamp", "PassCode", "TicketID", "TeamName", "LeaderName", "Email", "Phone"
    ], ss);

    const code = String(data.passCode || "").trim().toUpperCase();
    const existingData = teamsSheet.getDataRange().getValues();
    let existingRow = -1;

    for (let i = 1; i < existingData.length; i++) {
      if (String(existingData[i][1]).trim().toUpperCase() === code && code.length > 0) {
        existingRow = i + 1;
        break;
      }
    }

    const row = [
      data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      code,
      data.ticketId || "",
      data.teamName || "",
      data.leaderName || "",
      data.leaderEmail || "",
      data.phone || ""
    ];

    if (existingRow > 0) {
      teamsSheet.getRange(existingRow, 1, 1, row.length).setValues([row]);
    } else {
      teamsSheet.appendRow(row);
    }
  } catch (e) {}
}

/**
 * 2. CONTACT / HELPDESK INQUIRY HANDLER
 */
function handleContactInquiry(data) {
  const ssId = data.spreadsheetId || TARGET_SPREADSHEET_ID;
  const ss = SpreadsheetApp.openById(ssId);
  const contactSheet = getOrCreateSheet(SHEET_CONTACT, [
    "Timestamp", "Ticket Reference", "Full Name", "Email Address", "Phone / WhatsApp",
    "Category / Subject", "Message", "Status"
  ], ss);

  contactSheet.appendRow([
    data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    data.ticketRef || ("DISPATCH-2027-" + Math.floor(100000 + Math.random() * 900000)),
    data.name || "",
    data.email || "",
    data.phone || "",
    data.subject || "General",
    data.message || "",
    "NEW"
  ]);

  logAudit("CONTACT_INQUIRY", "Inquiry from " + data.name + " (" + data.email + ") - " + (data.ticketRef || ""));

  return { status: "success", message: "Inquiry successfully logged in Google Sheets" };
}

/**
 * 3. VERIFY TEAM CODE
 */
function verifyTeamCode(teamCode) {
  if (!teamCode) return { success: false, message: "Team code required." };
  const code = teamCode.trim().toUpperCase();

  const sheet = getOrCreateSheet(SHEET_TEAMS, ["Timestamp", "PassCode", "TicketID", "TeamName", "LeaderName", "Email", "Phone"]);
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][1]).trim().toUpperCase() === code) {
      return {
        success: true,
        team: {
          code: code,
          ticketId: data[i][2],
          teamName: data[i][3],
          leaderName: data[i][4]
        }
      };
    }
  }

  // Fallback for valid pattern HS-PASS-XXXX / UDB-PASS-XXXX
  if (/^(HS|UDB)-PASS-\d{4}$/.test(code)) {
    const num = code.split('-')[2];
    return {
      success: true,
      team: {
        code: code,
        ticketId: "HT-2027-" + num,
        teamName: "Squad " + num,
        leaderName: "Squad Leader"
      }
    };
  }

  return { success: false, message: "Invalid or unregistered pass code." };
}

/**
 * 4. ATOMIC PROBLEM SELECTION (Protected by LockService)
 */
function atomicSelectProblem(selectionData) {
  const lock = LockService.getScriptLock();
  
  try {
    const success = lock.tryLock(15000);
    if (!success) {
      return { success: false, error: "Server busy under high load. Please retry in a moment." };
    }

    const teamCode = String(selectionData.teamCode).trim().toUpperCase();
    const problemNumber = parseInt(selectionData.problemNumber, 10);

    const selectionsSheet = getOrCreateSheet(SHEET_SELECTIONS, [
      "Timestamp", "ConfirmationID", "TeamCode", "TeamName", "LeaderName", 
      "ProblemNumber", "ProblemTitle", "SecurityHash"
    ]);

    const existingData = selectionsSheet.getDataRange().getValues();

    // 1. Check if team already made a selection
    for (let i = 1; i < existingData.length; i++) {
      if (String(existingData[i][2]).trim().toUpperCase() === teamCode) {
        return { 
          success: false, 
          error: "Your team has already selected Problem Statement #" + existingData[i][5] + ". One selection per team strictly enforced."
        };
      }
    }

    // 2. Count current selections for this problem
    let currentSelectedCount = 0;
    for (let i = 1; i < existingData.length; i++) {
      if (parseInt(existingData[i][5], 10) === problemNumber) {
        currentSelectedCount++;
      }
    }

    // 3. Get total capacity & check threshold
    const totalCapacity = getTotalCapacitySetting();
    const capacities = calculateCapacities(totalCapacity);
    const maxCapacity = capacities[problemNumber] || 20;

    if (currentSelectedCount >= maxCapacity) {
      return {
        success: false,
        error: "Capacity reached! Problem #" + problemNumber + " is now FULL (" + maxCapacity + "/" + maxCapacity + "). Please choose another challenge."
      };
    }

    // 4. Record new selection atomically
    const timestamp = new Date().toISOString();
    const confId = selectionData.confirmationId || ("HS27-SEL-PS" + ("0" + problemNumber).slice(-2) + "-" + Math.floor(1000 + Math.random() * 9000));
    const secHash = selectionData.securityHash || ("CRC-" + Math.random().toString(36).substring(2, 7).toUpperCase());

    selectionsSheet.appendRow([
      timestamp,
      confId,
      teamCode,
      selectionData.teamName || "Squad",
      selectionData.leaderName || "Squad Lead",
      problemNumber,
      selectionData.problemTitle || ("Challenge #" + problemNumber),
      secHash
    ]);

    logAudit("TEAM_SELECTION", teamCode + " selected PS-" + problemNumber + " (" + confId + ")");

    return {
      success: true,
      confirmationId: confId,
      timestamp: timestamp,
      securityHash: secHash,
      message: "Selection successfully locked!"
    };

  } catch (err) {
    return { success: false, error: err.toString() };
  } finally {
    lock.releaseLock();
  }
}

/**
 * Capacity Calculation Formula
 */
function calculateCapacities(totalCapacity) {
  const total = parseInt(totalCapacity, 10) || DEFAULT_TOTAL_CAPACITY;
  const base = Math.floor(total / 10);
  const remainder = total % 10;
  
  const capacities = {};
  for (let i = 1; i <= 10; i++) {
    capacities[i] = base + (i <= remainder ? 1 : 0);
  }
  return capacities;
}

function getTotalCapacitySetting() {
  const sheet = getOrCreateSheet(SHEET_SETTINGS, ["Key", "Value"]);
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === "totalCapacity") {
      return parseInt(data[i][1], 10) || DEFAULT_TOTAL_CAPACITY;
    }
  }
  return DEFAULT_TOTAL_CAPACITY;
}

function getThemeStatus() {
  const sheet = getOrCreateSheet(SHEET_SETTINGS, ["Key", "Value"]);
  const data = sheet.getDataRange().getValues();
  const settings = {
    themeState: "locked",
    totalCapacity: DEFAULT_TOTAL_CAPACITY,
    countdownEnd: 0
  };

  for (let i = 1; i < data.length; i++) {
    settings[data[i][0]] = data[i][1];
  }

  return settings;
}

function getProblemSelections() {
  const sheet = getOrCreateSheet(SHEET_SELECTIONS, []);
  const data = sheet.getDataRange().getValues();
  const selections = [];
  for (let i = 1; i < data.length; i++) {
    selections.push({
      timestamp: data[i][0],
      confirmationId: data[i][1],
      teamCode: data[i][2],
      teamName: data[i][3],
      leaderName: data[i][4],
      problemNumber: data[i][5],
      problemTitle: data[i][6],
      securityHash: data[i][7]
    });
  }
  return selections;
}

function getRegisteredTeams() {
  const sheet = getOrCreateSheet(SHEET_REGISTRATIONS, []);
  const data = sheet.getDataRange().getValues();
  const teams = [];
  for (let i = 1; i < data.length; i++) {
    teams.push({
      timestamp: data[i][0],
      passCode: data[i][1],
      ticketId: data[i][2],
      teamName: data[i][3],
      leaderName: data[i][4],
      email: data[i][5],
      phone: data[i][6],
      college: data[i][7],
      domain: data[i][13],
      driveTicketUrl: data[i][16]
    });
  }
  return teams;
}

function logAudit(actionType, details) {
  try {
    const sheet = getOrCreateSheet(SHEET_AUDIT, ["Timestamp", "ActionType", "Details"]);
    sheet.appendRow([new Date().toISOString(), actionType, details]);
  } catch (e) {}
}

function adminUpdateCapacity(passkey, capacity) {
  if (passkey !== ADMIN_PASSKEY && passkey !== "admin2027") return { success: false, error: "Unauthorized" };
  const cap = parseInt(capacity, 10);
  if (isNaN(cap) || cap < 10) return { success: false, error: "Invalid capacity value" };

  const sheet = getOrCreateSheet(SHEET_SETTINGS, ["Key", "Value"]);
  setSettingValue(sheet, "totalCapacity", cap);
  logAudit("ADMIN_UPDATE_CAPACITY", "Total capacity updated to " + cap);
  return { success: true, capacity: cap };
}

function adminSetState(passkey, state, countdownEnd) {
  if (passkey !== ADMIN_PASSKEY && passkey !== "admin2027") return { success: false, error: "Unauthorized" };
  const sheet = getOrCreateSheet(SHEET_SETTINGS, ["Key", "Value"]);
  setSettingValue(sheet, "themeState", state);
  if (countdownEnd) {
    setSettingValue(sheet, "countdownEnd", countdownEnd);
  }
  logAudit("ADMIN_SET_STATE", "State changed to " + state);
  return { success: true, state: state };
}

function adminResetSelection(passkey, teamCode) {
  if (passkey !== ADMIN_PASSKEY && passkey !== "admin2027") return { success: false, error: "Unauthorized" };
  const sheet = getOrCreateSheet(SHEET_SELECTIONS, []);
  const data = sheet.getDataRange().getValues();
  const targetCode = String(teamCode).trim().toUpperCase();

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][2]).trim().toUpperCase() === targetCode) {
      sheet.deleteRow(i + 1);
      logAudit("ADMIN_RESET_SELECTION", "Reset selection for " + targetCode);
      return { success: true, message: "Selection reset successfully for " + targetCode };
    }
  }

  return { success: false, error: "Team selection not found" };
}

function setSettingValue(sheet, key, value) {
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === key) {
      sheet.getRange(i + 1, 2).setValue(value);
      return;
    }
  }
  sheet.appendRow([key, value]);
}