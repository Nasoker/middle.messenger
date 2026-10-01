import Handlebars from "handlebars";
import * as Pages from "./pages/pages.ts";
import { mockInputs, mockChats, mockMessages } from "./mocks/mockData";
import "./styles/index.scss";

import avatarUrl from "./assets/images/avatar.png";
import searchIcon from "./assets/svg/searchIcon.svg";
import arrowIcon from "./assets/svg/arrowIcon.svg";
import addIcon from "./assets/svg/addIcon.svg";
import messageIcon from "./assets/svg/messageIcon.svg";
import tripleDotsIcon from "./assets/svg/tripleDotsIcon.svg";
import readMessageIcon from "./assets/svg/readMessageIcon.svg";

import { Input } from "./components/auth/input/input.ts";
import { Link } from "./components/auth/link/link.ts";
import { Form } from "./components/auth/form/form.ts";
import { SideBarMessage } from "./components/chat/sideBarMessage/sideBarMessage.ts";
import { ChatMessage } from "./components/chat/chatMessage/chatMessage.ts";
import { SubmitButton } from "./components/chat/submitButton/submitButton.ts";
import { ProfileInput } from "./components/profile/profileInput/profileInput.ts";

import ifEq from "./helpers/ifEq.ts";

Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("Link", Link);
Handlebars.registerPartial("Form", Form);
Handlebars.registerPartial("SideBarMessage", SideBarMessage);
Handlebars.registerPartial("ChatMessage", ChatMessage);
Handlebars.registerPartial("SubmitButton", SubmitButton);
Handlebars.registerPartial("ProfileInput", ProfileInput);

Handlebars.registerHelper("ifEq", ifEq);

const icons = {
    avatar: avatarUrl,
    addIcon: addIcon,
    arrowIcon: arrowIcon,
    messageIcon: messageIcon,
    searchIcon: searchIcon,
    tripleDotsIcon: tripleDotsIcon,
    readMessageIcon: readMessageIcon,
};

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
                        buttonLink: "chats",
                        link: {
                            url: "signin",
                            text: "Нет аккаунта?",
                        },
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
                        buttonLink: "chats",
                        link: {
                            url: "login",
                            text: "Войти",
                        },
                    },
                });
                break;
            case "error":
                this.compile(Pages.ErrorPage, {
                    title: "500",
                    description: "Мы уже фиксим",
                    link: {
                        url: "chats",
                        text: "Назад к чатам",
                        styleClass: "error-container__link",
                    },
                });
                break;
            case "chats":
                this.compile(Pages.ChatsPage, {
                    chats: mockChats.map((chat) => ({
                        ...chat,
                        avatar: avatarUrl,
                    })),
                    message: mockMessages,
                    name: "Вадим",
                    icons: icons,
                });
                break;
            case "profile":
                this.compile(Pages.ProfilePage, {
                    avatar: avatarUrl,
                    info : mockInputs.profile,
                    back: "chats",
                    name: "Иван",
                    links: [
                        {
                            text: "Изменить данные",
                            url: "changeData",
                            styleClass: "profile-main__links-item",
                        },
                        {
                            text: "Изменить пароль",
                            url: "changePassword",
                            styleClass: "profile-main__links-item",
                        },
                        {
                            text: "Выйти",
                            url: "login",
                            styleClass: "profile-main__links-item",
                        },
                    ],
                    icons: icons,
                });
                break;
            case "changePassword":
            case "changeData":
                this.compile(Pages.ProfilePage, {
                    avatar: avatarUrl,
                    info : mockInputs[this.state.currentPage],
                    back: "profile",
                    name: "Иван",
                    button: true,
                    icons: icons,
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
