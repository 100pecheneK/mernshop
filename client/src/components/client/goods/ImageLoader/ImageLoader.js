import React, {useState} from 'react'
import PropTypes from 'prop-types'
import './ImageLoader.css'

const ImageLoader = ({src, alt, onClick, className, loadedClassName, loadingClassName}) => {
  const [loaded, setLoaded] = useState(false)

  const onLoad = () => {
    setLoaded(true)
  }

  const imgClassNames = `${className} ${loaded ? loadedClassName : loadingClassName}`

  return <img
    src={src}
    onClick={onClick}
    className={imgClassNames}
    onLoad={onLoad}
    alt={alt}
  />
}

ImageLoader.defaultProps = {
  className: '',
  loadingClassName: "img-loading",
  loadedClassName: "img-loaded"
}

ImageLoader.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}

export default ImageLoader