import { Controller, type FieldValues, type Path, type Control } from 'react-hook-form'
import './Form.scss'

interface FormTextareaProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  required?: boolean
  error?: string
  disabled?: boolean
  className?: string
  rows?: number
}

export function FormTextarea<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  required = false,
  error,
  disabled = false,
  className = '',
  rows = 4
}: FormTextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={`form-group ${error ? 'form-group--error' : ''}`}>
          {label && (
            <label htmlFor={name} className="form-group__label">
              {label}
              {required && <span className="form-group__required">*</span>}
            </label>
          )}
          <textarea
            {...field}
            id={name}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={`form-group__textarea ${className}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          />
          {error && (
            <span id={`${name}-error`} className="form-group__error-message">
              {error}
            </span>
          )}
        </div>
      )}
    />
  )
}
