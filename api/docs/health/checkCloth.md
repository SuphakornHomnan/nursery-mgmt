# CheckCloth

Used for checking cloth status

**URL** : `/gadget/cloth`

**Method** : `POST`

**Auth required** : Yes

**Permissions required** :  None

**Data constraints**

```json
{
    "child": "[child id]",
    "cloth": "[status of clothCheck]",
    "date": "[selected date]"
}
```

## Success Response

**Condition**: Not yet check

**Code** : `201 Created` 

**Content example**

```json
{
    "code": 201,
    "message": "เช็คข้อมูลการนำเสื้อเสร็จสิ้น",
    "data": null
}
```

## **OR**

**Condition**: Ever check

**Code** : `204 Not Content` 

**Content example**

```json
{
    code: 204,
    message: "แก้ไขข้อมูลการนำเสื้อเสร็จสิ้น",
    data: null
}
```
