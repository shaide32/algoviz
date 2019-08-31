import React, { Component } from 'react';
import { fn, args, animationWrapper } from '../core/algorithms/sorting/bubbleSort';
import AnimationManager from '../core/animationManager';


const next = (am) => {
    am.next();
}

const trigger = (am) => {
    am.toggle();
}

class Footer extends Component {

    constructor() {
        super();
        this.am = {
            next: () => {
                console.log('clecked next');
            },
            toggle: () => {
                console.log('clicked toggle');
            }
        }
    }

    componentDidMount() {
        this.am = new AnimationManager(animationWrapper, fn, args);
        this.am.init();
        //this.am.draw();
    }
    render() {
        return (
            <div className="footer">
                <button onClick={ () => next(this.am)} id="next">Next</button>
                <button onClick={ () => trigger(this.am)} id="trigger">Trigger</button>
            </div>
        );
    }
}

export default Footer;