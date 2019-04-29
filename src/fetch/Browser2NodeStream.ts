import * as initDebug from 'debug';

const debug = initDebug('music-metadata-browser:stream');

/**
 * A mock readable-stream, using string to read from
 */
import { Readable } from 'stream';

/**
 * Converts a ReadableStream
 * https://developer.mozilla.org/en-US/docs/Web/API/ReadableStreamDefaultReader/read
 */
export class Browser2NodeStream extends Readable {

  public bytesRead: number = 0;

  /**
   * Browser stream
   */
  private reader: ReadableStreamReader;
  private pendingRead: Promise<ReadableStreamReadResult<any>>;

  constructor(stream: ReadableStream) {
    super();
    this.reader = stream.getReader();
  }

  public _read() {
    this.pendingRead = this.reader.read();
    this.pendingRead.then(res => {
      delete this.pendingRead;
      if (res.done) {
        this.push(null);
      } else {
        this.bytesRead += res.value.length;
        this.push(res.value);
      }
    });
  }

  public _destroy(error: Error | null, callback: (error: Error | null) => void): void {
    this.release().then(() => {
      debug(`release browser stream.`);
      callback(null);
    }).catch(err => {
      callback(err);
    });
  }

  /**
   * Wait for read to complete and release ReadableStreamReader
   */
  public async release(): Promise<void> {
    debug(`Release stream...`);
    if (this.pendingRead) {
      await this.pendingRead;
      this.reader.releaseLock();
    }
  }
}
