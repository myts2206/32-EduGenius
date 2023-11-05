import os
from googletrans import Translator
from gtts import gTTS
from moviepy.editor import VideoFileClip, TextClip
import moviepy.editor as mp
import speech_recognition as sr

# Replace with the path to your input video
input_video_path = "D:\\video translation\\video.mp4"

# Step 1: Extract audio from the video
video = mp.VideoFileClip(input_video_path)
audio = video.audio
audio_path = 'output_audio.wav'  # Output audio file
audio.write_audiofile(audio_path)

# Step 2: Transcribe the entire audio to text
recognizer = sr.Recognizer()

with sr.AudioFile(audio_path) as source:
    audio_data = recognizer.record(source)
    transcribed_text = recognizer.recognize_google(audio_data)

# Step 3: Translate the transcribed text to Hindi
translator = Translator()
translated_text = translator.translate(transcribed_text, src='en', dest='hi').text

# Print the transcribed and translated text
print("Transcribed Text (English):", transcribed_text)
print("Translated Text (Hindi):", translated_text)

# Step 4 (Optional): Convert translated text to Hindi audio
hindi_audio = gTTS(text=translated_text, lang='hi')
hindi_audio_path = 'translated_audio.mp3'
hindi_audio.save(hindi_audio_path)

# Step 5 (Optional): Merge translated audio with the original video
video = VideoFileClip(input_video_path)
translated_audio = mp.AudioFileClip(hindi_audio_path)  # Corrected import
video = video.set_audio(translated_audio)
translated_video_path = 'translated_video.mp4'
video.write_videofile(translated_video_path, audio_codec='aac')

# Clean up temporary audio and audio file (optional)
os.remove(audio_path)
os.remove(hindi_audio_path)
