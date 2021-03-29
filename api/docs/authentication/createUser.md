# Create User

Used for creating user

**URL** : `/user`

**Method** : `POST`

**Auth required** : Yes

**Permissions required** :  None

**Data constraints**

```json
{
    "email":"",
    "password":"", 
    "role":"", 
    "owner":""
}
```

## Success Response

**Code** : `201 Created` 

**Content example**

```json
{
    "results": "[user info]"
}
```
