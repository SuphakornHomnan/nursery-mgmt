# GetAttendanceTableInfo

Used for getting attendance info on table

**URL** : `/getChild`

**Method** : `GET`

**Auth required** : YES

**Permissions required** :  None

**Data constraints**

```json
{
    "room": "[room name]",
    "date": "[Selected date check]"
}
```

## Success Response

**Code** : `200 OK` 

**Content example**

```json
{
    "_id": "[ObjectId of child]",
    "no": "[index]",
    "name": "[child name]",
    "color": "[color for specify gender]",
    "nickname": "[child nickname]",
    "checking": "[List info in table]",
    "selectedDateCheck": "[info attendance in selectedDate]"
}
```

