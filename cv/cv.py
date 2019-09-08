from imageai.Detection import ObjectDetection
import os
import numpy as np
import cv2
import matplotlib.pyplot as plt


def classifyImage(path):
    execution_path = os.getcwd()

    detector = ObjectDetection()
    detector.setModelTypeAsRetinaNet()
    detector.setModelPath(os.path.join(execution_path, "resnet.h5"))
    detector.loadModel()
    detector = detector.detectObjectsFromImage(input_image=os.path.join(execution_path, path), output_image_path=os.path.join(execution_path, "images/classifiedimg.jpg"))

def detectEdges(path):
    image = cv2.imread(path, 0)

    high_thresh, thresh_im = cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    low_thresh = 0.5*high_thresh

    edges = cv2.Canny(image, low_thresh, high_thresh)

    plt.imshow(edges)
    plt.show()

classifyImage("images/flood.png")