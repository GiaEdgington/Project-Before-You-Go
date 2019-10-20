import React from 'react';


class DestinationBook extends React.Component {

    state={
        isHidden: true,
        deleted: false
    }

    handleClick = () => {
        // this.setState({ isHidden: !this.state.isHidden})
        let title = this.props.book.title;
        //console.log(title);
         window.open(`https://www.amazon.com/s?k=${title}+book`, '_blank');
    }
       
    render(){
        return(
            <div>
                <div className="flex-item" >
                    <img style={{ width:'130px'}} src={this.props.book.image} alt="" />
                    <div>
                        <button onClick={this.handleClick} className="remButton">More</button>
                        <button className="remButton" onClick={() => this.props.deleteBook(this.props.book.id)}>Remove</button>
                    </div>
                    { !this.state.isHidden
                    ? 
                    <div className="synopsis"><h4>{this.props.book.title}</h4><p>{this.props.book.synopsis}</p>
                    </div>
                    :
                    <div></div>
                    }
                </div>
        </div>
        )
    }
}

export default DestinationBook;
