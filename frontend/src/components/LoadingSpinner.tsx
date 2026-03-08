import React from 'react'

interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'default' | 'lg' | 'xl'
  color?: 'default' | 'muted' | 'white'
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  size = 'default',
  color = 'default',
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  }

  const colorClasses = {
    default: 'text-primary',
    muted: 'text-muted-foreground',
    white: 'text-white',
  }

  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${sizeClasses[size]} ${colorClasses[color]} ${className || ''}`}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default LoadingSpinner
