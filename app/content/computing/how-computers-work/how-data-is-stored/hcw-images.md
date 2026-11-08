---
id: hcw-images
pack: How Computers Work · How data is stored
title: How pictures become numbers
minutes: 40
source: David J. Malan · Harvard CS50's Understanding Technology · Multimedia
url: https://cs50.harvard.edu/technology/weeks/3/
courses: Helps with COS 101, CSC 101
video: https://cdn.cs50.net/cscie1a/2017/fall/lectures/multimedia/multimedia-360p.mp4
credit: Harvard CS50 · David J. Malan
start: 303.9
end: 610.5
python: yes
---
# Goal
Explain how an image is stored as pixels and colour values, calculate an uncompressed image's size, tell bitmap from vector images, and say why zooming in can't add real detail.

# Why
Images make up much of what you store, send and pay data for. Knowing how they work lets you choose formats and sizes properly, and judge claims about "enhanced" photos. Later this feeds into digital forensics, where image metadata can reveal when and where a photo was taken, and into machine learning, where an image is just numbers to a program.

# Lesson
## A picture is a grid
> Clip: David Malan builds up from a black-and-white smiley made of single bits to full colour using red, green and blue bytes. This lesson adds calculations, formats and metadata.

A **bitmap image**, also called a **raster image**, is a rectangular grid of tiny dots called **pixels**. Each pixel has one colour, stored as bits. Look very closely at a screen, and you may see them.

The simplest image uses one bit per pixel: 1 for black, 0 for white, or the other way round.

```text
0 0 1 1 1 1 0 0
0 1 0 0 0 0 1 0
1 0 1 0 0 1 0 1
1 0 0 0 0 0 0 1
1 0 1 0 0 1 0 1
1 0 0 1 1 0 0 1
0 1 0 0 0 0 1 0
0 0 1 1 1 1 0 0
```

If you squint, that's a smiley face. A file holding these bits, plus some information about its width and height, is a real image.

```python
rows = ["00111100", "01000010", "10100101", "10000001", "10100101", "10011001", "01000010", "00111100"]
for row in rows:
    print(row.replace("1", "#").replace("0", " "))
```

```output
  ####  
 #    # 
# #  # #
#      #
# #  # #
#  ##  #
 #    # 
  ####  
```

## Colour: mixing light
Screens make colours by mixing **red, green and blue** light, or **RGB**. Using one byte for each gives 256 levels of each colour, which is 24 bits per pixel.

| Red | Green | Blue | Hex | Colour |
| --- | --- | --- | --- | --- |
| 255 | 0 | 0 | `#FF0000` | Red |
| 0 | 255 | 0 | `#00FF00` | Green |
| 0 | 0 | 255 | `#0000FF` | Blue |
| 255 | 255 | 0 | `#FFFF00` | Yellow |
| 255 | 255 | 255 | `#FFFFFF` | White |
| 0 | 0 | 0 | `#000000` | Black |
| 128 | 128 | 128 | `#808080` | Grey |

Mixing light isn't like mixing paint: red and green light make yellow, and all three at full make white. And 24 bits gives 2^24, which is 16,777,216 possible colours.

**Bit depth** or **colour depth** is the number of bits per pixel. **Transparency** is often stored as a fourth byte, called the **alpha channel**.

?? What colour would red 255, green 0, blue 255 give?
=> Magenta, a bright pinkish purple, from red and blue light with no green.

## Resolution and size
**Resolution** is the number of pixels across and down. A "1080p" image is 1920 x 1080 pixels.

```text
uncompressed size in bytes = width x height x bytes per pixel
```

### Worked example
A 1920 x 1080 image at 24 bits, which is 3 bytes, per pixel:

1. Pixels: 1920 x 1080 = 2,073,600.
2. Bytes: 2,073,600 x 3 = 6,220,800.
3. That's about 6.2 MB.

A 12-megapixel phone photo has 12 million pixels, and at 3 bytes each that's 36 MB uncompressed. Yet the file on your phone may be only a few MB. That's **compression**, the subject of a later lesson.

```python
def image_bytes(width, height, bytes_per_pixel=3):
    return width * height * bytes_per_pixel

print(image_bytes(1920, 1080))
print(image_bytes(4000, 3000) / 1_000_000)
```

```output
6220800
36.0
```

> Mistake: Thinking that more megapixels always means a better photo. Sensor size, lens and light often matter more. A small file sent via a messaging app has usually been heavily compressed too, so it may have lost detail.

## You can't add detail that isn't there
Zoom in far enough and you see squares. The information between those pixels was never recorded. Films show detectives pressing "enhance" to read a number plate from a blurry photo, and the lecture even shows clips of this. Real software can only guess or sharpen what's there. Modern AI can make a blurry image look sharp, but it's **inventing** plausible detail, and that isn't evidence of what was actually there.

That matters a great deal in investigations: an AI-enhanced face can look convincing, and it may be wrong.

## Bitmap and vector
Not all images are grids.

| | Bitmap | Vector |
| --- | --- | --- |
| Stores | A colour for every pixel | Shapes described by maths: "a circle here, this size" |
| When enlarged | Gets blocky | Stays sharp at any size |
| Best for | Photographs | Logos, diagrams, icons |
| Formats | JPEG, PNG, GIF, BMP | SVG, and PDF can contain vectors |

## Metadata in images
Image files hold more than pixels. **EXIF** metadata can include the camera, the date and time, and even the GPS location where a photo was taken.

> Safety: A photo posted online may reveal where you live, if its location data stays in the file. Many large sites remove it, but not all do, and files sent as documents often keep it. Turn off location for your camera if you don't need it. For your faceless channel, this matters a lot: check your images before you post them.

In forensics, the same metadata is useful evidence, though it can be edited, so it isn't proof by itself.

