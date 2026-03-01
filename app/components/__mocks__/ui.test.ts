import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  Field,
  Group,
  Input,
  Loader,
  Select,
  Span,
  Spinner,
  Textarea,
  AbsoluteCenter,
} from './ui';

describe('UI Mocks', () => {
  describe('Button', () => {
    it('renders as button element', () => {
      const { container } = render(React.createElement(Button, {}, 'Click me'));
      expect(container.querySelector('button')).toBeInTheDocument();
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('handles asChild prop with link element', () => {
      const { container } = render(
        React.createElement(
          Button,
          { asChild: true },
          React.createElement('a', { href: '/test' }, 'Link')
        )
      );
      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
    });
  });

  describe('ButtonGroup', () => {
    it('renders div with group role', () => {
      const { container } = render(
        React.createElement(ButtonGroup, {}, 'Group content')
      );
      const group = container.querySelector('[role="group"]');
      expect(group).toBeInTheDocument();
      expect(screen.getByText('Group content')).toBeInTheDocument();
    });
  });

  describe('Card', () => {
    it('renders Card.Root as div', () => {
      const { container } = render(
        React.createElement(Card.Root, {}, 'Root content')
      );
      expect(
        container.querySelector('[data-testid="card-root"]')
      ).toBeInTheDocument();
    });

    it('renders Card.Body as div', () => {
      const { container } = render(
        React.createElement(Card.Body, {}, 'Body content')
      );
      expect(
        container.querySelector('[data-testid="card-body"]')
      ).toBeInTheDocument();
    });

    it('renders Card.Title as h3', () => {
      const { container } = render(
        React.createElement(Card.Title, {}, 'Title')
      );
      expect(container.querySelector('h3')).toBeInTheDocument();
      expect(screen.getByText('Title')).toBeInTheDocument();
    });

    it('renders Card.Description as p', () => {
      const { container } = render(
        React.createElement(Card.Description, {}, 'Description')
      );
      expect(container.querySelector('p')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });
  });

  describe('Field', () => {
    it('renders Field.Root as div', () => {
      const { container } = render(
        React.createElement(Field.Root, {}, 'Field content')
      );
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('renders Field.Label as label', () => {
      const { container } = render(
        React.createElement(Field.Label, {}, 'Email')
      );
      expect(container.querySelector('label')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('renders Field.RequiredIndicator', () => {
      const { container } = render(
        React.createElement(Field.RequiredIndicator)
      );
      const indicator = container.querySelector('[aria-label="required"]');
      expect(indicator).toBeInTheDocument();
    });
  });

  describe('Group', () => {
    it('renders div with group role', () => {
      const { container } = render(
        React.createElement(Group, {}, 'Grouped items')
      );
      expect(container.querySelector('[role="group"]')).toBeInTheDocument();
      expect(screen.getByText('Grouped items')).toBeInTheDocument();
    });
  });

  describe('Input', () => {
    it('renders input element', () => {
      const { container } = render(
        React.createElement(
          Input as React.ComponentType<
            React.InputHTMLAttributes<HTMLInputElement>
          >,
          { type: 'text', placeholder: 'Enter text' }
        )
      );
      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('placeholder', 'Enter text');
    });
  });

  describe('Loader', () => {
    it('renders div with status role', () => {
      const { container } = render(
        React.createElement(Loader, {}, 'Loading...')
      );
      const loader = container.querySelector('[role="status"]');
      expect(loader).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Select', () => {
    it('renders Select.Root as div', () => {
      const { container } = render(
        React.createElement(Select.Root, {}, 'Root')
      );
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('renders Select.Trigger as button', () => {
      const { container } = render(
        React.createElement(Select.Trigger, {}, 'Open')
      );
      expect(container.querySelector('button')).toBeInTheDocument();
      expect(screen.getByText('Open')).toBeInTheDocument();
    });

    it('renders Select.Content as div', () => {
      const { container } = render(
        React.createElement(Select.Content, {}, 'Options')
      );
      expect(container.querySelector('div')).toBeInTheDocument();
      expect(screen.getByText('Options')).toBeInTheDocument();
    });
  });

  describe('Span', () => {
    it('renders span element', () => {
      const { container } = render(
        React.createElement(Span, {}, 'Span content')
      );
      expect(container.querySelector('span')).toBeInTheDocument();
      expect(screen.getByText('Span content')).toBeInTheDocument();
    });
  });

  describe('Spinner', () => {
    it('renders div with status role and loading label', () => {
      const { container } = render(React.createElement(Spinner, {}));
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute('aria-label', 'Loading');
    });
  });

  describe('Textarea', () => {
    it('renders textarea element', () => {
      const { container } = render(
        React.createElement(
          Textarea as React.ComponentType<
            React.TextareaHTMLAttributes<HTMLTextAreaElement>
          >,
          { rows: 4, placeholder: 'Enter message' }
        )
      );
      const textarea = container.querySelector('textarea');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute('rows', '4');
      expect(textarea).toHaveAttribute('placeholder', 'Enter message');
    });
  });

  describe('AbsoluteCenter', () => {
    it('renders div with children', () => {
      const { container } = render(
        React.createElement(AbsoluteCenter, {}, 'Centered')
      );
      expect(container.querySelector('div')).toBeInTheDocument();
      expect(screen.getByText('Centered')).toBeInTheDocument();
    });
  });
});
