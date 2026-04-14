import { useState, useActionState } from 'react';
import { Link } from 'react-router-dom';
import { getFormConfig } from '../../utils/storage';
import FormField from '../../components/FormField/FormField';
import styles from './FormPreview.module.css';

export default function FormPreview() {
  const formConfig = getFormConfig();
  const [formValues, setFormValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleFieldChange = (fieldId, value) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  // React 19 useActionState for form submission
  const [, submitAction, isPending] = useActionState(
    async () => {
      // Build the submission data with labels
      const submissionData = {};
      formConfig.forEach((field) => {
        submissionData[field.label || field.id] = formValues[field.id] ?? '';
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

  // No form config saved
  if (!formConfig || formConfig.length === 0) {
    return (
      <div className={styles.page} id="form-preview-page">
        <div className={styles.header}>
          <h1 className={styles.title}>Form Preview</h1>
          <p className={styles.subtitle}>Preview and submit your dynamic form</p>
        </div>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📝</div>
          <p className={styles.emptyText}>No form configuration found</p>
          <p className={styles.emptyHint}>
            Go to{' '}
            <Link to="/form-builder" className={styles.emptyLink}>
              Form Builder
            </Link>{' '}
            to create and save a form first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page} id="form-preview-page">
      <div className={styles.header}>
        <h1 className={styles.title}>Form Preview</h1>
        <p className={styles.subtitle}>
          Fill in the form below and submit — data will be printed to console
        </p>
      </div>

      {!submitted ? (
        <div className={styles.formCard}>
          <form action={submitAction}>
            {formConfig.map((field) => (
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
        <div className={styles.success}>
          <div className={styles.successIcon}>✅</div>
          <h2 className={styles.successTitle}>Form Submitted Successfully!</h2>
          <p className={styles.successMsg}>
            Check your browser console to see the submitted data.
          </p>
          <button className={styles.resetBtn} onClick={handleReset}>
            Fill Again
          </button>
        </div>
      )}
    </div>
  );
}
