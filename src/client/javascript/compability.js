module.exports.init = function() {

  // Make sure these namespaces exist
  (['Bootstrap', 'Utils', 'API', 'GUI', 'Core', 'Dialogs', 'Helpers', 'Applications', 'Locales', 'VFS', 'Extensions', 'Auth', 'Storage', 'Connections', 'Broadway']).forEach(function(ns) {
    OSjs[ns] = OSjs[ns] || {};
  });

  (['Helpers']).forEach(function(ns) {
    OSjs.GUI[ns] = OSjs.GUI[ns] || {};
  });

  (['Helpers', 'Transports']).forEach(function(ns) {
    OSjs.VFS[ns] = OSjs.VFS[ns] || {};
  });

  /**
   * Callback for all Handler methods
   * @param {String} [error] Error from response (if any)
   * @param {Mixed} result Result from response (if any)
   * @callback CallbackHandler
   */

  const Process = require('core/process.js');
  const WindowManager = require('core/windowmanager.js');
  const SettingsManager = require('core/settings-manager.js');
  const SearchEngine = require('core/search-engine.js');
  const PackageManager = require('core/package-manager.js');
  const MountManager = require('core/mount-manager.js');
  const Authenticator = require('core/authenticator.js');
  const Connection = require('core/connection.js');
  const Storage = require('core/storage.js');
  const API = require('core/api.js');

  const UIElement = require('gui/element.js');
  const UIDataView = require('gui/dataview.js');

  OSjs.API = API;
  OSjs.API.killAll = Process.killAll;
  OSjs.API.kill = Process.kill;
  OSjs.API.message = Process.message;
  OSjs.API.getProcess = Process.getProcess;
  OSjs.API.getProcesses = Process.getProcesses;

  OSjs.Core.DialogWindow = Object.seal(require('core/dialog.js'));
  OSjs.Core.Window = Object.seal(require('core/window.js'));
  OSjs.Core.WindowManager = Object.seal(WindowManager);
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

  OSjs.GUI.Element = Object.seal(UIElement);
  OSjs.GUI.DataView = Object.seal(UIDataView);

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

  /**
   * This is kept for backward compability with the old Handler system
   *
   * @function getHandler
   * @memberof OSjs.Core
   *
   * @return {OSjs.Core.Handler}
   */
  OSjs.Core.getHandler = function() {
    console.warn('HANDLER IS DEPRECATED. YOU SHOULD UPDATE YOUR CODE!');
    return (function() {
      var auth = OSjs.Core.getAuthenticator();
      var conn = OSjs.Core.getConnection();
      var stor = OSjs.Core.getStorage();

      return {
        loggedIn: auth.isLoggedIn(),
        offline: conn.isOffline(),
        userData: auth.getUser(),
        callAPI: conn.request,
        saveSettings: stor.saveSettings
      };
    })();
  };

  /**
   * Get default configured settings
   *
   * THIS IS JUST A PLACEHOLDER. 'settings.js' SHOULD HAVE THIS!
   *
   * You should use 'OSjs.API.getConfig()' to get a setting
   *
   * @function getConfig
   * @memberof OSjs.Core
   * @see OSjs.API.getConfig
   *
   * @return  {Object}
   */
  OSjs.Core.getConfig = OSjs.Core.getConfig || function() {
    return {};
  };

  /**
   * Get default configured packages
   *
   * THIS IS JUST A PLACEHOLDER. 'packages.js' SHOULD HAVE THIS!
   *
   * @function getMetadata
   * @memberof OSjs.Core
   *
   * @return  {Metadata[]}
   */
  OSjs.Core.getMetadata = OSjs.Core.getMetadata || function() {
    return {};
  };

  /**
   * Get running 'Connection' instance
   *
   * @function getConnection
   * @memberof OSjs.Core
   *
   * @return {OSjs.Core.Connection}
   */
  OSjs.Core.getConnection = function Core_getConnection() {
    return Connection.instance;
  };

  /**
   * Get running 'Storage' instance
   *
   * @function getStorage
   * @memberof OSjs.Core
   *
   * @return {OSjs.Core.Storage}
   */
  OSjs.Core.getStorage = function Core_getStorage() {
    return Storage.instance;
  };

  /**
   * Get running 'Authenticator' instance
   *
   * @function getAuthenticator
   * @memberof OSjs.Core
   *
   * @return {OSjs.Core.Authenticator}
   */
  OSjs.Core.getAuthenticator = function Core_getAuthenticator() {
    return Authenticator.instance;
  };

  /**
   * Get the current WindowManager instance
   *
   * @function getWindowManager
   * @memberof OSjs.Core
   *
   * @return {OSjs.Core.WindowManager}
   */
  OSjs.Core.getWindowManager  = function Core_getWindowManager() {
    return WindowManager.instance;
  };

};
