module.exports.init = function() {

  OSjs.Core.DialogWindow = Object.seal(require('core/dialog.js'));
  OSjs.Core.Window = Object.seal(require('core/window.js'));
  OSjs.Core.WindowManager = Object.seal(require('core/windowmanager.js'));
  OSjs.Core.Service = Object.seal(require('core/service.js'));
  OSjs.Core.Process = Object.seal(require('core/process.js'));
  OSjs.Core.Application = Object.seal(require('core/application.js'));

  OSjs.Dialogs.Alert = Object.seal(require('dialogs/alert.js'));
  OSjs.Dialogs.ApplicationChooser = Object.seal(require('dialogs/applicationchooser.js'));
  OSjs.Dialogs.Color = Object.seal(require('dialogs/color.js'));
  OSjs.Dialogs.Confirm = Object.seal(require('dialogs/confirm.js'));
  OSjs.Dialogs.Error = Object.seal(require('dialogs/error.js'));
  OSjs.Dialogs.File = Object.seal(require('dialogs/file.js'));
  OSjs.Dialogs.FileInfo = Object.seal(require('dialogs/fileinfo.js'));
  OSjs.Dialogs.FileProgress = Object.seal(require('dialogs/fileprogress.js'));
  OSjs.Dialogs.FileUpload = Object.seal(require('dialogs/fileupload.js'));
  OSjs.Dialogs.Font = Object.seal(require('dialogs/font.js'));
  OSjs.Dialogs.Input = Object.seal(require('dialogs/input.js'));

};
