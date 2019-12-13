import { Buffer } from 'buffer';
import * as initDebug from 'debug';
import { IAudioMetadata, IOptions } from 'music-metadata/lib/type';
import * as mm from 'music-metadata/lib/core';
import { ReadableWebToNodeStream } from 'readable-web-to-node-stream';
import * as toBuffer from 'typedarray-to-buffer';

const debug = initDebug('music-metadata-browser:main');

export { IPicture, IAudioMetadata, IOptions, ITag, INativeTagDict, IChapter } from 'music-metadata/lib/type';

/**
 * Parse audio Stream
 * @param stream - ReadableStream
 * @param contentType - MIME-Type
 * @param options - Parsing options
 * @returns Metadata via promise
 */
export const parseNodeStream = mm.parseStream;

/**
 * Parse Web API ReadableStream: https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
 * @param stream - ReadableStream
 * @param contentType MIME-Type
 * @param {IOptions} options Parsing options
 * @returns Metadata via promise
 */
export async function parseReadableStream(stream: ReadableStream, contentType, options?: IOptions): Promise<IAudioMetadata> {
  const ns = new ReadableWebToNodeStream(stream);
  const res = await parseNodeStream(ns, contentType, options);
  debug(`Completed parsing from stream bytesRead=${ns.bytesRead} / fileSize=${options && options.fileSize ? options.fileSize : '?'}`);
  await ns.close();
  return res;
}

/**
 * Parse audio from Node Buffer
 * @param stream - Audio input stream
 * @param mimeType - Content specification MIME-type, e.g.: 'audio/mpeg'
 * @param options - Parsing options
 * @returns Metadata via promise
 * Ref: https://github.com/Borewit/strtok3/blob/e6938c81ff685074d5eb3064a11c0b03ca934c1d/src/index.ts#L15
 */
export const parseBuffer = mm.parseBuffer;

/**
 * Parse Web API File
 * @param blob - Blob to parse
 * @param options - Parsing options
 * @returns Metadata via promise
 */
export function parseBlob(blob: Blob, options?: IOptions): Promise<IAudioMetadata> {
  return convertBlobToBuffer(blob).then(buf => {
    return mm.parseBuffer(buf, blob.type, options);
  });
}

/**
 * Parse fetched file, using the Web Fetch API
 * @param audioTrackUrl - URL to download the audio track from
 * @param options - Parsing options
 * @returns Metadata via promise
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
      debug('Closing HTTP-readable-stream...');
      if (!response.body.locked) { // Prevent error in Firefox
        await response.body.cancel();
      }
      debug('HTTP-readable-stream closed.');
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
 * @param tokenizer = source implementing the tokenizer interface
 * @param mimeType - Content specification MIME-type, e.g.: 'audio/mpeg'
 * @param options - Parsing options
 * @returns Metadata via promise
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
 * @param nativeTags - List of tags
 * @returns Tags indexed by id
 */
export const orderTags = mm.orderTags;

/**
 * Convert rating to 1-5 star rating
 * @param rating - Normalized rating [0..1] (common.rating[n].rating)
 * @returns Number of stars: 1, 2, 3, 4 or 5 stars
 */
export const ratingToStars = mm.ratingToStars;
