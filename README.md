#### Todo 
- [x] Collect random tweets
- [x] Find top 5 named entities
- [x] Find related news
- [x] Mongo server setup done
- [x] Sentiment Analysis Api deployed on server #1
- [ ] React front end 

#### Server ssh commands
- Data collection and Analysis - ssh -i saurabh_aws.pem ubuntu@34.214.41.107
- MongoDB server - ssh -i saurabh_aws.pem ubuntu@52.41.194.58
- saurabh_aws.pem - available in config folder


#### Data Collection

1. Collect a random sample of 10K tweets using the Twitter API and store them in a MongoDB instance.
    
    Using twitter streaming api to collect tweets
    using a script and storing it in mongodb.
    
    - data/tweets.js - to fetch the data from twitter stream api
    - models/Tweet.js - object relational mapping for Tweets
    
2. From these collected tweets, parse the 5 most frequently occurring named-entities (can be a name, person, location, product etc.).

    Using nltk and pymongo with Python to extract top 5 named-entities.
    
    Approach - 
    1. Tokenize the strings to form a bag of words and extract the most recurring NNP (Proper Noun - Singlular) and NNPs (Proper Noun - Plural) 
    2. Use some (Stanford NER) named entity recognizer (or build one) to extract the named entities and aggregate/sort them based on no. of occurences.
     
     - data/data_process.py - to fetch top 5 frequent named-entities (uses nltk) and approach (i.) above 
    
    Todo - Approach (ii.) if time allows.     

3. Now, collect the latest news from various news source APIs featuring the named-entities you got from Step 2 (use at least one other API/library other than Twitter's to collect this data).
    
   Before proceeding, store the detected keywords from step 2. in mongodb and fetch them to get related news
   
   - data/news.js - fetches news from the [News api](https://newsapi.org/) based on the keyword.
    
Keywords from Step 2
--------------------



##### Note
config/config.json 
   - Generate your twitter api credentials and add it to config.json
   - Generate your News api apikey and add to confg.json


#### Analysis

1. Perform a Sentiment Analysis on the data collected in Step 1 and 3, and compare the twitter and news sentiments for the common named-entities. 

    Using [Aylien](https://aylien.com) api for sentiment analysis.

2. You should also perform temporal, spatial and content analysis on the collected data, to answer questions such as Who posted the data, What was it about, When was it posted, from Where was it posted etc.


3. Report these results you found in the steps 5 & 6 using graphs. Brownie points for cool interactive visualisations.

#### Application

1. Set up a web application on Heroku or Digital Ocean Droplet with a user interface where we can input a named-entity and get the comparison between the news and twitter sentiments as an output.
    
    The App is an API driven architecture where an api is deployed on a server and the front end is written is React.
    
    API doc:
    
    - POST | /tweet/:keyword | - to fetch top 5 tweets and return their sentiments. 
    - POST | /news/:keyword  | - to fetch top 5 news articles and return their sentiments.
     
    I have used pm2 to monitor the app and restart it in case of failure.

    ##### Deployments
    
    1. API
    2. MongoDB server
    3. Front End
    4. Data Collection and Visualization

2. Put all your code, along with the MongoDB collection, in a GitHub repository and share the link with us. Also, maintain a README.md explaining your codebase and the approach you followed.


Help links:
https://stackoverflow.com/questions/29753618/find-most-repeated-phrase-on-huge-text
Mongodb documentation

https://python-graph-gallery.com