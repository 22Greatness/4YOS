---
id: hcw-sound-video
pack: How Computers Work · How data is stored
title: How sound and video become numbers
minutes: 40
source: David J. Malan · Harvard CS50's Understanding Technology · Multimedia
url: https://cs50.harvard.edu/technology/weeks/3/
courses: Helps with COS 101, CSC 101
video: https://cdn.cs50.net/cscie1a/2017/fall/lectures/multimedia/multimedia-360p.mp4
credit: Harvard CS50 · David J. Malan
start: 1821
end: 2203
python: yes
---
# Goal
Explain how sound is sampled and how video is built from frames, calculate raw sizes for both, and tell a container format from a codec.

# Why
Sound and video are what eat your data and your storage. These calculations tell you what a lecture download really costs before you start it. They also explain why a file sometimes won't play, and they're useful for your channel, where you'll choose formats and quality every week.

# Lesson
## Sound is a wave, measured many times a second
> Clip: This segment explains video: flip-book frames, keyframes that save space, and containers that hold video and audio tracks together. Sound sampling is taught here in writing.

Sound is air pressure rising and falling as a wave. A microphone turns that into a changing electrical signal. To store it, a computer measures the signal many times a second. Each measurement is a **sample**, and each sample is stored as a number.

| Term | Meaning | Common value |
| --- | --- | --- |
| **Sample rate** | Measurements per second, in hertz (Hz) | 44,100 Hz for CD audio |
| **Bit depth** | Bits used for each sample | 16 bits |
| **Channels** | Separate tracks | 2 for stereo |

Higher values give better quality and larger files. People hear up to about 20,000 Hz at most, and a sample rate must be at least twice the highest frequency you want to capture. That's why 44,100 Hz is enough for music, and why voice calls can sound fine with far less.

```text
raw audio bytes per second = sample rate x (bit depth / 8) x channels
```

### Worked example: one minute of CD audio
1. Per second: 44,100 x 2 bytes x 2 channels = 176,400 bytes.
2. Per minute: 176,400 x 60 = 10,584,000 bytes, about 10.6 MB.

```python
def audio_bytes(seconds, rate=44100, bits=16, channels=2):
    return seconds * rate * (bits // 8) * channels

print(audio_bytes(1))
print(audio_bytes(60))
```

```output
176400
10584000
```

An MP3 of that minute might be around 1 MB, thanks to compression.

?? A voice note is recorded at 8,000 Hz, 8 bits, in mono. How many bytes does each second take, raw?
=> 8,000 x 1 x 1 = 8,000 bytes a second.

**MIDI** is different, and the lecture mentions it too. It stores instructions such as "play this note now", not the sound itself, so its files are tiny, and they can sound different on different devices.

## Video is a fast flip book
A video is a series of still images called **frames**, shown fast enough that your brain sees motion, just like a flip book. The speed is the **frame rate**, in frames per second (fps). Films are usually 24 fps, and much online video is 30.

```text
raw video bytes per second = width x height x bytes per pixel x frames per second
```

### Worked example: why video must be compressed
One second of 1920 x 1080 at 3 bytes per pixel and 30 fps:

1. One frame: 1920 x 1080 x 3 = 6,220,800 bytes.
2. One second: 6,220,800 x 30 = 186,624,000 bytes, about 187 MB.
3. One hour: about 672 GB.

A real one-hour film at that size is often about 1 to 4 GB, which is over a hundred times smaller.

## How video saves space
Most frames look almost the same as the one before. So instead of storing every frame fully, video stores a complete **keyframe** now and then, and between them only what changed. In a lecture, the wall doesn't move, so very little changes.

This is why a person talking takes much less data than a football match, and why fast scenes can go blocky on a slow connection. Quality is often described by **bitrate**, the bits used per second of video. To estimate size:

```text
size in bytes = bitrate in bits per second x seconds / 8
```

A 2 Mbps video for 10 minutes: 2,000,000 x 600 / 8 = 150,000,000 bytes, which is 150 MB.

## Containers and codecs
These two are commonly confused.

| Word | What it is | Examples |
| --- | --- | --- |
| **Codec** | The method for compressing and decompressing the media | H.264, H.265, AAC, MP3 |
| **Container** | The file that holds the video, audio and captions together | MP4, MKV, AVI, MOV |

Think of a container as a box and the codecs as how each thing inside is packed. So two `.mp4` files can use different codecs, and one might not play on an older device even though the extension is the same.

> Mistake: Renaming `film.mkv` to `film.mp4` to make it play. This changes the label, not the contents. You need a program that actually converts it.

> Safety: Be wary of a site saying that you must install a "codec pack" to watch a video. That's an old trick for delivering malware. A trusted player such as VLC already handles most formats.

## 3D and beyond
Newer formats store more than flat frames, such as video covering a full 360 degrees or depth information. The principle is the same: everything is numbers in an agreed format.

# Exercises
?? How many bytes does 10 seconds of raw audio take at 44,100 Hz, 16 bits, mono?
=> 44,100 x 2 x 1 x 10 = 882,000 bytes.

?? A lesson video lasts 20 minutes at 1 Mbps. How many MB will it use?
=> 1,000,000 x 1,200 / 8 = 150,000,000 bytes, so 150 MB.

