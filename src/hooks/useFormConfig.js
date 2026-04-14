import { useState, useCallback } from 'react';
import { saveFormConfig, getFormConfig } from '../utils/storage';

const createEmptyField = () => ({
  id: crypto.randomUUID(),
  label: '',
  type: 'text',
  options: '',
  required: false,
});

export function useFormConfig() {
  const [fields, setFields] = useState(() => {
    const saved = getFormConfig();
    return saved && saved.length > 0 ? saved : [createEmptyField()];
  });

  const [saveStatus, setSaveStatus] = useState('idle'); // idle | saving | saved

  const addField = useCallback(() => {
    setFields((prev) => [...prev, createEmptyField()]);
  }, []);

  const removeField = useCallback((id) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  }, []);

  const updateField = useCallback((id, key, value) => {
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, [key]: value } : field))
    );
  }, []);

  const moveField = useCallback((index, direction) => {
    setFields((prev) => {
      const next = [...prev];
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= next.length) return prev;
      [next[index], next[newIndex]] = [next[newIndex], next[index]];
      return next;
    });
  }, []);

  const save = useCallback(() => {
    // Validate: at least one field with a label
    const validFields = fields.filter((field) => field.label.trim() !== '');
    if (validFields.length === 0) {
      alert('Please add at least one field with a label.');
      return false;
    }
    setSaveStatus('saving');
    saveFormConfig(validFields);
    setTimeout(() => setSaveStatus('saved'), 300);
    setTimeout(() => setSaveStatus('idle'), 2000);
    return true;
  }, [fields]);

  return {
    fields,
    addField,
    removeField,
    updateField,
    moveField,
    save,
    saveStatus,
  };
}
