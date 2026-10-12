import type { Meta, StoryObj } from '@storybook/react';
import { Markdown } from './Markdown';

const sample = `## Heading two

A paragraph with an [external link](https://example.com) and an
[internal link](/contact), plus **bold** text.

### Heading three

- First item
- Second item

> **Callout.** Quoted text renders as a real blockquote in a card.
`;

const meta = {
  title: 'Components/Markdown',
  component: Markdown,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { children: sample },
} satisfies Meta<typeof Markdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checklist: Story = {
  args: {
    checklist: true,
    children: '- User experience efficiency\n- Web development practices',
  },
};
