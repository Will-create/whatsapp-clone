from PIL import Image
image = Image.open('sonny.jpg')
new = image.resize((584,350))
#print('new',new.size)
new.save('sonny2.jpg')
new.show()
