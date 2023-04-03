 export default class Utility {
  constructor(selector){
    this.exploreBtn = selector;
    this.explorePath = location.origin + "/explore/index.html";
  }
  async init(){
    this.exploreBtn.onclick = () => {
      window.location.href = this.explorePath;
    }
    this.exploreBtn.ontouch = () => {
      window.location.href = this.explorePath;
    }
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

