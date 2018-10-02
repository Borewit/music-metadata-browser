import * as Stream from 'stream';
import * as http from 'stream-http';
import * as mm from './index';

function httpGetByUrl(url: string): Promise<Stream.Readable> {
  // Assume URL
  return new Promise(resolve => {
    http.get(url, stream => {
      resolve(stream);
    });
  });
}

const urlInBloom = 'https://raw.githubusercontent.com/Borewit/music-metadata/master/test/samples/Nirvana - In Bloom - 2-sec.ogg';

function getAsBlob(url: string): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob'; // force the HTTP response, response-type header to be blob
    xhr.onload = () => {
      resolve(xhr.response); // xhr.response is now a blob object
    };
    xhr.onerror = () => {
      reject(new Error(`Failed download url=${url}`));
    };
    xhr.send();
  });
}

interface IParserTest {
  methodDescription: string;

  parseUrl(audioTrackUrl: string, options?: mm.IOptions): Promise<mm.IAudioMetadata>;
}

const parsers: IParserTest[] = [
  {
    methodDescription: 'parseStream()',
    parseUrl: (audioTrackUrl, options) => {
      return httpGetByUrl(audioTrackUrl).then(stream => {
        return mm.parseStream(stream, (stream as any).type, options);
      });
    }
  },
  {
    methodDescription: 'parseBlob()',
    parseUrl: (audioTrackUrl, options) => {
      return getAsBlob(audioTrackUrl).then(blob => {
        return mm.parseBlob(blob, options);
      });
    }
  }
];

describe('music-metadata-browser', () => {

  describe('Parse Ogg audio track: Nirvana - In Bloom', () => {

    parsers.forEach(parser => {

      it(parser.methodDescription, () => {
        return parser.parseUrl(urlInBloom, {native: true}).then(metadata => {
          expect(metadata).toBeDefined();

          expect(metadata.format.tagTypes).toEqual(['vorbis'], 'expect Vorbis metadata header');
          expect(metadata.format.duration).toEqual(2.0, 'duration should be 2.0 sec');
          expect(metadata.format.sampleRate).toEqual(44100, 'sample-rate should be 44.1 kHz');
          expect(metadata.format.numberOfChannels).toEqual(2, 'number of channels should be 2 (stereo)');
          expect(metadata.format.bitrate).toEqual(64000, 'bitrate should be 64 kbit/sec');

          expect(metadata.common.title).toEqual('In Bloom');
          expect(metadata.common.artist).toEqual('Nirvana');
          expect(metadata.common.albumartist).toEqual('Nirvana', 'common.albumartist');
          expect(metadata.common.album).toEqual('Nevermind', 'common.album');
          expect(metadata.common.year).toEqual(1991, 'common.year');
          expect(metadata.common.track).toEqual({no: 2, of: 12}, 'common.track');
          expect(metadata.common.disk).toEqual({no: 1, of: 1}, 'common.disk');
          expect(metadata.common.genre).toEqual(['Grunge', 'Alternative'], 'genre');
          expect(metadata.common.picture[0].format).toEqual('image/jpeg', 'picture format');
          expect(metadata.common.picture[0].data.length).toEqual(30966, 'picture length');
          expect(metadata.common.barcode).toEqual('0720642442524', 'common.barcode (including leading zero)');
          expect(metadata.common.asin).toEqual('B000003TA4', 'common.asin');
          expect(metadata.common.catalognumber).toEqual(['GED24425'], 'common.asin');
          expect(metadata.common.isrc).toEqual(['USGF19942502'], 'common.isrc');

          // Make sure the orderTags is working
          const vorbisTags = mm.orderTags(metadata.native.vorbis);

          expect(vorbisTags.TRACKNUMBER).toEqual(['2'], 'vorbis.TRACKNUMBER');
          expect(vorbisTags.TRACKTOTAL).toEqual(['12'], 'vorbis.TRACKTOTAL');
        });

      }, 5000);
    });
  });

  it('Should expose the `ratingToStars()`', () => {
    expect(mm.ratingToStars(1.0)).toEqual(5);
  });

});
