# Login

Used for login

**URL** : `/auth`

**Method** : `POST`

**Auth required** : No

**Data constraints**

```json
{
    "email": "[your email]",
    "password": "[your password]"
}
```

## Success Response

**Code** : `200 OK` 

**Content example**

```json
{
    "token": "[for authentication]",
    "USER": "[user object info]"
}
```

## **OR**

**Code** : `400 Bad Request` 

**Content example**

```json
{
    "code": 400,
    "message": "emailหรือpasswordไม่ถูกต้องกรุณาloginใหม่",
    "data": null
}
```


