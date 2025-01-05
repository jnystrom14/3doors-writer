import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const PDFExportService = {
  exportTransformation: (transformation) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    doc.setFontSize(16);
    doc.text('The 3 Doors Academy', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text(`${transformation.category} Transformation`, pageWidth / 2, 35, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`${transformation.name}`, 20, 45);
    doc.text(`${transformation.date}`, pageWidth - 20, 45, { align: 'right' });

    const addSection = (title, content, yPosition) => {
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(`${title}:`, 20, yPosition);
      doc.setFont(undefined, 'normal');
      
      const splitContent = doc.splitTextToSize(content, pageWidth - 40);
      doc.text(splitContent, 20, yPosition + 7);
      
      return yPosition + (splitContent.length * 7) + 15;
    };

    let yPos = 60;
    yPos = addSection('1. Reflection', transformation.reflection, yPos);
    yPos = addSection('2. Select the Practice', transformation.practice, yPos);
    yPos = addSection('3. Progression of the Practice', transformation.progression, yPos);
    yPos = addSection('4. Result', transformation.result, yPos);

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }

    return doc;
  },

  downloadPDF: (transformation) => {
    const doc = PDFExportService.exportTransformation(transformation);
    doc.save(`${transformation.category}_Transformation_${transformation.number}.pdf`);
  },

  exportCollection: (transformations) => {
    const doc = new jsPDF();
    transformations.forEach((transformation, index) => {
      if (index > 0) {
        doc.addPage();
      }
      PDFExportService.exportTransformation(transformation);
    });
    return doc;
  }
};
