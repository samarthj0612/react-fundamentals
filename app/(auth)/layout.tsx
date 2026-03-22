import { PropsWithChildren } from 'react'

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="p-8 min-h-screen w-full flex justify-center items-center bg-gray-100">
      <div className="w-full md:w-3/4 lg:w-1/2">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout