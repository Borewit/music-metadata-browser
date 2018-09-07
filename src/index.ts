'use strict';

import * as mm from "music-metadata"
import * as Stream from 'stream';

export type IAudioMetadata = mm.IAudioMetadata;
export type IOptions = mm.IOptions;
export type ITag = mm.ITag;
export type INativeTagDict = mm.INativeTagDict;

//export declare type ICommonTagResult = mm.ICommonTagResult;
//export declare type INativeTags = mm.INativeTags;

/**
 * Parse audio Stream
 * @param stream
 * @param mimeType
 * @param options Parsing options
 * @returns {Promise<IAudioMetadata>}
 */
export function parseStream(stream: Stream.Readable, mimeType?: string, opts?: IOptions): Promise<IAudioMetadata> {
  return mm.parseStream(stream, mimeType, opts);
}

/**
 * Create a dictionary ordered by their tag id (key)
 * @param nativeTags list of tags
 * @returns tags indexed by id
 */
export function orderTags(nativeTags: ITag[]):INativeTagDict {
  return mm.orderTags(nativeTags);
}

/**
 * Convert rating to 1-5 star rating
 * @param {number} rating Normalized rating [0..1] (common.rating[n].rating)
 * @returns {number} Number of stars: 1, 2, 3, 4 or 5 stars
 */
export function ratingToStars(rating: number): number {
  return mm.ratingToStars(rating);
}
