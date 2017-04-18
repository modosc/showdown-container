showdown-container
==============================

Fenced container plugin for the [showdown](https://github.com/showdownjs/showdown) markdown parser, idea copied from [markdown-it-container](https://github.com/markdown-it/markdown-it-container)

This extension allows you to create block level containers:

```
::: some-class
*Some text*
:::
```

Which will be rendered as:

```html
<div class="some-class">
<em>Some text</em>
</div>
```

## Usage
```javascript
var Showdown = require('showdown');
var showdownContainer = require('showdown-container');
var converter = new showdown.Converter({ extensions: ['showdown-container'] });
```

## Future

* define [completely arbitrary containers](https://github.com/markdown-it/markdown-it-container/blob/master/README.md#example) like [markdown-it-container](https://github.com/markdown-it/markdown-it-container)

## Installation

```
$ npm install --save showdown-container
```
