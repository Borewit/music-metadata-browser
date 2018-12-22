[![Build Status](https://travis-ci.org/Borewit/music-metadata-browser.svg?branch=master)](https://travis-ci.org/Borewit/music-metadata-browser)
[![NPM version](https://badge.fury.io/js/music-metadata-browser.svg)](https://npmjs.org/package/music-metadata-browser)
[![npm downloads](http://img.shields.io/npm/dm/music-metadata-browser.svg)](https://npmjs.org/package/music-metadata-browser)
[![dependencies Status](https://david-dm.org/Borewit/music-metadata-browser/status.svg)](https://david-dm.org/Borewit/music-metadata-browser)
[![Known Vulnerabilities](https://snyk.io/test/github/Borewit/music-metadata/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Borewit/music-metadata-browser?targetFile=package.json)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/77818ccb061e445e907cacbafc6ac8c2)](https://www.codacy.com/app/Borewit/music-metadata-browser?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Borewit/music-metadata-browser&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/Borewit/music-metadata-browser/badge.svg?branch=master)](https://coveralls.io/github/Borewit/music-metadata-browser?branch=master)
[![Minified size](https://badgen.net/bundlephobia/min/music-metadata-browser)](https://bundlephobia.com/result?p=music-metadata-browser)
[![Chat](https://img.shields.io/discord/460524735235883049.svg)](https://discord.gg/M8EWZk7)

# music-metadata-browser

[music-metadata](https://github.com/Borewit/music-metadata) release for the browser.

## Features

  * Supports metadata of the following audio and tag types:

### Support for audio file types

| Audio format  | Description                     | Wiki                                                               |                                                                                                                                               |
| ------------- |---------------------------------| -------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------:|
| AIFF / AIFF-C | Audio Interchange File Format   | [:link:](https://wikipedia.org/wiki/Audio_Interchange_File_Format) | <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Apple_Computer_Logo_rainbow.svg" width="40" alt="Apple rainbow logo">           |
| APE           | Monkey's Audio                  | [:link:](https://wikipedia.org/wiki/Monkey's_Audio)                | <img src="https://foreverhits.files.wordpress.com/2015/05/ape_audio.jpg" width="40" alt="Monkey's Audio logo">                                |
| ASF           | Advanced Systems Format         | [:link:](https://wikipedia.org/wiki/Advanced_Systems_Format)       |                                                                                                                                               |
| FLAC          | Free Lossless Audio Codec       | [:link:](https://wikipedia.org/wiki/FLAC)                          | <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Flac_logo_vector.svg" width="80" alt="FLAC logo">                               |
| MP2           | MPEG-1 Audio Layer II           | [:link:](https://wikipedia.org/wiki/MPEG-1_Audio_Layer_II)         |                                                                                                                                               |
| MP3           | MPEG-1 / MPEG-2 Audio Layer III | [:link:](https://wikipedia.org/wiki/MP3)                           | <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Mp3.svg" width="80" alt="MP3 logo">                                             |
| MPC           | Musepack SV7                    | [:link:](https://wikipedia.org/wiki/Musepack)                      | <img src="https://www.musepack.net/pictures/musepack_logo.png" width="80" alt="musepack logo">                                                                          |
| MPEG 4        | mp4, m4a, m4v, aac              | [:link:](https://wikipedia.org/wiki/MPEG-4)                        | <img src="https://svgshare.com/i/8Ss.svg" width="40" alt="AAC logo">                                                                          |
| Ogg / Opus    |                                 | [:link:](https://wikipedia.org/wiki/Opus_(audio_format))           | <img src="https://upload.wikimedia.org/wikipedia/commons/0/02/Opus_logo2.svg" width="80" alt="Opus logo">                                     |
| Ogg / Speex   |                                 | [:link:](https://wikipedia.org/wiki/Speex)                         | <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Speex_logo_2006.svg" width="80" alt="Speex logo">                               |
| Ogg / Vorbis  |                                 | [:link:](https://wikipedia.org/wiki/Ogg_Vorbis)                    | <img src="https://upload.wikimedia.org/wikipedia/commons/8/8d/Xiph.Org_logo_square.svg" width="70" alt="Vorbis logo">                                |
| WAV           |                                 | [:link:](https://wikipedia.org/wiki/WAV)                           | <img src="https://www.shareicon.net/download/2015/12/08/684232_file.svg" width="60" alt="WAV logo">                                           |
| WV            | WavPack                         | [:link:](https://wikipedia.org/wiki/WavPack)                       | <img src="http://www.wavpack.com/wavpacklogo.svg" width="60" alt="WavPack logo">                                                              |
| WMA           | Windows Media Audio             | [:link:](https://wikipedia.org/wiki/Windows_Media_Audio)           | <img src="https://upload.wikimedia.org/wikipedia/commons/7/76/Windows_Media_Player_simplified_logo.svg" width="40" alt="Windows Media logo">  |

### Support for tags

* [APE](https://en.wikipedia.org/wiki/APE_tag)
* [ASF](https://en.wikipedia.org/wiki/Advanced_Systems_Format)
* EXIF 2.3
* [ID3](https://wikipedia.org/wiki/ID3): ID3v1, ID3v1.1, ID3v2.2, [ID3v2.3](http://id3.org/id3v2.3.0) & [ID3v2.4](http://id3.org/id3v2.4.0-frames)
* [RIFF](https://en.wikipedia.org/wiki/Resource_Interchange_File_Format)/INFO

Support for [MusicBrainz](https://musicbrainz.org/) tags as written by [Picard](https://picard.musicbrainz.org/).

### Audio format & encoding details

Support for encoding / format details:
* [Bit rate](https://wikipedia.org/wiki/Bit_rate)
* [Audio bit depth](https://wikipedia.org/wiki/Audio_bit_depth)
* Duration
* encoding profile (e.g. [CBR](https://en.wikipedia.org/wiki/Constant_bitrate), V0, V2)
  
## Online demo's
  * [<img src="https://gitcdn.xyz/repo/Borewit/audio-tag-analyzer/master/src/assets/icon/audio-tag-analyzer.svg" width="40">Audio Tag Analyzer](https://audio-tag-analyzer.netlify.com/)
  * [<img src="https://svgshare.com/i/8uW.svg" width="40"> Webamp](https://webamp.org/)


### Donation
Not required, but would be extremely motivating.
[PayPal.me](https://paypal.me/borewit)

### Installation
Install via [npm](http://npmjs.org/):

```bash
npm install music-metadata
```
or yarn
```bash
yarn add music-metadata
```

### Import music-metadata

This is how you can import music-metadata in JavaScript, in you code:
```JavaScript
var mm = require('music-metadata-browser');
```

This is how it's done in TypeScript:
```TypeScript
import * as mm from 'music-metadata-browser';
```

### Module Functions

There are currently three ways to parse (read) audio tracks:
1) parsing a Web API blob or file with the  [parseBlob function](#parseblob-function).
2) Using [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) using the [parseReadableStream function](#parsereadablestream-function).
3) Using [Node.js streams](https://nodejs.org/api/stream.html) using the [parseNodeStream function](#parsenodestream-function).
3) Provide a URL to [fetch the audio track from](#fetchurl-function).

#### parseBlob function

To convert a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) or [File](https://developer.mozilla.org/en-US/docs/Web/API/File) into a [stream](https://nodejs.org/api/stream.html#stream_readable_streams), 
[filereader-stream](https://www.npmjs.com/package/filereader-stream) is used.

```javascript
import * as mm from 'music-metadata-browser';

/**
* @param blob Blob (e.g. Web API File)
*/
function readFromBlob(blob) {
  
  // blob is a Web API Blob or File
  mm.parseBlob(blob).then(metadata => {
    // metadata has all the metadata found in the blob or file
  });
}
```

#### parseReadableStream function

```javascript
import * as mm from 'music-metadata-browser';

mm.parseReadableStream(readableStream)
  .then( metadata => {
     console.log(util.inspect(metadata, { showHidden: false, depth: null }));
     readableStream.close();
   });
```
Parse from a Web API [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream).

If available, pass the mime-type and file-size. Without the mime-type, the content will be audio type will be automatically detected.

It is recommended to provide the corresponding [MIME-type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types). 
An extension (e.g.: `.mp3`), filename or path will also work.
If the MIME-type or filename is not provided, or not understood, music-metadata will try to derive the type from the content.

```javascript
import * as mm from 'music-metadata-browser';

const readableStream = result.node;

mm.parseReadableStream(readableStream, 'audio/mpeg', { fileSize: 26838 })
  .then( metadata => {
     console.log(util.inspect(metadata, { showHidden: false, depth: null }));
     someReadStream.cancel();
   });
```
 
#### parseNodeStream function

```javascript
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

mm.parseNodeStream(someReadStream, 'audio/mpeg', { fileSize: 26838 })
  .then( metadata => {
     console.log(util.inspect(metadata, { showHidden: false, depth: null }));
     someReadStream.close();
   });
```

### fetchUrl function

If you wish to stream your audio track over HTTP you need can use `fetchFromUrl` which is using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to retrieve the audio track:

```javascript
import * as mm from 'music-metadata-browser';

/**
* Stream over HTTP from URL
*/
return mm.fetchFromUrl(audioTrackUrl, options)
```

#### orderTags function

Utility to Converts the native tags to a dictionary index on the tag identifier

```javascript
orderTags(nativeTags: ITag[]): [tagId: string]: any[]
```

#### ratingToStars function

Can be used to convert the normalized rating value to the 0..5 stars, where 0 an undefined rating, 1 the star the lowest rating and 5 the highest rating.

```javascript
ratingToStars(rating: number): number
```

### Options

The following (optional) configurations can be passed:
* `duration`: default: `false`, if set to `true`, it will parse the whole media file if required to determine the duration.
* `fileSize`: provide this if parsing from a stream.
* `loadParser: (moduleName: string) => Promise<ITokenParser>;`: default: lazy load using require, allows custom async lazy loading of parser modules. The resolved `ITokenParser` will not be cached.
* `native`: default: `false`, if set to `true`, it will return native tags in addition to the `common` tags.
* `observer: (update: MetadataEvent) => void;`: Will be called after each change to `common` (generic) tag, or `format` properties.
* `skipCovers`: default: `false`, if set to `true`, it will not return embedded cover-art (images).
* `skipPostHeaders? boolean` default: `false`, if set to `true`, it will not search all the entire track for additional headers. Only recommenced to use in combination with streams.

Although in most cases duration is included, in some cases it requires `music-metadata` parsing the entire file.
To enforce parsing the entire file if needed you should set `duration` to `true`.
    
### Metadata result:

If the returned promise resolves, the metadata (TypeScript `IAudioMetadata` interface) contains:

* [`format: IFormat`](#format) Audio format information
* `native: INativeTags` List of native (original) tags found in the parsed audio file. If the native option is set to false, this property is not defined.
* [`common: ICommonTagsResult`](doc/common_metadata.md) Is a generic (abstract) way of reading metadata information. 
  
#### Format
  
Audio format information. Defined in the TypeScript `IFormat` interface:
* `dataformat?: string` Audio encoding format. e.g.: 'flac'
* `tagTypes?: TagType[]`  List of tagging formats found in parsed audio file
* `duration?: number` Duration in seconds
* `bitrate?: number` Number bits per second of encoded audio file
* `sampleRate?: number` Sampling rate in Samples per second (S/s)
* `bitsPerSample?: number` Audio bit depth
* `encoder?` Encoder name
* `codecProfile?: string` Codec profile
* `lossless?: boolean` True if lossless,  false for lossy encoding
* `numberOfChannels?: number` Number of audio channels
* `numberOfSamples?: number` Number of samples frames, one sample contains all channels. The duration is: numberOfSamples / sampleRate
  
#### Common

[Common tag documentation](doc/common_metadata.md) is automatically generated.

#### Automated testing

Automated unit tests are planned to be tested with different browsers. This service has been made available by: 

[<img src="https://svgshare.com/i/8i6.svg" width="250" alt="Windows Media logo">](http://browserstack.com/)

## Licence

(The MIT License)

Copyright (c) 2017 Borewit

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
