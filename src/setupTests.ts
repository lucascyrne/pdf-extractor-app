import '@testing-library/jest-dom';

if (typeof window.ResizeObserver === 'undefined') {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = () => 'mock-url';
}
