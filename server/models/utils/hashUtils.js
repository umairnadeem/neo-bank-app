const crypto = require('crypto');

/**
Hashing Utility functions
*/

/** @module hashUtils */

/**
 * Creates a hash using the sha256 algorithm. The salt is optional.
 * @param {string} data - The data to hash.
 * @param {string} [salt] - The salt to add to the data before hashing.
 * @returns {string} A string with the hashed value.
 */
exports.createHash = (data, salt = '') => {
  const shasum = crypto.createHash('sha256');
  shasum.update(data + salt);
  return shasum.digest('hex');
};

/**
 * Compares a value and a salt with a previously hashed value.
 * @param {string} attempted - The attempted value.
 * @param {string} stored - The previous hash value.
 * @param {string} salt - The salt.
 * @returns {boolean} A boolean indicating if the attempted value
 * matches the stored value.
 */
exports.compareHash = (attempted, stored, salt) => stored === this.createHash(attempted, salt);

/**
 * Creates a random 32 byte string.
 * @returns {string} A random string.
 */
exports.createRandom32String = () => crypto.randomBytes(32).toString('hex');
