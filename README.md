# Design Demo Tool

Demo web app for how to use WebGL and Pixi.JS.

## WebGL(2)

WebGL is web implementation of OpenGL that is able to access the GPU of a device for fast rendering. It is pretty simplistic and the features are:

1. Creates a single shape
2. Allow the user to manipulate the color
3. translate it along the canvas and keep it within bounds

### Pros

- Uses a "lower" library so as a developer I can know exactly what is going on
- Fast, real fast
- Responsible for managing all aspects of shaders, position, translating, and drawing (also can be a con)

### Cons

- Learning curve is pretty high and the resources can be a bit sporadic. The "better" of the resources can be found in the WebGL2 Tutorial, but when I discovered that I had already spent quite a bit of time (would like to go back to review it later)

## Pixi.JS

Pixi.JS is built on top of WebGL, WebGPU, and canvas to provide a fast experience. It wraps up a lot of the heavy lifting of creating shader programs and other user functionality.

## Other Options

- WebGPU/[wgpu](https://github.com/gfx-rs/wgpu?tab=readme-ov-file): It is based on the WebGPU standard and intended to run over WebGPL. Built in rust, it runs on WASM
- [Konva](https://konvajs.org/): More of pure JS library in that renders shapes using canvas and doesn't use the same WebGL rendering process

## Resources

- [mdn tutorial](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial) (outdated)
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [WebGL2 Fundamentals](https://webgl2fundamentals.org/)
- [Pixi.JS](https://pixijs.com/8.x/guides)