?? Why does a lecture use less data than a football match at the same quality?
=> Little changes between frames in a lecture, so compression saves much more.

?? Two `.mp4` files: one plays, and the other doesn't. What might explain it?
=> They may use different codecs. The container is the same, but what's inside differs.

# Practice
1. Find a real video on this laptop. Open **Properties**, then **Details**. Note its length, frame size, frame rate, bitrate and file size. If you have no video, use a real audio file or a voice note, and say so.
2. Calculate its raw size from those numbers. How many times smaller is the real file?
3. Check the file size against bitrate x seconds / 8. Is it close? Explain any gap.
4. Work out what an hour of this quality costs in data, and what that means on your own data plan.
5. Complete the functions in the editor, and press **Test my code**.

# Starter
```python
def audio_bytes(seconds, rate, bits, channels):
    # rate x (bits / 8) x channels, for every second
    return 0

def video_mb(bitrate_mbps, minutes):
    # Return the size in megabytes.
    # Megabits per second x seconds gives megabits. Divide by 8 for megabytes
    return 0

print(audio_bytes(60, 44100, 16, 2))
print(video_mb(2, 10))
```

# Tests
```python
assert audio_bytes(1, 44100, 16, 2) == 176400, "one second of CD audio is 176400 bytes"
assert audio_bytes(10, 8000, 8, 1) == 80000, "10 seconds at 8000 Hz, 8 bits, mono is 80000 bytes"
assert audio_bytes(0, 44100, 16, 2) == 0, "no time means no bytes"
assert video_mb(2, 10) == 150, "2 Mbps for 10 minutes is 150 MB"
assert video_mb(1, 20) == 150, "1 Mbps for 20 minutes is 150 MB"
```

# Solution
```python
def audio_bytes(seconds, rate, bits, channels):
    return seconds * rate * (bits // 8) * channels

def video_mb(bitrate_mbps, minutes):
    return bitrate_mbps * minutes * 60 / 8
```

# Rubric
- I used a real file's real details.
- I compared its raw size with its actual size.
- My code passes the tests.

# Summary
- Sound is stored as samples. Sample rate, bit depth and channels set its size.
- Video is a series of frames, and raw video is enormous.
- Keyframes and storing only changes save most of the space.
- File size is roughly bitrate x seconds / 8.
- A codec packs the media, and a container holds it. Renaming doesn't convert anything.

# Check
Q: What is a sample in digital audio?
* One measurement of the sound at a moment in time
- One complete song that's stored inside of a file
- One speaker that's connected to the computer
= The sound is measured many times a second, and each measurement is stored.

Q: How many bytes per second is raw audio at 44,100 Hz, 16 bits, in mono?
A: 88200 | 88,200
= 44,100 x 2 bytes x 1 channel.

Q: What is a frame rate?
- How many colours are in each of a video's images
* How many images are shown per second
- How many bytes a video uses in each second
= Films commonly use 24 frames per second.

Q: Why does video store keyframes and changes instead of every full frame?
- It makes the colours in the video look much brighter
* Most frames barely differ, so this saves a lot of space
- Screens can't show more than one full image a second
= Only what changed gets stored between keyframes.

Q: A video runs at 4 Mbps for 5 minutes. How many MB?
A: 150 | 150 mb
= 4 x 300 / 8 = 150.

Q: Which of these is a container?
- H.264
- AAC
* MP4
= H.264 and AAC are codecs. MP4 is the box that holds them.

Q: What's MIDI?
* Instructions about which notes to play, not recorded sound
- A very high-quality recording of a full orchestra
- A container format that's used for 3D video files
= That's why MIDI files are tiny, and sound different across devices.

Q: Why might one `.mp4` play on a device and another not?
- One of the files must have been infected by a virus
* They may use different codecs inside the same container
- MP4 files only play on the laptop that created them
= The extension names the box, not how the contents are packed.

Q[transfer]: You're choosing a download of a 60-minute lecture. The options are 1 Mbps and 4 Mbps. How much data does the smaller one save?
- About 45 MB
* About 1,350 MB
- About 4,000 MB
= 1 Mbps is 450 MB and 4 Mbps is 1,800 MB, so the gap is 1,350 MB.

Q[transfer]: A site says you must install its "video codec pack" to watch a clip. What should you do?
* Leave. Use a trusted player, as this is a common malware trick
- Install it, since your computer clearly doesn't have that codec
- Install it, and then run a scan a few days later to be sure
= Fake codec packs are an old way of delivering malware.

Q[transfer]: For your channel, you record narration. Doubling the sample rate and keeping everything else the same does what to the raw size?
- It stays the same
* It doubles
- It goes up four times
= Raw size is proportional to the sample rate.

# Cards
What three things set raw audio's size? :: Sample rate, bit depth and number of channels.
How big is raw video per second? :: Width x height x bytes per pixel x frames per second.
What's a keyframe? :: A fully stored frame. Frames between keyframes store only what changed.
How do you estimate a video's size? :: Bitrate in bits per second x seconds, divided by 8.
What's the difference between a codec and a container? :: A codec compresses the media. A container is the file holding the tracks.

# Further
- Harvard CS50's Understanding Technology, Multimedia :: https://cs50.harvard.edu/technology/weeks/3/
