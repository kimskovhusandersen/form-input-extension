# Form Input Name Viewer Chrome Extension

A Chrome extension that displays the name or data-testid attribute of form inputs as tooltips, making it easier to identify form elements during development and testing.

## Features

- Toggle between showing `name` or `data-testid` attributes
- Click tooltips to copy the attribute value to clipboard
- Performance optimized for large forms
- Smooth animations and transitions

## Performance Optimizations

The extension implements several performance optimizations to ensure smooth operation even with large forms:

### Lazy Loading with Intersection Observer
- Tooltips are created on-demand as form elements come into view
- Reduces initial page load time and memory usage
- Improves performance on pages with many form elements
- Tooltips appear when at least 10% of the form element is visible

### Batch Processing
- Form elements are processed in batches of 50
- Implements debouncing with 100ms delay between batches
- Prevents UI freezing when dealing with many form elements

### DOM Optimization
- Caches DOM queries to reduce expensive operations
- Uses CSS transitions for smooth animations
- Efficient memory management with proper cleanup

## Installation

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

1. Click the extension icon in your browser toolbar
2. Choose between "name" or "data-testid" attribute display
3. Click "Toggle Tooltips" to show/hide tooltips
4. Click any tooltip to copy its value to clipboard

## Development

The extension consists of the following files:
- `manifest.json`: Extension configuration
- `popup.html` & `popup.js`: Extension popup interface
- `content.js`: Main extension logic
- `background.js`: Background service worker

## Contributing

Feel free to submit issues and enhancement requests! 