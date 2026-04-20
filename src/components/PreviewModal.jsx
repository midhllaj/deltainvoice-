import React, { useRef } from 'react';
import InvoicePreview from './InvoicePreview';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";
import { X, Download } from "lucide-react";

const PreviewModal = ({ data, onClose }) => {
    const previewRef = useRef();
    const [scale, setScale] = React.useState(0.8);

    React.useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            const targetWidth = 794;
            const available = windowWidth - 64;
            setScale(available < targetWidth ? available / targetWidth : 0.85);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleDownload = async () => {
        const element = previewRef.current;

        // Off-screen container at exact A4 width
        const container = document.createElement('div');
        container.style.cssText = `
            position:fixed; top:-99999px; left:-99999px;
            width:794px; background:white; z-index:-9999;
        `;
        const clone = element.cloneNode(true);
        container.appendChild(clone);
        document.body.appendChild(container);

        try {
            const canvas = await html2canvas(clone, {
                scale: 3,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                windowWidth: 794,
                width: 794,
                logging: false,
            });

            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF('p', 'mm', 'a4');

            const pdfW = 210;   // mm
            const pdfH = 297;   // mm

            // Scale image to A4 width and paginate
            const imgWidthMm = pdfW;
            const imgHeightMm = (canvas.height * pdfW) / canvas.width;

            let remainingHeight = imgHeightMm;
            let pageCount = 0;

            while (remainingHeight > 0) {
                if (pageCount > 0) pdf.addPage();
                const yOffset = -(pageCount * pdfH);
                pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidthMm, imgHeightMm);
                remainingHeight -= pdfH;
                pageCount++;
            }

            const clientName = data.to ? data.to.replace(/\s+/g, '_') : 'Draft';
            pdf.save(`Delta_Quotation_${clientName}.pdf`);
        } catch (err) {
            console.error('PDF generation failed:', err);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            document.body.removeChild(container);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 md:p-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-5xl max-h-[95vh] bg-gray-100 rounded-lg shadow-2xl flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 bg-white rounded-t-lg border-b">
                    <h2 className="text-lg font-bold text-purple-800">Quotation Preview</h2>
                    <div className="flex gap-2">
                        <Button
                            onClick={handleDownload}
                            className="bg-purple-700 hover:bg-purple-800"
                        >
                            <Download className="mr-2 h-4 w-4" /> Download PDF
                        </Button>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Preview area */}
                <div className="flex-1 overflow-auto p-6 flex justify-center">
                    <div
                        style={{
                            transform: `scale(${scale})`,
                            transformOrigin: 'top center',
                            marginBottom: scale < 1
                                ? `${(1 - scale) * previewRef.current?.offsetHeight || 0}px`
                                : '0',
                        }}
                    >
                        <InvoicePreview data={data} ref={previewRef} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewModal;
