// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback){
    callback(data)
  }
}

async function loadTemplate(path){
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter(){
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("header")
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("footer");
  
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  // const cartLink = document.getElementById("cartLink");
  // cartLink.setAttribute("href", location.origin + "/cart/index.html");

  // const homeIconLink = document.getElementById("homeLink");
  // homeIconLink.setAttribute("href", location.origin)
}
 export async function loadPartial(path, element){
  const template = await loadTemplate(path);
  const htmlElement = document.querySelector(element);
  renderWithTemplate(template, htmlElement);
  
 }

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
