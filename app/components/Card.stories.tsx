import type { Meta, StoryObj } from '@storybook/react';
import { Zap, Globe, Target } from 'lucide-react';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title',
    },
    description: {
      control: 'text',
      description: 'Card description',
    },
    icon: {
      control: false,
      description: 'Icon element',
    },
    href: {
      control: 'text',
      description: 'Optional link destination',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Performance Optimization',
    description:
      'Reduce load times and energy consumption with efficient code and smart caching.',
    icon: <Zap size={32} />,
  },
};

export const WithLink: Story = {
  args: {
    title: 'Web Sustainability Audit',
    description:
      "Get a detailed analysis of your site's environmental and performance impact.",
    icon: <Globe size={32} />,
    href: '/services#audit',
  },
};

export const LongDescription: Story = {
  args: {
    title: 'Expert Consulting',
    description:
      'Work with our team to develop a comprehensive sustainability roadmap for your web presence. We focus on reducing carbon footprint while improving user experience and conversion rates.',
    icon: <Target size={32} />,
  },
};
