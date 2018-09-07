[![Build Status](https://travis-ci.org/Borewit/music-metadata-browser.svg?branch=master)](https://travis-ci.org/Borewit/music-metadata-browser)
[![NPM version](https://badge.fury.io/js/music-metadata-browser.svg)](https://npmjs.org/package/music-metadata-browser)
[![npm downloads](http://img.shields.io/npm/dm/music-metadata-browser.svg)](https://npmjs.org/package/music-metadata-browser)
[![dependencies Status](https://david-dm.org/Borewit/music-metadata-browser/status.svg)](https://david-dm.org/Borewit/music-metadata-browser)
# music-metadata-browser

[music-metadata](https://github.com/Borewit/music-metadata) release for the browser.

## Features

* Supports metadata of the following audio and tag types:

### Support for audio file types:

| Audio format  | Description                    | Wiki                                                               |   |
| ------------- |--------------------------------| -------------------------------------------------------------------|---|
| AIFF          | Audio Interchange File Format  | [:link:](https://wikipedia.org/wiki/Audio_Interchange_File_Format) |
| APE           | Monkey's Audio                 | [:link:](https://wikipedia.org/wiki/Monkey's_Audio)                | 
| ASF           | Advanced Systems Format        | [:link:](https://wikipedia.org/wiki/Advanced_Systems_Format)       | 
| FLAC          | Free Lossless Audio Codec      | [:link:](https://wikipedia.org/wiki/FLAC)                          | <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Flac_logo_vector.svg" width="80">
| MP2           | MPEG-1 Audio Layer II          | [:link:](https://wikipedia.org/wiki/MPEG-1_Audio_Layer_II)         |
| MP3           | MPEG-1 / MEG-2 Audio Layer III | [:link:](https://wikipedia.org/wiki/MP3)                           | <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Mp3.svg" width="80">
| M4A           | MPEG 4 Audi                    | [:link:](https://wikipedia.org/wiki/MPEG-4)                        |
| Ogg / Opos    |                                | [:link:](https://wikipedia.org/wiki/Opus_(audio_format))           | <img src="https://upload.wikimedia.org/wikipedia/commons/0/02/Opus_logo2.svg" width="80">
| Ogg / Speex   |                                | [:link:](https://wikipedia.org/wiki/Speex)                         | <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Speex_logo_2006.svg" width="80">
| Ogg / Vorbis  |                                | [:link:](https://wikipedia.org/wiki/Ogg_Vorbis)                    | <img src="https://upload.wikimedia.org/wikipedia/en/a/ac/XiphophorusLogoSVG.svg" width="80">
| WAV           |                                | [:link:](https://wikipedia.org/wiki/WAV)                           | <img src="https://www.shareicon.net/download/2015/12/08/684232_file.svg" width="80">
| WavPack       |                                | [:link:](https://wikipedia.org/wiki/WavPack)                       | <img src="http://www.wavpack.com/wavpacklogo.svg" width="80">
| WMA           | Windows Media Audio            | [:link:](https://wikipedia.org/wiki/Windows_Media_Audio)           | <img src="https://upload.wikimedia.org/wikipedia/commons/7/76/Windows_Media_Player_simplified_logo.svg" width="80">

### Support for tags:

* [APE](https://en.wikipedia.org/wiki/APE_tag)
* [ASF](https://en.wikipedia.org/wiki/Advanced_Systems_Format)
* EXIF 2.3
* [ID3](https://wikipedia.org/wiki/ID3): ID3v1, ID3v1.1, ID3v2.2, [ID3v2.3](http://id3.org/id3v2.3.0) & [ID3v2.4](http://id3.org/id3v2.4.0-frames)
* [RIFF](https://en.wikipedia.org/wiki/Resource_Interchange_File_Format)/INFO

Support for [MusicBrainz](https://musicbrainz.org/) tags as written by [Picard](https://picard.musicbrainz.org/).

### Audio format & encoding details:

* Support for encoding / format details:
  * [Bit rate](https://wikipedia.org/wiki/Bit_rate)
  * [Audio bit depth](https://wikipedia.org/wiki/Audio_bit_depth)
  * Duration
  * encoding profile (e.g. [CBR](https://en.wikipedia.org/wiki/Constant_bitrate), V0, V2)
  

### Online demo's
* [Audio Tag Analyzer](https://audio-tag-analyzer.netlify.com/)
* [Webamp powered with music-metadata](https://music-metadata-webamp.netlify.com/)

### Browser Support

Although music-metadata is designed to run in Node.js, it can also be used to run in the browser:
* [music-metadata-browser](https://github.com/Borewit/music-metadata-browser) is an experimental version which can be used in the browser.

### Donation
Not required, but would be extremely motivating.
[PayPal.me](https://paypal.me/borewit)

## Usage

### Installation
Install via [npm](http://npmjs.org/):

```bash
npm install music-metadata
```
or yarn
```bash
yarn add music-metadata
```

### Import music-metadata:

This is how you can import music-metadata in JavaScript, in you code:
```JavaScript
var mm = require('music-metadata-browser');
```

This is how it's done in TypeScript:
```TypeScript
import * as mm from 'music-metadata-browser';
```

### Module Functions:

In the browser there is node direct file access available.
Only the [parseStream function](#parseStream) is available.T

```javascript
import * as mm from 'music-metadata-browser';

mm.parseStream(readableStream)
  .then( metadata => {
     console.log(util.inspect(metadata, { showHidden: false, depth: null }));
     readableStream.close();
   });
```
The readable stream is derived from [Node's readable stream](https://nodejs.org/api/stream.html#stream_readable_streams).

If available, pass the mime-type and file-size. Without the mime-type, the content will be audio type will be automatically detected.

It is recommended to provide the corresponding [MIME-type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types). 
An extension (e.g.: `.mp3`), filename or path will also work.
If the MIME-type or filename is not provided, or not understood, music-metadata will try to derive the type from the content.

```javascript
import * as mm from 'music-metadata-browser';

mm.parseStream(someReadStream, 'audio/mpeg', { fileSize: 26838 })
  .then( metadata => {
     console.log(util.inspect(metadata, { showHidden: false, depth: null }));
     someReadStream.close();
   });
```

The Web API [File interface](https://developer.mozilla.org/en-US/docs/Web/API/File) can be converted into a stream.
```javascript
import fileReaderStream from 'filereader-stream';
import * as mm from 'music-metadata-browser';

/**
* @param file Browser File
*/
function readFromFile(file) {
  const stream = fileReaderStream(file);

  mm.parseStream(stream).then(metadata => {
    // metadata has all the metadata found in file
  });
}
```

To convert the [File](https://developer.mozilla.org/en-US/docs/Web/API/File) into a [stream](https://nodejs.org/api/stream.html#stream_readable_streams), 
[filereader-stream](https://www.npmjs.com/package/filereader-stream) is used.

If you wish to stream your audio track over HTTP you may want to use [stream-http](https://www.npmjs.com/package/stream-stream):

```javascript
import * as mm from 'music-metadata-browser';
import http from "stream-http";

/**
* @param url Ensure the source the URL is pointing to, meets the CORS requirements
*/
function httpToStream(url) {
  return new Promise(resolve => {
    http.get(url, stream => {
      resolve(stream);
    });
  });
}

/**
* Stream over HTTP from URL
*/
httpToStream(url).then(stream => {
  mm.parseStream(stream, stream.headers["content-type"]);
});
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

### Options:
  * `duration`: default: `false`, if set to `true`, it will parse the whole media file if required to determine the duration.
  * `fileSize`: only provide this in combination with `parseStream` function.
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

## Licence

(The MIT License)

Copyright (c) 2017 Borewit

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



