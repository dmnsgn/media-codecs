# media-codecs

[![npm version](https://img.shields.io/npm/v/media-codecs)](https://www.npmjs.com/package/media-codecs)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/media-codecs)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/media-codecs)](https://bundlephobia.com/package/media-codecs)
[![dependencies](https://img.shields.io/librariesio/release/npm/media-codecs)](https://github.com/dmnsgn/media-codecs/blob/main/package.json)
[![types](https://img.shields.io/npm/types/media-codecs)](https://github.com/microsoft/TypeScript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://github.com/eslint/eslint)
[![license](https://img.shields.io/github/license/dmnsgn/media-codecs)](https://github.com/dmnsgn/media-codecs/blob/main/LICENSE.md)

Get a codec parameter string (like `"avc1.4d002a"`) from human readable options (like `{ name: "Main", level: "4.2" }`) and back to a descriptive name ("AVC Main Profile Level 4.2").

Useful for checking supported codecs with `HTMLMediaElement.canPlayType` / `MediaSource.isTypeSupported` and to pass as option for the [WebCodecs API](https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API) VideoEncoder [configure parameters](https://developer.mozilla.org/en-US/docs/Web/API/VideoEncoder/configure#parameters). Supports Advanced Video Coding ([AVC](https://en.wikipedia.org/wiki/Advanced_Video_Coding)), Video Partition ([VP8/VP9](<(https://www.webmproject.org/vp9/)>)), AOMedia Video ([AV1](https://en.wikipedia.org/wiki/AV1)) and partially High Efficiency Video Coding [HEVC](https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding).

See the [demo](https://dmnsgn.github.io/media-codecs) that checks current browser support of all [video codecs](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs#common_codecs) and MDN's [Codecs in common media types](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/codecs_parameter).

[![paypal](https://img.shields.io/badge/donate-paypal-informational?logo=paypal)](https://paypal.me/dmnsgn)
[![coinbase](https://img.shields.io/badge/donate-coinbase-informational?logo=coinbase)](https://commerce.coinbase.com/checkout/56cbdf28-e323-48d8-9c98-7019e72c97f3)
[![twitter](https://img.shields.io/twitter/follow/dmnsgn?style=social)](https://twitter.com/dmnsgn)

![](https://raw.githubusercontent.com/dmnsgn/media-codecs/main/screenshot.png)

## Installation

```bash
npm install media-codecs
```

## Usage

```js
import { AVC } from "media-codecs";

const codec = AVC.getCodec({ profile: "Main", level: "4.2" });
// => avc1.4d002a
const mimeType = `video/mp4;codecs="${codec}"`;

console.log(MediaSource.isTypeSupported(mimeType));
```

Roadmap:

- [ ] HEVC compatibility and constraints
- [ ] VP, HEVC and AV1 optional parameters

## API

<!-- api-start -->

## Modules

<dl>
<dt><a href="#module_media-codecs">media-codecs</a></dt>
<dd></dd>
<dt><a href="#module_av">av</a></dt>
<dd></dd>
<dt><a href="#module_avc">avc</a></dt>
<dd></dd>
<dt><a href="#module_hevc">hevc</a></dt>
<dd></dd>
<dt><a href="#module_vp">vp</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#AVProfileItem">AVProfileItem</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#VCProfileItem">VCProfileItem</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#CodecItem">CodecItem</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#MediaCodecItem">MediaCodecItem</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#VPCodecOptions">VPCodecOptions</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#AVCodecOptions">AVCodecOptions</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#AVCCodecOptions">AVCCodecOptions</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#HEVCCodecOptions">HEVCCodecOptions</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="module_media-codecs"></a>

## media-codecs

- [media-codecs](#module_media-codecs)
  - [.VP](#module_media-codecs.VP) : [<code>vp</code>](#module_vp)
  - [.AV](#module_media-codecs.AV) : [<code>av</code>](#module_av)
  - [.AVC](#module_media-codecs.AVC) : [<code>avc</code>](#module_avc)
  - [.HEVC](#module_media-codecs.HEVC) : [<code>hevc</code>](#module_hevc)

<a name="module_media-codecs.VP"></a>

### media-codecs.VP : [<code>vp</code>](#module_vp)

**Kind**: static property of [<code>media-codecs</code>](#module_media-codecs)
<a name="module_media-codecs.AV"></a>

### media-codecs.AV : [<code>av</code>](#module_av)

**Kind**: static property of [<code>media-codecs</code>](#module_media-codecs)
<a name="module_media-codecs.AVC"></a>

### media-codecs.AVC : [<code>avc</code>](#module_avc)

**Kind**: static property of [<code>media-codecs</code>](#module_media-codecs)
<a name="module_media-codecs.HEVC"></a>

### media-codecs.HEVC : [<code>hevc</code>](#module_hevc)

**Kind**: static property of [<code>media-codecs</code>](#module_media-codecs)
<a name="module_av"></a>

## av

- [av](#module_av)
  - [.AV_CODECS](#module_av.AV_CODECS) : [<code>Array.&lt;CodecItem&gt;</code>](#CodecItem)
  - [.AV_PROFILES](#module_av.AV_PROFILES) : [<code>Array.&lt;AVProfileItem&gt;</code>](#AVProfileItem)
  - [.AV_LEVELS](#module_av.AV_LEVELS) : <code>Array.&lt;string&gt;</code>
  - [.AV_TIER](#module_av.AV_TIER) : <code>Array.&lt;string&gt;</code>
  - [.AV_BIT_DEPTH](#module_av.AV_BIT_DEPTH) : <code>Array.&lt;number&gt;</code>
  - [.getAllItems()](#module_av.getAllItems) ⇒ [<code>Array.&lt;MediaCodecItem&gt;</code>](#MediaCodecItem)
  - [.getCodec(options)](#module_av.getCodec) ⇒ <code>string</code>
  - [.getCodecName(codec)](#module_av.getCodecName) ⇒ <code>string</code>

<a name="module_av.AV_CODECS"></a>

### av.AV_CODECS : [<code>Array.&lt;CodecItem&gt;</code>](#CodecItem)

List of codecs

**Kind**: static constant of [<code>av</code>](#module_av)
<a name="module_av.AV_PROFILES"></a>

### av.AV_PROFILES : [<code>Array.&lt;AVProfileItem&gt;</code>](#AVProfileItem)

List of AV profiles numbers

**Kind**: static constant of [<code>av</code>](#module_av)
**See**: [av1-spec](https://aomediacodec.github.io/av1-spec/#profiles)
<a name="module_av.AV_LEVELS"></a>

### av.AV_LEVELS : <code>Array.&lt;string&gt;</code>

AV Levels

**Kind**: static constant of [<code>av</code>](#module_av)
**See**: [av1-spec](https://aomediacodec.github.io/av1-spec/#levels)
<a name="module_av.AV_TIER"></a>

### av.AV_TIER : <code>Array.&lt;string&gt;</code>

List of supported tier

**Kind**: static constant of [<code>av</code>](#module_av)
<a name="module_av.AV_BIT_DEPTH"></a>

### av.AV_BIT_DEPTH : <code>Array.&lt;number&gt;</code>

List of supported bit depth

**Kind**: static constant of [<code>av</code>](#module_av)
<a name="module_av.getAllItems"></a>

### av.getAllItems() ⇒ [<code>Array.&lt;MediaCodecItem&gt;</code>](#MediaCodecItem)

Return a list of all possible codec parameter string and their human readable names

**Kind**: static method of [<code>av</code>](#module_av)
<a name="module_av.getCodec"></a>

### av.getCodec(options) ⇒ <code>string</code>

Get a codec parameter string

**Kind**: static method of [<code>av</code>](#module_av)

| Param   | Type                                           |
| ------- | ---------------------------------------------- |
| options | [<code>AVCodecOptions</code>](#AVCodecOptions) |

<a name="module_av.getCodecName"></a>

### av.getCodecName(codec) ⇒ <code>string</code>

Get a codec human readbable name

**Kind**: static method of [<code>av</code>](#module_av)

| Param | Type                | Description                                        |
| ----- | ------------------- | -------------------------------------------------- |
| codec | <code>string</code> | a codec string (av01.P.LLT.DD eg. "av01.P.LLT.DD") |

<a name="module_avc"></a>

## avc

- [avc](#module_avc)
  - [.AVC_PROFILES](#module_avc.AVC_PROFILES) : [<code>Array.&lt;VCProfileItem&gt;</code>](#VCProfileItem)
  - [.AVC_LEVELS](#module_avc.AVC_LEVELS) : <code>Array.&lt;number&gt;</code>
  - [.getAllItems()](#module_avc.getAllItems) ⇒ [<code>Array.&lt;MediaCodecItem&gt;</code>](#MediaCodecItem)
  - [.getCodec(options)](#module_avc.getCodec) ⇒ <code>string</code>
  - [.getCodecName(codec)](#module_avc.getCodecName) ⇒ <code>string</code>

<a name="module_avc.AVC_PROFILES"></a>

### avc.AVC_PROFILES : [<code>Array.&lt;VCProfileItem&gt;</code>](#VCProfileItem)

List of profiles with their profile numbers (PP) and the constraints component (CC).

**Kind**: static constant of [<code>avc</code>](#module_avc)
<a name="module_avc.AVC_LEVELS"></a>

### avc.AVC_LEVELS : <code>Array.&lt;number&gt;</code>

AVC Levels

**Kind**: static constant of [<code>avc</code>](#module_avc)
**See**: [wikipedia.org](https://en.wikipedia.org/wiki/Advanced_Video_Coding#Levels)
<a name="module_avc.getAllItems"></a>

### avc.getAllItems() ⇒ [<code>Array.&lt;MediaCodecItem&gt;</code>](#MediaCodecItem)

Return a list of all possible codec parameter string and their human readable names

**Kind**: static method of [<code>avc</code>](#module_avc)
<a name="module_avc.getCodec"></a>

### avc.getCodec(options) ⇒ <code>string</code>

Get a codec parameter string

**Kind**: static method of [<code>avc</code>](#module_avc)

| Param   | Type                                             |
| ------- | ------------------------------------------------ |
| options | [<code>AVCCodecOptions</code>](#AVCCodecOptions) |

<a name="module_avc.getCodecName"></a>

### avc.getCodecName(codec) ⇒ <code>string</code>

Get a codec human readbable name

**Kind**: static method of [<code>avc</code>](#module_avc)

| Param | Type                | Description                                        |
| ----- | ------------------- | -------------------------------------------------- |
| codec | <code>string</code> | a codec string (cccc.PP.LL.DD eg. "vp09.00.10.08") |

<a name="module_hevc"></a>

## hevc

- [hevc](#module_hevc)
  - [.HEVC_PROFILES](#module_hevc.HEVC_PROFILES) : [<code>Array.&lt;VCProfileItem&gt;</code>](#VCProfileItem)
  - [.HEVC_PROFILE_COMPATIBILITY](#module_hevc.HEVC_PROFILE_COMPATIBILITY) : <code>Array.&lt;number&gt;</code>
  - [.HEVC_LEVELS](#module_hevc.HEVC_LEVELS) : <code>Array.&lt;string&gt;</code>
  - [.HEVC_TIER](#module_hevc.HEVC_TIER) : <code>Array.&lt;string&gt;</code>
  - [.getAllItems()](#module_hevc.getAllItems) ⇒ [<code>Array.&lt;MediaCodecItem&gt;</code>](#MediaCodecItem)
  - [.getCodec(options)](#module_hevc.getCodec) ⇒ <code>string</code>
  - [.getCodecName(codec)](#module_hevc.getCodecName) ⇒ <code>string</code>

<a name="module_hevc.HEVC_PROFILES"></a>

### hevc.HEVC_PROFILES : [<code>Array.&lt;VCProfileItem&gt;</code>](#VCProfileItem)

List of profiles with their profile numbers (PP) and the compatibility (C).

See Annexe 3 Profiles

**Kind**: static constant of [<code>hevc</code>](#module_hevc)
<a name="module_hevc.HEVC_PROFILE_COMPATIBILITY"></a>

### hevc.HEVC_PROFILE_COMPATIBILITY : <code>Array.&lt;number&gt;</code>

HEVC Profile Compatibility as a number in the 0..32 range
TODO: is that correct

**Kind**: static constant of [<code>hevc</code>](#module_hevc)
<a name="module_hevc.HEVC_LEVELS"></a>

### hevc.HEVC_LEVELS : <code>Array.&lt;string&gt;</code>

HEVC Levels

**Kind**: static constant of [<code>hevc</code>](#module_hevc)
**See**: [hevc-levels](https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding#Tiers_and_levels)
<a name="module_hevc.HEVC_TIER"></a>

### hevc.HEVC_TIER : <code>Array.&lt;string&gt;</code>

List of supported tier

**Kind**: static constant of [<code>hevc</code>](#module_hevc)
<a name="module_hevc.getAllItems"></a>

### hevc.getAllItems() ⇒ [<code>Array.&lt;MediaCodecItem&gt;</code>](#MediaCodecItem)

Return a list of all possible codec parameter string and their human readable names

**Kind**: static method of [<code>hevc</code>](#module_hevc)
<a name="module_hevc.getCodec"></a>

### hevc.getCodec(options) ⇒ <code>string</code>

Get a codec parameter string

**Kind**: static method of [<code>hevc</code>](#module_hevc)

| Param   | Type                                               |
| ------- | -------------------------------------------------- |
| options | [<code>HEVCCodecOptions</code>](#HEVCCodecOptions) |

<a name="module_hevc.getCodecName"></a>

### hevc.getCodecName(codec) ⇒ <code>string</code>

Get a codec human readbable name

**Kind**: static method of [<code>hevc</code>](#module_hevc)

| Param | Type                | Description                                             |
| ----- | ------------------- | ------------------------------------------------------- |
| codec | <code>string</code> | a codec string (cccc.PP.C.TLL.CC eg. "hev1.1.3.H34.B0") |

<a name="module_vp"></a>

## vp

- [vp](#module_vp)
  - [.VP_CODECS](#module_vp.VP_CODECS) : [<code>Array.&lt;CodecItem&gt;</code>](#CodecItem)
  - [.VP_PROFILES](#module_vp.VP_PROFILES) : <code>Array.&lt;number&gt;</code>
  - [.VP_LEVELS](#module_vp.VP_LEVELS) : <code>Array.&lt;string&gt;</code>
  - [.VP_BIT_DEPTH](#module_vp.VP_BIT_DEPTH) : <code>Array.&lt;number&gt;</code>
  - [.getAllItems()](#module_vp.getAllItems) ⇒ [<code>Array.&lt;MediaCodecItem&gt;</code>](#MediaCodecItem)
  - [.getCodec(options)](#module_vp.getCodec) ⇒ <code>string</code>
  - [.getCodecName(codec)](#module_vp.getCodecName) ⇒ <code>string</code>

<a name="module_vp.VP_CODECS"></a>

### vp.VP_CODECS : [<code>Array.&lt;CodecItem&gt;</code>](#CodecItem)

List of codecs

**Kind**: static constant of [<code>vp</code>](#module_vp)
<a name="module_vp.VP_PROFILES"></a>

### vp.VP_PROFILES : <code>Array.&lt;number&gt;</code>

List of VP profiles numbers

**Kind**: static constant of [<code>vp</code>](#module_vp)
<a name="module_vp.VP_LEVELS"></a>

### vp.VP_LEVELS : <code>Array.&lt;string&gt;</code>

VP Levels

**Kind**: static constant of [<code>vp</code>](#module_vp)
**See**: [webmproject.org](https://www.webmproject.org/vp9/mp4/)
<a name="module_vp.VP_BIT_DEPTH"></a>

### vp.VP_BIT_DEPTH : <code>Array.&lt;number&gt;</code>

List of supported bit depth

**Kind**: static constant of [<code>vp</code>](#module_vp)
<a name="module_vp.getAllItems"></a>

### vp.getAllItems() ⇒ [<code>Array.&lt;MediaCodecItem&gt;</code>](#MediaCodecItem)

Return a list of all possible codec parameter string and their human readable names

**Kind**: static method of [<code>vp</code>](#module_vp)
<a name="module_vp.getCodec"></a>

### vp.getCodec(options) ⇒ <code>string</code>

Get a codec parameter string

**Kind**: static method of [<code>vp</code>](#module_vp)

| Param   | Type                                           |
| ------- | ---------------------------------------------- |
| options | [<code>VPCodecOptions</code>](#VPCodecOptions) |

<a name="module_vp.getCodecName"></a>

### vp.getCodecName(codec) ⇒ <code>string</code>

Get a codec human readbable name

**Kind**: static method of [<code>vp</code>](#module_vp)

| Param | Type                | Description                                      |
| ----- | ------------------- | ------------------------------------------------ |
| codec | <code>string</code> | a codec string (avc1[.PPCCLL] eg. "avc1.640028") |

<a name="AVProfileItem"></a>

## AVProfileItem : <code>object</code>

**Kind**: global typedef
**Properties**

| Name | Type                | Description                   |
| ---- | ------------------- | ----------------------------- |
| name | <code>string</code> |                               |
| PP   | <code>string</code> | profile numbers (seq_profile) |

<a name="VCProfileItem"></a>

## VCProfileItem : <code>object</code>

**Kind**: global typedef
**Properties**

| Name | Type                | Description                         |
| ---- | ------------------- | ----------------------------------- |
| name | <code>string</code> |                                     |
| PP   | <code>string</code> | profile numbers as hex string       |
| CC   | <code>string</code> | constraints component as hex string |

<a name="CodecItem"></a>

## CodecItem : <code>object</code>

**Kind**: global typedef
**Properties**

| Name | Type                | Description                         |
| ---- | ------------------- | ----------------------------------- |
| name | <code>string</code> |                                     |
| cccc | <code>string</code> | the four-character ID for the codec |

<a name="MediaCodecItem"></a>

## MediaCodecItem : <code>object</code>

**Kind**: global typedef
**Properties**

| Name  | Type                |
| ----- | ------------------- |
| name  | <code>string</code> |
| codec | <code>string</code> |

<a name="VPCodecOptions"></a>

## VPCodecOptions : <code>object</code>

**Kind**: global typedef
**Properties**

| Name     | Type                | Description                               |
| -------- | ------------------- | ----------------------------------------- |
| name     | <code>string</code> | Human readable codec name: "VP8" or "VP9" |
| profile  | <code>number</code> | 0, 1, 2 or 3                              |
| level    | <code>string</code> |                                           |
| bitDepth | <code>number</code> |                                           |

<a name="AVCodecOptions"></a>

## AVCodecOptions : <code>object</code>

**Kind**: global typedef
**Properties**

| Name     | Type                | Description                                                     |
| -------- | ------------------- | --------------------------------------------------------------- |
| name     | <code>string</code> | Human readable codec name: "AV1", potentially AV2 in the future |
| profile  | <code>string</code> | AV profile name: "Main", "High" or "Professional"               |
| level    | <code>string</code> |                                                                 |
| tier     | <code>string</code> | "Main" or "High"                                                |
| bitDepth | <code>number</code> | 8, 10 or 12                                                     |

<a name="AVCCodecOptions"></a>

## AVCCodecOptions : <code>object</code>

**Kind**: global typedef
**Properties**

| Name    | Type                | Description                       |
| ------- | ------------------- | --------------------------------- |
| profile | <code>string</code> | AVC profile name (eg. "Baseline") |
| level   | <code>string</code> |                                   |

<a name="HEVCCodecOptions"></a>

## HEVCCodecOptions : <code>object</code>

**Kind**: global typedef
**Properties**

| Name          | Type                | Description                       |
| ------------- | ------------------- | --------------------------------- |
| profile       | <code>string</code> | HEVC profile name (eg. "Main 10") |
| compatibility | <code>number</code> |                                   |
| level         | <code>string</code> |                                   |
| tier          | <code>string</code> | "Main" or "High"                  |
| constraint    | <code>string</code> | TODO                              |

<!-- api-end -->

## License

MIT. See [license file](https://github.com/dmnsgn/media-codecs/blob/main/LICENSE.md).
