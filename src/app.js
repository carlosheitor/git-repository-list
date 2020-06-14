import axios from "axios";
class App {
  constructor() {
    this.repositories = [];

    this.formEl = document.getElementById("repo-form");
    this.ulEl = document.getElementById("repo-list");
    this.input = document.querySelector("input[name=repository]");

    this.registerHandlers();
  }

  registerHandlers() {
    this.formEl.onsubmit = (event) => this.addRepository(event);
  }

  async addRepository(event) {
    event.preventDefault();

    const repositoryName = this.input.value;

    const response = await axios.get(
      `https://api.github.com/repos/${repositoryName}`
    );

    const {
      name,
      description,
      html_url,
      owner: { avatar_url },
    } = response.data;

    this.repositories.push({
      name,
      description,
      html_url,
      avatar_url,
    });

    this.input.value = "";

    console.log(this.repositories);
    this.render();
  }

  render() {
    this.ulEl.innerHTML = "";
    this.repositories.forEach((repo) => {
      let imgEl = document.createElement("img");
      imgEl.setAttribute("src", repo.avatar_url);

      let nameEl = document.createElement("strong");
      nameEl.appendChild(document.createTextNode(repo.name));

      let descEl = document.createElement("p");
      descEl.appendChild(document.createTextNode(repo.description));

      let linkEl = document.createElement("a");
      linkEl.appendChild(document.createTextNode("Acessar"));
      linkEl.setAttribute("href", repo.html_url);

      let listItemEl = document.createElement("li");
      listItemEl.appendChild(imgEl);
      listItemEl.appendChild(nameEl);
      listItemEl.appendChild(descEl);
      listItemEl.appendChild(linkEl);

      this.ulEl.appendChild(listItemEl);
    });
  }
}

new App();
