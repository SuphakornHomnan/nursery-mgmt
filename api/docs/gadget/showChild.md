# Show Child Info in Gadget Table

Used for getting gadget check info

**URL** : `/gadget`

**Method** : `GET`

**Auth required** : Yes

**Permissions required** : None

**Data constraints**

```json
{
  "room": "",
  "date": ""
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "_id": "child id",
  "no": "[order child]",
  "name": "[child name]",
  "nickname": "[child nickname]",
  "color": "[color for child name]",
  "date": "[selected date]",
  "milk": "[status of milkCheck]",
  "pampers": "[status of pamperCheck]",
  "waterbottle": "[status of waterBottleCheck]",
  "milkbottle": "[status of milkBottleCheck]",
  "towel": "[status of towelCheck]"
}
```
