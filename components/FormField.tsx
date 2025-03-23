
type FormFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  errors?: string | string[];
  required?: boolean;
  autoComplete?: string;
  className?: string;
};

export default function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  defaultValue,
  errors,
  required = false,
  autoComplete = 'off',
  className = '',
}: FormFieldProps) {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className={`form-control ${errors ? 'is-invalid' : ''} ${className}`}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
      />
      {errors && (
        <div className="invalid-feedback d-block" role="alert">
          {Array.isArray(errors) ? (
            errors.map((error, i) => (
              <div key={i}>{error}</div>
            ))
          ) : (
            errors
          )}
        </div>
      )}
    </div>
  );
} 