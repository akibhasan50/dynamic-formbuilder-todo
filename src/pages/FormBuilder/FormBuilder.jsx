import { useState, useActionState } from 'react';
import { useFormConfig } from '../../hooks/useFormConfig';
import FormField from '../../components/FormField/FormField';
import styles from './FormBuilder.module.css';

const INPUT_TYPES = [
  { value: 'text', label: 'Text Input' },
  { value: 'number', label: 'Number' },
  { value: 'email', label: 'Email' },
  { value: 'password', label: 'Password' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'select', label: 'Dropdown (Select)' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'radio', label: 'Radio Buttons' },
  { value: 'date', label: 'Date Picker' },
];

const NEEDS_OPTIONS = ['select', 'radio', 'checkbox'];

export default function FormBuilder() {
  const { fields, addField, removeField, updateField, moveField, save, saveStatus } = useFormConfig();
  const [formValues, setFormValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Only show fields with labels in preview
  const previewFields = fields.filter((f) => f.label.trim() !== '');

  const handleFieldChange = (fieldId, value) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  // React 19 useActionState for form submission
  const [, submitAction, isPending] = useActionState(
    async () => {
      const submissionData = {};
      previewFields.forEach((field) => {
        submissionData[field.label] = formValues[field.id] ?? '';
      });

      console.log('═══════════════════════════════════════');
      console.log('📋 Form Submitted! Data:');
      console.log('═══════════════════════════════════════');
      console.log(JSON.stringify(submissionData, null, 2));
      console.log('═══════════════════════════════════════');

      setSubmitted(true);
      return submissionData;
    },
    null
  );

  const handleReset = () => {
    setFormValues({});
    setSubmitted(false);
  };

  return (
    <div className={styles.page} id="form-builder-page">
      <div className={styles.header}>
        <h1 className={styles.title}>Form Builder</h1>
        <p className={styles.subtitle}>
          Define fields on the left — see a live preview on the right
        </p>
      </div>

      <div className={styles.splitLayout}>
        {/* ===== LEFT: Builder Panel ===== */}
        <div className={styles.builderPanel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelIcon}>🛠️</span>
            <span className={styles.panelTitle}>Fields</span>
            <span className={styles.panelBadge}>{fields.length}</span>
          </div>

          {fields.length === 0 && (
            <div className={styles.emptyBuilder}>
              <div className={styles.emptyBuilderIcon}>📝</div>
              <p>No fields yet. Add one below.</p>
            </div>
          )}

          {fields.map((field, index) => (
            <div key={field.id} className={styles.fieldRow}>
              <span className={styles.fieldNumber}>{index + 1}</span>

              <div className={styles.fieldInputs}>
                {/* Label */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel} htmlFor={`label-${field.id}`}>
                    Label / Name
                  </label>
                  <input
                    id={`label-${field.id}`}
                    type="text"
                    className={styles.input}
                    placeholder='e.g. "User Name"'
                    value={field.label}
                    onChange={(e) => updateField(field.id, 'label', e.target.value)}
                  />
                </div>

                {/* Input Type */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel} htmlFor={`type-${field.id}`}>
                    Input Type
                  </label>
                  <select
                    id={`type-${field.id}`}
                    className={styles.select}
                    value={field.type}
                    onChange={(e) => updateField(field.id, 'type', e.target.value)}
                  >
                    {INPUT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Options (for select, radio, checkbox) */}
                {NEEDS_OPTIONS.includes(field.type) && (
                  <div className={`${styles.inputGroup} ${styles.inputGroupFull}`}>
                    <label className={styles.inputLabel} htmlFor={`options-${field.id}`}>
                      Options (comma-separated)
                    </label>
                    <input
                      id={`options-${field.id}`}
                      type="text"
                      className={styles.input}
                      placeholder='e.g. "Option 1, Option 2"'
                      value={field.options}
                      onChange={(e) => updateField(field.id, 'options', e.target.value)}
                    />
                  </div>
                )}

                {/* Required */}
                <div className={styles.inputGroup}>
                  <label className={styles.requiredToggle}>
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) => updateField(field.id, 'required', e.target.checked)}
                    />
                    Required
                  </label>
                </div>
              </div>

              {/* Field Actions */}
              <div className={styles.fieldActions}>
                <button
                  className={styles.iconBtn}
                  onClick={() => moveField(index, -1)}
                  disabled={index === 0}
                  title="Move up"
                  aria-label="Move field up"
                >
                  ↑
                </button>
                <button
                  className={styles.iconBtn}
                  onClick={() => moveField(index, 1)}
                  disabled={index === fields.length - 1}
                  title="Move down"
                  aria-label="Move field down"
                >
                  ↓
                </button>
                <button
                  className={`${styles.iconBtn} ${styles.deleteBtn}`}
                  onClick={() => removeField(field.id)}
                  title="Remove field"
                  aria-label="Remove field"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          {/* Bottom Actions */}
          <div className={styles.bottomActions}>
            <button className={styles.addBtn} onClick={addField} id="add-field-btn">
              <span>+</span> Add Field
            </button>
            <button
              className={`${styles.saveBtn} ${
                saveStatus === 'saving' ? styles.saveBtnSaving : ''
              } ${saveStatus === 'saved' ? styles.saveBtnSaved : ''}`}
              onClick={save}
              id="save-form-btn"
            >
              {saveStatus === 'saving' && '⏳ Saving...'}
              {saveStatus === 'saved' && '✓ Saved!'}
              {saveStatus === 'idle' && '💾 Save Form'}
            </button>
          </div>
        </div>

        {/* ===== RIGHT: Live Preview Panel ===== */}
        <div className={styles.previewPanel}>
          <div className={styles.panelHeader}>
            <span className={`${styles.panelIcon} ${styles.panelIconPreview}`}>👁️</span>
            <span className={styles.panelTitle}>Live Preview</span>
          </div>

          {previewFields.length === 0 ? (
            <div className={styles.previewEmpty}>
              <div className={styles.previewEmptyIcon}>📝</div>
              <p className={styles.previewEmptyText}>No fields to preview</p>
              <p className={styles.previewEmptyHint}>
                Add a field with a label to see it here
              </p>
            </div>
          ) : !submitted ? (
            <div className={styles.previewCard}>
              <form action={submitAction}>
                {previewFields.map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    value={formValues[field.id]}
                    onChange={handleFieldChange}
                  />
                ))}

                <div className={styles.divider} />

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isPending}
                  id="submit-form-btn"
                >
                  {isPending ? '⏳ Submitting...' : '🚀 Submit Form'}
                </button>
              </form>
            </div>
          ) : (
            <div className={styles.successToast}>
              <p>✅ Form Submitted!</p>
              <span>Check your browser console for the data.</span>
              <br />
              <button className={styles.resetBtn} onClick={handleReset}>
                Fill Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
