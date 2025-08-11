import { JSX, useState } from 'react';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import useStore from './store';

function App(): JSX.Element {
  const { count, increment, decrement, reset } = useStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Development Setup Complete!
        </h1>

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-4">
              Zustand Counter:{' '}
              <span className="font-bold text-blue-600">{count}</span>
            </p>

            <div className="space-x-2">
              <button
                onClick={increment}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                +
              </button>
              <button
                onClick={decrement}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                -
              </button>
              <button
                onClick={reset}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Open Dialog
            </button>
          </div>
        </div>

        {/* Dialog */}
        <Dialog
          open={isOpen}
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
              >
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-white"
                >
                  Payment successful
                </DialogTitle>
                <p className="mt-2 text-sm/6 text-white/50">
                  Your payment has been successfully submitted. We’ve sent you
                  an email with all of the details of your order.
                </p>
                <div className="mt-4">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                    onClick={close}
                  >
                    Got it, thanks!
                  </Button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
