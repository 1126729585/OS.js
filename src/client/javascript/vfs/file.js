/*!
 * OS.js - JavaScript Cloud/Web Desktop Platform
 *
 * Copyright (c) 2011-2017, Anders Evenrud <andersevenrud@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @author  Anders Evenrud <andersevenrud@gmail.com>
 * @licence Simplified BSD License
 */

/*eslint valid-jsdoc: "off"*/
'use strict';

// FIXME
const VFS = OSjs.VFS;

const FS = require('utils/fs.js');
const API = require('core/api.js');

/////////////////////////////////////////////////////////////////////////////
// FILE ABSTRACTION
/////////////////////////////////////////////////////////////////////////////

/**
 * This is the Metadata object you have to use when passing files around
 * in the VFS API.
 *
 * This object has the same properties as in the option list below
 *
 * If you construct without a MIME type, OS.js will try to guess what it is.
 *
 * @constructor File
 * @memberof OSjs.VFS
 * @see OSjs.VFS.file
 */
class FileMetadata {

  /**
   * @param   {(String|Object)} arg           Either a 'path' or 'object' (filled with properties)
   * @param   {String}          arg.path      Full path
   * @param   {String}          arg.filename  Filename (automatically detected)
   * @param   {String}          arg.type      File type (file/dir)
   * @param   {Number}          arg.size      File size (in bytes)
   * @param   {String}          arg.mime      File MIME (ex: application/json)
   * @param   {Mixed}           arg.id        Unique identifier (not required)
   * @param   {String}          [mime]        MIME type of File Type (ex: 'application/json' or 'dir')
   */
  constructor(arg, mime) {
    if ( !arg ) {
      throw new Error(API._('ERR_VFS_FILE_ARGS'));
    }

    /**
     * Full path
     * @type {String}
     * @example home:///foo/bar.baz
     */
    this.path     = null;

    /**
     * Filename
     * @type {String}
     * @example foo.baz
     */
    this.filename = null;

    /**
     * Type (dir or file)
     * @type {String}
     * @example file
     */
    this.type     = null;

    /**
     * Size in bytes
     * @type {Number}
     * @example 1234
     */
    this.size     = null;

    /**
     * MIME type
     * @type {String}
     * @example application/octet-stream
     */
    this.mime     = null;

    /**
     * Unique identifier (Only used for external services requring it)
     * @type {String}
     */
    this.id       = null;

    /**
     * Internal boolean for a shortcut type file
     * @type {Boolean}
     */
    this.shortcut = false;

    if ( typeof arg === 'object' ) {
      this.setData(arg);
    } else if ( typeof arg === 'string' ) {
      this.path = arg;
      this.setData();
    }

    if ( typeof mime === 'string' ) {
      if ( mime.match(/\//) ) {
        this.mime = mime;
      } else {
        this.type = mime;
      }
    }

    this._guessMime();
  }

  /**
   * Set data from Object (key/value pair)
   *
   * @param {Object}    o     Object
   */
  setData(o) {
    if ( o ) {
      Object.keys(o).forEach((k) => {
        if ( k !== '_element' ) {
          this[k] = o[k];
        }
      });
    }

    if ( !this.filename ) {
      this.filename = FS.filename(this.path);
    }
  }

  /**
   * Get object data as key/value pair.
   *
   * @return {Object}
   */
  getData() {
    return {
      path: this.path,
      filename: this.filename,
      type: this.type,
      size: this.size,
      mime: this.mime,
      id: this.id
    };
  }

  /**
   * Copies the file to given destination.
   *
   * @alias OSjs.VFS.copy
   * @see OSjs.VFS.copy
   */
  copy(dest, callback, options, appRef) {
    return VFS.copy(this, dest, callback, options, appRef);
  }

  /**
   * Downloads the file to computer
   *
   * @alias OSjs.VFS.download
   * @see OSjs.VFS.download
   */
  download(callback) {
    return VFS.download(this, callback);
  }

  /**
   * Deletes the file
   *
   * @alias OSjs.VFS.File#unlink
   * @see OSjs.VFS.File#unlink
   */
  delete() {
    return this.unlink.apply(this, arguments);
  }

  /**
   * Removes the file
   *
   * @alias OSjs.VFS.unlink
   * @see OSjs.VFS.unlink
   */
  unlink(callback, options, appRef) {
    return VFS.unlink(this, callback, options, appRef);
  }

  /**
   * Checks if file exists
   *
   * @alias OSjs.VFS.exists
   * @see OSjs.VFS.exists
   */
  exists(callback) {
    return VFS.exists(this, callback);
  }

  /**
   * Creates a directory
   *
   * @alias OSjs.VFS.mkdir
   * @see OSjs.VFS.mkdir
   */
  mkdir(callback, options, appRef) {
    return VFS.mkdir(this, callback, options, appRef);
  }

  /**
   * Moves the file to given destination
   *
   * @alias OSjs.VFS.move
   * @see OSjs.VFS.move
   */
  move(dest, callback, options, appRef) {
    return VFS.move(this, dest, (err, res, newDest) => {
      if ( !err && newDest ) {
        self.setData(newDest);
      }
      callback.call(this, err, res, newDest);
    }, options, appRef);
  }

  /**
   * Reads the file contents
   *
   * @alias OSjs.VFS.read
   * @see OSjs.VFS.read
   */
  read(callback, options) {
    return VFS.read(this, callback, options);
  }

  /**
   * Renames the file
   *
   * @alias OSjs.VFS.File#move
   * @see OSjs.VFS.File#move
   */
  rename() {
    return this.move.apply(this, arguments);
  }

  /**
   * Scans the folder contents
   *
   * @alias OSjs.VFS.scandir
   * @see OSjs.VFS.scandir
   */
  scandir(callback, options) {
    return VFS.scandir(this, callback, options);
  }

  /**
   * Sends the file to the trash
   *
   * @alias OSjs.VFS.trash
   * @see OSjs.VFS.trash
   */
  trash(callback) {
    return VFS.trash(this, callback);
  }

  /**
   * Restores the file from trash
   *
   * @alias OSjs.VFS.untrash
   * @see OSjs.VFS.untrash
   */
  untrash(callback) {
    return VFS.untrash(this, callback);
  }

  /**
   * Gets the URL for physical file
   *
   * @alias OSjs.VFS.url
   * @see OSjs.VFS.url
   */
  url(callback) {
    return VFS.url(this, callback);
  }

  /**
   * Writes data to the file
   *
   * @alias OSjs.VFS.write
   * @see OSjs.VFS.write
   */
  write(data, callback, options, appRef) {
    return VFS.write(this, data, callback, options, appRef);
  }

  _guessMime() {
    if ( this.mime || this.type === 'dir' || (!this.path || this.path.match(/\/$/)) ) {
      return;
    }

    const ext = FS.filext(this.path);
    this.mime = API.getConfig('MIME.mapping')['.' + ext] || 'application/octet-stream';
  }

}

/////////////////////////////////////////////////////////////////////////////
// EXPORTS
/////////////////////////////////////////////////////////////////////////////

module.exports = FileMetadata;
