import type { Meta, StoryObj } from '@storybook/react';
import { ServicesView, type ServicesData } from './ServicesView';

const sample: ServicesData = {
  heading: 'Services',
  tagline: 'Build Faster, Leaner, Greener',
  intro:
    "You can't reduce what you don't measure. Cut your digital emissions and improve performance with sustainable web architecture.",
  services: [
    {
      id: 'audit',
      title: 'Digital Footprint Audit',
      tagline: 'Discover where your digital waste lives and what it costs.',
      summary:
        'A technical audit of page weight, data transfer, and architectural bottlenecks across your stack.',
      benefitsTitle: 'Benefits:',
      benefits: [
        {
          label: 'Quantified baseline',
          text: 'Know your exact emissions and cost impact',
        },
        {
          label: 'Prioritized action plan',
          text: 'Focus on changes with the highest ROI',
        },
      ],
      deliverable: 'A Sustainability Scorecard with projected savings.',
      cta: 'Get Your Free Audit',
    },
    {
      id: 'architecture',
      title: 'Sustainable Architecture Consulting',
      tagline: 'Transform bloated systems into lean platforms.',
      summary:
        'We redesign systems to be lean, efficient, and built for modern web standards.',
      benefitsTitle: 'Benefits:',
      benefits: [
        {
          label: 'Faster page loads',
          text: 'Improved user experience and conversion rates',
        },
      ],
      deliverable: 'A refactoring roadmap for your high-traffic paths.',
      cta: 'Discuss Your Architecture',
    },
  ],
  closing: {
    heading: 'Ready to Get Started?',
    text: 'Schedule a free consultation to discuss which service is right for you.',
    cta: 'Schedule Consultation',
  },
};

const meta = {
  title: 'Components/ServicesView',
  component: ServicesView,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description:
        'Validated Services content: heading, tagline, intro, service cards, and the closing call to action',
    },
  },
} satisfies Meta<typeof ServicesView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { data: sample } };

export const SingleService: Story = {
  args: { data: { ...sample, services: sample.services.slice(0, 1) } },
};
