import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor() {
        super();
        console.log("i am constructor");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=94c39a4108a2450b98a9a6d03859624a";
        let data = await fetch(url);
        console.log(data);
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState({ articles: parsedData.articles })
    }
    handlePreClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=94c39a4108a2450b98a9a6d03859624a&page=${this.state.page - 1}`;
        let data = await fetch(url);
        console.log(data);
        let parsedData = await data.json();
        this.setState(
            {
                page: this.state.page - 1,
                articles: parsedData.articles
            }
        )
    }
    handleNextClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=94c39a4108a2450b98a9a6d03859624a&page=${this.state.page + 1}`;
        let data = await fetch(url);
        console.log(data);
        let parsedData = await data.json();
        this.setState(
            {
                page: this.state.page + 1,
                articles: parsedData.articles
            }
        )
    }
    
    render() {
        return (
            <div className="container my-3">
                <h2>News24-Top Headlines</h2>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                                imgUrl={element.urlToImage} newsUrl={element.url}
                            />

                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button onClick={this.handlePreClick} type="button" className="btn btn-dark">&larr;Previous</button>
                    <button onClick={this.handleNextClick} type="button" className="btn btn-dark">Next &rarr;</button>

                </div>


            </div>
        )
    }
}

export default News