import React, { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}
interface ErrorBoundaryProps {
  children: ReactNode;
}
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state to indicate an error has occurred
    console.log(error)
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error or send it to an error tracking service
    console.error('Error caught in error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render a fallback UI here
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
