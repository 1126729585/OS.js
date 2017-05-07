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

  const UIScheme = require('gui/scheme.js');
  const UIElement = require('gui/element.js');
  const UIDataView = require('gui/dataview.js');
  const GUIHelpers = require('gui/helpers.js');

  const VFS = require('vfs/fs.js');
  const VFSFile = require('vfs/file.js');
  const VFSFileData = require('vfs/filedata.js');

  const FS = require('utils/fs.js');
  const DOM = require('utils/dom.js');
  const XHR = require('utils/xhr.js');
  const Utils = require('utils/misc.js');
  const Events = require('utils/events.js');
  const Compability = require('utils/compability.js');

  const assignInto = (lib, ns) => {
    return Object.keys(lib).forEach((k) => {
      ns[k] = lib[k];
    });
  };

  assignInto(VFS, OSjs.VFS);
  OSjs.VFS.File = VFSFile;
  OSjs.VFS.FileDataURL = VFSFileData;
  assignInto(FS, OSjs.VFS.Helpers);

  OSjs.VFS.Transports.Applications = require('vfs/transports/applications.js');
  OSjs.VFS.Transports.Dist = require('vfs/transports/dist.js');
  OSjs.VFS.Transports.HTTP = require('vfs/transports/http.js');
  OSjs.VFS.Transports.OSjs = require('vfs/transports/osjs.js');
  OSjs.VFS.Transports.Web = require('vfs/transports/web.js');
  OSjs.VFS.Transports.WebDAV = require('vfs/transports/webdav.js');

  assignInto(FS, OSjs.Utils);
  assignInto(DOM, OSjs.Utils);
  assignInto(XHR, OSjs.Utils);
  assignInto(Utils, OSjs.Utils);
  assignInto(Events, OSjs.Utils);
  assignInto(Compability, OSjs.Utils);

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
  OSjs.GUI.Scheme = Object.seal(UIScheme);
  OSjs.GUI.Helpers = Object.seal(GUIHelpers);

  const languages = OSjs.Core.getConfig().Languages;
  Object.keys(languages).forEach((k) => {
    OSjs.Locales[k] = require('locales/' + k + '.js');
  });

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

  /**
   * Shortcut for creating a new UIScheme class
   *
   * @function createScheme
   * @memberof OSjs.GUI
   *
   * @param {String}    url     URL to scheme file
   *
   * @return {OSjs.GUI.Scheme}
   */
  OSjs.GUI.createScheme = function(url) {
    return new UIScheme(url);
  };

  /**
   * Gets the browser window rect (x, y, width, height)
   *
   * @function getRect
   * @memberof OSjs.Utils
   *
   * @return {Object}
   */
  OSjs.Utils.getRect = function Utils_getRect() {
    return {
      top: 0,
      left: 0,
      width: document.body.offsetWidth,
      height: document.body.offsetHeight
    };
  };

  /**
   * Creates a new VFS.File instance
   *
   * @function file
   * @memberof OSjs.VFS
   * @see OSjs.VFS.File
   *
   * @example
   * OSjs.VFS.file('home:///foo').read(<fn>);
   */
  OSjs.VFS.file = function createFileInstance(arg, mime) {
    return new VFSFile(arg, mime);
  };

  /**
   * Triggers a VFS watch event
   *
   * @function triggerWatch
   * @memberof OSjs.VFS.Helpers
   *
   * @param   {String}              method      VFS method
   * @param   {Object}              arg         VFS file
   * @param   {OSjs.Core.Process}   [appRef]    Optional application reference
   */
  OSjs.VFS.Helpers.triggerWatch = function VFS_Helpers_triggerWatch(method, arg, appRef) {
    VFS.broadcastMessage('vfs:' + method, arg, appRef);
  };

  /**
   * Creates a new VFS.File from an upload
   *
   * @function createFileFromUpload
   * @memberof OSjs.VFS.Helpers
   *
   * @param     {String}      destination         Destination path
   * @param     {File}        f                   File
   *
   * @return {OSjs.VFS.File}
   */
  OSjs.VFS.Helpers.createFileFromUpload = function(destination, f) {
    return new VFSFile({
      filename: f.name,
      path: (destination + '/' + f.name).replace(/\/\/\/\/+/, '///'),
      mime: f.mime || 'application/octet-stream',
      size: f.size
    });
  };

  /**
   * Create a new Upload dialog
   *
   * @function createUploadDialog
   * @memberof OSjs.VFS.Helpers
   *
   * @param   {Object}                                     opts                 Options
   * @param   {String}                                     opts.destination     Destination for upload
   * @param   {File}                                       [opts.file]          Uploads this file immediately
   * @param   {Function}                                   cb                   Callback function => fn(error, file, event)
   * @param   {OSjs.Core.Window|OSjs.Core.Application}     [ref]                Set reference in new window
   */
  OSjs.VFS.Helpers.createUploadDialog = function(opts, cb, ref) {
    var destination = opts.destination;
    var upload = opts.file;

    OSjs.API.createDialog('FileUpload', {
      dest: destination,
      file: upload
    }, function(ev, btn, ufile) {
      if ( btn !== 'ok' && btn !== 'complete' ) {
        cb(false, false);
      } else {
        var file = VFS.Helpers.createFileFromUpload(destination, ufile);
        cb(false, file);
      }
    }, ref);
  };

  /**
   * Shortcut for creating a new UIScheme class
   *
   * @summary Helper for loading Dialog scheme files.
   *
   * @constructor DialogScheme
   * @memberof OSjs.GUI
   */
  OSjs.GUI.DialogScheme = (function() {
    var dialogScheme;

    return {

      /**
       * Get the Dialog scheme
       *
       * @function get
       * @memberof OSjs.GUI.DialogScheme#
       *
       * @return {OSjs.GUI.Scheme}
       */
      get: function() {
        return dialogScheme;
      },

      /**
       * Destroy the Dialog scheme
       *
       * @function destroy
       * @memberof OSjs.GUI.DialogScheme#
       */
      destroy: function() {
        if ( dialogScheme ) {
          dialogScheme.destroy();
        }
        dialogScheme = null;
      },

      /**
       * Initialize the Dialog scheme
       *
       * @function init
       * @memberof OSjs.GUI.DialogScheme#
       *
       * @param   {Function}    cb      Callback function
       */
      init: function(cb) {
        if ( dialogScheme ) {
          cb();
          return;
        }

        if ( OSjs.API.isStandalone() ) {
          var html = OSjs.STANDALONE.SCHEMES['/dialogs.html'];
          dialogScheme = new OSjs.GUI.Scheme();
          dialogScheme.loadString(html);
          cb();
          return;
        }

        var root = API.getConfig('Connection.RootURI');
        var url = root + 'dialogs.html';

        dialogScheme = OSjs.GUI.createScheme(url);
        dialogScheme.load(function(error) {
          if ( error ) {
            console.warn('OSjs.GUI.initDialogScheme()', 'error loading dialog schemes', error);
          }
          cb();
        });
      }

    };

  })();

  /*
   * A hidden mountpoint for making HTTP requests via VFS
   */
  OSjs.Core.getMountManager()._add({
    readOnly: true,
    name: 'HTTP',
    transport: 'HTTP',
    description: 'HTTP',
    visible: false,
    searchable: false,
    unmount: function(cb) {
      cb(false, false);
    },
    mounted: function() {
      return true;
    },
    enabled: function() {
      return true;
    },
    root: 'http:///',
    icon: 'places/google-drive.png',
    match: /^https?\:\/\//
  });

};
