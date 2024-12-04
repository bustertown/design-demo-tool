import { ProgramInfo } from '../web-gl'
import { initShaderProgram } from './initShaderProgram'

export function createProgramInfo(
  gl: WebGL2RenderingContext,
  vsSource: string,
  fsSource: string,
): ProgramInfo {
  const program = initShaderProgram(gl, vsSource, fsSource)

  if (!program) {
    throw new Error('Unable to create program')
  }

  // look up where the vertex data needs to go.
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')

  // look up uniform locations
  const resolutionUniformLocation = gl.getUniformLocation(
    program,
    'u_resolution',
  )
  const colorLocation = gl.getUniformLocation(program, 'u_color')

  // Create a buffer
  const positionBuffer = gl.createBuffer()
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  // Create a vertex array object (attribute state)
  const vao = gl.createVertexArray()

  // and make it the one we're currently working with
  gl.bindVertexArray(vao)

  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation)

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  const size = 2 // 2 components per iteration
  const type = gl.FLOAT // the data is 32bit floats
  const normalize = false // don't normalize the data
  const stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
  const offset = 0 // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset,
  )

  const programInfo: ProgramInfo = {
    program,
    attribLocations: {
      vertixPosition: positionAttributeLocation,
      buffer: positionBuffer,
    },
    uniformLocations: {
      resolutionMatrix: resolutionUniformLocation,
      colorMatrix: colorLocation,
    },
    arrObject: {
      vertexArrayObject: vao,
    },
  }

  return programInfo
}
