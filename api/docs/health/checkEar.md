# CheckHead

Used for checking head status

**URL** : `/gadget/head`

**Method** : `POST`

**Auth required** : Yes

**Permissions required** :  None

**Data constraints**

```json
{
    "child": "[child id]",
    "head": "[status of headCheck]",
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
    "message": "เช็คข้อมูลบริเวณศีรษะเสร็จสิ้น",
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
    message: "แก้ไขข้อมูลบริเวณศีรษะเสร็จสิ้น",
    data: null
}
```
