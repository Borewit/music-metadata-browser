import * as initDebug from 'debug';

const debug = initDebug('music-metadata-browser:stream');

/**
 * Converts a Web-API stream into Node stream.Readable class
 * Node stream readable: https://nodejs.org/api/stream.html#stream_readable_streams
 * Web API readable-stream: https://developer.mozilla.org/en-US/docs/Web/API/ReadableStreamhttps://nodejs.org/api/stream.html#stream_readable_streams
 */
import { Readable } from 'stream';

/**
 * Converts a ReadableStream
 * https://developer.mozilla.org/en-US/docs/Web/API/ReadableStreamDefaultReader/read
 */
export class Browser2NodeStream extends Readable {

  public bytesRead: number = 0;
  public released = false;

  /**
   * Default web API stream reader
   * https://developer.mozilla.org/en-US/docs/Web/API/ReadableStreamDefaultReader
   */
  private reader: ReadableStreamDefaultReader;
  private pendingRead: Promise<ReadableStreamReadResult<any>>;

  /**
   *
   * @param stream Readable​Stream: https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
   */
  constructor(stream: ReadableStream) {
    super();
    this.reader = stream.getReader();
  }

  /**
   * https://nodejs.org/api/stream.html#stream_readable_read_size_1
   */
  public async _read() {
    // Should start pushing data into the queue
    // Read data from the underlying Web-API-readable-stream
    if (this.released) {
      return;
    }
    this.pendingRead = this.reader.read();
    try {
      const data = await this.pendingRead;
      if (data.done || this.released) {
        this.push(null);
      } else {
        this.bytesRead += data.value.length;
        this.push(data.value);
      }
    } finally {
      delete this.pendingRead;
    }
  }

  public async waitForReadToComplete() {
    if (this.pendingRead) {
      await this.pendingRead;
    }

  }

  /**
   * Close wrapper
   */
  public async close(): Promise<void> {
    debug(`close()`);
    await this.syncAndRelease();
  }

  private async syncAndRelease() {
    debug(`syncAndRelease()`);
    this.released = true;
    await this.waitForReadToComplete();
    // Trick to release the reader after the read-promise resolved AND returned
    await new Promise(resolve => setTimeout(resolve, 1));
    await this.reader.releaseLock();
  }
}
