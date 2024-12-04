import { Sprite } from 'pixi.js'

export type ISprite = {
  [K in keyof Sprite]: Sprite[K]
}

export type Coordinates = { x: number; y: number }
