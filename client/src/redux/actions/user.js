import api from "../../api";

export const addUser = (email, password, role, owner,props) => async () =>{
    try {
        const res = await api.post('/user/',{
            email,
            password,
            role,
            owner
        })
        if (res.status === 201) {
            alert('สร้างuserเรียบร้อย')
            window.history.back()
        } 
    } catch (error) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    }
}