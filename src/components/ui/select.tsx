'use client'

import * as React from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  children: React.ReactNode
  disabled?: boolean
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
  onSelect?: (value: string) => void
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ value, onValueChange, placeholder, children, disabled, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState(value || '')
    const selectRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => selectRef.current!)

    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value)
      }
    }, [value])

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSelect = (itemValue: string) => {
      setSelectedValue(itemValue)
      setIsOpen(false)
      onValueChange?.(itemValue)
    }

    const selectedLabel = React.Children.toArray(children).find((child) => {
      if (React.isValidElement(child) && (child.props as any).value === selectedValue) {
        return (child.props as any).children
      }
      return null
    })

    return (
      <div ref={selectRef} className="relative" {...props}>
        <button
          type="button"
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            isOpen && 'ring-2 ring-ring ring-offset-2'
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className={selectedValue ? 'text-foreground' : 'text-muted-foreground'}>
            {selectedLabel || placeholder || 'Select...'}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-md">
            <div className="max-h-60 overflow-auto p-1">
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child, {
                    onSelect: handleSelect,
                    isSelected: (child.props as any).value === selectedValue,
                  } as any)
                }
                return child
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps & { isSelected?: boolean }>(
  ({ value, children, onSelect, isSelected, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          isSelected && 'bg-accent text-accent-foreground'
        )}
        onClick={() => onSelect?.(value)}
        {...props}
      >
        <Check className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')} />
        {children}
      </div>
    )
  }
)
SelectItem.displayName = 'SelectItem'

export { Select, SelectItem }