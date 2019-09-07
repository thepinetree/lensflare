from __future__ import unicode_literals

def urlToWAV(url):
    import youtube_dl

    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192',
        }],
    }
    with youtube_dl.YoutubeDL(ydl_opts) as ydl: 
        ydl.download([url])

def uploadFile(file):
    # Imports the Google Cloud client library
    from google.cloud import storage

    # Instantiates a client
    storage_client = storage.Client()

    # The name for the new bucket
    bucket_name = 'fileclient'

    # Creates the new bucket
    bucket = storage_client.create_bucket(bucket_name)

    print('Bucket {} created.'.format(bucket.name))

def wavToSpeech(file):    
    import io
    import os

    # Imports the Google Cloud client library
    from google.cloud import speech
    from google.cloud.speech import enums
    from google.cloud.speech import types

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
        f.write('Transcript: {}'.format(result.alternatives[0].transcript))
        f.close


wavToSpeech("audio/InventHelp’s National TV Ad Featuring George Foreman (30 sec)-L9hRsCaKC3s.wav")