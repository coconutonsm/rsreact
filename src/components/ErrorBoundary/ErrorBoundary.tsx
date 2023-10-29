import React from 'react';

type props = {
  children: React.ReactNode;
};

type state = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
