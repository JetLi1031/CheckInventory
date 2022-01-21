
from multiprocessing.sharedctypes import Value
from re import I
from pyzbar.pyzbar import decode
from PIL import Image
import cv2
import numpy as np
import requests
import time

servername = "http://localhost:8181"
route="interface/itemtoempty/"
checkedrequested = []

def qrdetection(frame):
    myresult = 0; #clear buffer
    grayframe = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    myresult = decode(grayframe)
    for instance in myresult:
        print(instance)
        (l,t,w,h) = instance.rect
        boxpoint = instance.polygon
        boxpts = np.array(boxpoint)
        pts = boxpts.reshape((-1,1,2))
        cv2.polylines(frame, [pts],True,(0,255,0),2)  #isclosed == True
        info = instance.data.decode("utf-8")
        cv2.putText(frame, info , (l,t), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255,0,0),2)
    return myresult

#let create dictionary
def requesttoserver(itemid):
    for dic in checkedrequested:    # filter of prolonged buffer                 
        if dic["id"] not in [item.data.decode("utf-8") for item in itemid]: ## deal with time dictionary pop
            if "elapsetime" not in dic.keys():
                dic["elapsetime"] = time.time()
                # print("couting time at ",dic["elapsetime"])
            else:
                elapsetime = time.time() - dic["elapsetime"]
                # print("elapsetime at ",elapsetime)
                if elapsetime >=5 : ## 5 second buffer
                    checkedrequested.remove(dic)
      
    
    if (not itemid):
        return
    for instance in itemid:
        decodeddata = instance.data.decode("utf-8")
        try:
            if len(decodeddata) != 24 :
                # print(f'{decodeddata} is not 24 bit' )
                int(decodeddata,16)  ## test hex digit
                continue
        except ValueError as e:
            # print("this is not hexstring")
            continue
        #check inserted or not 
        if not any(decodeddata == dicheck["id"] for dicheck in checkedrequested) or (len(checkedrequested) == 0): 
            checkedrequested.append({"id":decodeddata,"Requested":False})
        #check requested or not
        # print(checkedrequested)
        for dic in checkedrequested:
                if decodeddata == dic["id"]:
                    if(dic["Requested"]):
                        print("this item have already done Requesting")
                        return               
                    try:
                        response = requests.get(
                        f'{servername}/{route}',
                        params={'itemid': decodeddata}
                        )
                        print(response.status_code)

                        # Inspect some attributes of the `requests` repository
                        if response.status_code == 203:
                            dic["Requested"] = True # do not request anymore if success
                            print('Success!')
                            json_response = response.json()
                            print(json_response)
                        elif response.status_code == 404:
                            print('Response Not Found or rejected')

                    except (requests.ConnectionError, requests.Timeout) as exception:
                        print("No internet connection or Server unavailable ")





try:
    cap = cv2.VideoCapture(0)
    while True:
        ret,frame = cap.read()
        result = qrdetection(frame)
        requesttoserver(result)
        if not ret:
            break  
        
        cv2.imshow("frame",frame)
        if cv2.waitKey(1) == ord('q'):
            break

except KeyboardInterrupt:
    print("cacelled")



