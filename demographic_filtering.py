import pandas as pd
import numpy as np
#     """
#     The function calculates a weighted rating for movies based on their vote count and average rating,
#     and returns the top 20 movies with the highest scores along with their relevant information.
    
#     :param x: x is a parameter in the function weighted_rating. It represents a row of data in the
#     pandas DataFrame that is being processed by the apply() method. The function uses the values in this
#     row to calculate a weighted rating score
#     :param m: The minimum number of votes required to be considered for the top movies list. It is
#     calculated as the 90th percentile of the vote count column
#     :param C: The mean vote average of all the movies in the dataset
#     :return: The code is returning a list of information about the top 20 movies based on a weighted
#     rating score calculated using the movie's vote count and average rating. The information includes
#     the movie's title, poster link, release date, runtime, vote average, and overview.
#     """


df = pd.read_csv('final.csv')

C = df['vote_average'].mean()
m = df['vote_count'].quantile(0.9)
q_movies = df.copy().loc[df['vote_count'] >= m]

def weighted_rating(x, m=m, C=C):
    v = x['vote_count']
    R = x['vote_average']
    return (v/(v+m) * R) + (m/(m+v) * C)

q_movies['score'] = q_movies.apply(weighted_rating, axis=1)

q_movies = q_movies.sort_values('score', ascending=False)

output = q_movies[['title', 'poster_link', 'release_date', 'runtime', 'vote_average', 'overview']].head(20).values.tolist()

