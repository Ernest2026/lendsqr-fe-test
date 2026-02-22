import { Controller, type FieldValues, type Path, type Control } from 'react-hook-form'
import './Form.scss'

interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  error?: string
  disabled?: boolean
  className?: string
}

export function FormCheckbox<T extends FieldValues>({
  name,
  control,
  label,
  error,
  disabled = false,
  className = ''
}: FormCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={`form-group form-group--checkbox ${error ? 'form-group--error' : ''}`}>
          <label htmlFor={name} className="form-group__checkbox-label">
            <input
              {...field}
              id={name}
              type="checkbox"
              checked={field.value || false}
              disabled={disabled}
              className={`form-group__checkbox ${className}`}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : undefined}
            />
            <span>{label}</span>
          </label>
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
