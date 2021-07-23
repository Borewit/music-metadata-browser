import * as initDebug from 'debug';
import { IAudioMetadata, IOptions } from 'music-metadata/lib/type';
import * as mm from 'music-metadata/lib/core';
import { ReadableWebToNodeStream } from 'readable-web-to-node-stream';

const debug = initDebug('music-metadata-browser:main');

export { IPicture, IAudioMetadata, IOptions, ITag, INativeTagDict, IChapter } from 'music-metadata/lib/type';

export {  parseBuffer, parseFromTokenizer, orderTags, ratingToStars, IFileInfo, selectCover } from 'music-metadata/lib/core';

/**
 * Parse audio Stream
 * @param stream - ReadableStream
 * @param contentType - MIME-Type
 * @param options - Parsing options
 * @returns Metadata
 */
export const parseNodeStream = mm.parseStream;

/**
 * Parse Web API ReadableStream: https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
 * @param stream - ReadableStream
 * @param fileInfo FileInfo object or MIME-Type
 * @param options - Parsing options
 * @returns Metadata
 */
export async function parseReadableStream(stream: ReadableStream, fileInfo?: mm.IFileInfo | string, options?: IOptions): Promise<IAudioMetadata> {
  const ns = new ReadableWebToNodeStream(stream);
  const res = await parseNodeStream(ns as any, typeof fileInfo === 'string' ? {mimeType: fileInfo} : fileInfo, options);
  await ns.close();
  return res;
}

/**
 * Parse Web API File
 * @param blob - Blob to parse
 * @param options - Parsing options
 * @returns Metadata
 */
export async function parseBlob(blob: Blob, options?: IOptions): Promise<IAudioMetadata> {
  const uint8Array = await convertBlobToUint8Array(blob);
  const fileInfo: mm.IFileInfo = {mimeType: blob.type, size: blob.size};
  if ((blob as File).name) {
    fileInfo.path = (blob as File).name;
  }
  return mm.parseBuffer(uint8Array, {mimeType: blob.type, size: blob.size}, options);
}

/**
 * Parse fetched file, using the Web Fetch API
 * @param audioTrackUrl - URL to download the audio track from
 * @param options - Parsing options
 * @returns Metadata
 */
export async function fetchFromUrl(audioTrackUrl: string, options?: IOptions): Promise<IAudioMetadata> {
  const response = await fetch(audioTrackUrl);
  const fileInfo: mm.IFileInfo = {
    size: parseInt(response.headers.get('Content-Length'), 10),
    mimeType: response.headers.get('Content-Type')
  };
  if (response.ok) {
    if (response.body) {
      const res = await this.parseReadableStream(response.body, fileInfo, options);
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
 * Convert Web API File to Node Buffer
 * @param blob - Web API Blob
 * @returns Uint8Array
 */
function convertBlobToUint8Array(blob: Blob): Promise<Uint8Array> {
  return new Promise<Uint8Array>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onloadend = event => {
      let data = (event.target as any).result;
      if (data instanceof ArrayBuffer) {
        data = new Uint8Array(data);
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
