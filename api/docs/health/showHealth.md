# Show Health Info in Health Table

Used for getting health check info

**URL** : `/health`

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
  "_id": "[child id]",
  "no": "[order of child]",
  "name": "[child name]",
  "nickname": "[child nickname]",
  "color": "[color of child name]",
  "date": "[selected date]",
  "breakfast": "[status of breakfast]",
  "head": "[status of head]",
  "ear": "[status of ear]",
  "nail": "[status of nail]",
  "skin": "[status of skin]",
  "clothing": "[status of cloth]",
  "wound": "[status of wound]",
  "fever": "[status of fever]"
}
```
