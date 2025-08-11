import { JSX, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import useStore from './store';
import { ThemeToggle } from './components/ThemeToggle';

function App(): JSX.Element {
  const { count, increment, decrement, reset } = useStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const close = (): void => setIsOpen(false);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300 theme-bg-primary">
      {/* Header with Theme Toggle */}
      <div className="max-w-md mx-auto mb-6 flex justify-end">
        <ThemeToggle />
      </div>

      <div className="max-w-md mx-auto rounded-lg p-6 transition-all duration-300 theme-bg-card theme-shadow-card">
        <h1 className="text-3xl font-bold mb-6 text-center transition-all duration-300 theme-text-primary">
          Development Setup Complete!
        </h1>

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-lg mb-4 transition-all duration-300 theme-text-secondary">
              Zustand Counter:{' '}
              <span className="font-bold theme-text-accent">
                {count}
              </span>
            </p>

            <div className="space-x-2">
              <button
                onClick={increment}
                className="font-bold py-2 px-4 rounded transition-all duration-200 hover:scale-105 active:scale-95 theme-bg-button-primary theme-text-white theme-button-primary"
              >
                +
              </button>
              <button
                onClick={decrement}
                className="font-bold py-2 px-4 rounded transition-all duration-200 hover:scale-105 active:scale-95 theme-bg-button-danger theme-text-white theme-button-danger"
              >
                -
              </button>
              <button
                onClick={reset}
                className="font-bold py-2 px-4 rounded transition-all duration-200 hover:scale-105 active:scale-95 theme-bg-button-secondary theme-text-white theme-button-secondary"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsOpen(true)}
              className="font-bold py-2 px-4 rounded transition-all duration-200 hover:scale-105 active:scale-95 theme-bg-button-success theme-text-white theme-button-success"
            >
              Open Dialog
            </button>
          </div>
        </div>

        <div className="mt-6 text-sm transition-all duration-300 theme-text-muted">
          <h3 className="font-semibold mb-2 transition-all duration-300 theme-text-primary">
            ✅ Installed & Configured:
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Tailwind CSS (styling this page)</li>
            <li>Headless UI (dialog component)</li>
            <li>Zustand (state management)</li>
            <li>ESLint (code linting)</li>
            <li>Prettier (code formatting)</li>
            <li>Jest (unit testing)</li>
            <li>Theme System (dark/light mode)</li>
          </ul>
        </div>
      </div>

      {/* Dialog */}
      <Dialog
        open={isOpen}
        onClose={close}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 transition-all duration-300 theme-dialog-backdrop" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="mx-auto max-w-sm rounded-lg p-6 transition-all duration-300 theme-bg-card theme-shadow-card">
            <DialogTitle className="text-lg font-medium mb-2 transition-all duration-300 theme-text-primary">
              Deactivate account
            </DialogTitle>
            <Description className="text-sm mb-4 transition-all duration-300 theme-text-muted">
              This will permanently deactivate your account
            </Description>
            <p className="text-sm mb-6 transition-all duration-300 theme-text-secondary">
              Are you sure you want to deactivate your account? All of your
              data will be permanently removed.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={close}
                className="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:scale-105 active:scale-95 theme-bg-button-secondary theme-text-secondary theme-button-secondary"
              >
                Cancel
              </button>
              <button
                onClick={close}
                className="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:scale-105 active:scale-95 theme-bg-button-danger theme-text-white theme-button-danger"
              >
                Deactivate
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

export default App;
