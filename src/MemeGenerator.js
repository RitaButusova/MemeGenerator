import React, {Component} from 'react'

class MemeGenerator extends Component {
    constructor(props){
        super()
        this.state = {
            topText: '',
            bottomText: '',
            randomImage: 'http://i.imgflip.com/1bij.jpg',
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then((response) => {
            const {memes} = response.data
            this.setState({allMemeImgs: memes})
        });

    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({ [name]: value} )
    }

    handleSubmit(event){
        event.preventDefault()
        const arrAllMeme = this.state.allMemeImgs
        const randomVal = Math.floor(Math.random() * (arrAllMeme.length))
        const randomImg = arrAllMeme[randomVal].url
        this.setState({randomImage: randomImg})
    }

    render(){
        return(
            <div>
                <h1>Meme generator</h1>
                <form className='meme-form' onSubmit = {this.handleSubmit}>
                    <input 
                    type = 'text'
                    name = 'topText'
                    value = {this.state.topText}
                    placeholder = 'Top text'
                    onChange = {this.handleChange}
                    ></input>
                    <input 
                    type = 'text'
                    name = 'bottomText'
                    value = {this.state.bottomText}
                    placeholder = 'Bottom text'
                    onChange = {this.handleChange}
                    ></input>


                    <button>Gen</button>
                </form>
                <div className='meme'>
                    <img src={this.state.randomImage} alt='meme' />
                    <h2 className='top'>{this.state.topText}</h2>
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator