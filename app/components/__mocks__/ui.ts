import React, { ReactNode, HTMLAttributes } from 'react';

interface MockComponentProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  asChild?: boolean;
}

export const Button = ({ children, asChild, ...props }: MockComponentProps) => {
  if (asChild && React.isValidElement(children)) {
    // When using asChild, pass through all props to the child without adding role
    return React.cloneElement(children as React.ReactElement, props);
  }
  return React.createElement('button', props, children);
};

export const ButtonGroup = ({ children, ...props }: MockComponentProps) =>
  React.createElement('div', { ...props, role: 'group' }, children);

export const Card = {
  Root: ({ children, ...props }: MockComponentProps) =>
    React.createElement(
      'div',
      { ...props, 'data-testid': 'card-root' },
      children
    ),
  Body: ({ children, ...props }: MockComponentProps) =>
    React.createElement(
      'div',
      { ...props, 'data-testid': 'card-body' },
      children
    ),
  Title: ({ children, ...props }: MockComponentProps) =>
    React.createElement('h3', props, children),
  Description: ({ children, ...props }: MockComponentProps) =>
    React.createElement('p', props, children),
};

export const Field = {
  Root: ({ children, ...props }: MockComponentProps) =>
    React.createElement('div', props, children),
  Label: ({ children, ...props }: MockComponentProps) =>
    React.createElement('label', props, children),
  RequiredIndicator: () =>
    React.createElement('span', { 'aria-label': 'required' }, ' *'),
};

export const Group = ({ children, ...props }: MockComponentProps) =>
  React.createElement('div', { ...props, role: 'group' }, children);

export const Input = (props: MockComponentProps) =>
  React.createElement('input', props);

export const Loader = ({ children, ...props }: MockComponentProps) =>
  React.createElement('div', { ...props, role: 'status' }, children);

export const Select = {
  Root: ({ children, ...props }: MockComponentProps) =>
    React.createElement('div', props, children),
  Trigger: ({ children, ...props }: MockComponentProps) =>
    React.createElement('button', props, children),
  Content: ({ children, ...props }: MockComponentProps) =>
    React.createElement('div', props, children),
};

export const Span = ({ children, ...props }: MockComponentProps) =>
  React.createElement('span', props, children);

export const Spinner = (props: MockComponentProps) =>
  React.createElement('div', {
    ...props,
    role: 'status',
    'aria-label': 'Loading',
  });

export const Textarea = (props: MockComponentProps) =>
  React.createElement('textarea', props);

export const AbsoluteCenter = ({ children, ...props }: MockComponentProps) =>
  React.createElement('div', props, children);
