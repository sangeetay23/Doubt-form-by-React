const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const SHEET_NAME = 'Doubt Submissions';

export const saveToGoogleSheets = async (doubts, responses, email) => {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    const lastRow = sheet.getLastRow() + 1;

    doubts.forEach((doubt, index) => {
        sheet.getRange(lastRow + index, 1).setValue(doubt);
        sheet.getRange(lastRow + index, 2).setValue(responses[index]);
    });
    sheet.getRange(lastRow, 3).setValue(email);
};