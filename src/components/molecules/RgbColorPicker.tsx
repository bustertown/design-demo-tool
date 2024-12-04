import styled from 'styled-components'
import { Slider } from '../atoms/Slider'

const Container = styled.fieldset`
  display: flex;
  flex-direction: column;
  > h3 {
    margin: 0;
    margin-bottom: 10px;
  }
`
type Rgba = [number, number, number, number]

interface Props {
  colors: Rgba
  onRedChange: (value: number) => void
  onGreenChange: (value: number) => void
  onBlueChange: (value: number) => void
  onAlphaChange: (value: number) => void
}

export const RgbColorPicker: React.FC<Props> = ({
  colors,
  onRedChange,
  onGreenChange,
  onBlueChange,
  onAlphaChange,
}) => {
  return (
    <Container>
      <h3>Shape Color</h3>
      <Slider
        label={`Red: ${colors[0]}`}
        id="red-slider"
        min={0}
        max={255}
        value={colors[0]}
        onSlide={onRedChange}
      />
      <Slider
        label={`Green: ${colors[1]}`}
        id="green-slider"
        min={0}
        max={255}
        value={colors[1]}
        onSlide={onGreenChange}
      />
      <Slider
        label={`Blue: ${colors[2]}`}
        id="blue-slider"
        min={0}
        max={255}
        value={colors[2]}
        onSlide={onBlueChange}
      />
      <Slider
        label={`Alpha: ${colors[3]}`}
        id="alpha-slider"
        step={0.1}
        min={0}
        max={1}
        value={colors[3]}
        onSlide={onAlphaChange}
      />
    </Container>
  )
}
