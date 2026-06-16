/**
 * Accountants.co.ke — lead & firm-claim capture webhook.
 *
 * Receives JSON POSTs from the site (firm claims + match leads), appends a row
 * to a Google Sheet, and emails a notification.
 *
 * SETUP
 *  1. Create a Google Sheet. Copy its ID from the URL:
 *       docs.google.com/spreadsheets/d/<THIS_IS_THE_ID>/edit
 *  2. In that Sheet: Extensions > Apps Script. Delete the boilerplate, paste
 *     this whole file, and set SHEET_ID + NOTIFY_EMAIL below.
 *  3. Deploy > New deployment > type "Web app".
 *       - Description: capture
 *       - Execute as: Me
 *       - Who has access: Anyone
 *     Deploy, authorise, and COPY the Web app URL (ends in /exec).
 *  4. Paste that /exec URL into src/lib/sheet.ts (WEBHOOK_URL), commit, push.
 *
 * Re-deploying after edits: Deploy > Manage deployments > edit (pencil) >
 * Version: New version > Deploy. The /exec URL stays the same.
 */

const SHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';
const NOTIFY_EMAIL = 'vchatwani@gmail.com';

const TABS = {
  claim: {
    name: 'Firm Claims',
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
  lead: {
    name: 'Leads',
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

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var type = data.formType === 'lead' ? 'lead' : 'claim';
    var cfg = TABS[type];

    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(cfg.name);
    if (!sheet) {
      sheet = ss.insertSheet(cfg.name);
      sheet.appendRow(cfg.headers);
      sheet.getRange(1, 1, 1, cfg.headers.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    var row = cfg.row(data);
    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      var body = cfg.headers
        .map(function (h, i) {
          return h + ': ' + row[i];
        })
        .join('\n');
      MailApp.sendEmail(NOTIFY_EMAIL, cfg.subject(data), body);
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
