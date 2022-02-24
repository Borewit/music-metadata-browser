[![Karma CI](https://github.com/Borewit/music-metadata-browser/actions/workflows/karma-ci.yml/badge.svg)](https://github.com/Borewit/music-metadata-browser/actions/workflows/karma-ci.yml)
[![NPM version](https://badge.fury.io/js/music-metadata-browser.svg)](https://npmjs.org/package/music-metadata-browser)
[![npm downloads](http://img.shields.io/npm/dm/music-metadata-browser.svg)](https://npmcharts.com/compare/music-metadata-browser,jsmediatags?start=500&interval=30)
[![Known Vulnerabilities](https://snyk.io/test/github/Borewit/music-metadata-browser/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Borewit/music-metadata-browser?targetFile=package.json)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/Borewit/music-metadata-browser.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Borewit/music-metadata-browser/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Borewit/music-metadata-browser.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Borewit/music-metadata-browser/context:javascript)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/77818ccb061e445e907cacbafc6ac8c2)](https://www.codacy.com/app/Borewit/music-metadata-browser?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Borewit/music-metadata-browser&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/Borewit/music-metadata-browser/badge.svg?branch=master)](https://coveralls.io/github/Borewit/music-metadata-browser?branch=master)
[![Minified size](https://badgen.net/bundlephobia/min/music-metadata-browser)](https://bundlephobia.com/result?p=music-metadata-browser)
[![Chat](https://img.shields.io/discord/460524735235883049.svg)](https://discord.gg/M8EWZk7)

# music-metadata-browser

[music-metadata-browser](https://github.com/Borewit/music-metadata-browser) is a metadata parser, supporting virtual any audio format and tag header around.

[music-metadata-browser](https://github.com/Borewit/music-metadata-browser) is a node module, designed for modern browser applications.
Because modules don't run directly in the browser you need a _module bundler_, like [Webpack](https://webpack.js.org) or [Parcel](https://parceljs.org/).
The _module bundler_ turns the modules (dependencies), together with you application code, into a static asset (typically a minified JavaScript file).
The output of _module bundler_ is compatible and optimized for execution by a web browser.

Integration with React or Angular should not be a problem:
*   [example project using React framework](https://github.com/Borewit/music-metadata-react)
*   [example project using Angular framework](https://github.com/Borewit/audio-tag-analyzer)

If you prefer to parse files or streams server (node.js) side, you should use [music-metadata](https://github.com/Borewit/music-metadata) instead.

## Features

### Support for audio file types

| Audio format  | Description                     | Wiki                                                               |                                                                                                                                               |
| ------------- |---------------------------------| -------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------:|
| AIFF / AIFF-C | Audio Interchange File Format   | [:link:](https://wikipedia.org/wiki/Audio_Interchange_File_Format) | <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Apple_Computer_Logo_rainbow.svg" width="40" alt="Apple rainbow logo">           |
| AAC           | ADTS / Advanced Audio Coding    | [:link:](https://en.wikipedia.org/wiki/Advanced_Audio_Coding)      | <img src="https://svgshare.com/i/UT8.svg" width="40" alt="AAC logo">                                                                          |
| APE           | Monkey's Audio                  | [:link:](https://wikipedia.org/wiki/Monkey's_Audio)                | <img src="https://foreverhits.files.wordpress.com/2015/05/ape_audio.jpg" width="40" alt="Monkey's Audio logo">                                |
| ASF           | Advanced Systems Format         | [:link:](https://wikipedia.org/wiki/Advanced_Systems_Format)       |                                                                                                                                               |
| DSDIFF        | Philips DSDIFF                  | [:link:](https://wikipedia.org/wiki/Direct_Stream_Digital)         | <img src="https://upload.wikimedia.org/wikipedia/commons/b/bc/DSDlogo.svg" width="80" alt="DSD logo">                                         |
| DSF           | Sony's DSD Stream File          | [:link:](https://wikipedia.org/wiki/Direct_Stream_Digital)         | <img src="https://upload.wikimedia.org/wikipedia/commons/b/bc/DSDlogo.svg" width="80" alt="DSD logo">                                         |
| FLAC          | Free Lossless Audio Codec       | [:link:](https://wikipedia.org/wiki/FLAC)                          | <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/FLAC_logo_vector.svg" width="80" alt="FLAC logo">                               |
| MP2           | MPEG-1 Audio Layer II           | [:link:](https://wikipedia.org/wiki/MPEG-1_Audio_Layer_II)         |                                                                                                                                               |
| Matroska      | Matroska (EBML), mka, mkv       | [:link:](https://wikipedia.org/wiki/Matroska)                      | <img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Matroska_2010.svg" width="80" alt="Matroska logo">                              |                                                                                      
| MP3           | MPEG-1 / MPEG-2 Audio Layer III | [:link:](https://wikipedia.org/wiki/MP3)                           | <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Mp3.svg" width="80" alt="MP3 logo">                                             |
| MPC           | Musepack SV7                    | [:link:](https://wikipedia.org/wiki/Musepack)                      | <img src="https://www.musepack.net/pictures/musepack_logo.png" width="80" alt="musepack logo">                                                |
| MPEG 4        | mp4, m4a, m4v                   | [:link:](https://wikipedia.org/wiki/MPEG-4)                        | <img src="https://svgshare.com/i/UU3.svg" width="80" alt="mpeg 4 logo">                                                                       |
| Ogg           | Open container format           | [:link:](https://en.wikipedia.org/wiki/Ogg)                        | <img src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Ogg_Logo.svg" width="80" alt="Ogg logo">                                        |
| Opus          |                                 | [:link:](https://wikipedia.org/wiki/Opus_(audio_format))           | <img src="https://upload.wikimedia.org/wikipedia/commons/0/02/Opus_logo2.svg" width="80" alt="Opus logo">                                     |
| Speex         |                                 | [:link:](https://wikipedia.org/wiki/Speex)                         | <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Speex_logo_2006.svg" width="80" alt="Speex logo">                               |
| Theora        |                                 | [:link:](https://en.wikipedia.org/wiki/Theora)                     | <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/Theora_logo_2007.svg" width="70" alt="Theora logo">                             |
| Vorbis        | Vorbis audio compression        | [:link:](https://wikipedia.org/wiki/Ogg_Vorbis)                    | <img src="https://upload.wikimedia.org/wikipedia/commons/8/8d/Xiph.Org_logo_square.svg" width="70" alt="Vorbis logo">                         |
| WAV           | RIFF WAVE                       | [:link:](https://wikipedia.org/wiki/WAV)                           |                                                                                                                                               |
| WebM          | webm                            | [:link:](https://wikipedia.org/wiki/WebM)                          | <img src="https://upload.wikimedia.org/wikipedia/commons/3/34/WebM_logo.svg" width="80" alt="Matroska logo">                                  |                                                                                      
| WV            | WavPack                         | [:link:](https://wikipedia.org/wiki/WavPack)                       | <img src="http://www.wavpack.com/wavpacklogo.svg" width="60" alt="WavPack logo">                                                              |
| WMA           | Windows Media Audio             | [:link:](https://wikipedia.org/wiki/Windows_Media_Audio)           | <img src="https://upload.wikimedia.org/wikipedia/commons/7/76/Windows_Media_Player_simplified_logo.svg" width="40" alt="Windows Media logo">  |

### Support for tags

*   [APE](https://en.wikipedia.org/wiki/APE_tag)
*   [ASF](https://en.wikipedia.org/wiki/Advanced_Systems_Format)
*   EXIF 2.3
*   [ID3](https://wikipedia.org/wiki/ID3): ID3v1, ID3v1.1, ID3v2.2, [ID3v2.3](http://id3.org/id3v2.3.0) & [ID3v2.4](http://id3.org/id3v2.4.0-frames)
*   [RIFF](https://en.wikipedia.org/wiki/Resource_Interchange_File_Format)/INFO

Support for [MusicBrainz](https://musicbrainz.org/) tags as written by [Picard](https://picard.musicbrainz.org/).

### Audio format & encoding details

Support for encoding / format details:
*   [Bit rate](https://wikipedia.org/wiki/Bit_rate)
*   [Audio bit depth](https://wikipedia.org/wiki/Audio_bit_depth)
*   Duration
*   encoding profile (e.g. [CBR](https://en.wikipedia.org/wiki/Constant_bitrate), V0, V2)
  
## Online demo's
*   [<img src="https://raw.githubusercontent.com/Borewit/audio-tag-analyzer/master/src/assets/icon/audio-tag-analyzer.svg" width="40"> Audio Tag Analyzer](https://audio-tag-analyzer.netlify.com/)
*   [<img src="https://cdn.sanity.io/images/3do82whm/next/ba8c847f13a5fa39d88f8bc9b7846b7886531b18-2500x2500.svg" width="40"> Webamp](https://webamp.org/)
*   [<img src="https://raw.githubusercontent.com/hvianna/audioMotion.js/master/public/img/favicon256.png" width="40"> audioMotion](https://hvianna.github.io/audioMotion.js)
*   [<img src="https://diffuse.sh/images/diffuse-dark.svg" alt="Diffuse" width="160">](https://diffuse.sh/)

### Sponsor
[Become a sponsor to Borewit](https://github.com/sponsors/Borewit)

## Usage

### Installation
Install via [npm](http://npmjs.org/):

```bash
npm install music-metadata-browser
```
or using [yarn](https://yarnpkg.com/):
```bash
yarn add music-metadata-browser
```

### Import music-metadata

Import music-metadata in JavaScript
```js
const musicMetadata = require('music-metadata-browser');
```

This is how it's done in [TypeScript](https://www.typescriptlang.org/docs/home.html)
```ts
import * as musicMetadata from 'music-metadata-browser';
```

### Module Functions

There are currently three ways to parse (read) audio tracks:
1) parsing a Web API blob or file with the  [parseBlob function](#parseblob-function).
2) Using [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) using the [parseReadableStream function](#parsereadablestream-function).
3) Using [Node.js streams](https://nodejs.org/api/stream.html) using the [parseNodeStream function](#parsenodestream-function).
3) Provide a URL to [fetch the audio track from](#fetchurl-function).

#### parseBlob function

Parse an audio file from a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) or [File](https://developer.mozilla.org/en-US/docs/Web/API/File).

```js
const musicMetadata = require('music-metadata-browser');

let blob;

musicMetadata.parseBlob(blob).then(metadata => {
    // metadata has all the metadata found in the blob or file
  });
```
Or with async/await if you prefer:
```js
(async () => {
  let blob; // File or Blob

  const metadata = await musicMetadata.parseBlob(blob);
  // metadata has all the metadata found in the blob or file
});
```

#### parseReadableStream function

```js
import * as mm from 'music-metadata-browser';

(async () => {
  const metadata = await mm.parseReadableStream(readableStream);
  console.log(util.inspect(metadata, { showHidden: false, depth: null }));
});
```
Parse from a Web API [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) (web stream according [WTWG Streams Standard](https://streams.spec.whatwg.org/)).

If available, pass the mime-type and file-size. Without the mime-type, the content will be audio type will be automatically detected.

It is recommended to provide the corresponding [MIME-type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types). 
An extension (e.g.: `.mp3`), filename or path will also work.
If the MIME-type or filename is not provided, or not understood, music-metadata will try to derive the type from the content.

```js
import * as mm from 'music-metadata-browser';

const readableStream = result.node;

mm.parseReadableStream(readableStream, {size: 21032, mimeType: 'audio/mpeg'})
  .then( metadata => {
     console.log(util.inspect(metadata, { showHidden: false, depth: null }));
     someReadStream.cancel();
   });
```
 
#### parseNodeStream function

```js
import * as mm from 'music-metadata-browser';

mm.parseNodeStream(readableStream)
  .then( metadata => {
     console.log(util.inspect(metadata, { showHidden: false, depth: null }));
     readableStream.destroy();
   });
```
The readable stream is derived from [Node's readable stream](https://nodejs.org/api/stream.html#stream_readable_streams).

If available, pass the mime-type and file-size. Without the mime-type, the content will be audio type will be automatically detected.

```javascript
import * as mm from 'music-metadata-browser';

(async () => {
  const metadata = await mm.parseNodeStream(someReadStream, {mimeType: 'audio/mpeg', size: 26838 });
  console.log(util.inspect(metadata, { showHidden: false, depth: null }));
  someReadStream.close();
});
```

### fetchUrl function

If you wish to stream your audio track over HTTP you need can use `fetchFromUrl` which is using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to retrieve the audio track:

```js
import * as mm from 'music-metadata-browser';

(async () => {
  const metadata = await mm.fetchFromUrl(audioTrackUrl, options);
});
```

#### orderTags function

Utility to Converts the native tags to a dictionary index on the tag identifier

```js
orderTags(nativeTags: ITag[]): [tagId: string]: any[]
```

#### ratingToStars function

Can be used to convert the normalized rating value to the 0..5 stars, where 0 an undefined rating, 1 the star the lowest rating and 5 the highest rating.

```js
ratingToStars(rating)
```

`rating` is a number between 0.0 and 1.0

Returns the number of stars: 0, 1, 2, 3, 4 or 5.

#### selectCover function

Select cover image based on image type field, otherwise the first picture in file.

```ts
export function selectCover(pictures?: IPicture[]): IPicture | null
```

```js
import * as mm from 'music-metadata';

(async () => {
  const {common} = await mm.parseFile(filePath);
  const cover = mm.selectCover(common.picture); // pick the cover image
}
)();
 ```

### Options
*   `duration`: default: `false`, if set to `true`, it will parse the whole media file if required to determine the duration.
*   `fileSize`: only provide this in combination with `parseStream` function.
*   `observer: (update: MetadataEvent) => void;`: Will be called after each change to `common` (generic) tag, or `format` properties.
*   `skipCovers`: default: `false`, if set to `true`, it will not return embedded cover-art (images).
*   `skipPostHeaders? boolean` default: `false`, if set to `true`, it will not search all the entire track for additional headers. Only recommenced to use in combination with streams.
*   `includeChapters` default: `false`, if set to `true`, it will parse chapters (currently only MP4 files). _experimental functionality_

Although in most cases duration is included, in some cases it requires `music-metadata` parsing the entire file.
To enforce parsing the entire file if needed you should set `duration` to `true`.
    
### Metadata result

If the returned promise resolves, the metadata (TypeScript `IAudioMetadata` interface) contains:

*   [`format: IFormat`](#format) Audio format information
*   `native: INativeTags` List of native (original) tags found in the parsed audio file.
*   [`common: ICommonTagsResult`](https://github.com/Borewit/music-metadata/blob/master/doc/common_metadata.md) Is a generic (abstract) way of reading metadata information. 
  
#### Format
  
Audio format information. Defined in the TypeScript `IFormat` interface:
*   `container?: string` Audio encoding format. e.g.: 'flac'
*   `codec?` Name of the codec (algorithm used for the audio compression)
*   `codecProfile?: string` Codec profile / settings
*   `tagTypes?: TagType[]`  List of tagging formats found in parsed audio file
*   `duration?: number` Duration in seconds
*   `bitrate?: number` Number bits per second of encoded audio file
*   `sampleRate?: number` Sampling rate in Samples per second (S/s)
*   `bitsPerSample?: number` Audio bit depth
*   `lossless?: boolean` True if lossless,  false for lossy encoding
*   `numberOfChannels?: number` Number of audio channels
*   `numberOfSamples?: number` Number of samples frames, one sample contains all channels. The duration is: numberOfSamples / sampleRate
  
#### Common

[Common tag documentation](https://github.com/Borewit/music-metadata/blob/master/doc/common_metadata.md) is automatically generated.

## Licence

The MIT License (MIT)

Copyright © 2022 Borewit

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
