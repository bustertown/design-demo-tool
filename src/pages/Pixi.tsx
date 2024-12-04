import { Container, Stage } from '@pixi/react'
import styled from 'styled-components'
import { CANVAS } from '../core/constants'
import { Box } from '../components/molecules/Box'
import { useCallback, useState } from 'react'
import { v4 } from 'uuid'
import { RgbColorPicker } from '../components'
import { toGlclampf } from '../core/webgl/utils/toGlclampf'

const StyledContainer = styled.div`
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

export const Pixi: React.FC = () => {
  const [shapes, setShapes] = useState<React.ReactNode[]>([])
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

  const addShape = useCallback(() => {
    const id = v4()
    setShapes((prev) => [
      ...prev,
      <Box
        tint={toGlclampf(rgba[0], rgba[1], rgba[2], rgba[3])}
        width={dimensions.width}
        height={dimensions.height}
        key={id}
      />,
    ])
  }, [rgba, dimensions])

  const clearCanvas = () => {
    setShapes([])
    setDimensions({ width: 100, height: 100 })
    setRgba([0, 0, 0, 0])
  }

  return (
    <StyledContainer>
      <h2>Pixi</h2>
      <Form>
        <InputContainer>
          <h3>Shape</h3>
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
        <button type="button" onClick={addShape}>
          Add Shape
        </button>
      </Form>
      <button type="button" onClick={clearCanvas}>
        Clear Canvas
      </button>
      <Stage width={CANVAS.width} height={CANVAS.height}>
        <Container sortableChildren={true}>
          {shapes.map((shape) => shape)}
        </Container>
      </Stage>
    </StyledContainer>
  )
}
