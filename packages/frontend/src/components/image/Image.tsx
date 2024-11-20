type ImageProps = {
  src: string
  alt: string
  height: string
  width: string
  border?: boolean
  disabled?: boolean
}

function Image({ src, alt, height, width, border, disabled }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      height={height}
      width={width}
      style={{
        borderRadius: border ? '4px' : '0px',
        filter: disabled ? 'grayscale(100%)' : 'none'
      }}
    />
  )
}

export default Image
