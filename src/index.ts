'use strict';

import {Buffer} from 'buffer';
import * as mm from 'music-metadata';
import * as Stream from 'stream';
import * as toBuffer from 'typedarray-to-buffer';

export type IAudioMetadata = mm.IAudioMetadata;
export type IOptions = mm.IOptions;
export type ITag = mm.ITag;
export type INativeTagDict = mm.INativeTagDict;

/**
 * Parse audio Stream
 * @param stream
 * @param mimeType
 * @param options Parsing options
 * @returns {Promise<IAudioMetadata>}
 */
export function parseStream(stream: Stream.Readable, mimeType?: string, options?: IOptions): Promise<IAudioMetadata> {
  return mm.parseStream(stream, mimeType, options) as any;
}

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
export function orderTags(nativeTags: ITag[]): INativeTagDict {
  return mm.orderTags(nativeTags);
}

/**
 * Convert rating to 1-5 star rating
 * @param {number} rating Normalized rating [0..1] (common.rating[n].rating)
 * @returns {number} Number of stars: 1, 2, 3, 4 or 5 stars
 */
export function ratingToStars(rating: number): number {
  return mm.ratingToStars(rating);
}
