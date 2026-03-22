"use client";

import { emailRegex } from "@/lib/validators";
import { useFormik } from "formik"
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const page = () => {
  const [isPasswordMasked, setIsPasswordMasked] = useState<boolean>(true);

  const handleSubmit = (params: any) => {
    console.log(params)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      if(!values.email){
        return { email: "Email is required" }
      }

      if(!values.email.match(emailRegex)) {
        return { email: "Invalid email address" }
      }

      if(!values.password) {
        return { password: "Password is required" }
      }

      if(values.password.length < 8) {
        return { password: "Must be at least 8 characters" }
      }
    },
    onSubmit: handleSubmit,
  })  

  return (
    <div>
      <h2 className="text-3xl text-center font-semibold mb-4">Login account</h2>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8 bg-white p-8 rounded-lg">
        <div className="flex flex-wrap gap-8">
          <label htmlFor="email" className="flex-1 border-b border-b-black/10">
            <p className="text-xs">Email</p>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              className="min-w-48 w-full py-1 outline-none"
              placeholder="example@domain.com"
            />
            { formik.errors.email  && <p className="text-sm text-red-400">{formik.errors.email}</p> }
          </label>
        </div>

        <div className="flex flex-wrap gap-8">
          <label htmlFor="password" className="flex-1 border-b border-b-black/10">
              <p className="text-xs">Password</p>
              <div className="flex items-center gap-2">
                <input
                  type={isPasswordMasked ? "password" : "text"}
                  name="password"
                  onChange={formik.handleChange}
                  className="min-w-48 w-full py-1 outline-none"
                />
                <span 
                  className="cursor-pointer inline-block" 
                  onClick={() => setIsPasswordMasked(!isPasswordMasked)}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={isPasswordMasked ? "eye" : "slash"}
                      initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                      transition={{ duration: 0.15 }}
                    >
                      {isPasswordMasked ? <FaEye /> : <FaEyeSlash />}
                    </motion.div>
                  </AnimatePresence>
                </span>
              </div>

              { formik.errors.password  && <p className="text-sm text-red-400">{formik.errors.password}</p> }
            </label>
        </div>

        <div className="flex gap-4 justify-center">
          <button type="submit" className="w-fit mt-2 px-8 py-1 rounded text-white bg-[#007BFF]/80 hover:bg-[#007BFF] cursor-pointer transition-all">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default page