import Handlebars from "handlebars";
import * as Pages from "./pages/pages.ts";
import { mockInputs } from "./mocks/mockData";
import "./styles/index.scss";

import { Input } from "./components/input/input.ts";
import { Form } from "./components/form/form.ts";

Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("Form", Form);

export class App {
    state = {
        currentPage: "login",
    };
    appElement = document.getElementById("app");

    constructor() {}

    compile(page: string, data: any) {
        const template = Handlebars.compile(page)(data);
        this.appElement.innerHTML = template;
    }

    render() {
        switch (this.state.currentPage) {
            case "login":
                this.compile(Pages.LoginPage, {
                    form: {
                        inputs: mockInputs.login,
                        title: "Вход",
                        buttonText: "Авторизоваться",
                        linkText: "Нет аккаунта",
                        buttonLink: "chats",
                        link: "signin",
                    },
                });
                break;
            case "signin":
                this.compile(Pages.LoginPage, {
                    form: {
                        formClass: "register",
                        inputs: mockInputs.signin,
                        title: "Регистрация",
                        buttonText: "Зарегистрироваться",
                        linkText: "Войти",
                        buttonLink: "chats",
                        link: "login",
                    },
                });
                break;
        }

        this.registerEvents();
    }

    registerEvents() {
        const allLinks = this.appElement.querySelectorAll("[data-link]");

        allLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                this.state.currentPage = link.dataset.link;
                this.render();
            });
        });
    }
}
