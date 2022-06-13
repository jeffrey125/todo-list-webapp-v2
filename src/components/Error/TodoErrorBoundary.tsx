import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class TodoErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="bg-lightBG dark:bg-darkBG flex items-center justify-center w-screen h-screen flex-col gap-10 transition-all duration-500">
          <h1 className="text-fontColor dark:text-lightFontColor text-5xl transition-colors duration-300">
            Sorry there was an error...
          </h1>
          <button
            className={`group flex justify-center items-center border-2 border-solid border-palette1 h-10 w-40 rounded-full bg-palette1 hover:bg-palette1Shade hover:shadow  focus:bg-palette1Shade focus:shadow active:bg-palette1Shade active:shadow transition-all duration-300 outline-none`}
            onClick={() => this.setState({ hasError: false })}
          >
            Click me to refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default TodoErrorBoundary;
