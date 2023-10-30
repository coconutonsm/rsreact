import React, { ErrorInfo } from 'react';

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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error: ', error.message, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong. Please reload page.</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
