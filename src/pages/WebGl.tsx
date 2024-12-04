import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { toGlclampf } from '../core/webgl/utils/toGlclampf'
import { drawScene } from '../core/webgl/drawScene'
import { createProgramInfo } from '../core/webgl/createProgram'
import {
  fragmentShaderSource,
  vertexShaderSource,
} from '../core/webgl/shaders/scripts'
import { RgbColorPicker, Slider } from '../components'
import { CANVAS } from '../core/constants'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  > h2 {
    margin: 8px;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
`

const InputContainer = styled.fieldset`
  display: flex;
  flex-direction: column;
  > h3 {
    margin: 0;
    margin-bottom: 10px;
  }
`

const Dimensions = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-content: baseline;
  flex-wrap: wrap;
`

const DimInput = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`

export const WebGl: React.FC = () => {
  const [rgba, setRgba] = useState<[number, number, number, number]>([
    0, 0, 0, 0,
  ])
  const [dimensions, setDimensions] = useState<{
    height: number
    width: number
  }>({
    height: 100,
    width: 100,
  })
  const [translation, setTranslation] = useState<[number, number]>([0, 0])
  const [glState, setGlState] = useState<WebGL2RenderingContext | undefined>()

  /**
   * Initial effect to set up the canvas
   */
  useEffect(() => {
    const canvas = document.getElementById('blank_canvas') as HTMLCanvasElement
    const gl = canvas.getContext('webgl2')

    if (!gl) {
      return
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    setGlState(gl)
  }, [setGlState])

  /**
   * Redraw the scene every time we get an update
   * that a change has been made to the scene
   */
  useEffect(() => {
    if (!glState) return
    const shape = {
      translation: translation,
      dimension: {
        height: dimensions.height,
        width: dimensions.width,
      },
      color: toGlclampf(rgba[0], rgba[1], rgba[2], rgba[3]),
    }
    drawScene(
      glState,
      createProgramInfo(glState, vertexShaderSource, fragmentShaderSource),
      shape,
    )
  }, [translation, dimensions, rgba])

  const clearCanvas = useCallback(() => {
    const gl = glState
    if (!gl) {
      console.log('Failed to get the rendering context for WebGL')
      return
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }, [glState])

  const addShape = useCallback(
    (gl?: WebGL2RenderingContext) => {
      if (!gl) {
        return
      }
      const program = createProgramInfo(
        gl,
        vertexShaderSource,
        fragmentShaderSource,
      )

      const shape = {
        translation: translation,
        dimension: {
          height: dimensions.height,
          width: dimensions.width,
        },
        color: toGlclampf(rgba[0], rgba[1], rgba[2], rgba[3]),
      }

      drawScene(gl, program, shape)
    },
    [translation, dimensions, rgba],
  )

  return (
    <Container>
      <h2>WebGL</h2>
      <Form>
        <InputContainer>
          <h3>Shape Dimensions</h3>
          <Dimensions>
            <DimInput>
              <label htmlFor="width-input">Shape Width</label>
              <input
                id="width-input"
                type="number"
                value={dimensions.width}
                step={10}
                min={0}
                max={CANVAS.width}
                onChange={(e) =>
                  setDimensions((prev) => ({
                    ...prev,
                    width: Number(e.target.value),
                  }))
                }
              />
            </DimInput>
            <DimInput>
              <label htmlFor="height-input">Shape Height</label>
              <input
                id="height-input"
                type="number"
                value={dimensions.height}
                step={10}
                min={0}
                max={CANVAS.height}
                onChange={(e) =>
                  setDimensions((prev) => ({
                    ...prev,
                    height: Number(e.target.value),
                  }))
                }
              />
            </DimInput>
          </Dimensions>
        </InputContainer>
        <RgbColorPicker
          colors={rgba}
          onRedChange={(v) => setRgba((prev) => [v, prev[1], prev[2], prev[3]])}
          onGreenChange={(v) =>
            setRgba((prev) => [prev[0], v, prev[2], prev[3]])
          }
          onBlueChange={(v) =>
            setRgba((prev) => [prev[0], prev[1], v, prev[3]])
          }
          onAlphaChange={(v) =>
            setRgba((prev) => [prev[0], prev[1], prev[2], v])
          }
        />
        <InputContainer>
          <h3>Transformations</h3>
          <Slider
            label={`X: ${translation[0]}`}
            id="x-slider"
            max={CANVAS.width - dimensions.width}
            value={translation[0]}
            onSlide={(v) => setTranslation((prev) => [v, prev[1]])}
          />
          <Slider
            label={`Y: ${translation[1]}`}
            id="y-slider"
            min={0}
            max={CANVAS.height - dimensions.height}
            value={translation[1]}
            onSlide={(v) => setTranslation((prev) => [prev[0], v])}
          />
        </InputContainer>
      </Form>
      <ButtonContainer>
        <button type="button" onClick={() => addShape(glState)}>
          Create shape
        </button>
        <button type="button" onClick={clearCanvas}>
          Clear Canvas
        </button>
      </ButtonContainer>

      <canvas
        id="blank_canvas"
        width={CANVAS.width}
        height={CANVAS.height}
      ></canvas>
    </Container>
  )
}
