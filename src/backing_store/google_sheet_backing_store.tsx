// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
export const CLIENT_ID = '223057085091-emm8ad43ejnt04ea4epckmej54ablt57.apps.googleusercontent.com';
export const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
export const api = gapi as any;
export const authAPI = gapi.auth;

export function loadSheetsApi() {
  var discoveryUrl =
      'https://sheets.googleapis.com/$discovery/rest?version=v4';
  api.client.load(discoveryUrl).then(listMajors);
};

function createSheetIfNecessary() {
 // see if the sheet exists
}

function reloadTodoHeap() {
  // send a redux event
}

function insertTodo() {

}

function removeTodo() {

}

function editTodo() {

}
/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */

function listMajors() {
  api.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  }).then(function(response: any) {
    var range = response.result;
    console.log('response', response);
  //   if (range.values.length > 0) {
  //     appendPre('Name, Major:');
  //     for (i = 0; i < range.values.length; i++) {
  //       var row = range.values[i];
  //       // Print columns A and E, which correspond to indices 0 and 4.
  //       appendPre(row[0] + ', ' + row[4]);
  //     }
  //   } else {
  //     appendPre('No data found.');
  //   }
  // }, function(response) {
  //   appendPre('Error: ' + response.result.error.message);
  // });
  });
}