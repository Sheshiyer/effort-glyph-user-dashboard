interface RequestArguments {
  method: string;
  params?: any[] | Record<string, any>;
}

interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request: (args: RequestArguments) => Promise<any>;
    on: (event: string, callback: (...args: any[]) => void) => void;
    removeListener: (event: string, callback: (...args: any[]) => void) => void;
    removeAllListeners: (event: string) => void;
    selectedAddress: string | null;
  };
}
