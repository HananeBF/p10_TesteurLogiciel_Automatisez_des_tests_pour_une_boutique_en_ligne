
const baseURL = 'http://localhost:8080/#'
const apiLogin = `${Cypress.env("apiUrl")}/login`

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080/#/')
  })
})

describe('Page Load Time Metrics', () => {
  it('should measure different page load metrics', () => {
    cy.visit(baseURL)
    cy.window().then((win) => {
      const [navigationTiming] = win.performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationTiming) {
        const pageLoadTime = navigationTiming.loadEventEnd - navigationTiming.startTime
        const ttfb = navigationTiming.responseStart - navigationTiming.startTime
        const fcp = navigationTiming.domContentLoadedEventEnd - navigationTiming.startTime
        const responseTime = navigationTiming.responseEnd - navigationTiming.requestStart
        const throughput = navigationTiming.encodedBodySize / (navigationTiming.responseEnd - navigationTiming.responseStart) || 0
        cy.log(`Total Load Time: ${pageLoadTime} ms`)
        cy.log(`Time to First Byte: ${ttfb} ms`)
        cy.log(`First Contentful Paint: ${fcp} ms`)
        cy.log(`Response Time: ${responseTime} ms`)
        cy.log(`Throughput: ${throughput}`)
      }
    })
  })
})