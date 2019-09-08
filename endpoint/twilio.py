def twilio(file):
    with open(file) as f:
        text = f.read()

    for word in text.split(' '):
        if word.isnumeric() and len(word) == 10:
            return 'twilio:' + word

if __name__ == '__main__':
    print("Analyzing L9hRsCaKC3s...")
    print(twilio('transcription/L9hRsCaKC3s.txt'))