import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-12 text-center z-10">
          <h1 className="text-slate-900 text-3xl font-bold">
            Something went wrong
          </h1>
          <p className="text-slate-500">
            An unexpected error occurred. Please reload the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="glass rounded-xl px-6 py-3 text-slate-700 hover:bg-white/90 transition-colors"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
