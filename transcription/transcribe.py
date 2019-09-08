from __future__ import unicode_literals
import io
import os
import sys

# Imports the Google Cloud client library
from google.cloud import speech_v1
from google.cloud.speech_v1 import enums
from google.cloud import storage

import youtube_dl
import wave

download_path = ""

def urlToWAV(video_id):
    """Downloads a file to the bucket."""
    global download_path
    url = "https://www.youtube.com/watch?v="+video_id
    outtmpl = "audio/" + video_id + '.%(ext)s'
    ydl_opts = {
        'outtmpl': outtmpl,
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192',
        }],
    }
    download_path = "audio/" + video_id + ".wav"
    print(download_path)
    with youtube_dl.YoutubeDL(ydl_opts) as ydl: 
        ydl.download([url])

def uploadWav():
    """Uploads a file to the bucket."""
    global download_path
    storage_client = storage.Client()
    bucket = storage_client.get_bucket("lensflare-storage")
    blob = bucket.blob(download_path)
    print(download_path)
    blob.upload_from_filename(download_path)

def wavToSpeech():    
    """Instantiates a client."""
    speech_client = speech_v1.SpeechClient()
    storage_client = storage.Client()
    
    waveobj = wave.open(download_path)
    channelct = waveobj.getnchannels()
    
    config = {
        "audio_channel_count": channelct,
        "language_code": 'en-US'
    }
    audio = {"uri": "gs://lensflare-storage/" + download_path}

    # Detects speech in the audio file
    operation = speech_client.long_running_recognize(config, audio)
    response = operation.result()

    f = open("transcription.txt", "w")
    f.write("")
    f.close()
    for result in response.results:
        f = open("transcription.txt", "a")
        f.write(result.alternatives[0].transcript)
        f.close()
    print("completed write")

def transcribe(video_id):
    urlToWAV(video_id)
    uploadWav()
    wavToSpeech()