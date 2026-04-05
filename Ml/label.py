from sklearn.ensemble import RandomForestClassifier

# your collected data
X = [[167,17],[98,17],[227,17],[773,17],[139,17],[66,6],[66,6],[54,6],[251,6],[60,6]]

# create labels
y = [1 if x[0] > 500 else 0 for x in X]

# train model
model = RandomForestClassifier()
model.fit(X, y)

# test prediction
test_packet = [[600,17]]
prediction = model.predict(test_packet)

print("Prediction:", prediction)