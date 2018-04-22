from pymongo import MongoClient
from collections import Counter
import re
import nltk

#nltk.download('punkt')
#nltk.download('averaged_perceptron_tagger')

client = MongoClient()

#client = MongoClient('mongodb://<user>:<pass>@52.41.194.58:27017/application-task')

db = client['application-task']
collection = db.tweets

def clean_text(text):
    text = text.lower()
    text = re.sub(r"i'm", "i am", text)
    text = re.sub(r"he's", "he is", text)
    text = re.sub(r"she's", "she is", text)
    text = re.sub(r"that's", "that is", text)
    text = re.sub(r"what's", "what is", text)
    text = re.sub(r"where's", "where is", text)
    text = re.sub(r"how's", "how is", text)
    text = re.sub(r"\'ll", " will", text)
    text = re.sub(r"\'ve", " have", text)
    text = re.sub(r"\'re", " are", text)
    text = re.sub(r"\'d", " would", text)
    text = re.sub(r"n't", " not", text)
    text = re.sub(r"won't", "will not", text)
    text = re.sub(r"can't", "cannot", text)
    text = re.sub(r"[^\w]", " ", text)
    return text

text = ""
for item in collection.find():
	text += (ascii(item['text']))

tokens = nltk.word_tokenize(text)
tagged = nltk.pos_tag(tokens)

named_entities = Counter()

for k,v in enumerate(tagged):
	if v[1] == "NNP" or v[1] == "NNPS":
		named_entities[v[0]] += 1

print ("The top")		
# print (named_entities.most_common(10))

keywords = db.keywords
for i in named_entities.most_common(10):
	print (i[0])
	keywords.insert_one({
		"keyword": i[0]
		})




