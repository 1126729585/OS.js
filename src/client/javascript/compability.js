module.exports.init = function() {

  const Process = require('core/process.js');
  const SettingsManager = require('core/settings-manager.js');
  const SearchEngine = require('core/search-engine.js');
  const PackageManager = require('core/package-manager.js');
  const MountManager = require('core/mount-manager.js');

  OSjs.API.killAll           = Process.killAll;
  OSjs.API.kill              = Process.kill;
  OSjs.API.message           = Process.message;
  OSjs.API.getProcess        = Process.getProcess;
  OSjs.API.getProcesses      = Process.getProcesses;

  OSjs.Core.DialogWindow = Object.seal(require('core/dialog.js'));
  OSjs.Core.Window = Object.seal(require('core/window.js'));
  OSjs.Core.WindowManager = Object.seal(require('core/windowmanager.js'));
  OSjs.Core.Service = Object.seal(require('core/service.js'));
  OSjs.Core.Process = Object.seal(Process);
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

  /**
   * Get the current SettingsManager  instance
   *
   * @function getSettingsManager
   * @memberof OSjs.Core
   * @return {OSjs.Core.SettingsManager}
   */
  OSjs.Core.getSettingsManager = function Core_getSettingsManager() {
    return SettingsManager;
  };

  /**
   * Get the current SearchEngine  instance
   *
   * @function getSearchEngine
   * @memberof OSjs.Core
   *
   * @return {OSjs.Core.SearchEngine}
   */
  OSjs.Core.getSearchEngine = function Core_getSearchEngine() {
    return SearchEngine;
  };

  /**
   * Get the current PackageManager instance
   *
   * @function getPackageManager
   * @memberof OSjs.Core
   *
   * @return {OSjs.Core.PackageManager}
   */
  OSjs.Core.getPackageManager = function Core_getPackageManager() {
    return PackageManager;
  };

  /**
   * Get the current MountManager  instance
   *
   * @function getMountManager
   * @memberof OSjs.Core
   * @return {OSjs.Core.MountManager}
   */
  OSjs.Core.getMountManager = function Core_getMountManager() {
    return MountManager;
  };

};
