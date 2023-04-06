 export default class Utility {
  constructor(){
    this.origin = location.origin;
  }
async setButtons(buttons){
  buttons.forEach(button => {
    button["htmlElement"].onclick = () => {
      window.location.href = this.origin + button["url"];
    }
  });
}

  getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
  setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  renderWithTemplate(template, parentElement, data, callback) {
    parentElement.insertAdjacentHTML("afterbegin", template);
    if (callback){
      callback(data)
    }
  }
   getParamPair(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var paramPair = {};
    for (const [key, value] of urlParams){
      paramPair = {key, value}
    }
    // const product = urlParams.get(param);   
    return paramPair;
  }
  async loadTemplate(path){
    const res = await fetch(path);
    const template = await res.text();
    return template;
  }

  async loadHeaderFooter(){
    const headerTemplate = await this.loadTemplate("../partials/header.html");
    const headerElement = document.querySelector("header")
    const footerTemplate = await this.loadTemplate("../partials/footer.html");
    const footerElement = document.querySelector("footer");
    
    this.renderWithTemplate(headerTemplate, headerElement);
    this.renderWithTemplate(footerTemplate, footerElement);

  }
  async loadPartial(path, element){
    const template = await this.loadTemplate(path);
    const htmlElement = document.querySelector(element);
    this.renderWithTemplate(template, htmlElement);

 }

 }