# Exercises
?? A black-and-white image at 1 bit per pixel is 800 x 600. How many bytes uncompressed?
=> 800 x 600 = 480,000 bits. Divide by 8, and you get 60,000 bytes.

?? A 1000 x 1000 colour image at 3 bytes per pixel. How big is it uncompressed?
=> 3,000,000 bytes, which is 3 MB.

?? You need a logo that will look sharp both on a business card and on a banner. Bitmap or vector?
=> Vector, because it scales without getting blocky.

?? Double an image's width and height. What happens to the number of pixels?
=> It's multiplied by 4, since both dimensions double.

# Practice
1. On squared paper, draw an 8 by 8 black-and-white picture of your own. Write it out as rows of 0s and 1s.
2. In the Python box, replace the rows with yours, and press **Run Python** to see it. Change one bit to see what happens.
3. Complete `image_bytes` and `shrink_size`, and press **Test my code**.
4. Find a real photo on this laptop. Right-click it, and open **Properties**, then **Details**. Note its dimensions and file size, and whether it has any location data. Work out its uncompressed size at 3 bytes per pixel, and compare it to the actual file size. Leave out private details.

# Starter
```python
def image_bytes(width, height, bytes_per_pixel=3):
    # Return the uncompressed size in bytes
    return 0

def shrink_size(width, height, factor):
    # Return the new (width, height) when both are divided by factor.
    # Use // so that the results are whole numbers
    return (0, 0)

rows = ["00111100", "01000010", "10100101", "10000001", "10100101", "10011001", "01000010", "00111100"]
for row in rows:
    print(row.replace("1", "#").replace("0", " "))
print(image_bytes(1920, 1080))
```

# Tests
```python
assert image_bytes(1920, 1080) == 6220800, "1920 x 1080 at 3 bytes should be 6220800"
assert image_bytes(800, 600, 1) == 480000, "800 x 600 at 1 byte should be 480000"
assert image_bytes(0, 100) == 0, "an image with no width has no size"
assert shrink_size(1920, 1080, 2) == (960, 540), "half of 1920 x 1080 is 960 x 540"
assert shrink_size(101, 51, 2) == (50, 25), "use whole numbers, rounding down"
```

# Solution
```python
def image_bytes(width, height, bytes_per_pixel=3):
    return width * height * bytes_per_pixel

def shrink_size(width, height, factor):
    return (width // factor, height // factor)
```

# Rubric
- I drew my own picture in bits, and saw it run.
- I compared a real photo's real size with its calculated size.
- My code passes the tests.

# Summary
- A bitmap image is a grid of pixels, and each pixel's colour is stored as bits.
- RGB uses one byte per colour, so 24 bits give about 16.7 million colours.
- Uncompressed size is width x height x bytes per pixel.
- You can't recover detail that wasn't recorded. AI "enhancing" invents it.
- Vector images scale perfectly. Photos can carry location metadata, so check before posting.

# Check
Q: What is a pixel?
* One dot of colour in a grid
- The file format used to save a photograph
- One bit stored on a hard disk's platter
= An image is a rectangular grid of pixels.

Q: How many bits per pixel does standard RGB use?
A: 24 | 24 bits
= One byte for each of three colours is 24 bits.

Q: Which colour is `#FFFFFF`?
- Black
* White
- Red
= All three colours at full make white light.

Q: What's the uncompressed size of a 100 x 100 image at 3 bytes per pixel, in bytes?
A: 30000 | 30,000
= 100 x 100 x 3 = 30,000.

Q: How many bytes does an 80 x 80 image at 1 bit per pixel need?
A: 800
= 6,400 bits divided by 8 is 800 bytes.

Q: You double an image's width and height. By what factor do its pixels grow?
A: 4 | four
= Both dimensions double, and 2 x 2 = 4.

Q: Which format suits a logo that must scale to any size?
- A JPEG photograph, saved at the highest quality
* A vector format such as SVG
- A bitmap format such as BMP, at a large size
= Vector images are maths, so they stay sharp at any size.

Q: What's EXIF?
- A way of compressing images to make them smaller
* Metadata such as a photo's date and place
- A kind of pixel that is used in the newest screens
= It can reveal when and where a photo was taken.

Q[transfer]: Police have a tiny blurry image of a number plate, and an AI tool produces a clear one. How much should it be trusted?
- Fully, since a computer doesn't make any mistakes with images
* Not as evidence, since it may have invented details
- Fully, as long as the output image has a very high resolution
= Detail that wasn't recorded can't be recovered, only guessed.

Q[transfer]: You plan to post photos on your faceless channel. Which step protects your privacy most directly?
* Removing location metadata from each photo before posting
- Making each photo as large as it can possibly be first
- Saving each photo in a vector format before you post
= Location metadata can reveal where you live, and that defeats the point of being faceless.

Q[transfer]: A machine learning program is given a photo. What does it actually receive?
- The meaning of the picture, such as "a cat on a chair"
* A grid of numbers, one or more for each pixel
- A written description that was added by the camera
= To a program an image is just numbers. Everything else must be worked out from them.

# Cards
What's a bitmap image? :: A rectangular grid of pixels, each with a colour stored as bits.
How do you work out an uncompressed image's size? :: Width x height x bytes per pixel.
How many colours does 24-bit RGB allow? :: 2^24, about 16.7 million.
What's the difference between bitmap and vector? :: Bitmap stores pixels. Vector stores shapes as maths, and scales without blurring.
What can EXIF metadata reveal? :: The camera, date and time, and often the location of a photo.
Why can't "enhance" recover a blurry face? :: The detail was never recorded. Software can only guess.

# Further
- Harvard CS50's Understanding Technology, Multimedia :: https://cs50.harvard.edu/technology/weeks/3/
