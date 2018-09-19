'use strict';

import {Buffer} from 'buffer';
import * as mm from 'music-metadata/lib/core';
import * as Type from 'music-metadata/lib/type';
import * as toBuffer from 'typedarray-to-buffer';

export type IAudioMetadata = Type.IAudioMetadata;
export type IOptions = Type.IOptions;
export type ITag = Type.ITag;
export type INativeTagDict = Type.INativeTagDict;

/**
 * Parse audio Stream
 * @param stream
 * @param mimeType
 * @param options Parsing options
 * @returns {Promise<IAudioMetadata>}
 */
export const parseStream = mm.parseStream;

/**
 * Parse audio from Node Buffer
 * @param {Stream.Readable} stream Audio input stream
 * @param {string} mimeType <string> Content specification MIME-type, e.g.: 'audio/mpeg'
 * @param {IOptions} options Parsing options
 * @returns {Promise<IAudioMetadata>}
 * Ref: https://github.com/Borewit/strtok3/blob/e6938c81ff685074d5eb3064a11c0b03ca934c1d/src/index.ts#L15
 */
export const parseBuffer = mm.parseBuffer;

/**
 * Parse Web API File
 * @param {File} file
 * @param {IOptions} options Parsing options
 * @returns {Promise<IAudioMetadata>}
 */
export function parseFile(file: File, options?: IOptions): Promise<IAudioMetadata> {
  return convertFileToBuffer(file).then(buf => {
    return mm.parseBuffer(buf, file.type, options);
  });
}

/**
 * Convert Web API File to Node Buffer
 * @param {File} file Web API File
 * @returns {Promise<Buffer>}
 */
function convertFileToBuffer(file: File): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {

    const fileReader = new FileReader();
    fileReader.onloadend = event => {
      let data = (event.target as any).result;
      if (data instanceof ArrayBuffer) {
        data = toBuffer(new Uint8Array((event.target as any).result));
      }
      resolve(data);
    };
    fileReader.onerror = error => {
      reject(new Error(error.type));
    };
    fileReader.onabort = error => {
      reject(new Error(error.type));
    };
    fileReader.readAsArrayBuffer(file);
  });
}

/**
 * Create a dictionary ordered by their tag id (key)
 * @param {ITag[]} nativeTags list of tags
 * @returns {INativeTagDict} Tags indexed by id
 */
export const orderTags = mm.orderTags;

/**
 * Convert rating to 1-5 star rating
 * @param {number} rating Normalized rating [0..1] (common.rating[n].rating)
 * @returns {number} Number of stars: 1, 2, 3, 4 or 5 stars
 */
export const ratingToStars = mm.ratingToStars;
