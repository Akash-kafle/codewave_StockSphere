import numpy as np  # linear algebra
import pandas as pd  # data processing, CSV file I/O (e.g. pd.read_csv)
import math
from keras._tf_keras.keras.models import load_model
from keras._tf_keras.keras.models import Sequential
from sklearn.preprocessing import MinMaxScaler
import os
from keras._tf_keras.keras.layers import Dense, LSTM
import matplotlib.pyplot as plt

plt.style.use('fivethirtyeight')

data = pd.read_csv('./JBLB.csv')

close_data = data.filter(['c'])
close_dataset = close_data.values
training_data_len = math.ceil(len(close_dataset) * .8)
scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(close_dataset)

model = load_model('FirstPredictionModel.h5')

test_data = scaled_data[training_data_len - 60:, :]
x_test = []
y_test = close_dataset[training_data_len:, :]
for i in range(60, len(test_data)):
    x_test.append(test_data[i - 60:i, 0])

x_test = np.array(x_test)
x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))
predictions = model.predict(x_test)
predictions = scaler.inverse_transform(predictions)
rmse = np.sqrt(np.mean(predictions - y_test) ** 2)

train = data[:training_data_len]
valid = data[training_data_len:]
valid['Predictions'] = predictions

print(valid[0:3])
