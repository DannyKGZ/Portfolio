import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Portfolio render error:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <pre
          style={{
            margin: 0,
            padding: '2rem',
            color: '#f87171',
            background: '#0a0a0a',
            minHeight: '100vh',
            whiteSpace: 'pre-wrap',
            fontFamily: 'Consolas, monospace',
            fontSize: '14px',
          }}
        >
          {`Ошибка загрузки сайта:\n\n${this.state.error.message}\n\n${this.state.error.stack ?? ''}`}
        </pre>
      );
    }

    return this.props.children;
  }
}
