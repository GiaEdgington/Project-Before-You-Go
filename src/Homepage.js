import React from 'react';
import Form from './components/Form';
import { Link } from 'react-router-dom';

class Homepage extends React.Component {

    signOut = () => {
        localStorage.clear();
        //needs props history to /
        this.props.history.push('/');
    }

    render(){
        return(
            <div>
                <div style={{ float:"right",marginRight:"7em"}}>
                    <Link to = "/myTrips"><button className="buttonPage" style={{ marginRight:'5px'}}>My Trips</button></Link>
                    <button className="buttonPage" onClick={this.signOut}>Sign out</button>
                    <p>Welcome, {this.props.username}.</p>
                </div>
                <Form id={ this.props.id }/> 
                <div className='homepage'></div>
            </div>
        )
    }
}

export default Homepage;