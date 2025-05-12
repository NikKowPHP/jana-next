import React from 'react';
import { getCertificateById  } from "@/lib/certificates"
import type { Metadata } from "next"
import { certificatesData } from '@/data/certificates';
import CertificateClient from '@/components/CertificateClient';

type Props = {
  params: Promise<{ id: string }>; // params is now a Promise
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>; // searchParams also, if used
};

// Generate static params for all certificate IDs
export async function generateStaticParams() {
  return certificatesData.map((certificate) => ({
    id: certificate.id,
  }));
}

// Dynamic metadata based on the certificate
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const certificate = getCertificateById(resolvedParams.id)

  if (!certificate) {
    return {
      title: "Certyfikat nie znaleziony",
    }
  }

  return {
    title: certificate.title_pl,
    description: certificate.description_pl || "Szczegóły certyfikatu",
  }
}

export default function CertificatePage({ params }: Props): React.ReactElement {
  return <CertificateClient params={params} />;
}
