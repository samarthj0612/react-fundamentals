'use client'

import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AnimatePresence, motion } from "framer-motion";

import { Gender, SignupForm } from "@/types/form.types";
import { emailRegex } from "@/lib/validators";

const SignupPage = () => {
  const [isPasswordMasked, setIsPasswordMasked] = useState<boolean>(true);
  const [isConfirmedPasswordMasked, setIsConfirmedPasswordMasked] = useState<boolean>(true);

  const { register, getValues, setError, handleSubmit, formState: { errors, dirtyFields, disabled, isDirty, isLoading, isReady, isSubmitSuccessful, isSubmitted, isSubmitting, isValid, isValidating, submitCount, touchedFields, validatingFields, defaultValues } } = useForm<SignupForm>({
    defaultValues: {
      fname: '',
      lname: '',
    },
  });

  const onSubmitHandler: SubmitHandler<SignupForm> = (data) => {
    console.log("Submitted data => ", data);
  }

  return (
    <div>
      <h2 className="text-3xl text-center font-semibold mb-4">Create account</h2>

      <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col gap-8 bg-white p-8 rounded-lg">
        <div className="flex flex-wrap gap-8">
          <label htmlFor="fname" className="flex-1 border-b border-b-black/10">
            <p className="text-xs">First name</p>
            <input
              type="text"
              {...register('fname', {
                minLength: {
                  value: 4,
                  message: "Must be at least 4 characters"
                },
                required: "First name is required"
              })}
              className="min-w-48 w-full py-1 outline-none"
              placeholder="e.g. John"
            />
            {errors.fname && <p className="text-sm text-red-400">{errors.fname.message}</p>}
          </label>

          <label htmlFor="lname" className="flex-1 border-b border-b-black/10">
            <p className="text-xs">Last name</p>
            <input
              type="text"
              {...register('lname')}
              className="min-w-48 w-full py-1 outline-none"
              placeholder="e.g. Doe"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-8">
          <label htmlFor="dob" className="flex-1 border-b border-b-black/10">
            <p className="text-xs">Date of birth</p>
            <input
              type="date"
              {...register('dob')}
              className="min-w-48 w-full py-1 outline-none"
            />
          </label>

          <label htmlFor="gender" className="flex-1 border-b border-b-black/10">
            <p className="text-xs">Gender</p>
            <select
              {...register('gender')}
              className="min-w-48 w-full py-1 outline-none"
            >
              <option value={Gender.MALE}>Male</option>
              <option value={Gender.FEMALE}>Female</option>
              <option value={Gender.OTHER}>Other</option>
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-8">
          <label htmlFor="email" className="flex-1 border-b border-b-black/10">
            <p className="text-xs">Email</p>
            <input
              type="email"
              {...register('email', {
                required: "Email is required",
                pattern: {
                  value: emailRegex,
                  message: "Invalid email address"
                }
              })}
              className="min-w-48 w-full py-1 outline-none"
              placeholder="example@gmail.com"
            />

            {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
          </label>

          <label htmlFor="phone" className="flex-1 border-b border-b-black/10">
            <p className="text-xs">Phone</p>
            <input
              type="tel"
              {...register('phone', {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[1-9]\d{1,14}$/,
                  message: "Invalid phone number format"
                }
              })}
              className="min-w-48 w-full py-1 outline-none"
              placeholder="e.g. +1234567890"
            />
            {errors.phone && <p className="text-sm text-red-400">{errors.phone.message}</p>}
          </label>
        </div>

        <div className="flex flex-wrap gap-8">
          <label htmlFor="password" className="flex-1 border-b border-b-black/10">
            <p className="text-xs">Password</p>
            <div className="flex items-center gap-2">
              <input
                type={isPasswordMasked ? "password" : "text"}
                {...register('password', {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Must be at least 8 characters"
                  },
                })}
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

            {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}
          </label>

          <label htmlFor="confirmPassword" className="flex-1 border-b border-b-black/10">
            <p className="text-xs">Confirm password</p>
            <div className="flex items-center gap-2">
              <input
                type={isConfirmedPasswordMasked ? "password" : "text"}
                {...register('confirmPassword', {
                  required: "Please confirm your password",
                  onBlur: (e) => {
                    if (getValues('password') !== e.target.value) {
                      setError('root', {
                        type: 'manual',
                        message: "Passwords do not match"
                      })
                    } else {
                      setError('root', {
                        type: 'manual',
                        message: undefined
                      })
                    }
                  },
                })}
                className="min-w-48 w-full py-1 outline-none"
              />
              <span
                className="cursor-pointer inline-block"
                onClick={() => setIsConfirmedPasswordMasked(!isConfirmedPasswordMasked)}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isConfirmedPasswordMasked ? "eye" : "slash"}
                    initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isConfirmedPasswordMasked ? <FaEye /> : <FaEyeSlash />}
                  </motion.div>
                </AnimatePresence>
              </span>
            </div>

            {errors.confirmPassword && <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>}
          </label>
        </div>

        {errors.root && <p className="text-sm text-red-400">{errors.root.message}</p>}

        <div className="flex gap-4 justify-center">
          <button type="submit" className="w-fit mt-2 px-8 py-1 rounded text-white bg-[#007BFF]/80 hover:bg-[#007BFF] cursor-pointer transition-all">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
