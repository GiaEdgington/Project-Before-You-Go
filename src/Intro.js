import React from 'react';
import { Link } from 'react-router-dom';

class Intro extends React.Component {
    render(){
        return(
            <div className="intro">
                <div>
                <Link to='./login' className="loginIntro">Sign in</Link>
                <p className="register">Or register <Link to='./signup'>here</Link></p>
                </div>
            </div>
        )
    }
}

export default Intro;