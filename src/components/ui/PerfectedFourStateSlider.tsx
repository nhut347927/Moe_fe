"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface PerfectedFourStateSliderProps {
  label: string
  states: string[]
  initialState?: number
  onChange?: (currentState: number) => void
}

const PerfectedFourStateSlider: React.FC<PerfectedFourStateSliderProps> = ({
  label,
  states,
  initialState = 0,
  onChange,
}) => {
  const [currentState, setCurrentState] = useState(initialState)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleInteraction = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect()
      const x = "touches" in event ? event.touches[0].clientX : event.clientX
      const relativeX = x - rect.left
      const newState = Math.min(Math.max(Math.floor((relativeX / rect.width) * 4), 0), 3)
      setCurrentState(newState)
      if (onChange) {
        onChange(newState)
      }
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      setCurrentState((prev) => Math.min(prev + 1, 3))
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      setCurrentState((prev) => Math.max(prev - 1, 0))
    }
  }

  useEffect(() => {
    if (onChange) {
      onChange(currentState)
    }
  }, [currentState, onChange])

  return (
    <div className="w-48">
      {/* <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label> */}
      <div
        ref={sliderRef}
        className="relative h-4 bg-gray-200 rounded-full cursor-pointer"
        onClick={handleInteraction}
        onTouchMove={handleInteraction}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={3}
        aria-valuenow={currentState}
        aria-valuetext={states[currentState]}
      >
        {states.map((_, index) => (
          <div
            key={index}
            className="absolute top-1/2 w-2 h-2 bg-white rounded-full transform -translate-y-1/2 border border-gray-300"
            style={{ left: `calc(${(index / 3) * 100}% - ${index === 3 ? "1px" : "0px"})` }}
          ></div>
        ))}
        <div
          className="absolute top-1/2 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 border-2 border-gray-400"
          style={{ left: `${(currentState / 3) * 100}%` }}
        ></div>
      </div>
      {/* <div className="mt-1 text-sm text-gray-600">{states[currentState]}</div> */}
    </div>
  )
}

export default PerfectedFourStateSlider

