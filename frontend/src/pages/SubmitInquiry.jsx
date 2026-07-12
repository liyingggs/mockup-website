import React, { useState } from 'react';

export default function SubmitInquiry() {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [businessType, setBusinessType] = useState('Retail');
  const [preferredPremises, setPreferredPremises] = useState('Mall retail');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setStatus(null);
    const subject = `${companyName} | ${businessType} | ${preferredPremises}`;
    const payloadMessage = [
      `Company Name: ${companyName}`,
      `Contact Person: ${contactPerson}`,
      `Business Type: ${businessType}`,
      `Preferred Premises: ${preferredPremises}`,
      '',
      message,
    ].join('\n');

    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: contactPerson, email, subject, message: payloadMessage }),
    });
    if (res.ok) {
      setStatus('Submitted. A CDL staff member will follow up within 3 working days.');
      setCompanyName('');
      setContactPerson('');
      setEmail('');
      setBusinessType('Retail');
      setPreferredPremises('Mall retail');
      setMessage('');
    } else {
      const err = await res.json();
      setStatus(err.error || 'Submission failed');
    }
  };

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Contact Form</p>
          <h2>Submit a leasing or tenancy enquiry.</h2>
        </div>
      </div>
      <form className="user-form" onSubmit={submit}>
        <label>
          Company Name
          <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
        </label>
        <label>
          Contact Person
          <input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Business Type
          <select value={businessType} onChange={(e) => setBusinessType(e.target.value)}>
            <option>Retail</option>
            <option>Food & Beverage</option>
            <option>Shopfront Specialty</option>
            <option>Flexible Workplace</option>
          </select>
        </label>
        <label>
          Preferred Premises
          <input value={preferredPremises} onChange={(e) => setPreferredPremises(e.target.value)} required />
        </label>
        <label>
          Enquiry
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} required />
        </label>
        <button type="submit">Send enquiry</button>
        {status && <p className="feedback">{status}</p>}
      </form>
    </section>
  );
}
