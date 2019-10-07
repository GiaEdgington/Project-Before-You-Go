import React from 'react';
import Image from './images/intro.jpg';
import { Link } from 'react-router-dom';

class Intro extends React.Component {
    render(){
        return(
            <div className="intro">
                <div>
                <Link to='./login' className="loginIntro">Sign in</Link>
                </div>
                
            </div>
        )
    }
}

export default Intro;