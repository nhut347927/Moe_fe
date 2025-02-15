"use client"

import type React from "react"
import { useState } from "react"

interface ToggleButtonProps {
  label: string
  initialState?: boolean
  onChange?: (isOn: boolean) => void
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ label, initialState = false, onChange }) => {
  const [isOn, setIsOn] = useState(initialState)

  const handleToggle = () => {
    const newState = !isOn
    setIsOn(newState)
    if (onChange) {
      onChange(newState)
    }
  }

  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={isOn} onChange={handleToggle} />
        <div
          className={`block w-14 h-8 rounded-full transition-colors duration-300 ease-in-out ${
            isOn ? "bg-green-400" : "bg-gray-400"
          }`}
        ></div>
        <div
          className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
            isOn ? "transform translate-x-full" : ""
          }`}
        ></div>
      </div>
      {/* <div className="ml-3 text-gray-700 font-medium">{label}</div> */}
    </label>
  )
}

export default ToggleButton

