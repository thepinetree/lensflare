from __future__ import print_function
import time
import boto3
transcribe = boto3.client('transcribe')
job_name = "honey"
job_uri = "https://honey1298.s3.amazonaws.com/InventHelps+National+TV+Ad+Featuring+George+Foreman+(30+sec).mp4"
transcribe.start_transcription_job(
    TranscriptionJobName=job_name,
    Media={'MediaFileUri': job_uri},
    MediaFormat='mp4',
    LanguageCode='en-US'
)

while True:
    status = transcribe.get_transcription_job(TranscriptionJobName=job_name)
    if status['TranscriptionJob']['TranscriptionJobStatus'] in ['COMPLETED', 'FAILED']:
        break
    print("Not ready yet...")
    time.sleep(5)
print(status)