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

Useful for checking supported codecs with `HTMLMediaElement.canPlayType` / `MediaSource.isTypeSupported` and to pass as option for the [WebCodecs API](https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API) VideoEncoder [configure parameters](https://developer.mozilla.org/en-US/docs/Web/API/VideoEncoder/configure#parameters). Supports Advanced Video Coding (AVC) and Video Partition (VP).

See the [demo](https://dmnsgn.github.io/media-codecs) that checks current browser support of all codecs.

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

const codec = AVC.getCodec({ name: "Main", level: "4.2" });
const mimeType = `video/mp4;codecs="${codec}"`;

console.log(MediaSource.isTypeSupported(mimeType));
```

## API

<!-- api-start -->

## Modules

<dl>
<dt><a href="#module_index">index</a></dt>
<dd></dd>
<dt><a href="#module_vp">vp</a></dt>
<dd></dd>
<dt><a href="#module_avc">avc</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#AVCProfileItem">AVCProfileItem</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#VPCodecItem">VPCodecItem</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#MediaCodecItem">MediaCodecItem</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#AVCCodecOptions">AVCCodecOptions</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#VPCodecOptions">VPCodecOptions</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="module_index"></a>

## index

<a name="module_vp"></a>

## vp

- [vp](#module_vp)
  - [~VP_CODECS](#module_vp..VP_CODECS) : [<code>Array.&lt;VPCodecItem&gt;</code>](#VPCodecItem)
  - [~VP_PROFILES](#module_vp..VP_PROFILES) : <code>Array.&lt;number&gt;</code>
  - [~VP_LEVELS](#module_vp..VP_LEVELS) : <code>Array.&lt;number&gt;</code>
  - [~VP_BIT_DEPTH](#module_vp..VP_BIT_DEPTH) : <code>Array.&lt;number&gt;</code>
  - [~getAllItems()](#module_vp..getAllItems) ⇒ [<code>Array.&lt;MediaCodecItem&gt;</code>](#MediaCodecItem)
  - [~getCodec(options)](#module_vp..getCodec) ⇒ <code>string</code>
  - [~getCodecName(codec)](#module_vp..getCodecName) ⇒ <code>string</code>

<a name="module_vp..VP_CODECS"></a>

### vp~VP_CODECS : [<code>Array.&lt;VPCodecItem&gt;</code>](#VPCodecItem)

List of codecs

**Kind**: inner constant of [<code>vp</code>](#module_vp)
<a name="module_vp..VP_PROFILES"></a>

### vp~VP_PROFILES : <code>Array.&lt;number&gt;</code>

List of VP profiles numbers

**Kind**: inner constant of [<code>vp</code>](#module_vp)
<a name="module_vp..VP_LEVELS"></a>

### vp~VP_LEVELS : <code>Array.&lt;number&gt;</code>

VP Levels

**Kind**: inner constant of [<code>vp</code>](#module_vp)
**See**: [webmproject.org](https://www.webmproject.org/vp9/mp4/)
<a name="module_vp..VP_BIT_DEPTH"></a>

### vp~VP_BIT_DEPTH : <code>Array.&lt;number&gt;</code>

List of supported bit depth

**Kind**: inner constant of [<code>vp</code>](#module_vp)
<a name="module_vp..getAllItems"></a>

### vp~getAllItems() ⇒ [<code>Array.&lt;MediaCodecItem&gt;</code>](#MediaCodecItem)

Return a list of all possible codec parameter string and their human readable names

**Kind**: inner method of [<code>vp</code>](#module_vp)
<a name="module_vp..getCodec"></a>

### vp~getCodec(options) ⇒ <code>string</code>

Get a codec parameter string

**Kind**: inner method of [<code>vp</code>](#module_vp)

| Param   | Type                                           |
| ------- | ---------------------------------------------- |
| options | [<code>VPCodecOptions</code>](#VPCodecOptions) |

<a name="module_vp..getCodecName"></a>

### vp~getCodecName(codec) ⇒ <code>string</code>

Get a codec human readbable name

**Kind**: inner method of [<code>vp</code>](#module_vp)

| Param | Type                | Description                                      |
| ----- | ------------------- | ------------------------------------------------ |
| codec | <code>string</code> | a codec string (avc1[.PPCCLL] eg. "avc1.640028") |

<a name="module_avc"></a>

## avc

- [avc](#module_avc)
  - [~AVC_PROFILES](#module_avc..AVC_PROFILES) : [<code>Array.&lt;AVCProfileItem&gt;</code>](#AVCProfileItem)
  - [~AVC_LEVELS](#module_avc..AVC_LEVELS) : <code>Array.&lt;number&gt;</code>
  - [~getAllItems()](#module_avc..getAllItems) ⇒ [<code>Array.&lt;MediaCodecItem&gt;</code>](#MediaCodecItem)
  - [~getCodec(options)](#module_avc..getCodec) ⇒ <code>string</code>
  - [~getCodecName(codec)](#module_avc..getCodecName) ⇒ <code>string</code>

<a name="module_avc..AVC_PROFILES"></a>

### avc~AVC_PROFILES : [<code>Array.&lt;AVCProfileItem&gt;</code>](#AVCProfileItem)

List of profiles with their profile numbers (PP) and the constraints component (CC).

**Kind**: inner constant of [<code>avc</code>](#module_avc)
<a name="module_avc..AVC_LEVELS"></a>

### avc~AVC_LEVELS : <code>Array.&lt;number&gt;</code>

AVC Levels

**Kind**: inner constant of [<code>avc</code>](#module_avc)
**See**: [wikipedia.org](https://en.wikipedia.org/wiki/Advanced_Video_Coding#Levels)
<a name="module_avc..getAllItems"></a>

### avc~getAllItems() ⇒ [<code>Array.&lt;MediaCodecItem&gt;</code>](#MediaCodecItem)

Return a list of all possible codec parameter string and their human readable names

**Kind**: inner method of [<code>avc</code>](#module_avc)
<a name="module_avc..getCodec"></a>

### avc~getCodec(options) ⇒ <code>string</code>

Get a codec parameter string

**Kind**: inner method of [<code>avc</code>](#module_avc)

| Param   | Type                                             |
| ------- | ------------------------------------------------ |
| options | [<code>AVCCodecOptions</code>](#AVCCodecOptions) |

<a name="module_avc..getCodecName"></a>

### avc~getCodecName(codec) ⇒ <code>string</code>

Get a codec human readbable name

**Kind**: inner method of [<code>avc</code>](#module_avc)

| Param | Type                | Description                                        |
| ----- | ------------------- | -------------------------------------------------- |
| codec | <code>string</code> | a codec string (cccc.PP.LL.DD eg. "vp09.00.10.08") |

<a name="AVCProfileItem"></a>

## AVCProfileItem : <code>Object</code>

**Kind**: global typedef
**Properties**

| Name | Type                | Description                         |
| ---- | ------------------- | ----------------------------------- |
| name | <code>string</code> |                                     |
| PP   | <code>string</code> | profile numbers as hex string       |
| CC   | <code>string</code> | constraints component as hex string |

<a name="VPCodecItem"></a>

## VPCodecItem : <code>Object</code>

**Kind**: global typedef
**Properties**

| Name | Type                | Description                         |
| ---- | ------------------- | ----------------------------------- |
| name | <code>string</code> |                                     |
| cccc | <code>string</code> | the four-character ID for the codec |

<a name="MediaCodecItem"></a>

## MediaCodecItem : <code>Object</code>

**Kind**: global typedef
**Properties**

| Name  | Type                |
| ----- | ------------------- |
| name  | <code>string</code> |
| codec | <code>string</code> |

<a name="AVCCodecOptions"></a>

## AVCCodecOptions : <code>Object</code>

**Kind**: global typedef
**Properties**

| Name  | Type                | Description                                  |
| ----- | ------------------- | -------------------------------------------- |
| name  | <code>string</code> | Human readable profile name (eg. "Baseline") |
| level | <code>string</code> |                                              |

<a name="VPCodecOptions"></a>

## VPCodecOptions : <code>Object</code>

**Kind**: global typedef
**Properties**

| Name     | Type                | Description                           |
| -------- | ------------------- | ------------------------------------- |
| name     | <code>string</code> | Human readable codec name (eg. "VP9") |
| profile  | <code>number</code> | VP codec profile                      |
| level    | <code>string</code> |                                       |
| bitDepth | <code>number</code> |                                       |

<!-- api-end -->

## License

MIT. See [license file](https://github.com/dmnsgn/media-codecs/blob/main/LICENSE.md).
