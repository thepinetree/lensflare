from __future__ import unicode_literals
import io
import os

<<<<<<< HEAD
def urlToWAV(video_id):
    import youtube_dl
    url = 'https://www.youtube.com/watch?v=' + video_id
=======
# Imports the Google Cloud client library
from google.cloud import speech_v1
from google.cloud.speech_v1 import enums
from google.cloud import storage

import youtube_dl
>>>>>>> d46da5beb8766aebc5177e36811f0b05bcd93865

def urlToWAV(url):
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192',
            'outtmpl': 'audio/' + video_id,
        }],
    }
    with youtube_dl.YoutubeDL(ydl_opts) as ydl: 
        ydl.download([url])

def upload_blob(source_file_name):
    """Uploads a file to the bucket."""
    storage_client = storage.Client()
    bucket = storage_client.get_bucket("lensflare-storage")
    blob = bucket.blob("audio.wav")

    blob.upload_from_filename(source_file_name)

    print('File {} uploaded to {}.'.format(
        source_file_name,
        "audio.wav"))

def wavToSpeech(url):    
    # Instantiates a client
    speech_client = speech_v1.SpeechClient()
    storage_client = storage.Client()
    
    config = {
        "audio_channel_count": 2,
        "language_code": 'en-US'
    }
    audio = {"uri": "gs://lensflare-storage/audio.wav"}

    # Detects speech in the audio file
    operation = speech_client.long_running_recognize(config, audio)
    response = operation.result()

    for result in response.results:
        f = open("transcription.txt", "a")
        f.write('Transcript: {}'.format(result.alternatives[0].transcript))
        f.close

wavToSpeech("..")


def wavToSpeech(file):    
    # Instantiates a client
    client = speech.SpeechClient()

    # The name of the audio file to transcribe
    file_name = file

    # Loads the audio into memory
    with io.open(file_name, 'rb') as audio_file:
        content = audio_file.read()
        audio = types.RecognitionAudio(content=content)

    config = types.RecognitionConfig(
        audio_channel_count=2,
        language_code='en-US')

    # Detects speech in the audio file
    response = client.recognize(config, audio)

    for result in response.results:
        f = open("transcription.txt", "w")
        f.write(result.alternatives[0].transcript)
        f.close