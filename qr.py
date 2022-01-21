 

import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer
from qrcode.image.styles.colormasks import RadialGradiantColorMask
import json
# user = {"name":"Wong Jet Li",
# "Id": "B1706591",
# "Passcode":"WASD"
# }
# jsonstring = json.dumps(user)

itemid1 = "61e3ee3d88f34f96f9f5df28"
itemid2 = "61e3ee3d88f34f96f9f5df29"


qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H)
qr.add_data(itemid1)
qr.make(fit=True)

qr2 = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H)
qr2.add_data(itemid2)
qr2.make(fit=True)


img_1 = qr.make_image(image_factory=StyledPilImage, module_drawer=RoundedModuleDrawer())
img_1.show()
img_2 = qr2.make_image(image_factory=StyledPilImage, color_mask=RadialGradiantColorMask())
# img_3 = qr.make_image(image_factory=StyledPilImage, embeded_image_path="./image.png")


img_2.show()