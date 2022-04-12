
#qrcode.py 
-generate qrcode
scanqr.py
-to avoid repetitive request to server 
-update zero quantity if qrtag is scanned  

#qrserver https://github.com/JetLi1031/CheckInventory/tree/main/qrserver
-express web frame work with mongodb (rest api)
-to update quantity if stock emptied 
- mongoose ORM schema 
{
    Item:String,
    ITEMusage:String,
    Stockavailable:Number
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
  

#react web app https://github.com/JetLi1031/CheckInventory/tree/main/reactserver
-to Edit,Delete,Create new item with distintive qrcode
- print button available to print coresponded qrcode
- update date to view empty stock


<p align="center">
  <img 
    src="https://github.com/JetLi1031/CheckInventory/blob/main/output.gif"
  >
</p>
