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