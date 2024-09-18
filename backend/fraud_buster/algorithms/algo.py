# all the algorithms are implemented here 
from sklearn.ensemble import IsolationForest
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from hmmlearn import hmm
from sklearn.neighbors import KNeighborsClassifier


def train_isolation_forest(data):
    X_train, X_test = train_test_split(data, test_size=0.2)
    isolation_forest = IsolationForest(contamination=0.01)
    isolation_forest.fit(X_train)
    y_pred = isolation_forest.predict(X_test)
    return y_pred

def train_svm(X_train, y_train, X_test):
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    svm_model = SVC(kernel='linear')
    svm_model.fit(X_train_scaled, y_train)
    y_pred = svm_model.predict(X_test)
    return y_pred

def train_hmm(data, X_test):
    hmm_model = hmm.GaussianHMM(n_components=3)
    hmm_model.fit(data)
    hidden_states = hmm_model.predict(X_test)
    return hidden_states

def train_knn(X_train, y_train, X_test):
    knn = KNeighborsClassifier(n_neighbors=5)
    knn.fit(X_train, y_train)
    y_pred = knn.predict(X_test)
    return y_pred