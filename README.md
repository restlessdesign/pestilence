# pestilence

A collection of JavaScript utilities (_11.93KB gzipped_) to ruin someone’s day, regardless of ability…or disability. Perfect for that last-minute April Fools’ prank!

## Installation
Simply drop the minified file into your site:

```javascript
    <script src="pestilence.min.js"></script>
```

No fancy DOM ready methods here—the file blindly assumes that you can load a website within eight seconds. If you’re really concerned about that, strip out the `setTimeout` at the bottom of the all and call `Pestilence.initialize()` when you’re good and ready!

## Features

### AudioPest

Plays a high-pitched noise a random intervals.

### Mouse Pest

Replaces the user’s cursor with a duplicate that is offset approximately 50px down and to the right.

### Keyboard Pest

Randomly moves the caret as the user types within input fields.

### Accessibility Pest

Hides all headers and paragraph elements from screen readers and gives random tab indices to anchor elements.

## Known Bugs

- Not yet tested in IE
- No replacement cursors for Windows machines yet
- Safari appears unable to play sounds
