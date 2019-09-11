localStorage.debug = 'music-metadata-browser:*';
import * as Stream from 'stream';
import * as http from 'stream-http';
import * as mm from './index';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

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
        return mm.parseNodeStream(stream, (stream as any).type, options);
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
  },
  {
    methodDescription: 'fetchFromUrl()',
    parseUrl: (audioTrackUrl, options) => {
      return mm.fetchFromUrl(audioTrackUrl, options);
    }
  }
];

const tiuqottigeloot_vol24_Tracks = [
  {
    url: '/Various%20Artists%20-%202009%20-%20netBloc%20Vol%2024_%20tiuqottigeloot%20%5BMP3-V2%5D/01%20-%20Diablo%20Swing%20Orchestra%20-%20Heroines.mp3',
    duration: 322.612245,
    metaData: {
      title: 'Heroines',
      artist: 'Diablo Swing Orchestra'
    }
  },
  {
    url: '/Various%20Artists%20-%202009%20-%20netBloc%20Vol%2024_%20tiuqottigeloot%20%5BMP3-V2%5D/02%20-%20Eclectek%20-%20We%20Are%20Going%20To%20Eclecfunk%20Your%20Ass.mp3',
    duration: 190.093061,
    metaData: {
      title: 'We Are Going to Eclecfunk Your Ass',
      artist: 'Eclectek'
    }
  },
  {
    url:
      '/Various%20Artists%20-%202009%20-%20netBloc%20Vol%2024_%20tiuqottigeloot%20%5BMP3-V2%5D/03%20-%20Auto-Pilot%20-%20Seventeen.mp3',
    duration: 214.622041,
    metaData: {
      title: 'Seventeen',
      artist: 'Auto-Pilot'
    }
  },
  {
    url:
      '/Various%20Artists%20-%202009%20-%20netBloc%20Vol%2024_%20tiuqottigeloot%20%5BMP3-V2%5D/04%20-%20Muha%20-%20Microphone.mp3',
    duration: 181.838367,
    metaData: {
      title: 'Microphone',
      artist: 'Muha'
    }
  },
  {
    url:
      '/Various%20Artists%20-%202009%20-%20netBloc%20Vol%2024_%20tiuqottigeloot%20%5BMP3-V2%5D/05%20-%20Just%20Plain%20Ant%20-%20Stumble.mp3',
    duration: 86.047347,
    metaData: {
      title: 'Stumble',
      artist: 'Just Plain Ant'
    }
  },
  {
    url:
      '/Various%20Artists%20-%202009%20-%20netBloc%20Vol%2024_%20tiuqottigeloot%20%5BMP3-V2%5D/06%20-%20Sleaze%20-%20God%20Damn.mp3',
    duration: 226.795102,
    metaData: {
      title: 'God Damn',
      artist: 'Sleaze'
    }
  },
  {
    url:
      '/Various%20Artists%20-%202009%20-%20netBloc%20Vol%2024_%20tiuqottigeloot%20%5BMP3-V2%5D/07%20-%20Juanitos%20-%20Hola%20Hola%20Bossa%20Nova.mp3',
    duration: 207.072653,
    metaData: {
      title: 'Hola Hola Bossa Nova',
      artist: 'Juanitos'
    }
  },
  {
    url:
      '/Various%20Artists%20-%202009%20-%20netBloc%20Vol%2024_%20tiuqottigeloot%20%5BMP3-V2%5D/08%20-%20Entertainment%20For%20The%20Braindead%20-%20Resolutions%20(Chris%20Summer%20Remix).mp3',
    duration: 314.331429,
    metaData: {
      title: 'Resolutions (Chris Summer remix)',
      artist: 'Entertainment for the Braindead'
    }
  },
  {
    url:
      '/Various%20Artists%20-%202009%20-%20netBloc%20Vol%2024_%20tiuqottigeloot%20%5BMP3-V2%5D/09%20-%20Nobara%20Hayakawa%20-%20Trail.mp3',
    duration: 204.042449,
    metaData: {
      title: 'Trail',
      artist: 'Nobara Hayakawa'
    }
  },
  {
    url:
      '/Various%20Artists%20-%202009%20-%20netBloc%20Vol%2024_%20tiuqottigeloot%20%5BMP3-V2%5D/10%20-%20Paper%20Navy%20-%20Tongue%20Tied.mp3',
    duration: 201.116735,
    metaData: {
      title: 'Tongue Tied',
      artist: 'Paper Navy'
    }
  },
  {
    url:
      '/Various%20Artists%20-%202009%20-%20netBloc%20Vol%2024_%20tiuqottigeloot%20%5BMP3-V2%5D/11%20-%2060%20Tigres%20-%20Garage.mp3',
    duration: 245.394286,
    metaData: {
      title: 'Garage',
      artist: '60 Tigres'
    }
  },
  {
    url:
      '/Various%20Artists%20-%202009%20-%20netBloc%20Vol%2024_%20tiuqottigeloot%20%5BMP3-V2%5D/12%20-%20CM%20aka%20Creative%20-%20The%20Cycle%20(Featuring%20Mista%20Mista).mp3',
    duration: 221.44,
    metaData: {
      title: 'The Cycle (feat. Mista Mista)',
      artist: 'CM aka Creative'
    }
  }
];

xdescribe('music-metadata-browser', () => {

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

describe('Parse Tiuqottigeloot Vol 24 tracks', () => {

  parsers.forEach(parser => {

    describe(`Parser: ${parser.methodDescription}`, () => {

      tiuqottigeloot_vol24_Tracks.forEach(track => {
        it(`track ${track.metaData.artist} - ${track.metaData.title}`, () => {
          const url = 'https://raw.githubusercontent.com/Borewit/test-audio/958e057' + track.url;
          return parser.parseUrl(url).then(metadata => {
            expect(metadata.common.artist).toEqual(track.metaData.artist);
            expect(metadata.common.title).toEqual(track.metaData.title);
          });
        });
      });
    });

  });

});
