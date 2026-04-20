import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, FileText, FolderPlus } from "lucide-react";

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const InvoiceForm = ({
  data, onChange,
  onAddCategory, onRemoveCategory, onCategoryChange,
  onAddCategoryItem, onRemoveCategoryItem, onCategoryItemChange,
  onAddSettingsItem, onRemoveSettingsItem, onSettingsItemChange,
  onTermChange, onAddTerm, onRemoveTerm,
  onPreview,
}) => {

  const handleDateChange = (val) => {
    onChange('date', val);
    if (val) {
      const d = new Date(val);
      onChange('dayOfWeek', DAYS[d.getDay()]);
    }
  };

  const grandTotal = (parseFloat(data.totalAmountFood || 0) + parseFloat(data.totalAmountService || 0));
  const gstAmount = data.gstEnabled ? grandTotal * (data.gstRate / 100) : 0;

  return (
    <div className="space-y-6 p-1">
      {/* ── Top Bar ── */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Delta Caterers" className="h-12 object-contain" />
          <h2 className="text-2xl font-bold tracking-tight text-purple-800">Quotation Generator</h2>
        </div>
        <Button onClick={onPreview} className="bg-purple-700 hover:bg-purple-800">
          <FileText className="mr-2 h-4 w-4" /> Preview & Download
        </Button>
      </div>

      {/* ── Event Details ── */}
      <Card className="border-purple-200">
        <CardHeader className="bg-purple-50 rounded-t-lg">
          <CardTitle className="text-purple-800">Event Details</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label>Ref / Quote No</Label>
              <Input value={data.quoteNo} onChange={e => onChange('quoteNo', e.target.value)} placeholder="e.g. DC-001" />
            </div>
            <div className="space-y-1">
              <Label>To (Client Name)</Label>
              <Input value={data.to} onChange={e => onChange('to', e.target.value)} placeholder="Mr. Safeer p" />
            </div>
            <div className="space-y-1">
              <Label>Contact</Label>
              <Input value={data.contact} onChange={e => onChange('contact', e.target.value)} placeholder="+919847662161" />
            </div>
            <div className="space-y-1">
              <Label>Event Type</Label>
              <Input value={data.eventType} onChange={e => onChange('eventType', e.target.value)} placeholder="Nikah, Wedding..." />
            </div>
            <div className="space-y-1">
              <Label>Venue</Label>
              <Input value={data.venue} onChange={e => onChange('venue', e.target.value)} placeholder="Venue name" />
            </div>
            <div className="space-y-1">
              <Label>District</Label>
              <Input value={data.district} onChange={e => onChange('district', e.target.value)} placeholder="Malappuram" />
            </div>
            <div className="space-y-1">
              <Label>Time</Label>
              <Input value={data.time} onChange={e => onChange('time', e.target.value)} placeholder="11:00 AM – 1:00 PM" />
            </div>
            <div className="space-y-1">
              <Label>Guaranteed Pax</Label>
              <Input value={data.guaranteedPax} onChange={e => onChange('guaranteedPax', e.target.value)} placeholder="600" />
            </div>
            <div className="space-y-1">
              <Label>Settings & Decoration</Label>
              <Input value={data.settingsDecoration} onChange={e => onChange('settingsDecoration', e.target.value)} placeholder="Sitting buffet" />
            </div>
            <div className="space-y-1">
              <Label>Duration of Event</Label>
              <Input value={data.durationOfEvent} onChange={e => onChange('durationOfEvent', e.target.value)} placeholder="3hrs" />
            </div>
            <div className="space-y-1">
              <Label>Event Date</Label>
              <Input type="date" value={data.date} onChange={e => handleDateChange(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Day of Week</Label>
              <Input value={data.dayOfWeek} onChange={e => onChange('dayOfWeek', e.target.value)} placeholder="Wednesday" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Estimation: Food Categories ── */}
      <Card className="border-purple-200">
        <CardHeader className="bg-purple-50 rounded-t-lg flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-purple-800">Estimation (Food Items)</CardTitle>
          <Button size="sm" variant="outline" className="border-purple-400 text-purple-700" onClick={onAddCategory}>
            <FolderPlus className="mr-1 h-4 w-4" /> Add Category
          </Button>
        </CardHeader>
        <CardContent className="pt-4 space-y-6">
          {data.categories.map((cat, ci) => (
            <div key={cat.id} className="border border-purple-100 rounded-lg p-4 space-y-3 bg-purple-50/30">
              <div className="flex gap-2 items-center">
                <div className="flex-1 space-y-1">
                  <Label className="text-purple-700 font-semibold">Category Name</Label>
                  <Input
                    value={cat.name}
                    onChange={e => onCategoryChange(ci, 'name', e.target.value)}
                    placeholder="e.g. Main course celebration"
                    className="font-medium"
                  />
                </div>
                <div className="w-28 space-y-1">
                  <Label className="text-purple-700">Qty / Count</Label>
                  <Input
                    value={cat.categoryQty}
                    onChange={e => onCategoryChange(ci, 'categoryQty', e.target.value)}
                    placeholder="600n"
                  />
                </div>
                <Button variant="ghost" size="icon" className="text-red-500 mt-5" onClick={() => onRemoveCategory(ci)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2 pl-2">
                {cat.items.map((item, ii) => (
                  <div key={ii} className="flex gap-2 items-center">
                    <span className="text-gray-400 text-sm">❖</span>
                    <Input
                      className="flex-1"
                      value={item.description}
                      onChange={e => onCategoryItemChange(ci, ii, 'description', e.target.value)}
                      placeholder="Item description"
                    />
                    <Input
                      className="w-24"
                      value={item.quantity}
                      onChange={e => onCategoryItemChange(ci, ii, 'quantity', e.target.value)}
                      placeholder="40kg"
                    />
                    <Button variant="ghost" size="icon" className="text-red-400" onClick={() => onRemoveCategoryItem(ci, ii)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <Button size="sm" variant="ghost" className="text-purple-600 text-xs" onClick={() => onAddCategoryItem(ci)}>
                  <Plus className="h-3 w-3 mr-1" /> Add Item
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── Settings & Service ── */}
      <Card className="border-purple-200">
        <CardHeader className="bg-purple-50 rounded-t-lg flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-purple-800">Settings & Service</CardTitle>
          <Button size="sm" variant="outline" className="border-purple-400 text-purple-700" onClick={onAddSettingsItem}>
            <Plus className="mr-1 h-4 w-4" /> Add Item
          </Button>
        </CardHeader>
        <CardContent className="pt-4 space-y-2">
          {data.settingsItems.map((item, i) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="text-gray-400 text-sm">❖</span>
              <Input
                className="flex-1"
                value={item.description}
                onChange={e => onSettingsItemChange(i, 'description', e.target.value)}
                placeholder="e.g. Sitting buffet, Service staffs..."
              />
              <Input
                className="w-28"
                value={item.quantity}
                onChange={e => onSettingsItemChange(i, 'quantity', e.target.value)}
                placeholder="200seats"
              />
              <Button variant="ghost" size="icon" className="text-red-400" onClick={() => onRemoveSettingsItem(i)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── Totals & GST ── */}
      <Card className="border-purple-200">
        <CardHeader className="bg-purple-50 rounded-t-lg">
          <CardTitle className="text-purple-800">Totals</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Total Amount – Food (₹)</Label>
              <Input
                type="number"
                value={data.totalAmountFood}
                onChange={e => onChange('totalAmountFood', e.target.value)}
                placeholder="186000"
              />
            </div>
            <div className="space-y-1">
              <Label>Total Amount – Service & Settings (₹)</Label>
              <Input
                type="number"
                value={data.totalAmountService}
                onChange={e => onChange('totalAmountService', e.target.value)}
                placeholder="57000"
              />
            </div>
          </div>

          <div className="mt-4 p-3 bg-purple-50 rounded-lg space-y-2">
            <div className="flex items-center gap-3">
              <Switch
                id="gst-toggle"
                checked={data.gstEnabled}
                onCheckedChange={v => onChange('gstEnabled', v)}
              />
              <Label htmlFor="gst-toggle" className="text-purple-800 font-medium">GST: ON / OFF</Label>
              {data.gstEnabled && (
                <div className="flex items-center gap-2 ml-4">
                  <Label>Rate %</Label>
                  <Input className="w-20" type="number" value={data.gstRate} onChange={e => onChange('gstRate', e.target.value)} />
                </div>
              )}
            </div>

            <div className="text-sm space-y-1 mt-2 text-gray-700">
              <div className="flex justify-between">
                <span>Grand Total</span>
                <span className="font-bold text-purple-800">₹ {grandTotal.toLocaleString('en-IN')}/-</span>
              </div>
              {data.gstEnabled && (
                <div className="flex justify-between text-purple-600">
                  <span>GST ({data.gstRate}%)</span>
                  <span>₹ {gstAmount.toLocaleString('en-IN')}/-</span>
                </div>
              )}
              {data.gstEnabled && (
                <div className="flex justify-between font-bold">
                  <span>Total incl. GST</span>
                  <span>₹ {(grandTotal + gstAmount).toLocaleString('en-IN')}/-</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Terms & Conditions ── */}
      <Card className="border-purple-200">
        <CardHeader className="bg-purple-50 rounded-t-lg flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-purple-800">Terms & Conditions</CardTitle>
          <Button size="sm" variant="outline" className="border-purple-400 text-purple-700" onClick={onAddTerm}>
            <Plus className="mr-1 h-4 w-4" /> Add Term
          </Button>
        </CardHeader>
        <CardContent className="pt-4 space-y-2">
          {data.termsConditions.map((term, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="mt-2 text-gray-500 text-sm min-w-[20px]">{i + 1}.</span>
              <Textarea
                className="flex-1 text-sm resize-none"
                rows={2}
                value={term}
                onChange={e => onTermChange(i, e.target.value)}
              />
              <Button variant="ghost" size="icon" className="text-red-400 mt-1" onClick={() => onRemoveTerm(i)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── Signature ── */}
      <Card className="border-purple-200">
        <CardHeader className="bg-purple-50 rounded-t-lg">
          <CardTitle className="text-purple-800">Authorized Signatory</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input value={data.authorizedBy} onChange={e => onChange('authorizedBy', e.target.value)} placeholder="Mr. Ahammed Anaf" />
            </div>
            <div className="space-y-1">
              <Label>Mobile</Label>
              <Input value={data.mob} onChange={e => onChange('mob', e.target.value)} placeholder="9633 775 535" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceForm;
