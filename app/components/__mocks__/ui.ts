import React, {
  ReactNode,
  HTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

type MockComponentProps = HTMLAttributes<HTMLElement>;

interface MockComponentWithChildrenProps extends MockComponentProps {
  children?: ReactNode;
}

interface MockButtonProps extends MockComponentWithChildrenProps {
  asChild?: boolean;
}

type MockInputProps = InputHTMLAttributes<HTMLInputElement>;

type MockTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

type MockSpinnerProps = HTMLAttributes<HTMLDivElement>;

export const Button = ({ children, asChild, ...props }: MockButtonProps) => {
  if (asChild && React.isValidElement(children)) {
    // When using asChild, pass through all props to the child without adding role
    return React.cloneElement(children as React.ReactElement, props);
  }
  return React.createElement('button', props, children);
};

export const ButtonGroup = ({
  children,
  ...props
}: MockComponentWithChildrenProps) =>
  React.createElement('div', { ...props, role: 'group' }, children);

export const Card = {
  Root: ({ children, ...props }: MockComponentWithChildrenProps) =>
    React.createElement(
      'div',
      { ...props, 'data-testid': 'card-root' },
      children
    ),
  Body: ({ children, ...props }: MockComponentWithChildrenProps) =>
    React.createElement(
      'div',
      { ...props, 'data-testid': 'card-body' },
      children
    ),
  Title: ({ children, ...props }: MockComponentWithChildrenProps) =>
    React.createElement('h3', props, children),
  Description: ({ children, ...props }: MockComponentWithChildrenProps) =>
    React.createElement('p', props, children),
};

export const Field = {
  Root: ({ children, ...props }: MockComponentWithChildrenProps) =>
    React.createElement('div', props, children),
  Label: ({ children, ...props }: MockComponentWithChildrenProps) =>
    React.createElement('label', props, children),
  RequiredIndicator: () =>
    React.createElement('span', { 'aria-label': 'required' }, ' *'),
};

export const Group = ({ children, ...props }: MockComponentWithChildrenProps) =>
  React.createElement('div', { ...props, role: 'group' }, children);

export const Input = (props: MockInputProps) =>
  React.createElement('input', props);

export const Loader = ({
  children,
  ...props
}: MockComponentWithChildrenProps) =>
  React.createElement('div', { ...props, role: 'status' }, children);

export const Select = {
  Root: ({ children, ...props }: MockComponentWithChildrenProps) =>
    React.createElement('div', props, children),
  Trigger: ({ children, ...props }: MockComponentWithChildrenProps) =>
    React.createElement('button', props, children),
  Content: ({ children, ...props }: MockComponentWithChildrenProps) =>
    React.createElement('div', props, children),
};

export const Span = ({ children, ...props }: MockComponentWithChildrenProps) =>
  React.createElement('span', props, children);

export const Spinner = (props: MockSpinnerProps) =>
  React.createElement('div', {
    ...props,
    role: 'status',
    'aria-label': 'Loading',
  });

export const Textarea = (props: MockTextareaProps) =>
  React.createElement('textarea', props);

export const AbsoluteCenter = ({
  children,
  ...props
}: MockComponentWithChildrenProps) =>
  React.createElement('div', props, children);
