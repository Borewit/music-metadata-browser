// localStorage.debug = 'music-metadata-browser';
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

const webAmpTracks = [
  {
    url:
      'https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Diablo_Swing_Orchestra_-_01_-_Heroines.mp3',
    duration: 322.612245,
    metaData: {
      title: 'Heroines',
      artist: 'Diablo Swing Orchestra'
    }
  },
  {
    url:
      'https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Eclectek_-_02_-_We_Are_Going_To_Eclecfunk_Your_Ass.mp3',
    duration: 190.093061,
    metaData: {
      title: 'We Are Going To Eclecfunk Your Ass',
      artist: 'Eclectek'
    }
  },
  {
    url:
      'https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Auto-Pilot_-_03_-_Seventeen.mp3',
    duration: 214.622041,
    metaData: {
      title: 'Seventeen',
      artist: 'Auto-Pilot'
    }
  },
  {
    url:
      'https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Muha_-_04_-_Microphone.mp3',
    duration: 181.838367,
    metaData: {
      title: 'Microphone',
      artist: 'Muha'
    }
  },
  {
    url:
      'https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Just_Plain_Ant_-_05_-_Stumble.mp3',
    duration: 86.047347,
    metaData: {
      title: 'Stumble',
      artist: 'Just Plain Ant'
    }
  },
  {
    url:
      'https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Sleaze_-_06_-_God_Damn.mp3',
    duration: 226.795102,
    metaData: {
      title: 'God Damn',
      artist: 'Sleaze'
    }
  },
  {
    url:
      'https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Juanitos_-_07_-_Hola_Hola_Bossa_Nova.mp3',
    duration: 207.072653,
    metaData: {
      title: 'Hola Hola Bossa Nova',
      artist: 'Juanitos'
    }
  },
  {
    url:
      'https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Entertainment_for_the_Braindead_-_08_-_Resolutions_Chris_Summer_Remix.mp3',
    duration: 314.331429,
    metaData: {
      title: 'Resolutions (Chris Summer Remix)',
      artist: 'Entertainment for the Braindead'
    }
  },
  {
    url:
      'https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Nobara_Hayakawa_-_09_-_Trail.mp3',
    duration: 204.042449,
    metaData: {
      title: 'Trail',
      artist: 'Nobara Hayakawa'
    }
  },
  {
    url:
      'https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Paper_Navy_-_10_-_Tongue_Tied.mp3',
    duration: 201.116735,
    metaData: {
      title: 'Tongue Tied',
      artist: 'Paper Navy'
    }
  },
  {
    url:
      'https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/60_Tigres_-_11_-_Garage.mp3',
    duration: 245.394286,
    metaData: {
      title: 'Garage',
      artist: '60 Tigres'
    }
  },
  {
    url:
      'https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/CM_aka_Creative_-_12_-_The_Cycle_Featuring_Mista_Mista.mp3',
    duration: 221.44,
    metaData: {
      title: 'The Cycle (Featuring Mista Mista)',
      artist: 'CM aka Creative'
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

describe('Parse WebAmp tracks', () => {

  parsers.forEach(parser => {

    describe(`Parser: ${parser.methodDescription}`, () => {

      webAmpTracks.forEach(track => {
        it(`track ${track.metaData.artist} - ${track.metaData.title}`, () => {
          return parser.parseUrl(track.url).then(metadata => {
            expect(metadata.common.artist).toEqual(track.metaData.artist);
            expect(metadata.common.title).toEqual(track.metaData.title);
          });
        });
      });
    });

  });

});
