# !/bin/bash
# change the "to" token to match with the site you want to send the notification to
# "registration_ids" token with comma & "" if there is more than one web
# token can be found from checking console log from the website, can be found using inspect element

data='{ "data":{ "notification": {"title": "1001    1004    1002", "body": "test"}}, "to": ""}';


curl --silent -o /dev/null -X POST -H "Authorization: key=AAAA5ckJ0Bo:APA91bGzbsVynpVGfU3aZv9o_98NqYSK_x7dUKbSuuJWO9yawMh88PlnhVFXs7u3-Epzw0quZcbAnmRbJlnMAOdzeppGyP-lbUt-275P3ssytzRW3ine2up3OjjDxQn72CfCq9bm_n8t" -H "Content-Type: application/json" -d "$data" https://fcm.googleapis.com/fcm/send & 
