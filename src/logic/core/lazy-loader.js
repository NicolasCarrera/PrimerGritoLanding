export function initLazyLoader() {
  const targets = document.querySelectorAll('[data-module]')
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const moduleName = entry.target.dataset.module
        import(`../sections/${moduleName}.js`)
          .then(module => module.default(entry.target))
          .catch(err => console.error(`Error loading ${moduleName}`, err))
          
        obs.unobserve(entry.target)
      }
    })
  }, { rootMargin: "200px" })

  targets.forEach(t => observer.observe(t))
}