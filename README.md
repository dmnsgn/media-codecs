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

## Constants

<dl>
<dt><a href="#VP_CODECS">VP_CODECS</a> : <code><a href="#VPCodecItem">Array.&lt;VPCodecItem&gt;</a></code></dt>
<dd><p>List of codecs</p>
</dd>
<dt><a href="#VP_PROFILES">VP_PROFILES</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>List of VP profiles numbers</p>
</dd>
<dt><a href="#VP_LEVELS">VP_LEVELS</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>VP Levels</p>
</dd>
<dt><a href="#VP_BIT_DEPTH">VP_BIT_DEPTH</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>List of supported bit depth</p>
</dd>
<dt><a href="#AVC_PROFILES">AVC_PROFILES</a> : <code><a href="#AVCProfileItem">Array.&lt;AVCProfileItem&gt;</a></code></dt>
<dd><p>List of profiles with their profile numbers (PP) and the constraints component (CC).</p>
</dd>
<dt><a href="#AVC_LEVELS">AVC_LEVELS</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>AVC Levels</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getAllItems">getAllItems()</a> ⇒ <code><a href="#MediaCodecItem">Array.&lt;MediaCodecItem&gt;</a></code></dt>
<dd><p>Return a list of all possible codec parameter string and their human readable names</p>
</dd>
<dt><a href="#getCodec">getCodec(options)</a> ⇒ <code>string</code></dt>
<dd><p>Get a codec parameter string</p>
</dd>
<dt><a href="#getCodecName">getCodecName(codec)</a> ⇒ <code>string</code></dt>
<dd><p>Get a codec human readbable name</p>
</dd>
<dt><a href="#getAllItems">getAllItems()</a> ⇒ <code><a href="#MediaCodecItem">Array.&lt;MediaCodecItem&gt;</a></code></dt>
<dd><p>Return a list of all possible codec parameter string and their human readable names</p>
</dd>
<dt><a href="#getCodec">getCodec(options)</a> ⇒ <code>string</code></dt>
<dd><p>Get a codec parameter string</p>
</dd>
<dt><a href="#getCodecName">getCodecName(codec)</a> ⇒ <code>string</code></dt>
<dd><p>Get a codec human readbable name</p>
</dd>
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

<a name="VP_CODECS"></a>

## VP_CODECS : [<code>Array.&lt;VPCodecItem&gt;</code>](#VPCodecItem)

List of codecs

**Kind**: global constant
<a name="VP_PROFILES"></a>

## VP_PROFILES : <code>Array.&lt;number&gt;</code>

List of VP profiles numbers

**Kind**: global constant
<a name="VP_LEVELS"></a>

## VP_LEVELS : <code>Array.&lt;number&gt;</code>

VP Levels

**Kind**: global constant
**See**: [webmproject.org](https://www.webmproject.org/vp9/mp4/)
<a name="VP_BIT_DEPTH"></a>

## VP_BIT_DEPTH : <code>Array.&lt;number&gt;</code>

List of supported bit depth

**Kind**: global constant
<a name="AVC_PROFILES"></a>

## AVC_PROFILES : [<code>Array.&lt;AVCProfileItem&gt;</code>](#AVCProfileItem)

List of profiles with their profile numbers (PP) and the constraints component (CC).

**Kind**: global constant
<a name="AVC_LEVELS"></a>

## AVC_LEVELS : <code>Array.&lt;number&gt;</code>

AVC Levels

**Kind**: global constant
**See**: [wikipedia.org](https://en.wikipedia.org/wiki/Advanced_Video_Coding#Levels)
<a name="getAllItems"></a>

## getAllItems() ⇒ [<code>Array.&lt;MediaCodecItem&gt;</code>](#MediaCodecItem)

Return a list of all possible codec parameter string and their human readable names

**Kind**: global function
<a name="getCodec"></a>

## getCodec(options) ⇒ <code>string</code>

Get a codec parameter string

**Kind**: global function

| Param   | Type                                           |
| ------- | ---------------------------------------------- |
| options | [<code>VPCodecOptions</code>](#VPCodecOptions) |

<a name="getCodecName"></a>

## getCodecName(codec) ⇒ <code>string</code>

Get a codec human readbable name

**Kind**: global function

| Param | Type                | Description                                      |
| ----- | ------------------- | ------------------------------------------------ |
| codec | <code>string</code> | a codec string (avc1[.PPCCLL] eg. "avc1.640028") |

<a name="getAllItems"></a>

## getAllItems() ⇒ [<code>Array.&lt;MediaCodecItem&gt;</code>](#MediaCodecItem)

Return a list of all possible codec parameter string and their human readable names

**Kind**: global function
<a name="getCodec"></a>

## getCodec(options) ⇒ <code>string</code>

Get a codec parameter string

**Kind**: global function

| Param   | Type                                             |
| ------- | ------------------------------------------------ |
| options | [<code>AVCCodecOptions</code>](#AVCCodecOptions) |

<a name="getCodecName"></a>

## getCodecName(codec) ⇒ <code>string</code>

Get a codec human readbable name

**Kind**: global function

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
