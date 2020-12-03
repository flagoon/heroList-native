import React, { Component, ReactNode } from 'react';

import { ErrorTitle, ErrorView, ErrorText } from './ErrorHandler.sc';

type Props = {
  children: React.ReactNode;
};
type State = {
  hasError: boolean;
  errorMessage: string;
  stack: string;
};

class ErrorHandler extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
    stack: '',
  };

  componentDidCatch(error: Error, errorInfo: { componentStack: string }): void {
    if (error) {
      this.setState({
        hasError: true,
        errorMessage: error.message,
        stack: errorInfo.componentStack,
      });
    }
  }

  render(): ReactNode {
    return this.state.hasError ? (
      <ErrorView>
        <ErrorTitle>Ooops! Error happened</ErrorTitle>
        <ErrorText>{this.state.errorMessage}</ErrorText>
        <ErrorText>{this.state.stack}</ErrorText>
      </ErrorView>
    ) : (
      this.props.children
    );
  }
}

export default ErrorHandler;
