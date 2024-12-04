// export interface ProgramInfo {
//   program: WebGLProgram
//   attribLocations: {
//     vertexPosition: number
//     vertexColor?: number
//     textureCoord?: number
//   }
//   uniformLocations: {
//     projectionMatrix: WebGLUniformLocation | null
//     modelViewMatrix: WebGLUniformLocation | null
//     uSampler?: WebGLUniformLocation | null
//   }
// }

export type ProgramInfo = {
  program: WebGLProgram
  attribLocations: {
    buffer: WebGLBuffer | null
    vertixPosition: number
  }
  uniformLocations: {
    resolutionMatrix: WebGLUniformLocation | null
    colorMatrix: WebGLUniformLocation | null
  }
  arrObject: {
    vertexArrayObject: WebGLVertexArrayObject | null
  }
}
