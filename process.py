import sys
import json

def main():
    video_url = sys.argv[1] if len(sys.argv) > 1 else 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    # transcription = transcribe(video_url)

    with open('videos.json', 'r') as f:
        urlToTypes = json.load(f)
        video_types = urlToTypes[video_url]

    print(video_types)

if __name__ == '__main__':
    main()