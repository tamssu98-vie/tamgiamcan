// Dán toàn bộ file này vào Google Sheet: Tiện ích mở rộng > Apps Script.
// Đổi TOKEN thành một chuỗi bí mật của riêng bạn (dài, khó đoán), rồi Triển khai > Ứng dụng web.
const TOKEN = 'DOI_MA_NAY_THANH_CHUOI_BI_MAT_CUA_BAN';
const SHEET = 'data';

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET);
  if (!sh) {
    sh = ss.insertSheet(SHEET);
    sh.getRange('A:D').setNumberFormat('@'); // giữ nguyên dạng chữ, tránh Sheets tự đổi ngày
    sh.appendRow(['kind', 'date', 'updatedAt', 'json']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return out_({ ok: true, hint: 'Dùng POST kèm token.' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.token !== TOKEN) return out_({ error: 'Sai mã khóa' });

    const sh = sheet_();
    const rows = sh.getDataRange().getValues();
    const index = {}; // "kind|date" -> số dòng (1-based)
    for (let i = 1; i < rows.length; i++) index[rows[i][0] + '|' + rows[i][1]] = i + 1;

    (body.records || []).forEach(function (r) {
      const key = r.kind + '|' + r.date;
      const row = [r.kind, r.date, String(r.updatedAt), JSON.stringify(r.data)];
      if (!index[key]) {
        sh.appendRow(row);
        index[key] = sh.getLastRow();
      } else if (Number(r.updatedAt) > Number(sh.getRange(index[key], 3).getValue())) {
        sh.getRange(index[key], 1, 1, 4).setValues([row]);
      }
    });

    const all = sh.getDataRange().getValues().slice(1).map(function (v) {
      return { kind: v[0], date: v[1], updatedAt: Number(v[2]), data: JSON.parse(v[3]) };
    });
    return out_({ records: all });
  } catch (err) {
    return out_({ error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
