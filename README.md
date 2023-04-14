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

Auto-generated API content.

<!-- api-end -->

## License

MIT. See [license file](https://github.com/dmnsgn/media-codecs/blob/main/LICENSE.md).
