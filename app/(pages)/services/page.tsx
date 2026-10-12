import { ServicesView } from '@/components/ServicesView';
import { loadContent, readList, readObject, readString } from '@/lib/content';
import type { Metadata } from 'next';

const services = loadContent('services', (data, file) => {
  const closing = readObject(data, 'closing', file);
  return {
    title: readString(data, 'title', file),
    description: readString(data, 'description', file),
    heading: readString(data, 'heading', file),
    tagline: readString(data, 'tagline', file),
    intro: readString(data, 'intro', file),
    services: readList(data, 'services', file).map((service) => ({
      id: readString(service, 'id', file),
      title: readString(service, 'title', file),
      tagline: readString(service, 'tagline', file),
      summary: readString(service, 'summary', file),
      benefitsTitle: readString(service, 'benefitsTitle', file),
      benefits: readList(service, 'benefits', file).map((benefit) => ({
        label: readString(benefit, 'label', file),
        text: readString(benefit, 'text', file),
      })),
      deliverable: readString(service, 'deliverable', file),
      cta: readString(service, 'cta', file),
    })),
    closing: {
      heading: readString(closing, 'heading', file),
      text: readString(closing, 'text', file),
      cta: readString(closing, 'cta', file),
    },
  };
});

export const metadata: Metadata = {
  title: services.data.title,
  description: services.data.description,
};

export default function ServicesPage() {
  return <ServicesView data={services.data} />;
}
