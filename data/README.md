
## Data Collection

### Pre-requisites:

- To run the code install nodejs lts version and python 3. 

- Sign up on [Twitter Dev Platform](https://developer.twitter.com) to get your own:
    - consumer key
    - consumer secret
    - access token key
    - access token secret

- Sign up for an account on [News api](https://newsapi.org/) to get your own:
    - apikey
    
- Spin up an EC2 server (if using AWS) and setup Mongodb community edition on that server. I am using an Ubuntu 16.04 server.
  - [Follow these instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
  - Enable authorization on the mongodb server and change bind ip to 0.0.0.0 to make it accessible form anywhere. 
  - Once the setup is done, you will have a:
    - host
    - port (default: 27017)
    - username  
    - password
    
- Replace the "xxxxxxxxxxx" with credentials obtained in above steps in config/config.format.json and rename it to config.json.

#### 1. Collect a random sample of 10K tweets using the Twitter API and store them in a MongoDB instance.
    
   - Run data/tweets.js file to fetch tweets and store it in Mongodb - Uses [twitter streaming api](https://developer.twitter.com/en/docs/tweets/sample-realtime/overview/GET_statuse_sample) to collect tweets.
    
#### 2. From these collected tweets, parse the 5 most frequently occurring named-entities (can be a name, person, location, product etc.).

   - Uncomment the following line in the code and insert your mongodb username:password in the file.
   ```python
   client = MongoClient('mongodb://<username>:<password>@52.41.194.58:27017/application-task')
   ```
   - Run data/getKeyword.py - Uses nltk and pymongo with Python to extract top 10 named-entities. Collects all the tweets, forms a bag of words by traversing through the text filtering out the singular proper nouns (NNP) and plural proper nouns (NNPS). Finally, counts the appearance of each word.
   - NLTK's word datasets used: punkt and averaged_perceptron_tagger
   - Write those keywords back to mongodb. 
      

#### 3. Now, collect the latest news from various news source APIs featuring the named-entities you got from Step 2 (use at least one other API/library other than Twitter's to collect this data).
       
   - Run data/news.js - Fetch the keywords from mongodb. Iterate through the keywords to fetch top 20 news articles from the [News api](https://newsapi.org/) based on the keyword using [Everything api](https://newsapi.org/docs/endpoints/everything) and write them back to mongodb.
    
#### db_collections
   - The directory contains all the mongodb collections (data collected in above steps) exported in csv and json formats.