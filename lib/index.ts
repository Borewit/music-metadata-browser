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
 * @param stream - ReadableStream (web stream according WTWG Streams Standard)
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
  const fileInfo: mm.IFileInfo = {mimeType: blob.type, size: blob.size};
  if (blob instanceof File) {
    fileInfo.path = (blob as File).name;
  }

  const stream = (blob.stream ? blob.stream() : convertBlobToReadableStream(blob)) as ReadableStream<any>;
  return parseReadableStream(stream, {mimeType: blob.type, size: blob.size}, options);
}

/**
 * Convert Blob to ReadableStream
 * Fallback for Safari versions < 14.1
 * @param blob
 */
function convertBlobToReadableStream(blob: Blob): ReadableStream {

  const fileReader = new FileReader();

  return new ReadableStream({
    start(controller) {
      // The following function handles each data chunk
      fileReader.onloadend = event => {
        let data = (event.target as any).result;
        if (data instanceof ArrayBuffer) {
          data = new Uint8Array(data);
        }
        controller.enqueue(data);
        controller.close();
      };

      fileReader.onerror = error => {
        controller.close();
      };

      fileReader.onabort = error => {
        controller.close();
      };
      fileReader.readAsArrayBuffer(blob);
    }
  });
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
      const res = await parseReadableStream(response.body, fileInfo, options);
      debug('Closing HTTP-readable-stream...');
      if (!response.body.locked) { // Prevent error in Firefox
        await response.body.cancel();
      }
      debug('HTTP-readable-stream closed.');
      return res;
    } else {
      // Fall back on Blob
      return parseBlob(await response.blob(), options);
    }
  } else {
    throw new Error(`HTTP error status=${response.status}: ${response.statusText}`);
  }
}
