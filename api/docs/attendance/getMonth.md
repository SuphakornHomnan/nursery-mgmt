# GetMonthInfo

Used for getting month info on attendance table

**URL** : `/v2/changeMonth`

**Method** : `GET`

**Auth required** : YES

**Permissions required** :  None

**Data constraints**

```json
{
    "date": "[Selected month check]"
}
```

## Success Response

**Code** : `200 OK` 

**Content example**

```json
{
    "amountDay": "[amount day of selected month]",
    "dayList": "[List for column attendance table]"
}
```


