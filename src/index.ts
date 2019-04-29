import { Buffer } from 'buffer';
import * as initDebug from 'debug';
import * as mm from 'music-metadata/lib/core';
import * as Type from 'music-metadata/lib/type';
import * as toBuffer from 'typedarray-to-buffer';
import { Browser2NodeStream } from './fetch/Browser2NodeStream';

const debug = initDebug('music-metadata-browser');

export type IAudioMetadata = Type.IAudioMetadata;
export type IOptions = Type.IOptions;
export type ITag = Type.ITag;
export type INativeTagDict = Type.INativeTagDict;

/**
 * Parse audio Stream
 * @param stream
 * @param {string} contentType MIME-Type
 * @param {IOptions} options Parsing options
 * @returns {Promise<IAudioMetadata>}
 */
export const parseNodeStream = mm.parseStream;

/**
 * Parse Web API ReadableStream: https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
 * @param {ReadableStream} stream ReadableStream
 * @param {string} contentType MIME-Type
 * @param {IOptions} options Parsing options
 * @returns {Promise<IAudioMetadata>}
 */
export async function parseReadableStream(stream: ReadableStream, contentType, options?: IOptions): Promise<IAudioMetadata> {
  const ns = new Browser2NodeStream(stream);
  const res = await parseNodeStream(ns, contentType, options);
  debug(`Completed parsing from stream bytesRead=${ns.bytesRead} / fileSize=${options && options.fileSize ? options.fileSize : '?'}`);
  await ns.release();
  return res;
}

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
 * @param {Blob} blob
 * @param {IOptions} options Parsing options
 * @returns {Promise<IAudioMetadata>}
 */
export function parseBlob(blob: Blob, options?: IOptions): Promise<IAudioMetadata> {
  return convertBlobToBuffer(blob).then(buf => {
    return mm.parseBuffer(buf, blob.type, options);
  });
}

/**
 * Parse fetched file, using the Web Fetch API
 * @param {string} audioTrackUrl URL to download the audio track from
 * @param {IOptions} options Parsing options
 * @returns {Promise<IAudioMetadata>}
 */
export async function fetchFromUrl(audioTrackUrl: string, options?: IOptions): Promise<IAudioMetadata> {
  const response = await fetch(audioTrackUrl);
  const contentType = response.headers.get('Content-Type');
  const headers = [];
  response.headers.forEach(header => {
    headers.push(header);
  });
  if (response.ok) {
    if (response.body) {
      const res = await this.parseReadableStream(response.body, contentType, options);
      await response.body.cancel();
      return res;
    } else {
      // Fall back on Blob
      return this.parseBlob(await response.blob(), options);
    }
  } else {
    throw new Error(`HTTP error status=${response.status}: ${response.statusText}`);
  }
}

/**
 * Parse audio from ITokenizer source
 * @param {strtok3.ITokenizer} Audio source implementing the tokenizer interface
 * @param {string} mimeType <string> Content specification MIME-type, e.g.: 'audio/mpeg'
 * @param {IOptions} options Parsing options
 * @returns {Promise<IAudioMetadata>}
 */
export const parseFromTokenizer = mm.parseFromTokenizer;

/**
 * Convert Web API File to Node Buffer
 * @param {Blob} blob Web API Blob
 * @returns {Promise<Buffer>}
 */
function convertBlobToBuffer(blob: Blob): Promise<Buffer> {
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
    fileReader.readAsArrayBuffer(blob);
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
