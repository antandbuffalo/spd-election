# Live Count Tracker

A simple script to track and display live visitor counts on your website.

## Installation

### Method 1: Direct Script Tag

Simply include the script in your HTML:

```html
<script src="https://your-domain.com/js/live-count.js"></script>
```

### Method 2: NPM (if hosted on npm)

```bash
npm install spd-election-live-count
```

Then import in your project:

```javascript
// CommonJS
const getLiveCount = require('spd-election-live-count');

// ES Modules
import getLiveCount from 'spd-election-live-count';
```

## Usage

### Basic Usage

```javascript
getLiveCount(function(count) {
  console.log('Current visitor count:', count);
  document.getElementById('my-counter').textContent = count;
});
```

### Full Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
  <script src="js/live-count.js"></script>
</head>
<body>
  <div>
    Current visitors: <span id="visitor-count">Loading...</span>
  </div>

  <script>
    getLiveCount(function(count) {
      document.getElementById('visitor-count').textContent = count;
    });
  </script>
</body>
</html>
```

## API

### getLiveCount(callback)

Fetches the current live visitor count and passes it to the callback function.

**Parameters:**

- `callback` (Function): A function that will receive the live count number as its only argument.

## Note

This script uses localStorage to track unique visitors. It communicates with a server at `https://spd-election.onrender.com/count` to obtain the count data.