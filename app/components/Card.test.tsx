import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders title and description', () => {
    render(<Card title="Test Card" description="This is a test description" />);

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('This is a test description')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(
      <Card
        title="Card with Icon"
        description="Description here"
        icon={<span data-testid="test-icon">🌱</span>}
      />
    );

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('does not render icon container when icon not provided', () => {
    render(<Card title="Card without Icon" description="No icon here" />);

    expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
  });

  it('renders as link when href is provided', () => {
    render(
      <Card
        title="Linked Card"
        description="Click to navigate"
        href="/services"
      />
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/services');
  });

  it('does not render as link when href is not provided', () => {
    render(<Card title="Static Card" description="Not clickable" />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <Card title="Card with Children" description="Has extra content">
        <div data-testid="child-content">Extra content here</div>
      </Card>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Extra content here')).toBeInTheDocument();
  });

  it('combines link and children correctly', () => {
    render(
      <Card
        title="Full Card"
        description="Complete example"
        href="/about"
        icon={<span data-testid="icon">✓</span>}
      >
        <p data-testid="extra">Additional info</p>
      </Card>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/about');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('extra')).toBeInTheDocument();
  });
});
