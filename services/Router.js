const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault()
        const route = e.target.getAttribute("href")
        Router.go(route)
      })

      window.addEventListener("popstate", e => {
        Router.go(e.state.route, false)
      })

      Router.go(location.pathname)
    })
    window.addEventListener("popstate", e => {
      Router.go(e.state.route, false)
    })
  },
  go: (route, addHistory = true) => {
    console.log("go to", route)
    if (addHistory) {
      history.pushState({ route }, '', route)

    }

    let pageElement = null

    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page")
        break
      case "/order":
        pageElement = document.createElement("order-page")
        break
      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("details-page")
          const paramId = route.substring(route.lastIndexOf("-") + 1)
          pageElement.dataset.id = paramId
          break
        }
        pageElement = document.createElement("h1")
        pageElement.textContent = "404"
        break
    }

    if (pageElement) {
      const cache = document.querySelector("main")
      cache.innerHTML = ""
      //cache.children[0].remove()
      cache.appendChild(pageElement)
      window.scrollX = 0
      window.scrollY = 0
    }

  }
}

export default Router