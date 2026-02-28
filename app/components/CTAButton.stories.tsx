import type { Meta, StoryObj } from '@storybook/react';
import { CTAButton } from './CTAButton';

const meta = {
  title: 'Components/CTAButton',
  component: CTAButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Button text',
    },
    href: {
      control: 'text',
      description: 'Link destination',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Button variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
  },
} satisfies Meta<typeof CTAButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'Get Started',
    href: '/contact',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    text: 'Learn More',
    href: '/services',
    variant: 'secondary',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    text: 'Schedule Free Consultation',
    href: '/contact',
    variant: 'primary',
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    text: 'View Services',
    href: '/services',
    variant: 'secondary',
    size: 'sm',
  },
};
