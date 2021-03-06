'use strict';

import Model from './Model.js';
import Utils from '../utils/Utils.js';

export default class Account extends Model {
  /**
   * This class represents a JMAP [Account]{@link http://jmap.io/spec.html#accounts}.
   *
   * @constructor
   * @extends Model
   *
   * @param jmap {Client} The {@link Client} instance that created this _Account_.
   * @param id {String} The unique identifier of this _Account_.
   * @param [opts] {Object} The optional properties of this _Account_.
   * @param [opts.name=''] {String} The name of this _Account_.
   * @param [opts.isPrimary=false] {Boolean} Whether this _Account_ is the primary email account.
   * @param [opts.isReadOnly=false] {Boolean} Whether this _Account_ is read-only.
   *
   * @see Model
   */
  constructor(jmap, id, opts) {
    super(jmap);

    Utils.assertRequiredParameterIsPresent(id, 'id');

    opts = opts || {};

    this.id = id;
    this.name = opts.name || '';
    this.isPrimary = opts.isPrimary || false;
    this.isReadOnly = opts.isReadOnly || false;
  }

  /**
   * Fetches all mailboxes of this _Account_.<br />
   * This will delegate to {@link Client#getMailboxes}, passing this Account's _id_ as the _accountId_ option.
   *
   * @param [options] {Object} The options object passed to {@link Client#getMailboxes}.
   *   Please note that the _accountId_ option will be overriden if defined.
   * @returns {Promise} A promise that eventually resolves with an array of {@link Mailbox} instances.
   *
   * @see Client#getMailboxes
   * @see PromiseProvider
   */
  getMailboxes(options) {
    options = options || {};
    options.accountId = this.id;

    return this._jmap.getMailboxes(options);
  }

  /**
   * Creates an _Account_ from its JSON representation.
   *
   * @param jmap {Client} The {@link Client} instance passed to the _Account_ constructor.
   * @param object {Object} The JSON representation of the _Account_, as a Javascript object.
   * @param object.id {String} The identifier of the _Account_.
   *
   * @return {Account}
   */
  static fromJSONObject(jmap, object) {
    Utils.assertRequiredParameterIsPresent(object, 'object');

    return new Account(jmap, object.id, object);
  }
}
