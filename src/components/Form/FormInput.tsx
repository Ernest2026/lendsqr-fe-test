import { Controller, type FieldValues, type Path, type Control } from 'react-hook-form'
import './Form.scss'

interface FormInputProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  type?: string
  required?: boolean
  error?: string
  disabled?: boolean
  className?: string
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  required = false,
  error,
  disabled = false,
  className = ''
}: FormInputProps<T>) {
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
          <input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={`form-group__input ${className}`}
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
