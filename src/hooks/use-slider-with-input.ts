'use client'

import type React from 'react'
import { useCallback, useState } from 'react'

const numberInputRegex = /^-?\d*\.?\d*$/

type UseSliderWithInputProps = {
  minValue?: number
  maxValue?: number
  initialValue?: number[]
  defaultValue?: number[]
}

export function useSliderWithInput({
  minValue = 0,
  maxValue = 1000000,
  initialValue = [minValue],
  defaultValue = [minValue],
}: UseSliderWithInputProps) {
  const [sliderValue, setSliderValue] = useState(initialValue)
  const [inputValues, setInputValues] = useState(
    initialValue.map((v) => v.toString())
  )

  const showReset =
    sliderValue.length === defaultValue.length &&
    !sliderValue.every((value, index) => value === defaultValue[index])

  // Helper to update both slider and input states
  const _updateStateValues = useCallback(
    (index: number, numericValue: number, stringValue: string) => {
      const newSliderValues = [...sliderValue]
      newSliderValues[index] = numericValue
      setSliderValue(newSliderValues)

      const newInputValues = [...inputValues]
      newInputValues[index] = stringValue
      setInputValues(newInputValues)
    },
    [sliderValue, inputValues] // Dependencies: sliderValue, inputValues
  )

  // Helper to clamp value within bounds and against other thumb if present
  const _getClampedValue = useCallback(
    (numValue: number, index: number): number => {
      let clamped = Math.min(maxValue, Math.max(minValue, numValue))

      if (sliderValue.length > 1) {
        if (index === 0) {
          // Min thumb: cannot be greater than max thumb
          clamped = Math.min(clamped, sliderValue[1] ?? maxValue)
        } else {
          // Max thumb: cannot be less than min thumb
          clamped = Math.max(clamped, sliderValue[0] ?? minValue)
        }
      }
      return clamped
    },
    [minValue, maxValue, sliderValue] // Dependencies: minValue, maxValue, sliderValue
  )

  const validateAndUpdateValue = useCallback(
    (rawValue: string, index: number) => {
      // Handle empty string or just a minus sign -> treat as 0
      if (rawValue === '' || rawValue === '-') {
        _updateStateValues(index, 0, '0')
        return
      }

      const numValue = Number.parseFloat(rawValue)

      // Handle non-numeric input -> revert input to current slider value
      if (Number.isNaN(numValue)) {
        const fallbackStringValue =
          sliderValue[index] !== undefined ? sliderValue[index].toString() : '0'
        // No need to update sliderValue here, just reset input display
        const newInputValues = [...inputValues]
        newInputValues[index] = fallbackStringValue
        setInputValues(newInputValues)
        return
      }

      // Clamp the valid number and update states
      const clampedValue = _getClampedValue(numValue, index)
      _updateStateValues(index, clampedValue, clampedValue.toString())
    },
    // Dependencies needed by helpers called within
    [_getClampedValue, _updateStateValues, sliderValue, inputValues]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const newValue = e.target.value
      // Allow only valid numeric input patterns
      if (newValue === '' || numberInputRegex.test(newValue)) {
        const newInputValues = [...inputValues]
        newInputValues[index] = newValue
        setInputValues(newInputValues)
      }
    },
    [inputValues] // Dependency: inputValues
  )

  const handleSliderChange = useCallback((newValue: number[]) => {
    setSliderValue(newValue)
    setInputValues(newValue.map((v) => v.toString()))
  }, []) // No dependencies, only uses setters

  const resetToDefault = useCallback(() => {
    setSliderValue(defaultValue)
    setInputValues(defaultValue.map((v) => v.toString()))
  }, [defaultValue]) // Dependency: defaultValue

  return {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
    resetToDefault,
    showReset,
  }
}
