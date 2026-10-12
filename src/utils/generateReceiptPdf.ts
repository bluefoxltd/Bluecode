import { jsPDF } from 'jspdf';
import { BLUECODE_LOGO_BASE64 } from './logoBase64';

export interface InquiryFormData {
  name: string;
  phone: string;
  address: string;
  service: string;
  notes: string;
  referenceId?: string;
  createdAt?: string;
}

export function generateReceiptPdf(data: InquiryFormData): string {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  const refId = data.referenceId || `BC-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = data.createdAt || new Date().toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  // Cornflower Blue palette (#6495ED -> RGB: 100, 149, 237)
  const primaryR = 100;
  const primaryG = 149;
  const primaryB = 237;

  // Top Accent Bar (Cornflower Blue)
  doc.setFillColor(primaryR, primaryG, primaryB);
  doc.rect(0, 0, pageWidth, 5, 'F');

  // Top Dark Header Area
  doc.setFillColor(6, 9, 19); // #060913
  doc.rect(0, 5, pageWidth, 38, 'F');

  // Decorative border line under header
  doc.setDrawColor(primaryR, primaryG, primaryB);
  doc.setLineWidth(0.8);
  doc.line(0, 43, pageWidth, 43);

  // Logo & Branding on Header
  try {
    // Official Blue Code Logo PNG
    const logoW = 54;
    const logoH = 15.6;
    doc.addImage(BLUECODE_LOGO_BASE64, 'PNG', margin, 11, logoW, logoH, undefined, 'FAST');

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(primaryR, primaryG, primaryB);
    doc.text('DIGITAL BRANDING & SOFTWARE AGENCY', margin, 31);

    doc.setFontSize(7);
    doc.setTextColor(180, 190, 210);
    doc.text('Kathmandu, Nepal  ·  Global Standards', margin, 36);
  } catch (_e) {
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('BLUE CODE', margin, 22);
  }

  // Header Right Side: Receipt Badge
  doc.setFillColor(primaryR, primaryG, primaryB);
  doc.roundedRect(pageWidth - margin - 58, 12, 58, 22, 2, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('INQUIRY RECEIPT', pageWidth - margin - 29, 19, { align: 'center' });

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text('CUSTOMER OFFICIAL COPY', pageWidth - margin - 29, 24, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(refId, pageWidth - margin - 29, 29.5, { align: 'center' });

  // Letterhead Metadata Strip
  let currentY = 52;
  doc.setFillColor(245, 248, 255);
  doc.setDrawColor(220, 230, 248);
  doc.roundedRect(margin, currentY, contentWidth, 14, 2, 2, 'FD');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 80, 120);
  doc.text('DATE & TIME:', margin + 4, currentY + 6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 30, 50);
  doc.text(dateStr, margin + 25, currentY + 6);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 80, 120);
  doc.text('STATUS:', margin + 85, currentY + 6);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 140, 80); // Green
  doc.text('CONFIRMED / QUEUED', margin + 101, currentY + 6);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 80, 120);
  doc.text('COMMUNICATION:', margin + 4, currentY + 11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 30, 50);
  doc.text('Instant WhatsApp Fast-Track Verification', margin + 35, currentY + 11);

  // Section 1: Customer Details
  currentY += 22;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('1. CLIENT INFORMATION', margin, currentY);

  // Decorative Cornflower line
  doc.setDrawColor(primaryR, primaryG, primaryB);
  doc.setLineWidth(0.5);
  doc.line(margin, currentY + 2, margin + 45, currentY + 2);

  currentY += 8;
  const clientInfoBoxHeight = 36;
  doc.setFillColor(252, 253, 255);
  doc.setDrawColor(215, 225, 240);
  doc.roundedRect(margin, currentY, contentWidth, clientInfoBoxHeight, 2, 2, 'FD');

  // Left Column
  const col1X = margin + 5;
  const col2X = margin + (contentWidth / 2) + 3;

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 95, 125);
  doc.text('Client Full Name:', col1X, currentY + 9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9.5);
  doc.text(data.name || 'Valued Client', col1X + 32, currentY + 9);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 95, 125);
  doc.text('WhatsApp / Phone:', col1X, currentY + 18);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(data.phone || 'N/A', col1X + 32, currentY + 18);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 95, 125);
  doc.text('Physical Address:', col1X, currentY + 27);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(data.address || 'Kathmandu, Nepal', col1X + 32, currentY + 27);

  // Right Column: Service Requested
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 95, 125);
  doc.text('Target Service:', col2X, currentY + 9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryR, primaryG, primaryB);
  doc.setFontSize(8.5);
  const serviceLines = doc.splitTextToSize(data.service || 'Comprehensive Creative & Tech Suite', 64);
  doc.text(serviceLines.slice(0, 2), col2X + 26, currentY + 8);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 95, 125);
  doc.text('Channel:', col2X, currentY + 18);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text('Direct WhatsApp Inbound & Web Desk', col2X + 26, currentY + 18);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 95, 125);
  doc.text('Country Code:', col2X, currentY + 27);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text('+977 (Nepal 🇳🇵)', col2X + 26, currentY + 27);

  // Section 2: Inquiry Notes & Project Scope
  currentY += clientInfoBoxHeight + 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('2. PROJECT BRIEF & ADDITIONAL NOTES', margin, currentY);

  doc.setDrawColor(primaryR, primaryG, primaryB);
  doc.setLineWidth(0.5);
  doc.line(margin, currentY + 2, margin + 65, currentY + 2);

  currentY += 8;
  const notesBoxHeight = 36;
  doc.setFillColor(252, 253, 255);
  doc.setDrawColor(215, 225, 240);
  doc.roundedRect(margin, currentY, contentWidth, notesBoxHeight, 2, 2, 'FD');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 50, 70);

  const rawNotes = data.notes?.trim() || 'No additional notes provided. Direct consultation scheduled upon review.';
  const splitNotes = doc.splitTextToSize(rawNotes, contentWidth - 10);
  doc.text(splitNotes, margin + 5, currentY + 9);

  // Section 3: Next Steps & Guarantee Card
  currentY += notesBoxHeight + 10;
  doc.setFillColor(240, 246, 255);
  doc.setDrawColor(180, 205, 245);
  doc.roundedRect(margin, currentY, contentWidth, 24, 2, 2, 'FD');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryR, primaryG, primaryB);
  doc.text('BLUE CODE COMMITMENT & RESPONSE GUARANTEE', margin + 5, currentY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(60, 75, 100);
  doc.text('1. Our lead strategist will review your requirements and reach out via WhatsApp (+977 9715971505).', margin + 5, currentY + 12);
  doc.text('2. You are entitled to a complimentary 30-minute discovery call and tailored scope estimate.', margin + 5, currentY + 16.5);
  doc.text('3. Please keep this receipt reference number handy for all follow-up correspondence.', margin + 5, currentY + 21);

  // Official Seal / Stamp Representation
  const stampX = pageWidth - margin - 35;
  const stampY = currentY + 4;
  doc.setDrawColor(primaryR, primaryG, primaryB);
  doc.setLineWidth(0.5);
  doc.roundedRect(stampX, stampY, 32, 16, 2, 2, 'D');
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryR, primaryG, primaryB);
  doc.text('BLUE CODE SEAL', stampX + 16, stampY + 5, { align: 'center' });
  doc.setFontSize(5.5);
  doc.setFont('helvetica', 'normal');
  doc.text('VERIFIED RECEIPT', stampX + 16, stampY + 9.5, { align: 'center' });
  doc.text('KATHMANDU, NEPAL', stampX + 16, stampY + 13.5, { align: 'center' });

  // Letterhead Footer (as explicitly requested: "with logo of blue code on header and email, contactnumber, website on footer")
  const footerY = pageHeight - 24;

  // Bottom Accent Bar
  doc.setFillColor(primaryR, primaryG, primaryB);
  doc.rect(0, pageHeight - 3, pageWidth, 3, 'F');

  // Dark Footer Bar
  doc.setFillColor(6, 9, 19);
  doc.rect(0, footerY - 4, pageWidth, 21, 'F');

  // Footer Content
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('BLUE CODE AGENCY', margin, footerY + 2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(170, 185, 215);
  doc.text('Kathmandu, Nepal  ·  Building Brands That Resonate', margin, footerY + 6.5);

  // Footer Contacts: Email, Contact Number, Website
  const contactX = margin + 70;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryR, primaryG, primaryB);
  doc.text('Email:', contactX, footerY + 2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text('info@bluecode.agency', contactX + 10, footerY + 2);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryR, primaryG, primaryB);
  doc.text('Contact:', contactX, footerY + 6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text('+977 9715971505', contactX + 13, footerY + 6.5);

  const webX = pageWidth - margin - 35;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryR, primaryG, primaryB);
  doc.text('Website:', webX - 14, footerY + 2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text('bluecode.agency', webX, footerY + 2);

  doc.setTextColor(150, 165, 195);
  doc.setFontSize(6.5);
  doc.text('Automated Inquiry Copy', webX - 10, footerY + 6.5);

  // Download trigger
  const fileName = `BlueCode_Inquiry_Receipt_${refId}.pdf`;
  doc.save(fileName);
  return fileName;
}
