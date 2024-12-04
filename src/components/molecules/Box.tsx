import { Sprite } from '@pixi/react'
import { useRef, useState } from 'react'
import { Texture } from 'pixi.js'
import { Coordinates } from '../../core/pixi/pixi'
// Another odd export issue with the typings
import { ColorSource } from 'pixi.js'

let index = 1
type SpriteEvent = {
  data: {
    global: {
      x: number
      y: number
    }
  }
}

interface Props {
  x?: number
  y?: number
  tint?: ColorSource
  height?: number
  width?: number
}

export const Box: React.FC<Props> = ({ x, y, tint, height, width }) => {
  const isDragging = useRef<boolean>(false)
  const offset = useRef<Coordinates>({ x: 0, y: 0 })
  const [position, setPosition] = useState<Coordinates>({
    x: x ?? 0,
    y: y ?? 0,
  })
  const [alpha, setAlpha] = useState<number>(1)
  const [zIndex, setZIndex] = useState<number>(index)

  const onStart = (e: SpriteEvent) => {
    isDragging.current = true
    offset.current = {
      x: e.data.global.x - position.x,
      y: e.data.global.y - position.y,
    }

    setAlpha(0.5)
    setZIndex(index++)
  }

  const onEnd = () => {
    isDragging.current = false
    setAlpha(1)
  }

  const onMove = (e: SpriteEvent) => {
    if (isDragging.current) {
      setPosition({
        x: e.data.global.x - offset.current.x,
        y: e.data.global.y - offset.current.y,
      })
    }
  }

  return (
    <Sprite
      tint={tint}
      // Weird type issue with Pixi
      texture={Texture.WHITE}
      width={width ?? 100}
      height={height ?? 100}
      position={position}
      alpha={alpha}
      zIndex={zIndex}
      interactive={true}
      pointerdown={onStart}
      pointerup={onEnd}
      pointerupoutside={onEnd}
      pointermove={onMove}
    />
  )
}
