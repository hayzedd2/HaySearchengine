import React from 'react'

const ErrorElement = ({message}) => {
  return (
    <div className='err-container'>
        {message}
    </div>
  )
}

export default ErrorElement