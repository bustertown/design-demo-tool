import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: number
  onSlide: (value: number) => void
  className?: string
  label?: string
}

export const Slider: React.FC<Props> = ({
  value,
  onSlide,
  id,
  label,
  min = 0,
  ...rest
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type="range"
        id={id}
        value={value}
        onChange={(e) => onSlide(Number(e.target.value))}
        min={min}
        {...rest}
      />
    </>
  )
}
