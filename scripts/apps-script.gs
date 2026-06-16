/**
 * Accountants.co.ke — lead & firm-claim capture webhook.
 *
 * Receives JSON POSTs from the site (firm claims + match leads), appends a row
 * to a Google Sheet, and emails a notification.
 *
 * FIRST-TIME SETUP
 *  1. Open your Google Sheet > Extensions > Apps Script. Delete the boilerplate,
 *     paste this whole file. Set NOTIFY_EMAIL below (SHEET_ID is optional when
 *     the script is bound to the sheet, which it is via Extensions > Apps Script).
 *  2. Run the `setup` function once (select "setup" in the toolbar dropdown,
 *     click Run). Authorise when prompted. This creates and styles the
 *     "Firm Claims" and "Leads" tabs.
 *  3. Deploy > New deployment > Web app.
 *       - Execute as: Me
 *       - Who has access: Anyone            <-- MUST be "Anyone"
 *     Deploy, authorise, copy the /exec URL.
 *  4. Paste the /exec URL into src/lib/sheet.ts (WEBHOOK_URL).
 *
 * Re-deploying after edits: Deploy > Manage deployments > Edit (pencil) >
 * Version: New version > Deploy. The /exec URL stays the same.
 */

// Optional: only needed if the script is NOT bound to the sheet. Leave as-is
// when you opened Apps Script from inside the sheet.
const SHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';
const NOTIFY_EMAIL = 'vchatwani@gmail.com';

// Brand palette (Slate Premium).
const COLORS = {
  ink: '#0E1116',
  teal: '#11A39A',
  gold: '#C9A24B',
  headerText: '#FFFFFF',
};

const TABS = {
  claim: {
    name: 'Firm Claims',
    tabColor: COLORS.teal,
    headers: [
      'Timestamp',
      'Firm',
      'Slug',
      'Claimant',
      'Role',
      'Email',
      'Phone',
      'Message',
    ],
    widths: [150, 220, 160, 160, 130, 220, 140, 340],
    row: function (d) {
      return [
        new Date(),
        d.firm_name || '',
        d.firm_slug || '',
        d.claimant_name || '',
        d.claimant_role || '',
        d.claimant_email || '',
        d.claimant_phone || '',
        d.message || '',
      ];
    },
    subject: function (d) {
      return 'New firm claim: ' + (d.firm_name || 'Unknown firm');
    },
  },
  contact: {
    name: 'Contact',
    tabColor: COLORS.ink,
    headers: ['Timestamp', 'Name', 'Email', 'Subject', 'Message'],
    widths: [150, 180, 220, 220, 360],
    row: function (d) {
      return [
        new Date(),
        d.name || '',
        d.email || '',
        d.subject || '',
        d.message || '',
      ];
    },
    subject: function (d) {
      return 'New contact message' + (d.subject ? ': ' + d.subject : '');
    },
  },
  lead: {
    name: 'Leads',
    tabColor: COLORS.gold,
    headers: [
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Service',
      'City',
      'Area',
      'Message',
    ],
    widths: [150, 180, 220, 140, 170, 130, 130, 340],
    row: function (d) {
      return [
        new Date(),
        d.client_name || '',
        d.client_email || '',
        d.client_phone || '',
        d.service_needed || '',
        d.location || '',
        d.town || '',
        d.message || '',
      ];
    },
    subject: function (d) {
      return (
        'New lead: ' +
        (d.service_needed || 'enquiry') +
        (d.location ? ' in ' + d.location : '')
      );
    },
  },
};

/** Resolve the target spreadsheet whether the script is bound or standalone. */
function getSpreadsheet() {
  if (SHEET_ID && SHEET_ID.indexOf('PASTE') === -1) {
    return SpreadsheetApp.openById(SHEET_ID);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

/** Create + style a tab. Safe to re-run; rebuilds the header without touching data. */
function buildTab(ss, cfg) {
  var sheet = ss.getSheetByName(cfg.name) || ss.insertSheet(cfg.name);
  var cols = cfg.headers.length;

  // Row 1: title banner.
  sheet.getRange(1, 1, 1, cols).merge();
  var title = sheet.getRange(1, 1);
  title
    .setValue(cfg.name + ' · Accountants.co.ke')
    .setBackground(COLORS.ink)
    .setFontColor(COLORS.headerText)
    .setFontSize(13)
    .setFontWeight('bold')
    .setVerticalAlignment('middle')
    .setHorizontalAlignment('left');
  sheet.setRowHeight(1, 40);

  // Row 2: column headers.
  sheet.getRange(2, 1, 1, cols).setValues([cfg.headers]);
  sheet
    .getRange(2, 1, 1, cols)
    .setBackground(cfg.tabColor)
    .setFontColor(COLORS.headerText)
    .setFontWeight('bold')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(2, 30);
  sheet.setFrozenRows(2);

  // Column widths.
  for (var i = 0; i < cols; i++) {
    sheet.setColumnWidth(i + 1, cfg.widths[i] || 160);
  }

  // Tidy: trim extra empty columns, colour the tab, add zebra banding.
  var maxCols = sheet.getMaxColumns();
  if (maxCols > cols) sheet.deleteColumns(cols + 1, maxCols - cols);
  sheet.setTabColor(cfg.tabColor);

  var bandRange = sheet.getRange(2, 1, Math.max(sheet.getMaxRows() - 1, 1), cols);
  var existing = bandRange.getBandings();
  for (var b = 0; b < existing.length; b++) existing[b].remove();
  bandRange
    .applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, true, false);

  return sheet;
}

/** Run this once from the editor to build the styled, empty tabs. */
function setup() {
  var ss = getSpreadsheet();
  ss.rename('Accountants.co.ke — Captures');
  buildTab(ss, TABS.claim);
  buildTab(ss, TABS.lead);
  buildTab(ss, TABS.contact);

  // Remove the default empty "Sheet1" if it is still there and unused.
  var def = ss.getSheetByName('Sheet1');
  if (def && def.getLastRow() === 0) ss.deleteSheet(def);

  // Move our tabs to the front.
  ss.setActiveSheet(ss.getSheetByName(TABS.claim.name));
  ss.moveActiveSheet(1);
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var type = TABS[data.formType] ? data.formType : 'claim';
    var cfg = TABS[type];

    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(cfg.name);
    if (!sheet) sheet = buildTab(ss, cfg);

    var row = cfg.row(data);
    sheet.appendRow(row);

    // Email is best-effort: the row is already saved, so a missing config or a
    // send failure must never fail the capture.
    try {
      if (typeof NOTIFY_EMAIL !== 'undefined' && NOTIFY_EMAIL) {
        var body = cfg.headers
          .map(function (h, i) {
            return h + ': ' + row[i];
          })
          .join('\n');
        MailApp.sendEmail(NOTIFY_EMAIL, cfg.subject(data), body);
      }
    } catch (mailErr) {
      // ignore — capture succeeded
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json({ ok: true, service: 'accountants.co.ke capture' });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
