import cv2
import os
from datetime import datetime

# Folder create for saving entries
if not os.path.exists("entries"):
    os.makedirs("entries")

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

cap = cv2.VideoCapture(0)

saved = False  # so photo saves only once

while True:
    ret, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.3,
        minNeighbors=5
    )

    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

        if not saved:
            now = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
            filename = f"entries/entry_{now}.jpg"
            cv2.imwrite(filename, frame)
            print("Entry Saved:", filename)
            saved = True

    cv2.imshow("Hostel Entry System", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()