import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SubmitInquiry() {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [businessType, setBusinessType] = useState('Retail');
  const [preferredPremises, setPreferredPremises] = useState('Mall retail');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  const resetForm = () => {
    setCompanyName('');
    setContactPerson('');
    setEmail('');
    setBusinessType('Retail');
    setPreferredPremises('Mall retail');
    setMessage('');
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setUsedFallback(false);
    setIsSubmitting(true);
    const subject = `${companyName} | ${businessType} | ${preferredPremises}`;
    const payloadMessage = [
      `Company Name: ${companyName}`,
      `Contact Person: ${contactPerson}`,
      `Business Type: ${businessType}`,
      `Preferred Premises: ${preferredPremises}`,
      '',
      message,
    ].join('\n');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: contactPerson, email, subject, message: payloadMessage }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        let errMsg = 'Submission failed. Please try again.';
        try {
          const err = await res.json();
          if (err?.error) {
            errMsg = err.error;
          }
        } catch {
          // Keep default error message when response is not JSON.
        }
        throw new Error(errMsg);
      }

      resetForm();
      setSubmitted(true);
      setStatus(null);
    } catch (error) {
      // GitHub Pages is static and cannot reach /api/inquiries.
      // Fall back to a clear completion state plus email action.
      setSubmitted(true);
      setUsedFallback(true);
      setStatus(error?.message || 'Unable to submit to server right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoLink = `mailto:leasing@tenant-portal.example?subject=${encodeURIComponent(
    `${companyName || 'New enquiry'} | ${businessType} | ${preferredPremises}`
  )}&body=${encodeURIComponent(
    [
      `Company Name: ${companyName}`,
      `Contact Person: ${contactPerson}`,
      `Email: ${email}`,
      `Business Type: ${businessType}`,
      `Preferred Premises: ${preferredPremises}`,
      '',
      message,
    ].join('\n')
  )}`;

  if (submitted) {
    return (
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Submission Complete</p>
            <h2>{usedFallback ? 'Your enquiry details are ready.' : 'Your enquiry has been submitted successfully.'}</h2>
            <p className="lead">
              {usedFallback
                ? 'This hosted demo cannot post directly to the backend. Use the email button below to send your enquiry now.'
                : 'A portal staff member will follow up within 3 working days.'}
            </p>
            {usedFallback && status ? <p className="feedback">{status}</p> : null}
          </div>
        </div>
        <div className="button-row">
          <button
            type="button"
            className="button-link"
            onClick={() => {
              setSubmitted(false);
              setStatus(null);
            }}
          >
            Submit Another Enquiry
          </button>
          {usedFallback ? (
            <a className="button-link" href={mailtoLink}>Send Via Email</a>
          ) : null}
          <Link className="button-link button-link-secondary" to="/journey">
            Back to Tenant Journey
          </Link>
        </div>
      </section>
    );
  }

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
            <option>Office</option>
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
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send enquiry'}</button>
        {status && <p className="feedback">{status}</p>}
      </form>
    </section>
  );
}
