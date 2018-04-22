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




