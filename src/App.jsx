import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import PreviewModal from './components/PreviewModal';
import './App.css';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const defaultTerms = [
  'Any additional jobs which are not quoted in this quotation will be charged extra.',
  '80% of quoted amount should be paid in advance [30% on confirmation, 50% before 3 days from the date of event, balance within 3 days after the event].',
  'We are not responsible for any losses caused by circumstances outside our control including natural disasters, power outages, technical difficulties, fire, or any other unforeseen occurrence that prevents our service running normally.',
  'This quot is based on current market rate; rate may vary if any serious fluctuation happened in market.',
  'Mode of payment cash.',
  'No tax included in this quot.',
];

function App() {
  const [showPreview, setShowPreview] = useState(false);
  const today = new Date();

  const [invoiceData, setInvoiceData] = useState({
    quoteNo: '',
    to: '',
    contact: '',
    eventType: '',
    venue: '',
    district: '',
    time: '',
    guaranteedPax: '',
    settingsDecoration: '',
    durationOfEvent: '',
    date: today.toISOString().split('T')[0],
    dayOfWeek: DAYS[today.getDay()],
    categories: [
      { id: 1, name: '', categoryQty: '', items: [{ description: '', quantity: '' }] },
    ],
    settingsItems: [{ description: '', quantity: '' }],
    totalAmountFood: '',
    totalAmountService: '',
    gstEnabled: false,
    gstRate: 18,
    termsConditions: defaultTerms,
    authorizedBy: 'Mr.Ahammed Anaf',
    mob: '9633 775 535',
  });

  const handleChange = (field, value) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
  };

  // Category CRUD
  const handleAddCategory = () => {
    setInvoiceData(prev => ({
      ...prev,
      categories: [...prev.categories, { id: Date.now(), name: '', categoryQty: '', items: [{ description: '', quantity: '' }] }],
    }));
  };
  const handleRemoveCategory = (i) => {
    setInvoiceData(prev => ({ ...prev, categories: prev.categories.filter((_, idx) => idx !== i) }));
  };
  const handleCategoryChange = (i, field, value) => {
    const cats = [...invoiceData.categories];
    cats[i][field] = value;
    setInvoiceData(prev => ({ ...prev, categories: cats }));
  };
  const handleAddCategoryItem = (i) => {
    const cats = [...invoiceData.categories];
    cats[i].items.push({ description: '', quantity: '' });
    setInvoiceData(prev => ({ ...prev, categories: cats }));
  };
  const handleRemoveCategoryItem = (ci, ii) => {
    const cats = [...invoiceData.categories];
    cats[ci].items = cats[ci].items.filter((_, idx) => idx !== ii);
    setInvoiceData(prev => ({ ...prev, categories: cats }));
  };
  const handleCategoryItemChange = (ci, ii, field, value) => {
    const cats = [...invoiceData.categories];
    cats[ci].items[ii][field] = value;
    setInvoiceData(prev => ({ ...prev, categories: cats }));
  };

  // Settings items CRUD
  const handleAddSettingsItem = () => {
    setInvoiceData(prev => ({ ...prev, settingsItems: [...prev.settingsItems, { description: '', quantity: '' }] }));
  };
  const handleRemoveSettingsItem = (i) => {
    setInvoiceData(prev => ({ ...prev, settingsItems: prev.settingsItems.filter((_, idx) => idx !== i) }));
  };
  const handleSettingsItemChange = (i, field, value) => {
    const items = [...invoiceData.settingsItems];
    items[i][field] = value;
    setInvoiceData(prev => ({ ...prev, settingsItems: items }));
  };

  // Terms CRUD
  const handleTermChange = (i, value) => {
    const terms = [...invoiceData.termsConditions];
    terms[i] = value;
    setInvoiceData(prev => ({ ...prev, termsConditions: terms }));
  };
  const handleAddTerm = () => {
    setInvoiceData(prev => ({ ...prev, termsConditions: [...prev.termsConditions, ''] }));
  };
  const handleRemoveTerm = (i) => {
    setInvoiceData(prev => ({ ...prev, termsConditions: prev.termsConditions.filter((_, idx) => idx !== i) }));
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <InvoiceForm
          data={invoiceData}
          onChange={handleChange}
          onAddCategory={handleAddCategory}
          onRemoveCategory={handleRemoveCategory}
          onCategoryChange={handleCategoryChange}
          onAddCategoryItem={handleAddCategoryItem}
          onRemoveCategoryItem={handleRemoveCategoryItem}
          onCategoryItemChange={handleCategoryItemChange}
          onAddSettingsItem={handleAddSettingsItem}
          onRemoveSettingsItem={handleRemoveSettingsItem}
          onSettingsItemChange={handleSettingsItemChange}
          onTermChange={handleTermChange}
          onAddTerm={handleAddTerm}
          onRemoveTerm={handleRemoveTerm}
          onPreview={() => setShowPreview(true)}
        />
        {showPreview && (
          <PreviewModal data={invoiceData} onClose={() => setShowPreview(false)} />
        )}
      </div>
    </div>
  );
}

export default App;
