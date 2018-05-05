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
      axios.post('http://34.208.20.22:3000/tweet/technology'),
      axios.post('http://34.208.20.22:3000/news/technology')
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
      axios.post('http://34.208.20.22:3000/tweet/'+keyword),
      axios.post('http://34.208.20.22:3000/news/'+keyword)
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
        <div className="container padding-top">
          <div className="col-md-6 col-md-offset-1">
            <h5>News wordcloud</h5><br />
            <img className="img-responsive" alt="news wordcloud" src={require("./components/images/news_wordcloud.png")} />
          </div>
          <div className="col-md-6 col-md-offset-1">
            <h5>Twitter wordcloud</h5><br />
            <img className="img-responsive" alt="twitter wordcloud" src={require("./components/images/twitter_wordcloud.png")} />
          </div>
          <div className="col-md-6 col-md-offset-1">
            <h5>News Timeline</h5><br />
            <img className="img-responsive" alt="twitter wordcloud" src={require("./components/images/news_timeline.png")} />
          </div>
          <div className="col-md-6 col-md-offset-1">
            <h5>Country wise tweets</h5><br />
            <img className="img-responsive" alt="twitter wordcloud" src={require("./components/images/tweet_countrywise.png")} />
          </div>
          <div className="col-md-6 col-md-offset-1">
            <h5>News Sources</h5><br />
            <img className="img-responsive" alt="twitter wordcloud" src={require("./components/images/news_sources.png")} />
          </div>
        </div>
      </div>


    );
  }
}

export default App;
