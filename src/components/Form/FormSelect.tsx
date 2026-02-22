import { Controller, type FieldValues, type Path, type Control } from 'react-hook-form'
import './Form.scss'

interface FormSelectOption {
  value: string
  label: string
}

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  options: FormSelectOption[]
  placeholder?: string
  required?: boolean
  error?: string
  disabled?: boolean
  className?: string
}

export function FormSelect<T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder,
  required = false,
  error,
  disabled = false,
  className = ''
}: FormSelectProps<T>) {
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
          <select
            {...field}
            id={name}
            disabled={disabled}
            className={`form-group__input form-group__select ${className}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
