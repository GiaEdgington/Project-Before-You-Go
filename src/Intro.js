import React from 'react';
import Image from './images/intro.jpg';
import { Link } from 'react-router-dom';

class Intro extends React.Component {
    render(){
        return(
            <div>
                <Link to='./login' className="loginIntro">Login here</Link>
                <div className="intro"></div>
            </div>
        )
    }
}

export default Intro;