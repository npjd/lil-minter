import React from 'react'
import InfoIcon from './icons/InfoIcon'
import SuccessIcon from './icons/SuccessIcon'
import ErrorIcon from './icons/ErrorIcon'
import CloseIcon from './icons/CloseIcon'
import { AlertTemplateProps } from 'react-alert'

const alertStyle = {
  backgroundColor: '#151515',
  color: 'white',
  padding: '10px',
  borderRadius: '3px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
  fontFamily: 'Arial',
  width: '300px',
}

const buttonStyle = {
  marginLeft: '20px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: '#FFFFFF',
}

const AlertContainer = ({
  message,
  options,
  style,
  close,
}: AlertTemplateProps) => {
  return (
    <div style={{ ...alertStyle, ...style }}>
      {options.type === 'info' && <InfoIcon />}
      {options.type === 'success' && <SuccessIcon />}
      {options.type === 'error' && <ErrorIcon />}
      <span style={{ flex: 2 }}>{message}</span>
      <button onClick={close} style={buttonStyle}>
        <CloseIcon />
      </button>
    </div>
  )
}

export default AlertContainer
