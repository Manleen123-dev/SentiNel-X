import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

df = pd.read_csv("KDDTrain+.txt", header=None)

X = df[[0, 1, 4, 5]].copy()
y = df[41]

X.loc[:, 1] = X[1].map({'tcp': 6, 'udp': 17, 'icmp': 1})
y = y.apply(lambda x: 0 if x == "normal" else 1)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

print("Accuracy:", model.score(X_test, y_test))

with open("model.pkl", "wb") as f:
    pickle.dump(model, f)