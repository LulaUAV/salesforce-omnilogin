import { LightningElement, createElement, api } from 'lwc';

const transitions = {
    slideIn: (inElement, outElement) => {
        var position;

        if (!outElement) {
            position = inElement.getBoundingClientRect();

            return slide(inElement, position.x, -position.width, 250);
        }

        position = outElement.parentNode.getBoundingClientRect();

        slide(inElement, -position.width, 0, 250);

        return slide(outElement, 0, position.width, 125);
    },

    slideOut: (inElement, outElement) => {
        var position;

        if (!outElement) {
            position = inElement.getBoundingClientRect();

            return slide(inElement, position.width, 0, 250);
        }

        position = outElement.parentNode.getBoundingClientRect();

        slide(inElement, position.width, 0, 250);

        return slide(outElement, 0, -position.width, 125);
    },

    fade: (inElement, outElement) => {
        fadeIn(inElement, 500);

        return fadeOut(outElement, 250);
    },
}

function fadeIn(element, duration) {
    return new Promise(resolve => {
        element.animate([
            { opacity: 0, offset: 0 },
            { opacity: 100, offset: 1 },
        ],
            {
                duration: duration,
                iterations: 1,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'
            }
        ).onfinish = () => {
            resolve();
        }
    });
}

function fadeOut(element, duration) {
    return new Promise(resolve => {
        if(!element) {
            return resolve('');
        }

        element.animate([
            { opacity: 100, offset: 0 },
            { opacity: 0, offset: 1 },
        ],
            {
                duration: duration,
                iterations: 1,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'
            }
        ).onfinish = () => {
            resolve();
        }

        return '';
    });
}

function slide(element, from, to, duration) {
    return new Promise(resolve => {
        element.animate([
            { transform: `translateX(${from}px)`, offset: 0 },
            { transform: `translateX(${to}px)`, offset: 1 },
        ],
            {
                duration: duration,
                iterations: 1,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'
            }
        ).onfinish = () => {
            resolve();
        }
    });
}

export default class App extends LightningElement {
    @api
    name = '';

    @api
    transition = '';

    @api
    setView(tagName, component, props = {}, transition) {
        let container = this.template.querySelector('div');
        let setViewPromise = Promise.resolve();

        if (tagName && component) {
            const viewElement = createElement(tagName, {
                is: component,
                fallback: false,
            });

            Object.assign(viewElement, props);

            if (transition && transitions[transition]) {
                setViewPromise = transitions[transition](viewElement, container.firstChild);
            }

            setViewPromise.then(() => {
                if (container.firstChild) {
                    container.firstChild.remove();
                }
                container.appendChild(viewElement);
            })
        } else if (container.firstChild) {
            container.firstChild.remove();
        }
    }
}
