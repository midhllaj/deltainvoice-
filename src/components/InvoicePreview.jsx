import React, { forwardRef } from 'react';

const InvoicePreview = forwardRef(({ data }, ref) => {
  const grandTotal =
    parseFloat(data.totalAmountFood || 0) + parseFloat(data.totalAmountService || 0);
  const gstAmount = data.gstEnabled ? grandTotal * (data.gstRate / 100) : 0;
  const totalWithGst = grandTotal + gstAmount;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const Footer = () => (
    <div className="delta-footer">
      <div>www.deltaevents.in</div>
      <div>+919633 775 535</div>
      <div>hell@deltaevents.in</div>
    </div>
  );

  return (
    <div className="delta-document" ref={ref} id="invoice-preview">

      {/* ══════════════════════════════════════
          PAGE 1 – COVER / EVENT DETAILS
          ══════════════════════════════════════ */}
      <div className="delta-page">
        <div className="delta-watermark">DELTA</div>

        {/* ── Header: logo + event details ── */}
        <div className="delta-header">

          {/* Black logo box */}
          <div className="delta-logo-box">
            <img src="/logo.png" alt="Delta Caterers" />
          </div>

          {/* Event details table */}
          <table className="delta-details-table">
            <tbody>
              <tr>
                <td className="d-label">To</td>
                <td className="d-value">{data.to}</td>
                <td className="d-label d-purple">Guaranteed Pax</td>
                <td className="d-value">{data.guaranteedPax}</td>
              </tr>
              <tr>
                <td className="d-label">Contact</td>
                <td className="d-value">{data.contact}</td>
                <td className="d-label d-purple">Settings&amp;decoration</td>
                <td className="d-value">{data.settingsDecoration}</td>
              </tr>
              <tr>
                <td className="d-label">Eve..Type</td>
                <td className="d-value">{data.eventType}</td>
                <td className="d-label d-purple">Duration Of Event</td>
                <td className="d-value">{data.durationOfEvent}</td>
              </tr>
              <tr>
                <td className="d-label">Venue</td>
                <td className="d-value">{data.venue}</td>
                <td className="d-label d-purple">Total Cost</td>
                <td className="d-value d-cost">
                  {grandTotal > 0
                    ? `${grandTotal.toLocaleString('en-IN')}/-`
                    : ''}
                </td>
              </tr>
              <tr>
                <td className="d-label">District</td>
                <td className="d-value">{data.district}</td>
                <td className="d-label d-red">{data.dayOfWeek}</td>
                <td className="d-value"></td>
              </tr>
              <tr>
                <td className="d-label">Time</td>
                <td className="d-value">{data.time}</td>
                <td className="d-label d-red">{formatDate(data.date)}</td>
                <td className="d-value"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Company description body ── */}
        <div className="delta-body">
          <p>
            <strong className="d-highlight">Delta Caterers</strong>, an ISO-certified catering company,
            has been delighting customers across Kerala for over 7 years. Renowned for exceptional
            service and unmatched hospitality, we pride ourselves on crafting memorable dining
            experiences for every occasion.
          </p>
          <p>Why Choose Delta Caterers?</p>
          <p className="d-bullet-p">
            ❖&nbsp;<strong>Expertise:</strong> Serving 4,000 people daily, backed by a dedicated team
            of 20 professionals operating in Malappuram and Calicut.
          </p>
          <p className="d-bullet-p">
            ❖&nbsp;<strong>Authenticity:</strong> Specializing in Arabian and Malabar Biriyani,
            prepared with the finest, authentic spices of India.
          </p>
          <p className="d-bullet-p">
            ❖&nbsp;<strong>Flexibility:</strong> Customizable menus to suit any event, offering a
            variety of cuisines tailored to your preferences.
          </p>
          <p className="d-bullet-p">
            ❖&nbsp;<strong>Experience:</strong> Trusted partners for thousands of weddings, cultural
            events, and organizational gatherings over the years.
          </p>
          <p style={{ marginTop: 16 }}>
            At <strong className="d-highlight">Delta Caterers</strong>, we focus on delivering timely
            service that complements the joyous moments of your special day. Experience the perfect
            blend of flavors and professionalism, making every event truly unforgettable.
          </p>
        </div>

        <Footer />
      </div>

      {/* ══════════════════════════════════════
          PAGE 2 – ESTIMATION
          ══════════════════════════════════════ */}
      <div className="delta-page">
        <div className="delta-watermark">DELTA</div>

        <div className="delta-bordered-section">
          <h2 className="delta-est-title">Estimation</h2>

          {data.categories.map((cat, ci) => (
            <div key={ci} className="delta-cat-block">
              {cat.name && (
                <div className="delta-cat-header-row">
                  <span className="delta-cat-name">{cat.name}</span>
                  {cat.categoryQty && (
                    <span className="delta-cat-qty">{cat.categoryQty}</span>
                  )}
                </div>
              )}
              {cat.items
                .filter((it) => it.description)
                .map((item, ii) => (
                  <div key={ii} className="delta-item-row">
                    <span className="delta-bullet">❖</span>
                    <span className="delta-item-desc">{item.description}</span>
                    {item.quantity && (
                      <span className="delta-item-qty">{item.quantity}</span>
                    )}
                  </div>
                ))}
            </div>
          ))}

          {data.totalAmountFood && (
            <div className="delta-food-total">
              Total amount food&nbsp;&nbsp;&nbsp;=&nbsp;
              {parseFloat(data.totalAmountFood).toLocaleString('en-IN')}/-
            </div>
          )}

          <Footer />
        </div>
      </div>

      {/* ══════════════════════════════════════
          PAGE 3 – SETTINGS, TOTALS & TERMS
          ══════════════════════════════════════ */}
      <div className="delta-page">
        <div className="delta-watermark">DELTA</div>

        <div className="delta-bordered-section">

          {/* Repeat food total at top of page 3 */}
          {data.totalAmountFood && (
            <div className="delta-food-total" style={{ marginBottom: 16 }}>
              Total amount food&nbsp;&nbsp;&nbsp;=&nbsp;
              {parseFloat(data.totalAmountFood).toLocaleString('en-IN')}/-
            </div>
          )}

          {/* Settings & service */}
          {data.settingsItems.some((i) => i.description) && (
            <div className="delta-cat-block">
              <div className="delta-cat-header-row">
                <span className="delta-cat-name">Settings&amp;service</span>
              </div>
              {data.settingsItems
                .filter((it) => it.description)
                .map((item, i) => (
                  <div key={i} className="delta-item-row">
                    <span className="delta-bullet">❖</span>
                    <span className="delta-item-desc">{item.description}</span>
                    {item.quantity && (
                      <span className="delta-item-qty">{item.quantity}</span>
                    )}
                  </div>
                ))}
            </div>
          )}

          {data.totalAmountService && (
            <div className="delta-service-total">
              Total amount service&amp;settings&nbsp;=
              {parseFloat(data.totalAmountService).toLocaleString('en-IN')}/-
            </div>
          )}

          <div className="delta-grand-total">
            Grand total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=
            {grandTotal.toLocaleString('en-IN')}/-
          </div>

          {data.gstEnabled && (
            <div className="delta-gst-line">
              GST ({data.gstRate}%)&nbsp;=&nbsp;
              {gstAmount.toLocaleString('en-IN')}/-&nbsp;&nbsp;|&nbsp;&nbsp;Total
              incl. GST&nbsp;=&nbsp;{totalWithGst.toLocaleString('en-IN')}/-
            </div>
          )}

          {/* Terms & Conditions */}
          {data.termsConditions.length > 0 && (
            <div className="delta-terms">
              <div className="delta-terms-title">Terms&amp;conditions:</div>
              {data.termsConditions.map((t, i) => (
                <div key={i} className="delta-term-item">
                  {i + 1}.&nbsp;{t}
                </div>
              ))}
            </div>
          )}

          {/* Signature */}
          <div className="delta-signature">
            {data.authorizedBy && (
              <div className="delta-sig-name">{data.authorizedBy}</div>
            )}
            {data.mob && (
              <div className="delta-sig-mob">Mob: {data.mob}</div>
            )}
          </div>

          <Footer />
        </div>
      </div>

    </div>
  );
});

export default InvoicePreview;
