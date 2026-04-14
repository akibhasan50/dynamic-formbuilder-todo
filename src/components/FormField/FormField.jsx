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
              {parsedOptions.map((opt) => (
                <label key={opt} className={styles.checkLabel}>
                  <input
                    type="checkbox"
                    value={opt}
                    checked={selectedValues.includes(opt)}
                    onChange={(e) => {
                      const next = e.target.checked
                        ? [...selectedValues, opt]
                        : selectedValues.filter((v) => v !== opt);
                      onChange(id, next);
                    }}
                  />
                  {opt}
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
            {parsedOptions.map((opt) => (
              <label key={opt} className={styles.checkLabel}>
                <input
                  type="radio"
                  name={`radio-${id}`}
                  value={opt}
                  checked={value === opt}
                  onChange={(e) => onChange(id, e.target.value)}
                  required={required}
                />
                {opt}
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
