import { FC, ReactNode } from 'react'
import cl from './ErrorMessage.module.scss'

interface ErrorMessageProps {
  styles?: React.CSSProperties;
  children?: ReactNode;
}

const ErrorMessage:FC<ErrorMessageProps> = ({children, styles}) => {
  return (
    <div style={styles} className={cl.errorMessage}>{children}</div>
  )
}

export default ErrorMessage