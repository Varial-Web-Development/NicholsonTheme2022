export default function JobListing({ listing }) {
  return (
    <form className="grid w-[calc(100%-32px)] max-w-xl mx-auto border p-3 my-8 gap-8">
      <h1 className="text-3xl">{listing.name}</h1>
      <p>{listing.description}</p>
      {listing.sections.map(section => (
        <section key={section.name} className="grid gap-4">
          <h2 className="text-xl font-semibold">{section.name}</h2>
          {section.fields.map(field => {
            if (field.inputType === 'container') {
              return (
                <div key={field.name} className="bg-slate-50 border border-slate-100 p-1 mb-4">
                  <h3 className="text-base font-medium">{field.name}</h3>
                  <div className="grid gap-4">
                    {field.subFields.map(subField => (
                      <div key={subField.name}>
                        <label className="text-sm flex gap-1">{subField.name}{subField.required && <span>(*)</span>}</label>
                        {subField.inputType === 'text' && <input name={`${field.name} ${subField.name}`} required={field.required} className="input" />}
                        {subField.inputType === 'textArea' && <textarea name={`${field.name} ${subField.name}`} required={field.required} rows="4" className="input" />}
                      </div>
                    ))}
                  </div>
                </div>
              )
            }

            return (
              <div key={field.name}>
                <label htmlFor={field.name} className="flex gap-1">{field.name}{field.required && <span>(*)</span>}</label>
                {field.inputType === 'text' && <input name={field.name} className="input" required={field.required} />}
              </div>
            )
          })}
        </section>
      ))}
      <div className="grid">
        <label htmlFor="resume">Attach Resume</label>
        <input type="file" name="resume" />
      </div>
      <button className="action-btn">Submit Application</button>
    </form>
  )
}
