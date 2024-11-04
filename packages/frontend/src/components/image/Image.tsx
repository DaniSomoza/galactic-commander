type ImageProps = {
  src: string
  alt: string
  height: string
  width: string
  border: boolean
}

function Image({ src, alt, height, width, border }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      height={height}
      width={width}
      style={{ borderRadius: border ? '4px' : '0px' }}
    />
  )
}

export default Image
