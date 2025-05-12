export interface Certificate {
  id: string;
  title_pl: string;
  description_pl?: string; // Mark as optional if some don't have it
  original_file_path: string;
  original_file_type: 'image' | 'pdf'; // Assuming only these two types
  thumbnail_image_path: string;
  translation_pl?: string; // Mark as optional
}

export const certificatesData: Certificate[] = [
  {
    id: 'atraumatyczny-manicure-2025',
    title_pl: '«ATRAUMATYCZNY MANICURE»',
    description_pl: 'Certyfikat ukończenia kursu.',
    original_file_path: '/certificates/originals/manicure_scan_1.jpg',
    original_file_type: 'image',
    thumbnail_image_path: '/certificates/originals/manicure_scan_1.jpg',
    translation_pl: `Certyfikat
potwierdza, że
Kovalowa-Łogwin Jana Nikołajewna
pomyślnie ukończyła program teoretyczny i praktyczny kursu
«ATRAUMATYCZNY MANICURE»
bez prawa nauczania
15-16.01.2025
Wykładowca Kirsanowa S.W.
`,
  },
  {
    id: 'karta-licencyjna-smart-pedicure-2024',
    title_pl: 'Karta Licencyjna',
    description_pl: 'Karta Licencyjna Smart Pedicure.',
    original_file_path: '/certificates/originals/manicure_scan_6.jpg',
    original_file_type: 'image',
    thumbnail_image_path: '/certificates/originals/manicure_scan_6.jpg',
    translation_pl: `Karta Licencyjna
IMIĘ I NAZWISKO: Kowalowa-Łogwin Jana Nikołajewna
Numer licencji: WU - 17057 - 0224-81-7
Niniejsza karta licencyjna jest dokumentem potwierdzającym, że licencjobiorca legalnie uzyskał prawo do korzystania z opatentowanej techniki "SMART pedicure":
w praktyce prywatnej (bez prawa nauczania i odsprzedaży)
w technice pedicure dyskami Smart
Niniejsza metoda jest chroniona przepisami prawa Rosji oraz umowami międzynarodowymi w zakresie ochrony praw autorskich.
Numer licencji wskazany na karcie licencyjnej jest przypisany licencjobiorcy w celu jego identyfikacji jako legalnego użytkownika opatentowanej techniki "Smart pedicure".
Licencjonowany wykładowca: Kirsanowa S.W.
Licencjodawca: SMART LTD
Data: 27.02.2024
`,
  },
  {
    id: 'smart-pedicure-w-40-min-2014',
    title_pl: 'SMART pedicure w 40 min',
    description_pl: 'Certyfikat ukończenia kursu.',
    original_file_path: '/certificates/originals/manicure_scan_2.jpg',
    original_file_type: 'image',
    thumbnail_image_path: '/certificates/originals/manicure_scan_2.jpg',
    translation_pl: `Certyfikat
o ukończeniu kursu autorskiego
Kowaliowa-Łogwin [Imię - Handwritten, likely Yana]
pomyślnie ukończyła program
SMART pedicure
w 40 min
z nadaniem statusu
SMART MASTER
24-28.08.2014, [Lokalizacja - Handwritten, likely Yana]
www.smart-pilka.ru
`,
  },
  {
    id: 'estetyka-w-pedicure-2014',
    title_pl: 'ESTETYKA W PEDICURE',
    description_pl: 'Certyfikat ukończenia kursu.',
    original_file_path: '/certificates/originals/manicure_scan_3.jpg',
    original_file_type: 'image',
    thumbnail_image_path: '/certificates/originals/manicure_scan_3.jpg',
    translation_pl: `Certyfikat
BEZ PRAWA NAUCZANIA
KOMU: Kowaliowa - Łogwin Yana
O UKOŃCZENIU KURSU AUTORSKIEGO "ESTETYKA W PEDICURE"
DATA: 24-28.02.2014
podpis
KIRSA
NOVA
`,
  },
  {
    id: 'aparatowy-manicure-wzmacnianie-zelem-2013',
    title_pl: 'APARATOWY MANICURE + WZMACNIANIE ŻELEM BEZ OPILOWANIA',
    description_pl: 'Certyfikat ukończenia kursu.',
    original_file_path: '/certificates/originals/manicure_scan_4.jpg',
    original_file_type: 'image',
    thumbnail_image_path: '/certificates/originals/manicure_scan_4.jpg',
    translation_pl: `Certyfikat
BEZ PRAWA NAUCZANIA
KOMU: Kowaliowa - Łogwin [Imię - Handwritten, likely Yana]
O UKOŃCZENIU KURSU AUTORSKIEGO "APARATOWY MANICURE + WZMACNIANIE ŻELEM BEZ OPILOWANIA"
DATA: 26-27.10.2013
podpis
KIRSA
NOVA
`,
  },
  {
    id: 'kombinowany-manicure-2015',
    title_pl: 'KOMBINOWANY MANICURE',
    description_pl: 'Certyfikat ukończenia kursu.',
    original_file_path: '/certificates/originals/manicure_scan_5.jpg',
    original_file_type: 'image',
    thumbnail_image_path: '/certificates/originals/manicure_scan_5.jpg',
    translation_pl: `Certyfikat
BEZ PRAWA NAUCZANIA
KOMU: Kowaliowa - Łogwin [Imię - Handwritten, likely Yana]
O UKOŃczeniu AUTORSKIEGO KURSU PODSTAWOWEGO «KOMBINOWANY MANICURE».
DATA: 13-14.09.2015
podpis
KIRSA
NOVA
`,
  },
];
