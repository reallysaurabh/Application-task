import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import SearchBar from './components/search_bar';
import Detail from './components/details';
import './App.css';

class App extends Component {

  constructor(props){

    super(props);
    this.state = {
      tweets: [],
      news: [],
      message: "",
      success: false
    }
    axios.all([
      axios.post('http://34.214.41.107:3000/tweet/technology'),
      axios.post('http://34.214.41.107:3000/news/technology')
    ])
    .then(axios.spread((tweetRes, newsRes) => {
      console.log(tweetRes);
      console.log(newsRes);
      this.setState({
        message: "Fetching data complete",
        success: true,
        tweets: tweetRes.data.twitterData,
        news: newsRes.data.newsData
      })
    }))
    .catch((err) => {
      console.log(err);
      this.setState({
        success: false,
        message: "Error in fetching data"
      })
    })

  }

  onNewSearch(keyword) {

    axios.all([
      axios.post('http://34.214.41.107:3000/tweet/'+keyword),
      axios.post('http://34.214.41.107:3000/news/'+keyword)
    ])
    .then(axios.spread((tweetRes, newsRes) => {
      console.log(tweetRes);
      console.log(newsRes);
      this.setState({
        message: "Fetching data complete",
        success: true,
        tweets: tweetRes.data.twitterData,
        news: newsRes.data.newsData
      })
    }))
    .catch((err) => {
      console.log(err);
      this.setState({
        success: false,
        message: "Error in fetching data"
      })
    })

  }

  render() {
    const onNewSearch = _.debounce(term => {
      this.onNewSearch(term);
    }, 300);

    return (
      <div className="row">
        <div className="container padding-top">
          <SearchBar onSearchChange={onNewSearch} />
        </div>
        <div className="container">
          <div className="col-md-6">
            <h5>Tweets</h5>
            <Detail data={this.state.tweets} />
          </div>
          <div className="col-md-6">
            <h5>News</h5>
            <Detail data={this.state.news} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
