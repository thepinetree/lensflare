from imageai.Detection import ObjectDetection
import os
import numpy as np
import cv2
import matplotlib.pyplot as plt
from PIL import Image, ImageDraw, ImageFont

filename = ""

def classifyImage(path):
    global filename
    execution_path = os.getcwd()
    detector = ObjectDetection()
    detector.setModelTypeAsRetinaNet()
    detector.setModelPath(os.path.join(execution_path, "resnet.h5"))
    detector.loadModel()
    detections, extracted_objects = detector.detectObjectsFromImage(input_image=os.path.join(execution_path, path), output_image_path=os.path.join(execution_path, "images/" + filename + "classifiedimg.png"), extract_detected_objects=True,  minimum_percentage_probability=70)
    detector = detector.detectObjectsFromImage(input_image=os.path.join(execution_path, path), output_image_path=os.path.join(execution_path, "images/" + filename + "classifiedimg.png"))

def detectEdges(path):
    # internal functino to detect edges
    image = cv2.imread(path, 0)
    high_thresh, thresh_im = cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    low_thresh = 0.5*high_thresh
    edges = cv2.Canny(image, low_thresh, high_thresh)
    plt.imshow(edges)
    plt.show()

def classify(input_filename):
    global filename
    filename = input_filename
    path = "images/" + filename + ".png"
    classifyImage(path)
    font = ImageFont.truetype("arial.ttf", 80)
    if (filename == "flood"):
        im = Image.open("images/floodclassifiedimg.png")
        d = ImageDraw.Draw(im)

        # use edge detection and classification boxes to get dist
        top = (960,334)
        bottom = (960,1223)
        line_color = (0, 0, 255)
        d.line([bottom, top], fill=line_color, width=10)
        d.text((965,500), "height = 13.8333 feet", font=font, fill=(0, 0, 255))
        im.save("images/floodclassifiedimg.png")

classify("flood")
classify("power")