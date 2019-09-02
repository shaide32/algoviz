import React, { Component } from 'react';
import AnimationManager from '../core/animationManager';

let animationSpeed = 1000;

const prev = (am) => {
    am.animatePrev();
}

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
        this.am.init();
    }

    componentDidUpdate() {
        this.am.init();
    }

    render() {
        this.am = new AnimationManager(this.props.animationWrapper, this.props.fn, this.props.args, animationSpeed);
        return (
            <div className="footer">
                <button onClick={ () => prev(this.am)} id="next">Previous Step</button>
                <button onClick={ () => trigger(this.am)} id="trigger">Play/ Pause</button>
                <button onClick={ () => next(this.am)} id="next">Next Step</button>
                <div>
                    <input type="range" name="speed" defaultValue={animationSpeed} max="2000" min="0" onChange={
                        (e) => {
                            this.am.setAnimationSpeed(e.target.value);
                            animationSpeed = e.target.value;
                        }
                    } />
                    <label htmlFor="speed">Animation Speed</label>
                </div>
                
            </div>
        );
    }
}

export default Footer;