import styles from './FormField.module.css';

export default function FormField({ field, value, onChange }) {
  const { label, type, options, required, id } = field;
  const parsedOptions = options
    ? options.split(',').map((o) => o.trim()).filter(Boolean)
    : [];

  const fieldId = `form-field-${id}`;

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={fieldId}
            className={styles.textarea}
            placeholder={`Enter ${label}...`}
            value={value || ''}
            onChange={(e) => onChange(id, e.target.value)}
            required={required}
          />
        );

      case 'select':
        return (
          <select
            id={fieldId}
            className={styles.select}
            value={value || ''}
            onChange={(e) => onChange(id, e.target.value)}
            required={required}
          >
            <option value="">Select {label}...</option>
            {parsedOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        if (parsedOptions.length > 0) {
          const selectedValues = value ? (Array.isArray(value) ? value : [value]) : [];
          return (
            <div className={styles.checkGroup}>
              {parsedOptions.map((option) => (
                <label key={option} className={styles.checkLabel}>
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedValues.includes(option)}
                    onChange={(e) => {
                      const next = e.target.checked
                        ? [...selectedValues, option]
                        : selectedValues.filter((v) => v !== option);
                      onChange(id, next);
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          );
        }
        // Single boolean checkbox
        return (
          <label className={styles.singleCheck}>
            <input
              id={fieldId}
              type="checkbox"
              checked={!!value}
              onChange={(e) => onChange(id, e.target.checked)}
            />
            {label}
          </label>
        );

      case 'radio':
        return (
          <div className={styles.checkGroup}>
            {parsedOptions.map((option) => (
              <label key={option} className={styles.checkLabel}>
                <input
                  type="radio"
                  name={`radio-${id}`}
                  value={option}
                  checked={value === option}
                  onChange={(e) => onChange(id, e.target.value)}
                  required={required}
                />
                {option}
              </label>
            ))}
          </div>
        );

      default:
        // text, number, email, password, date
        return (
          <input
            id={fieldId}
            type={type}
            className={styles.input}
            placeholder={`Enter ${label}...`}
            value={value || ''}
            onChange={(e) => onChange(id, e.target.value)}
            required={required}
          />
        );
    }
  };

  return (
    <div className={styles.fieldWrapper}>
      {type !== 'checkbox' || parsedOptions.length > 0 ? (
        <label htmlFor={fieldId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      ) : null}
      {renderInput()}
    </div>
  );
}
