import React from 'react'
import SpinnerLinear from '../components/layout/SpinnerLinear'

export default function withSuspense(Component) {
  return (props) => (
    <React.Suspense fallback={<SpinnerLinear />}>
      <Component {...props} />
    </React.Suspense>
  )
}
