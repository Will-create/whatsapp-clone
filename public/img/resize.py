from PIL import Image
image = Image.open('sank_business.jpg')
new = image.resize((584,350))
#print('new',new.size)
new.save('sank_business.jpg')
new.show()
