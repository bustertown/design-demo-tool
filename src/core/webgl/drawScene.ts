import { ProgramInfo } from '../../web-gl'

type ShapeInfo = {
  translation: [number, number]
  dimension: {
    height: number
    width: number
  }
  color: [number, number, number, number]
}

export function drawScene(
  gl: WebGL2RenderingContext,
  program: ProgramInfo,
  shape: ShapeInfo,
) {
  if (!gl) {
    return
  }
  // Convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  // Clear the canvas
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  // Use the shaders in the program
  gl.useProgram(program.program)

  // Bind the attribute/buffer
  gl.bindVertexArray(program.arrObject.vertexArrayObject)

  // Pass in the canvas resolution so we can convert from
  // pixels to clipspace in the shader
  gl.uniform2f(
    program.uniformLocations.resolutionMatrix,
    gl.canvas.width,
    gl.canvas.height,
  )

  // Update the position buffer with rectangle positions
  gl.bindBuffer(gl.ARRAY_BUFFER, program.attribLocations.buffer)
  setRectangle(
    gl,
    shape.translation[0],
    shape.translation[1],
    shape.dimension.width,
    shape.dimension.height,
  )

  // Set the color.
  gl.uniform4fv(program.uniformLocations.colorMatrix, shape.color)

  // Draw the rectangle.
  const primitiveType = gl.TRIANGLES
  const offset = 0
  const count = 6
  gl.drawArrays(primitiveType, offset, count)
}

// Fill the buffer with the values that define a rectangle.
function setRectangle(
  gl: WebGL2RenderingContext,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const x1 = x
  const x2 = x + width
  const y1 = y
  const y2 = y + height
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
    gl.STATIC_DRAW,
  )
}
