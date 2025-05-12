import { certificatesData } from '@/data/certificates';
import { Certificate } from '@/data/certificates';

export function getAllCertificates(): Certificate[] {
  return certificatesData;
}

export function getCertificateById(id: string): Certificate | undefined {
  return certificatesData.find(cert => cert.id === id);
}

export function getAllCertificateIds() {
  return certificatesData.map(certificate => ({
    id: certificate.id,
  }));
}
