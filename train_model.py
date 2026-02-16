import cv2
import os
import numpy as np

dataset_path = "dataset"

recognizer = cv2.face.LBPHFaceRecognizer_create()

faces = []
labels = []
label_map = {}
current_id = 0

for person_name in os.listdir(dataset_path):
    person_path = os.path.join(dataset_path, person_name)
    
    if not os.path.isdir(person_path):
        continue

    label_map[current_id] = person_name

    for image_name in os.listdir(person_path):
        image_path = os.path.join(person_path, image_name)
        img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

        faces.append(img)
        labels.append(current_id)

    current_id += 1

recognizer.train(faces, np.array(labels))
recognizer.save("trainer.yml")

np.save("labels.npy", label_map)

print("Model trained successfully!")
