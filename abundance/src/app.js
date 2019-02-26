let tabs = {
  main_tab: document.getElementById('main_tab'),
  elkhorn_tab: document.getElementById('elkhorn_tab'),
  sharon_tab: document.getElementById('sharon_tab'),
  walworth_tab: document.getElementById('walworth_tab')
}

let pages = {
  main_page: document.getElementById('main_page'),
  elkhorn_page: document.getElementById('elkhorn_page'),
  sharon_page: document.getElementById('sharon_page'),
  walworth_page: document.getElementById('walworth_page')
}

function flip (name) {
  for (let el in tabs) el.startsWith(name) ? tabs[el].classList.add('sel') : tabs[el].classList.remove('sel')
  for (let el in pages) el.startsWith(name) ? pages[el].classList.remove('hidden') : pages[el].classList.add('hidden')
}

for (let el in tabs) {
  tabs[el].addEventListener('click', () => flip(el.slice(0, -4)))
}

fetch('/test')
  .then(x => x.json())
  .then(x => {
    console.log(x)
  })
