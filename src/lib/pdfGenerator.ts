import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePdf = async (element: HTMLElement, fileName: string = 'analysis-report.pdf') => {
  if (!element) {
    console.error('Element for PDF generation not found');
    return;
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const canvas = await html2canvas(element, {
      scale: 2, // Increased scale for better quality
      useCORS: true, // If you have images from other domains
      logging: true,
      width: element.scrollWidth, // Use scrollWidth to capture full content
      windowWidth: element.scrollWidth,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = canvas.width;
    const pdfHeight = canvas.height;

    // Calculate dimensions
    const pdf = new jsPDF({
      orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
      unit: 'px',
      format: [pdfWidth, pdfHeight],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, canvas.height);
    pdf.save(fileName);

  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
