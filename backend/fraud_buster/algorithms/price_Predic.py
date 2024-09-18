import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import math
from keras.models import Sequential
from sklearn.preprocessing import MinMaxScaler
import os
from keras.layers import Dense,LSTM
for dirname, _, filenames in os.walk('/kaggle/input'):
    for filename in filenames:
        print(os.path.join(dirname, filename))
import matplotlib.pyplot as plt
plt.style.use('fivethirtyeight')

data=pd.read_csv('/kaggle/input/jblb-nepse/JBLB.csv')

close_data = data.filter(['c'])
close_dataset = close_data.values
training_data_len = math.ceil(len(close_dataset)*.8)
scaler = MinMaxScaler(feature_range = (0,1))
scaled_data = scaler.fit_transform(close_dataset) 

training_data = scaled_data[0:training_data_len,:]
x_train=[]
y_train=[]
for i in range(60, len(training_data)):
    x_train.append(training_data[i-60:i, 0])
    y_train.append(training_data[i, 0])
    if i <= 60:
        print(x_train)
        print(y_train)
        print()

x_train,y_train = np.array(x_train), np.array(y_train)
x_train= np.reshape(x_train,(x_train.shape[0],x_train.shape[1],1))

model = Sequential()
model.add(LSTM(50, return_sequences=True, input_shape=(x_train.shape[1], 1)))
model.add(LSTM(50, return_sequences=False))
model.add(Dense(25))
model.add(Dense(1))

model.compile(optimizer='adam',loss='mean_squared_error')
model.fit(x_train,y_train, batch_size = 1, epochs = 20)

test_data = scaled_data[training_data_len-60:,:]
x_test = []
y_test = close_dataset[training_data_len:,:]
for i in range(60,len(test_data)):
    x_test.append(test_data[i-60:i,0])
    
x_test = np.array(x_test)
x_test = np.reshape(x_test,(x_test.shape[0],x_test.shape[1],1))
predictions = model.predict(x_test)
predictions = scaler.inverse_transform(predictions)
rmse=np.sqrt(np.mean(predictions-y_test)**2)

train = data[:training_data_len]
valid = data[training_data_len:]
valid['Predictions'] = predictions
plt.figure(figsize=(16,8))
plt.title('Model')
plt.xlabel('Date',fontsize=18)
plt.ylabel('Close')
plt.plot(train['c'])
plt.plot(valid[['c','Predictions']])
plt.legend(['Train','Val','Predictions'],loc='lower right')
plt.show()

print(valid[0:3])
model.save('FirstPredictionModel.h5')