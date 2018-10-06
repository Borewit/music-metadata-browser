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

  private reader: ReadableStreamReader;

  constructor(stream: ReadableStream) {
    super();
    this.reader = stream.getReader();
  }

  public _read() {
    this.reader.read().then(res => {
      if (res.done) {
        this.push(null);
      } else {
        this.bytesRead += res.value.length;
        this.push(res.value);
      }
    });
  }

  public _destroy(error: Error | null, callback: (error: Error | null) => void): void {
    this.reader.cancel().then(() => {
      callback(null);
    }).catch(err => {
      callback(err);
    });
  }
}
