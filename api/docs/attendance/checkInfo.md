# checkAttendanceInfo

Used for checking attendance info

**URL** : `/`

**Method** : `POST`

**Auth required** : YES

**Permissions required** :  None

**Data constraints**

```json
{
    "child": "[ObjectId of child]",
    "attend": "[Status of attendance]",
    "date": "[Selected date check]"
}
```

## Success Response

**Condition**: Not yet check

**Code** : `201 Created` 

**Content example**

```json
{
    "code": 201,
    "message": "เช็คข้อมูลการเข้าเรียนเสร็จสิ้น",
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
    message: "แก้ไขข้อมูลการเข้าเรียนเสร็จสิ้น",
    data: null
}
```
