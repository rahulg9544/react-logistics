export default function FormInput({
  label,
  type = 'text',
  form,
  name,
  readOnly = false,
  textarea = false
}) {
  const InputTag = textarea ? 'textarea' : 'input'

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <InputTag
        type={type}
        className={`form-control ${form.errors[name] ? 'is-invalid' : ''}`}
        {...form.getInputProps(name)}
        readOnly={readOnly}
      />
      {form.errors[name] && (
        <div className="invalid-feedback">{form.errors[name]}</div>
      )}
    </div>
  )
}
