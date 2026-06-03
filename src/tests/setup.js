import '@testing-library/jest-dom'

// jsdom doesn't implement IntersectionObserver (used by framer-motion)
global.IntersectionObserver = class {
  constructor() {}
  observe()    {}
  unobserve()  {}
  disconnect() {}
}

// clear localStorage between every test so tests don't bleed into each other
beforeEach(() => {
  localStorage.clear()
})
