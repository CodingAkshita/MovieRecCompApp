# These lines of code are importing necessary libraries for the code to run. Specifically,
# `CountVectorizer` and `cosine_similarity` are imported from the `sklearn` library, which is used for
# machine learning tasks. `pandas` and `numpy` are also imported, which are commonly used libraries
# for data manipulation and analysis in Python.
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np

# `df = pd.read_csv('final.csv')` is reading a CSV file named 'final.csv' and creating a pandas
# DataFrame object called `df` from the data in the file.
df = pd.read_csv('final.csv')

# `df = df[df['soup'].notna()]` is filtering the DataFrame `df` to only include rows where the 'soup'
# column is not null (i.e. not NaN). This is done using the `notna()` method, which returns a Boolean
# mask indicating which values are not null, and then using that mask to filter the DataFrame using
# boolean indexing.
df = df[df['soup'].notna()]

# `count = CountVectorizer(stop_words='english')` is creating an instance of the `CountVectorizer`
# class from the `sklearn` library with the parameter `stop_words` set to `'english'`. This means that
# when the `fit_transform()` method is called on the `count` object later in the code, it will
# tokenize the text data in the 'soup' column of the DataFrame `df` and remove any English stop words
# (common words like 'the', 'and', 'a', etc.) from the resulting bag-of-words representation.
count = CountVectorizer(stop_words='english')


# `count_matrix = count.fit_transform(df['soup'])` is creating a matrix of word counts for the text
# data in the 'soup' column of the DataFrame `df`. The `fit_transform()` method of the
# `CountVectorizer` object `count` is called on the 'soup' column to tokenize the text data and count
# the frequency of each word in the resulting bag-of-words representation. The resulting matrix
# `count_matrix` has one row for each item in the 'soup' column and one column for each unique word in
# the corpus, with each element in the matrix representing the frequency of a particular word in a
# particular item's 'soup' text.
count_matrix = count.fit_transform(df['soup'])

# `cosine_sim = cosine_similarity(count_matrix, count_matrix)` is calculating the cosine similarity
# between each pair of items in the `count_matrix`. The resulting `cosine_sim` matrix has a row and
# column for each item in the `count_matrix`, and each element in the matrix represents the cosine
# similarity between the corresponding pair of items. The cosine similarity is a measure of the
# similarity between two vectors in a high-dimensional space, and is commonly used in natural language
# processing and information retrieval tasks to compare the similarity of documents or text data.
cosine_sim = cosine_similarity(count_matrix, count_matrix)

df = df.reset_index()
indices = pd.Series(df.index, index=df['title'])

def get_recommendations(title):
    idx = indices[title]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]
    movie_indices = [i[0] for i in sim_scores]
    return df[['title', 'poster_link', 'release_date', 'runtime', 'vote_average', 'overview']].iloc[movie_indices].values.tolist()