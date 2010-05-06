JsUnitTest.Unit.TiLogger = function(table, tab) {
  this.table = table;
  this.messages = {};
  /*this.section = Ti.UI.createTableViewSection();
  this.sectionLabel = Ti.UI.createLabel({
    font:{fontFamily:'Helvetica Neue',fontSize:18,fontWeight:'bold'},
    text:'Running...',
    color:'#fff',
    backgroundColor:'#333',
    textAlign:'left',
    left:10,
    width:'auto',
    height:'auto'
  });
  this.section.headerView = this.sectionLabel;*/
  //this.table.data = [this.section];
  var self = this;
  this.table.addEventListener('click', function(e) {
    var msg = self.messages[e.row.testName];
    if (typeof(msg) == "undefined") { return; }
    var color = e.row.statusLabel.text == "passed" ? "#363" : "#633";
    var win = Ti.UI.createWindow({
      backgroundColor: color, top:0, bottom:0, left:0, right:0
    });
    Ti.API.info("win="+win+",msg="+self.messages[e.row.testName]);
    var close = Ti.UI.createButton({ top: 5, center:0, width: 75, height: 50, title: "Close"});
    close.addEventListener('click', function(e) { win.close(); });
    win.add(close);
    win.add(Ti.UI.createLabel({top:55, bottom: 0, left: 5, right: 0, text: self.messages[e.row.testName], color: '#fff'}));
    win.open({animate: false});
  });
};

JsUnitTest.Unit.TiLogger.prototype.createStatusView = function(row) {
  var statusView = Ti.UI.createView({
    right: 5, width: 250, top: 20	
  });
  row.add(statusView);

  statusView.add(Ti.UI.createImageView({ width: 16, height: 16, url: 'images/passed.png', left: 0, top: 0 }));
  var passedLabel = Ti.UI.createLabel({ width: 45, height: 'auto', left: 17, top: 0, font: {fontSize: 14}});
  row.passedLabel = passedLabel;
  statusView.add(passedLabel);

  statusView.add(Ti.UI.createImageView({ width: 16, height: 16, url: 'images/failed.png', left: 63, top: 0 }));
  var failedLabel = Ti.UI.createLabel({ width: 45, height: 'auto', left: 80, top: 0, font: {fontSize: 14}});
  row.failedLabel = failedLabel;
  statusView.add(failedLabel);

  statusView.add(Ti.UI.createImageView({ width: 16, height: 16, url: 'images/error.png', left: 127, top: 0 }));
  var errorLabel = Ti.UI.createLabel({ width: 45, height: 'auto', left: 144, top: 0, font: {fontSize: 14}});
  row.errorLabel = errorLabel;
  statusView.add(errorLabel);

  statusView.add(Ti.UI.createImageView({ width: 16, height: 16, url: 'images/warning.png', left: 191, top: 0 }));
  var warningLabel = Ti.UI.createLabel({ width: 45, height: 'auto', left: 208, top: 0, font: {fontSize: 14}});
  row.warningLabel = warningLabel;
  statusView.add(warningLabel);
};

JsUnitTest.Unit.TiLogger.prototype.start = function(testName) {
  this.currentTest = testName;
  var row = Ti.UI.createTableViewRow({
    height: 40, width: 320
  });
  row.testName = testName;
  var nameLabel = Ti.UI.createLabel({
    text: testName, left: 5, top: 5, width: 200, height: 'auto',
    font: {fontSize: 14, fontWeight: 'bold', fontFamily: 'Helvetica Neue'}
  });
  row.nameLabel = nameLabel;
  row.add(nameLabel);
  var statusLabel = Ti.UI.createLabel({
    left: 210, top: 5, width: 60, height: 'auto',
    font: {fontSize: 14, fontWeight: 'bold', fontFamily: 'Helvetica Neue'}
  });
  row.statusLabel = statusLabel;
  row.add(statusLabel);

  this.createStatusView(row);

  //this.section.add(row);
  //this.table.data = [this.section];
  this.table.appendRow(row);
  this.lastRow = row;
};
  
JsUnitTest.Unit.TiLogger.prototype.setStatus = function(status) {
  if (this.lastRow == null) { return; }
  var color = "#fcc";
  var textColor = '#633';
  if (status == "passed") {
    color = "#cfc";
    textColor = '#363';
  } else {
    this.lastRow.hasChild = true;
  }
  this.lastRow.statusLabel.text = status;
  this.lastRow.statusLabel.color = textColor;
  this.lastRow.backgroundColor = color;
};
  
JsUnitTest.Unit.TiLogger.prototype.finish = function(status, summary) {
  if (!this.table) {return;}
  this.setStatus(status);
  this.message(summary);
};
  
JsUnitTest.Unit.TiLogger.prototype.message = function(message) {
  if (!this.table || !this.lastRow) {return;}
  this.messages[this.currentTest] = message;

  var match = message.match(/(\d+) assertions, (\d+) failures, (\d+) errors, (\d+) warnings/);
  this.lastRow.passedLabel.text = match[1];
  this.lastRow.failedLabel.text = match[2];
  this.lastRow.errorLabel.text = match[3];
  this.lastRow.warningLabel.text = match[4];
};
  
JsUnitTest.Unit.TiLogger.prototype.summary = function(summary) {
  //this.sectionLabel.text = summary;
};
  
JsUnitTest.Unit.TiLogger.prototype.getLastRow = function() {
  var d = this.table.data;
  return d[d.length-1];
};

JsUnitTest.Unit.TiLogger.prototype.appendActionButtons = function(actions) {
};

