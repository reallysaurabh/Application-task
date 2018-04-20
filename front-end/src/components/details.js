import React from 'react';
import '.././App.css';

const Detail = (props) => {
  return(
    <ul class="list-group">
      {props.data.map(article => {
        if(article.polarity === "positive"){
          return <li className="list-group-item">{article.text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <span className="badge green">{article.polarity}</span></li>
        }else if (article.polarity === "negative") {
          return <li className="list-group-item">{article.text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <span className="badge red">{article.polarity}</span></li>
        }else{
          return <li className="list-group-item">{article.text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <span className="badge gray">{article.polarity}</span></li>
        }

      })}
    </ul>
  );
}

export default Detail;
